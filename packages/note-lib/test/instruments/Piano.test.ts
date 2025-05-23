import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Note } from "../../src";
import { twelveTET } from "../../src/data/temperaments/twelveTET";
import { Piano } from "../../src/instruments/Piano";
import { Tuning } from "../../src/Tuning";

describe("class Piano", () => {
  const C: Note = twelveTET.getNoteFromID("C");
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

  it('getCommonTunings', () => {
    assert.deepEqual(
      defaultPiano.getCommonTunings(),
      [
        new Tuning("piano", "standard", [C]),
      ],
      "common tunings found",
    );
  });

  it('getStandardTuning', () => {
    assert.deepEqual(
      defaultPiano.getStandardTuning(),
      new Tuning("piano", "standard", [C]),
      "standard tuning found",
    );
  });
});
