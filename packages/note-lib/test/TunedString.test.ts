import tap from "tap";
import { Note } from "../src/Note";
import { Temperament } from "../src/Temperament";
import { TunedString } from "../src/TunedString";
import { NotePitch } from "../src/enums/NotePitch";
import { notes } from "../src/data/temperaments";
import * as Constants from "../src";

void tap.test("class TunedString", function (t) {
  const { A, Bb, B } = notes;
  const smallTwelveTET = new Temperament("small", [A, Bb, B]);

  const AString = new TunedString(Constants.A, A, "catgut", 0.2);

  t.same(AString.getFrettedNotes(smallTwelveTET, 0), [A], "single fret");
  t.same(AString.getFrettedNotes(smallTwelveTET, 1), [A, Bb], "two frets");
  t.same(AString.getFrettedNotes(smallTwelveTET, 2), [A, Bb, B], "three frets");
  t.same(
    AString.getFrettedNotes(smallTwelveTET, 3),
    [A, Bb, B, A],
    "looping temperament",
  );

  const BFlatString = new TunedString(Constants.B_FLAT, Bb, "catgut", 0.4);

  t.same(
    BFlatString.getFrettedNotes(smallTwelveTET, 0),
    [Bb],
    "offset single fret",
  );

  t.equal(AString.valueOf(), JSON.stringify(AString));
  t.equal(AString.toString(), JSON.stringify(AString));

  void t.test("setTuningNote", (t) => {
    const testString = new TunedString(
      "x",
      new Note("x", NotePitch.Neither),
      "catgut",
      0.2,
    );

    t.equal(testString.tuningNote.id, "x");

    testString.setTuningNote(new Note("y", NotePitch.Neither));

    t.equal(testString.tuningNote.id, "y");

    t.end();
  });

  t.end();
});
