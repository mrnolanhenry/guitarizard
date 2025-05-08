import test from "node:test";
import assert from "node:assert/strict";

import { Constants } from "../src";
import { twelveTET, twelveTETNotesAll } from "../src/data/temperaments";
import { NotePitch } from "../src/enums/NotePitch";
import { Note } from "../src/Note";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
test("class Temperament", function (_t) {
  const { Ab, A, As, Bb, B, C, Cs, Db, D, Ds, Eb, E, F, Fs, Gb, G, Gs } = twelveTETNotesAll;

  assert.equal(twelveTET.notes.length, 12, "should have 12 notes");

  assert.deepEqual(
    twelveTET.getNoteFromID(Constants.A_SHARP),
    Bb,
    "pluck note given an id",
  );

  assert.equal(twelveTET.getSemitonesBetweenNotes(A, C), 3, "correct offset (basic)");

  assert.equal(twelveTET.getSemitonesBetweenNotes(G, A), 2, 'correct offset ("loop")');

  assert.equal(
    twelveTET.getSemitonesBetweenNotes(As, A),
    11,
    'correct offset ("loop starting from sharp note")',
  );

  assert.equal(
    twelveTET.getSemitonesBetweenNotes(Bb, A),
    11,
    'correct offset ("loop starting from flat note")',
  );

  assert.deepEqual(twelveTET.getNextNote(A), Bb, "next note simple step");

  assert.deepEqual(twelveTET.getNextNote(Gs), A, "next note loop");

  assert.deepEqual(
    twelveTET.getNextNote(Ab),
    A,
    "next note loop (different note, matching alias)",
  );

  assert.deepEqual(twelveTET.getNextNote(A, 2), B, "two steps away");

  assert.deepEqual(twelveTET.getNextNote(A, -1), Ab, "backward steps!");

  assert.deepEqual(twelveTET.getNextNote(A, -12), A, "backward steps!");

  assert.equal(twelveTET.valueOf(), JSON.stringify(twelveTET));
  assert.equal(twelveTET.toString(), JSON.stringify(twelveTET));

  assert.deepEqual(
    twelveTET.getNotesInTemperament(),
    [A, As, Bb, B, C, Cs, Db, D, Ds, Eb, E, F, Fs, Gb, G, Gs, Ab],
    "should list all key notes",
  );

  assert.equal(
    (() => {
      try {
        twelveTET.getShiftedNotes(new Note("invalid-note", NotePitch.Flat));
      } catch (error) {
        return (
          `${error}` ===
          "Error: fromNote 'invalid-note' does not exist in temperament"
        );
      }

      return false;
    })(),
    true,
    "should throw with correct message",
  );
});
