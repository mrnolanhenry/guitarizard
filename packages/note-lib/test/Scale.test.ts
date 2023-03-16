import tap from "tap";
import { Note } from "../src/Note";
import { Scale } from "../src/Scale";
import {
  twelveTET,
  notes as twelveTET_notes,
} from "../src/data/temperaments/twelveTET";
import scales from "../src/data/scales";

tap.test("class Scale", function (t) {
  const blues = new Scale("Blues", twelveTET, [0, 3, 5, 6, 7, 10]);

  const ethiopianAraray = new Scale(
    "ethiopian (a raray)",
    twelveTET,
    [0, 2, 4, 5, 7, 9, 11, 12]
  );
  const ionian = new Scale("ionian", twelveTET, [0, 2, 4, 5, 7, 9, 11, 12]);
  const major = new Scale("major", twelveTET, [0, 2, 4, 5, 7, 9, 11, 12]);

  t.equal(blues.name, "Blues");

  t.same(blues.getNotesInKey(new Note("F")), [
    twelveTET_notes.F,
    twelveTET_notes.Ab,
    twelveTET_notes.Bb,
    twelveTET_notes.B,
    twelveTET_notes.C,
    twelveTET_notes.Eb,
  ]);

  t.same(blues.getNotesInKey(twelveTET_notes.Fs), [
    twelveTET_notes.Fs,
    twelveTET_notes.A,
    twelveTET_notes.B,
    twelveTET_notes.C,
    twelveTET_notes.Cs,
    twelveTET_notes.E,
  ]);

  t.same(
    ionian.getEquivScales(scales),
    [ethiopianAraray, ionian, major],
    "equivalent Scales found"
  );

  const FsBluesNotes = blues.getNotesInKey(twelveTET_notes.Fs);
  const GbNote = FsBluesNotes[0].aliasNotes;
  console.log(GbNote[0].id);

  const Gb = blues.getNotesInKey(twelveTET_notes.Fs)[0].aliasNotes[0].id;
  console.log(Gb);

  t.equal(blues.valueOf(), JSON.stringify(blues));
  t.equal(blues.toString(), JSON.stringify(blues));

  t.end();
});
