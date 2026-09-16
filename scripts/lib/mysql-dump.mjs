// Parser khusus dump phpMyAdmin: hanya literal INSERT yang dibaca, tidak ada
// perintah dari dump yang dieksekusi. Format yang tidak didukung ditolak.
export function splitStatements(sql) {
  const result = [];
  let statement = "";
  let quote = null;
  for (let i = 0; i < sql.length; i++) {
    const char = sql[i];
    if (quote) {
      statement += char;
      if (char === "\\" && quote !== "`") statement += sql[++i] ?? "";
      else if (char === quote) {
        if (sql[i + 1] === quote) statement += sql[++i];
        else quote = null;
      }
    } else if (char === "'" || char === '"' || char === "`") {
      quote = char;
      statement += char;
    } else if ((sql.startsWith("--", i) && /\s/.test(sql[i + 2] ?? "")) || char === "#") {
      while (i < sql.length && sql[i] !== "\n") i++;
      statement += "\n";
    } else if (sql.startsWith("/*", i)) {
      const end = sql.indexOf("*/", i + 2);
      if (end < 0) throw new Error("Komentar SQL tidak ditutup.");
      i = end + 1;
      statement += " ";
    } else if (char === ";") {
      if (statement.trim()) result.push(statement.trim());
      statement = "";
    } else statement += char;
  }
  if (quote || statement.trim()) throw new Error("Statement SQL tidak lengkap.");
  return result;
}

export function parseValues(input) {
  let i = 0;
  const rows = [];
  const skip = () => { while (/\s/.test(input[i] ?? "") && i < input.length) i++; };
  const expect = (char) => {
    skip();
    if (input[i++] !== char) throw new Error("Format VALUES tidak didukung.");
  };
  const value = () => {
    skip();
    if (input[i] === "'") {
      i++;
      let output = "";
      while (i < input.length) {
        const char = input[i++];
        if (char === "\\") {
          const escaped = input[i++];
          const escapes = { "0": "\0", b: "\b", n: "\n", r: "\r", t: "\t", Z: "\x1a", "\\": "\\", "'": "'", '"': '"', "%": "\\%", _: "\\_" };
          if (!Object.hasOwn(escapes, escaped)) throw new Error("Escape MySQL tidak didukung.");
          output += escapes[escaped];
        } else if (char === "'") {
          if (input[i] === "'") { output += "'"; i++; }
          else return output;
        } else output += char;
      }
      throw new Error("Literal string tidak ditutup.");
    }
    const start = i;
    while (i < input.length && !/[,)]/.test(input[i])) i++;
    const token = input.slice(start, i).trim();
    if (token === "NULL") return null;
    if (!/^-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(token)) throw new Error("Literal SQL tidak didukung.");
    const number = Number(token);
    if (!Number.isFinite(number) || (Number.isInteger(number) && !Number.isSafeInteger(number))) throw new Error("Angka di luar rentang aman.");
    return number;
  };
  while (i < input.length) {
    expect("(");
    const row = [];
    do {
      row.push(value());
      skip();
      if (input[i] !== ",") break;
      i++;
    } while (true);
    expect(")");
    rows.push(row);
    skip();
    if (i === input.length) break;
    expect(",");
    skip();
    if (i === input.length) throw new Error("VALUES berakhir dengan koma.");
  }
  if (!rows.length) throw new Error("INSERT tanpa baris.");
  return rows;
}

export function parseDump(sql) {
  const tables = new Map();
  const nextIds = new Map();
  let utc = false;
  for (const statement of splitStatements(sql)) {
    const create = /^CREATE TABLE `([^`]+)`\s*\(/.exec(statement);
    const insert = /^INSERT INTO `([^`]+)`\s*\(([^)]+)\)\s+VALUES\s+([\s\S]+)$/.exec(statement);
    const alter = /^ALTER TABLE `([^`]+)`\s/.exec(statement);
    if (create) {
      if (tables.has(create[1])) throw new Error("Definisi tabel duplikat.");
      tables.set(create[1], []);
    } else if (insert) {
      const [, table, columnList, values] = insert;
      if (!tables.has(table)) throw new Error("INSERT tanpa definisi tabel.");
      const columns = columnList.split(",").map((column) => {
        const match = /^`([A-Za-z_][A-Za-z0-9_]*)`$/.exec(column.trim());
        if (!match) throw new Error("Nama kolom tidak didukung.");
        return match[1];
      });
      if (new Set(columns).size !== columns.length) throw new Error("Kolom INSERT duplikat.");
      for (const row of parseValues(values)) {
        if (row.length !== columns.length) throw new Error("Jumlah nilai dan kolom berbeda.");
        tables.get(table).push(Object.fromEntries(columns.map((column, index) => [column, row[index]])));
      }
    } else if (alter) {
      if (!tables.has(alter[1])) throw new Error("ALTER untuk tabel tidak dikenal.");
      const auto = /AUTO_INCREMENT\s*=\s*(\d+)/.exec(statement);
      if (auto) nextIds.set(alter[1], Number(auto[1]));
    } else if (/^SET time_zone = "\+00:00"$/.test(statement)) utc = true;
    else if (/^SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO"$/.test(statement)) { /* supported */ }
    else if (!/^(START TRANSACTION|COMMIT)$/.test(statement)) throw new Error("Statement dump tidak didukung.");
  }
  if (!utc) throw new Error("Dump harus menyatakan timezone UTC.");
  return { tables, nextIds };
}
