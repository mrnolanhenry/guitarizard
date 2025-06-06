import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Note } from "../../src";
import { twelveTET, twelveTETNotes } from "../../src/data/temperaments/twelveTET";
import { Piano } from "../../src/instruments/Piano";
import { Tuning } from "../../src/Tuning";

describe("class Piano", () => {
  const { A, Bb, B, C, Cs, Db, D, Ds, Eb, E, F, Fs, Gb, G, Gs, Ab } = twelveTETNotes;
  const defaultPiano = new Piano(20, [C]);

  it('init', () => {
    assert.ok(defaultPiano);

    assert.equal(
      defaultPiano.fretBoard.courses.length,
      1,
      "Piano only has 1 'course'",
    );
    assert.equal(
      defaultPiano.fretBoard.courses.every(
        (course) => course.tunedStrings.length === 1,
      ),
      true,
      "piano has a single string",
    );
  });

  it('commonTunings', () => {
    assert.deepEqual(
      defaultPiano.commonTunings,
      [
        new Tuning("standard", [C]),
      ],
      "common tunings found",
    );
  });

  it('standardTuning', () => {
    assert.deepEqual(
      defaultPiano.standardTuning,
      new Tuning("standard", [C]),
      "standard tuning found",
    );
  });
});
