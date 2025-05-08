import test from "node:test";
import assert from "node:assert/strict";

import { Tuning } from "../src/Tuning";
import { twelveTETNotes } from "../src/data/temperaments";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
test("class Tuning", function (_t) {
  const { A, B, D, G, E } = twelveTETNotes;

  const standardGuitarTuning = new Tuning("guitar", "standard", [
    E,
    A,
    D,
    G,
    B,
    E,
  ]);

  assert.equal(
    standardGuitarTuning.valueOf(),
    JSON.stringify(standardGuitarTuning),
  );
  assert.equal(
    standardGuitarTuning.toString(),
    JSON.stringify(standardGuitarTuning),
  );
});
