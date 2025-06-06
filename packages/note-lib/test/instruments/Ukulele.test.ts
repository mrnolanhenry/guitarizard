import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Note } from "../../src";
import { twelveTET, twelveTETNotes } from "../../src/data/temperaments/twelveTET";
import { Ukulele } from "../../src/instruments/Ukulele";
import { Tuning } from "../../src/Tuning";

describe("class Ukulele", () => {
  const { A, Bb, B, C, Cs, Db, D, Ds, Eb, E, F, Fs, Gb, G, Gs, Ab } = twelveTETNotes;
  const defaultUkulele = new Ukulele(20, [G, C, E, A]);

  it('init', () => {
    assert.ok(defaultUkulele);
    assert.equal(
      defaultUkulele.fretBoard.courses.length,
      4,
      "4 string has 4 courses",
    );
    assert.equal(
      defaultUkulele.fretBoard.courses.every(
        (course) => course.tunedStrings.length === 1,
      ),
      true,
      "4 string has all single strings",
    );
  });

  it('commonTunings', () => {
    assert.deepEqual(
      defaultUkulele.commonTunings,
      [
        new Tuning("standard", [G, C, E, A]),
        new Tuning("D", [A, D, Fs, B]),
        new Tuning("baritone", [D, G, B, E]),
      ],
      "common tunings found",
    );
  });

  it('standardTuning', () => {
    assert.deepEqual(
      defaultUkulele.standardTuning,
      new Tuning("standard", [G, C, E, A]),
      "standard tuning found",
    );
  });
});
