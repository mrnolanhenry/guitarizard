import test from "node:test";
import assert from "node:assert/strict";

import { Note } from "../../src";
import { twelveTET } from "../../src/data/temperaments/twelveTET";
import { Piano } from "../../src/instruments/Piano";
import { Tuning } from "../../src/Tuning";

const C: Note = twelveTET.getNoteFromID("C");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
test("class Piano -- init", function (_t) {
  const defaultPiano = new Piano(20, [C]);

  assert.ok(defaultPiano);

  assert.deepEqual(
    defaultPiano.getCommonTunings(),
    [
      new Tuning("piano", "standard", [C]),
    ],
    "common tunings found",
  );

  assert.deepEqual(
    defaultPiano.getStandardTuning(),
    new Tuning("piano", "standard", [C]),
    "standard tuning found",
  );

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
    "piano has all single strings",
  );
});
