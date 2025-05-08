import test from "node:test";
import assert from "node:assert/strict";

import { NoteFretNumberPair } from "../src/NoteFretNumberPair";
import { twelveTETNotesAll } from "../src/data/temperaments";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
test("class NoteFretNumberPair", function (_t) {
  const { A } = twelveTETNotesAll;
  const noteFretNumberPair = new NoteFretNumberPair(A, 1);

  assert.equal(
    noteFretNumberPair.valueOf(),
    JSON.stringify(noteFretNumberPair),
  );
  assert.equal(
    noteFretNumberPair.toString(),
    JSON.stringify(noteFretNumberPair),
  );
});
