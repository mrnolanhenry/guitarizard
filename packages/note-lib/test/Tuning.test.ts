import test from "node:test";
import assert from "node:assert/strict";

import { Tuning } from "../src/Tuning";
import { notes } from "../src/data/temperaments";

test("class Tuning", function (_t) {
  const { A, B, D, G, E } = notes;

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
