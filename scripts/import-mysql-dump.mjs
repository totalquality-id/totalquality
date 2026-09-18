import fs from "node:fs";
import { createHash } from "node:crypto";
import { isDeepStrictEqual } from "node:util";
import nextEnv from "@next/env";
import { Prisma, PrismaClient } from "@prisma/client";
import { parseDump } from "./lib/mysql-dump.mjs";

// Usage: node scripts/import-mysql-dump.mjs dump.sql [--apply]
// Default: read-only preflight. No source SQL commands are executed.
const args = process.argv.slice(2);
const apply = args.includes("--apply");
const filenames = args.filter((arg) => !arg.startsWith("--"));
if (filenames.length !== 1 || args.some((arg) => arg.startsWith("--") && arg !== "--apply")) {
  throw new Error("Usage: node scripts/import-mysql-dump.mjs dump.sql [--apply]");
}
nextEnv.loadEnvConfig(process.cwd());
const prisma = new PrismaClient();
const order = ["User", "Career", "Service", "Event", "Article", "Forum", "Hero", "HeroContent", "Consultation", "Application", "AssessmentResult", "_UserCareers"];
// Legacy MySQL dumps predate the News -> Article rename, so the dump still
// carries the old table name. Map application model -> dump table name.
const dumpTable = (name) => (name === "Article" ? "News" : name);
const models = new Map(Prisma.dmmf.datamodel.models.map((model) => [model.name, model]));
const quote = (name) => '"' + name.replaceAll('"', '""') + '"';
const tableSql = (name) => `public.${quote(name)}`;
const delegate = (db, name) => db[name[0].toLowerCase() + name.slice(1)];
const fieldsFor = (name) => name === "_UserCareers"
  ? ["A", "B"].map((name) => ({ name, type: "Int", isRequired: true }))
  : models.get(name).fields.filter((field) => field.kind !== "object");

function convert(value, field) {
  if (value === null) {
    if (field.isRequired) throw new Error("NULL untuk kolom wajib.");
    return null;
  }
  switch (field.type) {
    case "String":
      if (typeof value !== "string" || value.includes("\0")) throw new Error("String tidak kompatibel PostgreSQL.");
      return value;
    case "Boolean":
      if (value !== 0 && value !== 1) throw new Error("Boolean harus 0 atau 1.");
      return value === 1;
    case "Int":
      if (!Number.isInteger(value) || value < -2147483648 || value > 2147483647) throw new Error("Integer tidak valid.");
      return value;
    case "Float":
      if (typeof value !== "number" || !Number.isFinite(value)) throw new Error("Float tidak valid.");
      return value;
    case "DateTime": {
      if (typeof value !== "string" || !/^\d{4}-\d\d-\d\d \d\d:\d\d:\d\d(?:\.\d{1,3})?$/.test(value)) throw new Error("Tanggal tidak didukung.");
      const iso = value.replace(" ", "T");
      const canonical = iso.includes(".") ? iso.padEnd(23, "0") + "Z" : iso + ".000Z";
      const date = new Date(canonical);
      if (!Number.isFinite(date.getTime()) || date.toISOString() !== canonical) throw new Error("Tanggal tidak valid.");
      return date;
    }
    case "Json":
      if (typeof value !== "string") throw new Error("JSON harus berupa string MySQL.");
      return JSON.parse(value);
    default: throw new Error("Tipe kolom belum didukung importer.");
  }
}

async function readRows(db, table) {
  // Identifier comes from the fixed application table allowlist above.
  if (table === "_UserCareers") return db.$queryRawUnsafe('SELECT "A", "B" FROM public."_UserCareers" ORDER BY "A", "B"');
  return delegate(db, table).findMany({ orderBy: { id: "asc" } });
}

async function sequenceState(db, table) {
  const [sequence] = await db.$queryRaw`
    SELECT n.nspname AS schema, c.relname AS name
    FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE c.oid = pg_get_serial_sequence(${tableSql(table)}, 'id')::regclass
  `;
  if (!sequence || sequence.schema !== "public") throw new Error("Sequence tabel tidak ditemukan.");
  const identifier = `${quote(sequence.schema)}.${quote(sequence.name)}`;
  const [state] = await db.$queryRawUnsafe(`SELECT last_value, is_called FROM ${identifier}`);
  return { identifier, next: Number(state.last_value) + (state.is_called ? 1 : 0) };
}

async function main() {
  const buffer = fs.readFileSync(filenames[0]);
  const sql = new TextDecoder("utf-8", { fatal: true }).decode(buffer);
  const dump = parseDump(sql);
  const expectedNames = [...order.map(dumpTable), "_prisma_migrations"].sort();
  if (!isDeepStrictEqual([...dump.tables.keys()].sort(), expectedNames)) throw new Error("Daftar tabel dump berbeda dengan aplikasi.");
  const data = new Map();
  for (const table of order) {
    const fields = fieldsFor(table);
    const names = fields.map((field) => field.name).sort();
    const rows = dump.tables.get(dumpTable(table)).map((row) => {
      if (!isDeepStrictEqual(Object.keys(row).sort(), names)) throw new Error(`Kolom dump berbeda: ${table}.`);
      return Object.fromEntries(fields.map((field) => [field.name, convert(row[field.name], field)]));
    });
    rows.sort((a, b) => table === "_UserCareers" ? a.A - b.A || a.B - b.B : a.id - b.id);
    const keys = rows.map((row) => table === "_UserCareers" ? `${row.A}:${row.B}` : row.id);
    if (new Set(keys).size !== keys.length) throw new Error(`ID duplikat: ${table}.`);
    data.set(table, rows);
  }
  const sourceHash = createHash("sha256").update(buffer).digest("hex");
  console.log("SHA256 sumber:", sourceHash);
  console.log("Mode:", apply ? "IMPORT" : "PREFLIGHT (read-only)");
  console.log("Baris riwayat migrasi MySQL dilewati:", dump.tables.get("_prisma_migrations").length);

  const report = await prisma.$transaction(async (tx) => {
    if (apply) {
      await tx.$executeRawUnsafe("SET LOCAL lock_timeout = '10s'");
      await tx.$executeRawUnsafe(`LOCK TABLE ${order.map(tableSql).join(", ")} IN EXCLUSIVE MODE`);
    } else await tx.$executeRawUnsafe("SET TRANSACTION READ ONLY");
    const [connection] = await tx.$queryRaw`SELECT current_database() AS database, current_user AS role`;
    if (connection.database !== "postgres" || connection.role !== "totalquality_prisma") throw new Error("Database/role tujuan tidak sesuai.");
    const migrationsBefore = await tx.$queryRaw`SELECT * FROM public._prisma_migrations ORDER BY id`;
    const summary = [];
    const existing = new Map();
    for (const table of order) {
      const rows = await readRows(tx, table);
      existing.set(table, rows);
      summary.push({ table, source: data.get(table).length, before: rows.length });
    }
    const empty = [...existing.values()].every((rows) => rows.length === 0);
    const identical = order.every((table) => isDeepStrictEqual(existing.get(table), data.get(table)));
    if (!empty && !identical) throw new Error("Tujuan sudah berisi data berbeda. Impor dihentikan tanpa menimpa data.");
    if (apply && empty) {
      for (const table of order) {
        const rows = data.get(table);
        if (!rows.length) continue;
        if (table === "_UserCareers") {
          for (const row of rows) await tx.$executeRaw`INSERT INTO public."_UserCareers" ("A", "B") VALUES (${row.A}, ${row.B})`;
        } else await delegate(tx, table).createMany({ data: rows });
      }
    }
    for (const entry of summary) {
      const table = entry.table;
      if (apply || identical) {
        const actual = await readRows(tx, table);
        if (!isDeepStrictEqual(actual, data.get(table))) throw new Error(`Verifikasi semua kolom gagal: ${table}.`);
        entry.verified = true;
      }
      if (table !== "_UserCareers") {
        const sequence = await sequenceState(tx, table);
        const next = Math.max(1, sequence.next, dump.nextIds.get(table) ?? 1, ...data.get(table).map((row) => row.id + 1));
        if (!Number.isSafeInteger(next) || next > 2147483647) throw new Error("ID berikutnya tidak valid.");
        if (apply && sequence.next < next) {
          // Unlike setval(), RESTART participates in the import transaction.
          await tx.$executeRawUnsafe(`ALTER SEQUENCE ${sequence.identifier} RESTART WITH ${next}`);
        }
        entry.nextId = next;
        if (apply && (await sequenceState(tx, table)).next !== next) throw new Error("Verifikasi sequence gagal.");
      }
    }
    if (!isDeepStrictEqual(await tx.$queryRaw`SELECT * FROM public._prisma_migrations ORDER BY id`, migrationsBefore)) throw new Error("Riwayat migrasi PostgreSQL berubah.");
    return { state: identical ? "already-matches" : apply ? "imported" : "ready", summary };
  }, { timeout: 60000, maxWait: 15000, isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
  console.table(report.summary);
  console.log("Hasil:", report.state);
  if (apply) console.log("COMMIT selesai. Seluruh kolom, hash password, tanggal, relasi FK, dan sequence telah diverifikasi.");
}

main().catch((error) => {
  // Never print Prisma error payloads, source records, or connection strings.
  console.error("Impor gagal:", error instanceof Prisma.PrismaClientKnownRequestError ? error.code : error.name);
  if (error.constructor === Error) console.error(error.message);
  process.exitCode = 1;
}).finally(() => prisma.$disconnect());
