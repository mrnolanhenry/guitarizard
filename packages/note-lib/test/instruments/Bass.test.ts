import test from "node:test";
import assert from "node:assert/strict";

import { Note } from "../../src";
import { twelveTET } from "../../src/data/temperaments/twelveTET";
import { Bass } from "../../src/instruments/Bass";

const A: Note = twelveTET.getNoteFromID("A");
const B: Note = twelveTET.getNoteFromID("B");
const C: Note = twelveTET.getNoteFromID("C");
const D: Note = twelveTET.getNoteFromID("D");
const E: Note = twelveTET.getNoteFromID("E");
const G: Note = twelveTET.getNoteFromID("G");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
test("class Bass -- init", function (_t) {
  const defaultBass = new Bass(21, [E, A, D, G]);
  const fiveStringBass = new Bass(21, [B, E, A, D, G]);
  const sixStringBass = new Bass(21, [B, E, A, D, G, C]);

  assert.ok(defaultBass);
  assert.ok(fiveStringBass);
  assert.ok(sixStringBass);

  assert.equal(
    defaultBass.fretBoard.courses.length,
    4,
    "4 string has 4 courses",
  );
  assert.equal(
    fiveStringBass.fretBoard.courses.length,
    5,
    "5 string has 5 courses",
  );
  assert.equal(
    sixStringBass.fretBoard.courses.length,
    6,
    "6 string has 6 courses",
  );
  assert.equal(
    defaultBass.fretBoard.courses.every(
      (course) => course.tunedStrings.length === 1,
    ),
    true,
    "4 string has all single strings",
  );
  assert.equal(
    fiveStringBass.fretBoard.courses.every(
      (course) => course.tunedStrings.length === 1,
    ),
    true,
    "5 string has all single strings",
  );
  assert.equal(
    sixStringBass.fretBoard.courses.every(
      (course) => course.tunedStrings.length === 1,
    ),
    true,
    "6 string has all single strings",
  );
});
