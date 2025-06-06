import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Note } from "../../src";
import { twelveTET, twelveTETNotes } from "../../src/data/temperaments/twelveTET";
import { Guitar, GuitarType } from "../../src/instruments/Guitar";
import { Tuning } from "../../src/Tuning";

describe("class Guitar", () => {
  const { A, Bb, B, C, Cs, Db, D, Ds, Eb, E, F, Fs, Gb, G, Gs, Ab } = twelveTETNotes;
  const defaultGuitar = new Guitar(21, [E, A, D, G, B, E], GuitarType.SIX_STRING);
  const sevenStringGuitar = new Guitar(21, [B, E, A, D, G, B, E], GuitarType.SEVEN_STRING);
  const eightStringGuitar = new Guitar(21, [Fs, B, E, A, D, G, B, E], GuitarType.EIGHT_STRING);
  const twelveStringGuitar = new Guitar(21, [E, A, D, G, B, E], GuitarType.TWELVE_STRING, true);

  it('init', () => {
    assert.ok(defaultGuitar);
    assert.ok(sevenStringGuitar);
    assert.ok(eightStringGuitar);
    assert.ok(twelveStringGuitar);

    assert.equal(
      defaultGuitar.fretBoard.courses.length,
      6,
      "6 string has 6 courses",
    );
    assert.equal(
      sevenStringGuitar.fretBoard.courses.length,
      7,
      "7 string has 7 courses",
    );
    assert.equal(
      eightStringGuitar.fretBoard.courses.length,
      8,
      "8 string has 8 courses",
    );
    assert.equal(
      twelveStringGuitar.fretBoard.courses.length,
      6,
      "12 string has 6 courses",
    );
    assert.equal(
      defaultGuitar.fretBoard.courses.every(
        (course) => course.tunedStrings.length === 1,
      ),
      true,
      "6 string has all single strings",
    );
    assert.equal(
      sevenStringGuitar.fretBoard.courses.every(
        (course) => course.tunedStrings.length === 1,
      ),
      true,
      "7 string has all single strings",
    );
    assert.equal(
      eightStringGuitar.fretBoard.courses.every(
        (course) => course.tunedStrings.length === 1,
      ),
      true,
      "8 string has all single strings",
    );
    assert.equal(
      twelveStringGuitar.fretBoard.courses.every(
        (course) => course.tunedStrings.length === 2,
      ),
      true,
      "12 string has all doubled strings",
    );
  });

  it('commonTunings', () => {
    assert.deepEqual(
      defaultGuitar.commonTunings,
      [
        new Tuning("standard", [E, A, D, G, B, E]),
        new Tuning("drop D", [D, A, D, G, B, E]),
        new Tuning("half step down", [Eb, Ab, Db, Gb, Bb, Eb]),
        new Tuning("whole step down", [D, G, C, F, A, D]),
        new Tuning("open D", [D, A, D, Fs, A, D]),
        new Tuning("DADGAD", [D, A, D, G, A, D]),
        new Tuning("open G", [D, G, D, G, B, D]),
        new Tuning("open E", [E, B, E, Gs, B, E]),
        new Tuning("open A", [E, A, E, A, Cs, E]),
        new Tuning("new standard", [C, G, D, A, E, G]),
        new Tuning("all fifths", [C, G, D, A, E, B]),
        new Tuning("open C", [C, G, C, G, C, E]),
        new Tuning("open C (C5)", [C, G, C, G, G, E]),
        new Tuning("open C (repetitive)", [C, E, G, C, E, G]),
        new Tuning("drop C", [C, G, C, F, A, D]),
        new Tuning("open B", [B, Fs, B, Fs, B, Ds]),
        new Tuning("open F", [F, A, C, F, C, F]),
      ],
      "common tunings found",
    );
  
    assert.deepEqual(
      sevenStringGuitar.commonTunings,
      [
        new Tuning("standard", [B, E, A, D, G, B, E]),
        new Tuning("half step down", [Bb, Eb, Ab, Db, Gb, Bb, Eb]),
        new Tuning("whole step down", [A, D, G, C, F, A, D]),
      ],
      "common tunings found - 7 string",
    );
  
    assert.deepEqual(
      eightStringGuitar.commonTunings,
      [
        new Tuning("standard", [Fs, B, E, A, D, G, B, E]),
        new Tuning("half step down", [F, Bb, Eb, Ab, Db, Gb, Bb, Eb]),
        new Tuning("whole step down", [E, A, D, G, C, F, A, D]),
    ],
      "common tunings found - 8 string",
    );
  
    assert.deepEqual(
      twelveStringGuitar.commonTunings,
      [
        new Tuning("standard", [E, A, D, G, B, E]),
        new Tuning("drop D", [D, A, D, G, B, E]),
        new Tuning("half step down", [Eb, Ab, Db, Gb, Bb, Eb]),
        new Tuning("whole step down", [D, G, C, F, A, D]),
        new Tuning("open D", [D, A, D, Fs, A, D]),
        new Tuning("DADGAD", [D, A, D, G, A, D]),
        new Tuning("open G", [D, G, D, G, B, D]),
        new Tuning("open E", [E, B, E, Gs, B, E]),
        new Tuning("open A", [E, A, E, A, Cs, E]),
        new Tuning("new standard", [C, G, D, A, E, G]),
        new Tuning("all fifths", [C, G, D, A, E, B]),
        new Tuning("open C", [C, G, C, G, C, E]),
        new Tuning("open C (C5)", [C, G, C, G, G, E]),
        new Tuning("open C (repetitive)", [C, E, G, C, E, G]),
        new Tuning("drop C", [C, G, C, F, A, D]),
        new Tuning("open B", [B, Fs, B, Fs, B, Ds]),
        new Tuning("open F", [F, A, C, F, C, F]),
      ],
      "common tunings found - 12 string",
    );
  });

  it('standardTuning', () => {
    assert.deepEqual(
      defaultGuitar.standardTuning,
      new Tuning("standard", [E, A, D, G, B, E]),
      "standard tuning found",
    );
  
    assert.deepEqual(
      sevenStringGuitar.standardTuning,
      new Tuning("standard", [B, E, A, D, G, B, E]),
      "standard tuning found - 7 string",
    );
  
    assert.deepEqual(
      eightStringGuitar.standardTuning,
      new Tuning("standard", [Fs, B, E, A, D, G, B, E]),
      "standard tuning found - 8 string",
    );
  
    assert.deepEqual(
      twelveStringGuitar.standardTuning,
      new Tuning("standard", [E, A, D, G, B, E]),
      "standard tuning found - 12 string",
    );
  });
});
