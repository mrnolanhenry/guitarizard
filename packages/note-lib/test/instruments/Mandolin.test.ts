import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Note } from "../../src";
import { twelveTET } from "../../src/data/temperaments/twelveTET";
import { Mandolin } from "../../src/instruments/Mandolin";
import { Tuning } from "../../src/Tuning";

describe("class Mandolin", () => {
  const A: Note = twelveTET.getNoteFromID("A");
  const B: Note = twelveTET.getNoteFromID("B");
  const C: Note = twelveTET.getNoteFromID("C");
  const Cs: Note = twelveTET.getNoteFromID("C#");
  const D: Note = twelveTET.getNoteFromID("D");
  const E: Note = twelveTET.getNoteFromID("E");
  const F: Note = twelveTET.getNoteFromID("F");
  const G: Note = twelveTET.getNoteFromID("G");
  const defaultMandolin = new Mandolin(17, [G, D, A, E]);

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

  it('getCommonTunings', () => {
    assert.deepEqual(
      defaultMandolin.getCommonTunings(),
      [
        new Tuning("mandolin", "standard", [G, D, A, E]),
        new Tuning("mandolin", "Cajun", [F, C, G, D]),
        new Tuning("mandolin", "open G", [G, D, G, B]),
        new Tuning("mandolin", "cross G", [G, D, G, D]),
        new Tuning("mandolin", "Gee-Dad", [G, D, A, D]),
        new Tuning("mandolin", "open D", [D, D, A, D]),
        new Tuning("mandolin", "high bass", [A, D, A, E]),
        new Tuning("mandolin", "cross A", [A, E, A, E]),
        new Tuning("mandolin", "open A", [A, E, A, Cs]),
      ],
      "common tunings found",
    );
  });

  it('getStandardTuning', () => {
    assert.deepEqual(
      defaultMandolin.getStandardTuning(),
      new Tuning("mandolin", "standard", [G, D, A, E]),
      "standard tuning found",
    );
  });
});
