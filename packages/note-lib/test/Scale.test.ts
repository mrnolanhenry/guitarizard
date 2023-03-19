import tap from "tap";
import { Note } from "../src/Note";
import { Scale } from "../src/Scale";
import {
  twelveTET,
} from "../src/data/temperaments/twelveTET";
import scales from "../src/data/scales";

tap.test("class Scale", function (t) {
  const blues = new Scale("Blues", twelveTET, [0, 3, 5, 6, 7, 10]);
  const A = twelveTET.getNoteFromID("A");
  const Bb = twelveTET.getNoteFromID("Bb");
  const B = twelveTET.getNoteFromID("B");
  const C = twelveTET.getNoteFromID("C");
  const Cs = twelveTET.getNoteFromID("C#");
  const Eb = twelveTET.getNoteFromID("Eb");
  const E = twelveTET.getNoteFromID("E");
  const F = twelveTET.getNoteFromID("F");
  const Fs = twelveTET.getNoteFromID("F#");
  const Ab = twelveTET.getNoteFromID("Ab");

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

  const FsBluesNotes = blues.getNotesInKey(Fs);
  const GbNote = FsBluesNotes[0].aliasNotes;
  console.log(GbNote[0].id);

  const Gb = blues.getNotesInKey(Fs)[0].aliasNotes[0].id;
  console.log(Gb);

  t.equal(blues.valueOf(), JSON.stringify(blues));
  t.equal(blues.toString(), JSON.stringify(blues));

  t.end();
});
