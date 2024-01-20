import test from "node:test";
import assert from "node:assert/strict";

import { NoteFretNumberPair } from "../src/NoteFretNumberPair";
import { notes } from "../src/data/temperaments";

test("class NoteFretNumberPair", function (_t) {
  const { A } = notes;
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
