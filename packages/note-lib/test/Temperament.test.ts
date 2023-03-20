import tap from "tap";
import { NotePitch } from "../src/enums/NotePitch";
import { Note } from "../src/Note";
import { Temperament } from "../src/Temperament";

tap.test("class Temperament", function (t) {
  const A = new Note("A", NotePitch.Neither);

  const As = new Note("A#", NotePitch.Sharp);
  const Bb = new Note("Bb", NotePitch.Flat, [As]);
  As.addAliasNote(Bb);

  const B = new Note("B", NotePitch.Neither);

  const C = new Note("C", NotePitch.Neither);

  const Cs = new Note("C#", NotePitch.Sharp);
  const Db = new Note("Db", NotePitch.Flat, [Cs]);
  Cs.addAliasNote(Db);

  const D = new Note("D", NotePitch.Neither);

  const Ds = new Note("D#", NotePitch.Sharp);
  const Eb = new Note("Eb", NotePitch.Flat, [Ds]);
  Ds.addAliasNote(Eb);

  const E = new Note("E", NotePitch.Neither);

  const F = new Note("F", NotePitch.Neither);

  const Fs = new Note("F#", NotePitch.Sharp);
  const Gb = new Note("Gb", NotePitch.Flat, [Fs]);
  Fs.addAliasNote(Gb);

  const G = new Note("G", NotePitch.Neither);

  const Gs = new Note("G#", NotePitch.Sharp);
  const Ab = new Note("Ab", NotePitch.Flat, [Gs]);
  Gs.addAliasNote(Ab);

  const twelveTET = new Temperament("twelveTET", [
    A,
    Bb,
    B,
    C,
    Db,
    D,
    Eb,
    E,
    F,
    Gb,
    G,
    Ab,
  ]);

  t.equal(twelveTET.notes.length, 12, "should have 12 notes");

  t.same(twelveTET.getNoteFromID("A#"), Bb, "pluck note given an id");

  t.equal(twelveTET.getNoteInterval(A, C), 3, "correct offset (basic)");

  t.equal(twelveTET.getNoteInterval(G, A), 2, 'correct offset ("loop")');

  t.equal(
    twelveTET.getNoteInterval(As, A),
    11,
    'correct offset ("loop starting from sharp note")'
  );

  t.equal(
    twelveTET.getNoteInterval(Bb, A),
    11,
    'correct offset ("loop starting from flat note")'
  );

  t.same(twelveTET.getNextNote(A), Bb, "next note simple step");

  t.same(twelveTET.getNextNote(Gs), A, "next note loop");

  t.same(
    twelveTET.getNextNote(Ab),
    A,
    "next note loop (different note, matching alias)"
  );

  t.same(twelveTET.getNextNote(A, 2), B, "two steps away");

  t.same(twelveTET.getNextNote(A, -1), Ab, "backward steps!");

  t.same(twelveTET.getNextNote(A, -12), A, "backward steps!");

  t.equal(twelveTET.valueOf(), JSON.stringify(twelveTET));
  t.equal(twelveTET.toString(), JSON.stringify(twelveTET));

  t.same(
    twelveTET.getKeyNotes(),
    [A, As, Bb, B, C, Cs, Db, D, Ds, Eb, E, F, Fs, Gb, G, Gs, Ab],
    "should list all key notes"
  );

  t.equal(
    (() => {
      try {
        twelveTET.getShiftedNotes(new Note("invalid-note",NotePitch.Flat));
      } catch (error) {
        return (
          // `${error}` === "fromNote 'invalid-note' does not exist in temperament"
          `${error}` === `The given noteID: invalid-note is NOT valid in this temperament`
        );
      }

      return false;
    })(),
    true,
    "should throw with correct message"
  );

  t.end();
});
