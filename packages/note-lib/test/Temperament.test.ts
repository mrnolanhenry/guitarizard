import tap from "tap";
import * as Constants from "../src";
import { notes } from "../src/data/temperaments";
import { twelveTET } from "../src/data/temperaments/twelveTET";
import { NotePitch } from "../src/enums/NotePitch";
import { Note } from "../src/Note";

void tap.test("class Temperament", function (t) {
	const { Ab, A, As, Bb, B, C, Cs, Db, D, Ds, Eb, E, F, Fs, Gb, G, Gs } = notes;

	t.equal(twelveTET.notes.length, 12, "should have 12 notes");

	t.same(twelveTET.getNoteFromID(Constants.A_SHARP), Bb, "pluck note given an id");

	t.equal(twelveTET.getNoteInterval(A, C), 3, "correct offset (basic)");

	t.equal(twelveTET.getNoteInterval(G, A), 2, "correct offset (\"loop\")");

	t.equal(
		twelveTET.getNoteInterval(As, A),
		11,
		"correct offset (\"loop starting from sharp note\")"
	);

	t.equal(
		twelveTET.getNoteInterval(Bb, A),
		11,
		"correct offset (\"loop starting from flat note\")"
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
		twelveTET.getNotesInTemperament(),
		[A, As, Bb, B, C, Cs, Db, D, Ds, Eb, E, F, Fs, Gb, G, Gs, Ab],
		"should list all key notes"
	);

	t.equal(
		(() => {
			try {
				twelveTET.getShiftedNotes(new Note("invalid-note", NotePitch.Flat));
			}
			catch (error) {
				return (
					`${error}` === "The given noteID: invalid-note is NOT valid in this temperament"
				);
			}

			return false;
		})(),
		true,
		"should throw with correct message"
	);

	t.end();
});
