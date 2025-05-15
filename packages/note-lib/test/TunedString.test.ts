import test from "node:test";
import assert from "node:assert/strict";

import { Note } from "../src/Note";
import { Temperament } from "../src/Temperament";
import { TunedString } from "../src/TunedString";
import { NotePitch } from "../src/enums/NotePitch";
import { twelveTETNotes } from "../src/data/temperaments";
import { twelveTET } from "../src/data/temperaments/twelveTET";
import { Constants } from "../src";

test("class TunedString", function (t) {
  const { A, Bb, B } = twelveTETNotes;
  const smallTwelveTET = new Temperament("small", [twelveTET.intervals[0], twelveTET.intervals[1], twelveTET.intervals[2]], [A, Bb, B]);

  const AString = new TunedString(Constants.A, A, "catgut", 0.2);

  assert.deepEqual(
    AString.getFrettedNotes(smallTwelveTET, 0),
    [A],
    "single fret",
  );
  assert.deepEqual(
    AString.getFrettedNotes(smallTwelveTET, 1),
    [A, Bb],
    "two frets",
  );
  assert.deepEqual(
    AString.getFrettedNotes(smallTwelveTET, 2),
    [A, Bb, B],
    "three frets",
  );
  assert.deepEqual(
    AString.getFrettedNotes(smallTwelveTET, 3),
    [A, Bb, B, A],
    "looping temperament",
  );

  const BFlatString = new TunedString(Constants.B_FLAT, Bb, "catgut", 0.4);

  assert.deepEqual(
    BFlatString.getFrettedNotes(smallTwelveTET, 0),
    [Bb],
    "offset single fret",
  );

  assert.equal(AString.valueOf(), JSON.stringify(AString));
  assert.equal(AString.toString(), JSON.stringify(AString));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  void t.test("setTuningNote", (_t) => {
    const testString = new TunedString(
      "x",
      new Note("x", NotePitch.Natural),
      "catgut",
      0.2,
    );

    assert.equal(testString.tuningNote.id, "x");

    testString.setTuningNote(new Note("y", NotePitch.Natural));

    assert.equal(testString.tuningNote.id, "y");
  });
});
