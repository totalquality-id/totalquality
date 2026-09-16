import test from "node:test";
import assert from "node:assert/strict";
import { parseDump, parseValues, splitStatements } from "./lib/mysql-dump.mjs";

test("MySQL strings preserve Unicode, quotes, CRLF, escapes, nulls and delimiters", () => {
  const rows = parseValues(String.raw`(1, 'O\'Brien; -- bukan perintah', 'baris\r\nbaru', 'C:\\foto', NULL, 0, 'é 😊'), (2, 'it''s', '\"kutip\"', -1.5, 'NULL', 1, '\\n')`);
  assert.deepEqual(rows, [[1, "O'Brien; -- bukan perintah", "baris\r\nbaru", "C:\\foto", null, 0, "é 😊"], [2, "it's", '"kutip"', -1.5, "NULL", 1, "\\n"]]);
});

test("comments and semicolons inside strings do not change statement boundaries", () => {
  assert.deepEqual(splitStatements("-- comment\n/* ignored */ INSERT INTO `T` VALUES ('a;/*b*/'); COMMIT;"), ["INSERT INTO `T` VALUES ('a;/*b*/')", "COMMIT"]);
});

test("dump collects rows and preserves deleted-ID gaps from AUTO_INCREMENT", () => {
  const result = parseDump('SET time_zone = "+00:00"; CREATE TABLE `T` (`id` int); INSERT INTO `T` (`id`, `text`) VALUES (2, \'hello\'); ALTER TABLE `T` MODIFY `id` int AUTO_INCREMENT, AUTO_INCREMENT=9; COMMIT;');
  assert.deepEqual(result.tables.get("T"), [{ id: 2, text: "hello" }]);
  assert.equal(result.nextIds.get("T"), 9);
});

test("rejects expressions, truncated dumps, unsupported escapes and mismatched rows", () => {
  assert.throws(() => parseValues("(NOW())"));
  assert.throws(() => parseValues("('unterminated)"));
  assert.throws(() => parseValues(String.raw`('\q')`));
  assert.throws(() => parseValues("(9007199254740993)"));
  assert.throws(() => splitStatements("INSERT INTO `T` VALUES (1)"));
  assert.throws(() => parseDump('SET time_zone = "+00:00"; CREATE TABLE `T` (`id` int); INSERT INTO `T` (`id`) VALUES (1, 2);'));
});
