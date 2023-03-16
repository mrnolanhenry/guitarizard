import tap from "tap";
import { Note } from "../src/Note";
import { Temperament } from "../src/Temperament";

tap.test("class Temperament", function (t) {
  const A = new Note("A", { isNatural: true });

  const As = new Note("A#", { isSharp: true });
  const Bb = new Note("Bb", { isFlat: true }, [As]);
  As.addAliasNote(Bb);

  const B = new Note("B", { isNatural: true });

  const C = new Note("C", { isNatural: true });

  const Cs = new Note("C#", { isSharp: true });
  const Db = new Note("Db", { isFlat: true }, [Cs]);
  Cs.addAliasNote(Db);

  const D = new Note("D", { isNatural: true });

  const Ds = new Note("D#", { isSharp: true });
  const Eb = new Note("Eb", { isFlat: true }, [Ds]);
  Ds.addAliasNote(Eb);

  const E = new Note("E", { isNatural: true });

  const F = new Note("F", { isNatural: true });

  const Fs = new Note("F#", { isSharp: true });
  const Gb = new Note("Gb", { isFlat: true }, [Fs]);
  Fs.addAliasNote(Gb);

  const G = new Note("G", { isNatural: true });

  const Gs = new Note("G#", { isSharp: true });
  const Ab = new Note("Ab", { isFlat: true }, [Gs]);
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
        twelveTET.getShiftedNotes(new Note("invalid-note"));
      } catch (error) {
        return (
          `${error}` === "fromNote 'invalid-note' does not exist in temperament"
        );
      }

      return false;
    })(),
    true,
    "should throw with correct message"
  );

  t.end();
});
