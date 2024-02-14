import test from "node:test";
import assert from "node:assert/strict";

import { Note } from "../../src";
import { twelveTET } from "../../src/data/temperaments/twelveTET";
import { Guitar } from "../../src/instruments/Guitar";

const A: Note = twelveTET.getNoteFromID("A");
const B: Note = twelveTET.getNoteFromID("B");
const D: Note = twelveTET.getNoteFromID("D");
const E: Note = twelveTET.getNoteFromID("E");
const Fs: Note = twelveTET.getNoteFromID("F#");
const G: Note = twelveTET.getNoteFromID("G");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
test("class Guitar -- init", function (_t) {
  const defaultGuitar = new Guitar(21, [E, A, D, G, B, E]);
  const sevenStringGuitar = new Guitar(21, [B, E, A, D, G, B, E]);
  const eightStringGuitar = new Guitar(21, [Fs, B, E, A, D, G, B, E]);
  const twelveStringGuitar = new Guitar(21, [E, A, D, G, B, E], true);

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
