import test from "node:test";
import assert from "node:assert/strict";

import { Note } from "../../src";
import { twelveTET } from "../../src/data/temperaments/twelveTET";
import { Ukulele } from "../../src/instruments/Ukulele";

const A: Note = twelveTET.getNoteFromID("A");
const C: Note = twelveTET.getNoteFromID("C");
const E: Note = twelveTET.getNoteFromID("E");
const G: Note = twelveTET.getNoteFromID("G");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
test("class Ukulele -- init", function (_t) {
  const defaultUkulele = new Ukulele(20, [G, C, E, A]);

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
