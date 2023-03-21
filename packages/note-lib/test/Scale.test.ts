import tap from "tap";
import { Note } from "../src/Note";
import { Scale } from "../src/Scale";
import {
  twelveTET,
} from "../src/data/temperaments/twelveTET";
import scales from "../src/data/scales";

tap.test("class Scale", function (t) {
  const blues = new Scale("Blues", twelveTET, [0, 3, 5, 6, 7, 10]);
  const A: Note = twelveTET.getNoteFromID("A");
  const Bb: Note = twelveTET.getNoteFromID("Bb");
  const B: Note = twelveTET.getNoteFromID("B");
  const C: Note = twelveTET.getNoteFromID("C");
  const Cs: Note = twelveTET.getNoteFromID("C#");
  const Eb: Note = twelveTET.getNoteFromID("Eb");
  const E: Note = twelveTET.getNoteFromID("E");
  const F: Note = twelveTET.getNoteFromID("F");
  const Fs: Note = twelveTET.getNoteFromID("F#");
  const Ab: Note = twelveTET.getNoteFromID("Ab");

  const ethiopianAraray = new Scale(
    "ethiopian (a raray)",
    twelveTET,
    [0, 2, 4, 5, 7, 9, 11, 12]
  );
  const ionian = new Scale("ionian", twelveTET, [0, 2, 4, 5, 7, 9, 11, 12]);
  const major = new Scale("major", twelveTET, [0, 2, 4, 5, 7, 9, 11, 12]);

  t.equal(blues.name, "Blues");

  t.same(blues.getNotesInKey(F), [
    F,
    Ab,
    Bb,
    B,
    C,
    Eb,
  ]);

  t.same(blues.getNotesInKey(Fs), [
    Fs,
    A,
    B,
    C,
    Cs,
    E,
  ]);

  t.same(
    ionian.getEquivScales(scales),
    [ethiopianAraray, ionian, major],
    "equivalent Scales found"
  );

  t.equal(blues.valueOf(), JSON.stringify(blues));
  t.equal(blues.toString(), JSON.stringify(blues));

  t.end();
});
