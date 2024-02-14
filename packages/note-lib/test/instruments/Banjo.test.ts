import test from "node:test";
import assert from "node:assert/strict";

import { Note } from "../../src";
import { twelveTET } from "../../src/data/temperaments/twelveTET";
import { Banjo } from "../../src/instruments/Banjo";

const B: Note = twelveTET.getNoteFromID("B");
const D: Note = twelveTET.getNoteFromID("D");
const G: Note = twelveTET.getNoteFromID("G");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
test("class Banjo -- init", function (_t) {
  const defaultBanjo = new Banjo(21, [G, D, G, B, D]);

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
