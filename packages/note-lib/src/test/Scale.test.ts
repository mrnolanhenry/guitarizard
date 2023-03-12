import tap from "tap";
import { Note } from "../Note";
import { Scale } from "../Scale";
import {
  diatonic,
  notes as diatonic_notes,
} from "../data/scaleSystem/diatonic";
import scales from "../data/scales";

tap.test("class Scale", function (t) {
  const blues = new Scale("Blues", diatonic, [0, 3, 5, 6, 7, 10]);

  const ethiopianAraray = new Scale("ethiopian (a raray)", diatonic, [
    0,
    2,
    4,
    5,
    7,
    9,
    11,
    12,
  ]);
  const ionian = new Scale("ionian", diatonic, [0, 2, 4, 5, 7, 9, 11, 12]);
  const major = new Scale("major", diatonic, [0, 2, 4, 5, 7, 9, 11, 12]);

  t.equal(blues.name, "Blues");

  t.same(blues.getNotesInKey(new Note("F")), [
    diatonic_notes.F,
    diatonic_notes.Ab,
    diatonic_notes.Bb,
    diatonic_notes.B,
    diatonic_notes.C,
    diatonic_notes.Eb,
  ]);

  t.same(blues.getNotesInKey(diatonic_notes.Fs), [
    diatonic_notes.Fs,
    diatonic_notes.A,
    diatonic_notes.B,
    diatonic_notes.C,
    diatonic_notes.Cs,
    diatonic_notes.E,
  ]);

  t.same(
    ionian.getEquivScales(scales),
    [ethiopianAraray, ionian, major],
    "equivalent Scales found"
  );

  const FsBluesNotes = blues.getNotesInKey(diatonic_notes.Fs);
  const GbNote = FsBluesNotes[0].aliasNotes;
  console.log(GbNote[0].id);

  const Gb = blues.getNotesInKey(diatonic_notes.Fs)[0].aliasNotes[0].id;
  console.log(Gb);

  t.equal(blues.valueOf(), JSON.stringify(blues));
  t.equal(blues.toString(), JSON.stringify(blues));

  t.end();
});
