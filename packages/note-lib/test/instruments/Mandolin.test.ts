import test from "node:test";
import assert from "node:assert/strict";

import { Note } from "../../src";
import { twelveTET } from "../../src/data/temperaments/twelveTET";
import { Mandolin } from "../../src/instruments/Mandolin";

const A: Note = twelveTET.getNoteFromID("A");
const D: Note = twelveTET.getNoteFromID("D");
const E: Note = twelveTET.getNoteFromID("E");
const G: Note = twelveTET.getNoteFromID("G");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
test("class Mandolin -- init", function (_t) {
  const defaultMandolin = new Mandolin(17, [G, D, A, E]);

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
