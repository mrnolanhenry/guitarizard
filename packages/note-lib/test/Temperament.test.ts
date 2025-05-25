import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Constants } from "../src";
import { twelveTET, twelveTETNotes } from "../src/data/temperaments";
import { NotePitch } from "../src/enums/NotePitch";
import { Note } from "../src/Note";

describe("class Temperament", () => {
  const { Ab, A, As, Bb, B, C, Cs, Db, D, Ds, Eb, E, F, Fs, Gb, G, Gs } = twelveTETNotes;

    it('toJSON, valueOf, toString', () => {
      assert.deepEqual(twelveTET.toJSON(), {
        name: Constants.TWELVE_TET,
        notes: [
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
        ]
      });
      assert.equal(twelveTET.valueOf(), JSON.stringify(twelveTET));
      assert.equal(twelveTET.toString(), JSON.stringify(twelveTET));
    });

    it('twelveTET should have 12 notes', () => {
      assert.equal(twelveTET.notes.length, 12, "should have 12 notes");
    });

    it('getNoteFromID', () => {
      assert.deepEqual(
        twelveTET.getNoteFromID(Constants.A_SHARP),
        Bb,
        "pluck note given an id",
      );
    });

    it('getSemitonesBetweenNotes', () => {
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
    });

    it('getNextNote', () => {
      assert.deepEqual(twelveTET.getNextNote(A), Bb, "next note simple step");

      assert.deepEqual(twelveTET.getNextNote(Gs), A, "next note loop");
    
      assert.deepEqual(
        twelveTET.getNextNote(Ab),
        A,
        "next note loop (different note, matching alias)",
      );
    
      assert.deepEqual(twelveTET.getNextNote(A, 2), B, "two semitones away");
    
      assert.deepEqual(twelveTET.getNextNote(A, -1), Ab, "backward steps!");
    
      assert.deepEqual(twelveTET.getNextNote(A, -12), A, "backward steps to get to same note!");
    
    });

    it('getNotesInTemperament', () => {
      assert.deepEqual(
        twelveTET.getNotesInTemperament(),
        [A, As, Bb, B, C, Cs, Db, D, Ds, Eb, E, F, Fs, Gb, G, Gs, Ab],
        "should list all key notes",
      );
    });

    it('getShiftedNotes', () => {
      assert.deepEqual(twelveTET.getShiftedNotes(Eb), [
        Eb,
        E,
        F,
        Gb,
        G,
        Ab,
        A,
        Bb,
        B,
        C,
        Db,
        D
      ]);
    });

    it('getShiftedNotes: throws correct error when given invalid note', () => {
      assert.equal(
        (() => {
          try {
            twelveTET.getShiftedNotes(new Note("invalid-note", NotePitch.Flat));
          } catch (error) {
            return (
              `${error}` ===
              `Error: Note 'invalid-note' does not exist in Temperament '${Constants.TWELVE_TET}'`
            );
          }
          return false;
        })(),
        true,
        "should throw with correct message",
      );
    });
});
