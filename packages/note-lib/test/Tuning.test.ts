import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Tuning } from "../src/Tuning";
import { twelveTETNotes } from "../src/data/temperaments";

describe("class Tuning", () => {
  const { A, B, D, G, E } = twelveTETNotes;
  const standardGuitarNoteOrder = [ E, A, D, G, B, E ];
  const standardGuitarTuning = new Tuning("standard", standardGuitarNoteOrder);

  it('toJSON, valueOf, toString', () => {
    assert.deepEqual(standardGuitarTuning.toJSON(), {
      id: "standard",
      notes: standardGuitarNoteOrder,
    });
    assert.equal(
      standardGuitarTuning.valueOf(),
      JSON.stringify(standardGuitarTuning),
    );
    assert.equal(
      standardGuitarTuning.toString(),
      JSON.stringify(standardGuitarTuning),
    );
  });
});