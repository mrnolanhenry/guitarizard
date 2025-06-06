import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Note } from "../../src";
import { twelveTET, twelveTETNotes } from "../../src/data/temperaments/twelveTET";
import { Mandolin } from "../../src/instruments/Mandolin";
import { Tuning } from "../../src/Tuning";
import { Mandola } from "../../src/instruments/Mandola";

describe("class Mandolin", () => {
  const { A, Bb, B, C, Cs, Db, D, Ds, Eb, E, F, Fs, Gb, G, Gs, Ab } = twelveTETNotes;
  const defaultMandolin = new Mandola(19, [C, G, D, A]);

  it('init', () => {
    assert.ok(defaultMandolin);

    assert.equal(defaultMandolin.fretBoard.courses.length, 4, "has 4 courses");
    assert.equal(
      defaultMandolin.fretBoard.courses.every(
        (course) => course.tunedStrings.length === 2,
      ),
      true,
      "has all doubled strings",
    );
  });

  it('commonTunings', () => {
    assert.deepEqual(
      defaultMandolin.commonTunings,
      [
        new Tuning("standard", [C, G, D, A]),
        new Tuning("F-C-G-C", [F, C, G, C]),
        new Tuning("D-A-E-A", [D, A, E, A]),
      ],
      "common tunings found",
    );
  });

  it('standardTuning', () => {
    assert.deepEqual(
      defaultMandolin.standardTuning,
      new Tuning("standard", [C, G, D, A]),
      "standard tuning found",
    );
  });
});
