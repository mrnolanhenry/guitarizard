import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { NoteFretNumberPair } from "../src/NoteFretNumberPair";
import { twelveTETNotes } from "../src/data/temperaments";

describe("class NoteFretNumberPair", () => {
  const { A } = twelveTETNotes;
  const noteFretNumberPair = new NoteFretNumberPair(A, 1);

  it('toJSON, valueOf, toString', () => {
    assert.deepEqual(noteFretNumberPair.toJSON(),
      {
        value: A,
        fretNumber: 1,
      }
    );
    assert.equal(
      noteFretNumberPair.valueOf(),
      JSON.stringify(noteFretNumberPair),
    );
    assert.equal(
      noteFretNumberPair.toString(),
      JSON.stringify(noteFretNumberPair),
    );
  });
});
