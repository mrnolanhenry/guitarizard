import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Note } from "../../src";
import { twelveTET } from "../../src/data/temperaments/twelveTET";
import { Banjo } from "../../src/instruments/Banjo";
import { Tuning } from "../../src/Tuning";

describe("class Banjo", () => {
  const A: Note = twelveTET.getNoteFromID("A");
  const B: Note = twelveTET.getNoteFromID("B");
  const C: Note = twelveTET.getNoteFromID("C");
  const D: Note = twelveTET.getNoteFromID("D");
  const E: Note = twelveTET.getNoteFromID("E");
  const Fs: Note = twelveTET.getNoteFromID("F#");
  const G: Note = twelveTET.getNoteFromID("G");
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

  it('getCommonTunings', () => {
    assert.deepEqual(
      defaultBanjo.getCommonTunings(),
      [
        new Tuning("banjo", "standard", [G, D, G, B, D]),
        new Tuning("banjo", "double C", [G, C, G, C, D]),
        new Tuning("banjo", "drop C", [G, C, G, B, D]),
        new Tuning("banjo", "D", [Fs, D, Fs, A, D]),
        new Tuning("banjo", "G modal", [G, D, G, C, D]),
        new Tuning("banjo", "guitar", [G, D, G, B, E]),
      ],
      "common tunings found",
    );
  });

  it('getStandardTuning', () => {
    assert.deepEqual(
      defaultBanjo.getStandardTuning(),
      new Tuning("banjo", "standard", [G, D, G, B, D]),
      "standard tuning found",
    );
  });
});
