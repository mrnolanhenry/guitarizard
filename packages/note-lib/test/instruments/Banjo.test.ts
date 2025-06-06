import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Note } from "../../src";
import { twelveTET, twelveTETNotes } from "../../src/data/temperaments/twelveTET";
import { Banjo } from "../../src/instruments/Banjo";
import { Tuning } from "../../src/Tuning";

describe("class Banjo", () => {
  const { A, Bb, B, C, Cs, Db, D, Ds, Eb, E, F, Fs, Gb, G, Gs, Ab } = twelveTETNotes;

  const defaultBanjo = new Banjo(21, [G, D, G, B, D]);

  it('init', () => {
    assert.ok(defaultBanjo);

    assert.equal(
      defaultBanjo.fretBoard.courses.length,
      5,
      "5 string has 5 courses",
    );
    assert.equal(
      defaultBanjo.fretBoard.courses.every(
        (course) => course.tunedStrings.length === 1,
      ),
      true,
      "5 string has all single strings",
    );
  });

  it('commonTunings', () => {
    assert.deepEqual(
      defaultBanjo.commonTunings,
      [
        new Tuning("standard", [G, D, G, B, D]),
        new Tuning("double C", [G, C, G, C, D]),
        new Tuning("drop C", [G, C, G, B, D]),
        new Tuning("D", [Fs, D, Fs, A, D]),
        new Tuning("G modal", [G, D, G, C, D]),
        new Tuning("guitar", [G, D, G, B, E]),
      ],
      "common tunings found",
    );
  });

  it('standardTuning', () => {
    assert.deepEqual(
      defaultBanjo.standardTuning,
      new Tuning("standard", [G, D, G, B, D]),
      "standard tuning found",
    );
  });
});
