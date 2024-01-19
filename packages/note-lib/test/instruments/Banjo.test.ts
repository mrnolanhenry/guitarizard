import tap from "tap";
import { Note } from "../../src";
import { twelveTET } from "../../src/data/temperaments/twelveTET";
import { Banjo } from "../../src/instruments/Banjo";
import { Tuning } from "../../src/Tuning";

const A: Note = twelveTET.getNoteFromID("A");
const B: Note = twelveTET.getNoteFromID("B");
const C: Note = twelveTET.getNoteFromID("C");
const D: Note = twelveTET.getNoteFromID("D");
const E: Note = twelveTET.getNoteFromID("E");
const Fs: Note = twelveTET.getNoteFromID("F#");
const G: Note = twelveTET.getNoteFromID("G");

void tap.test("class Banjo -- init", function (t) {
	const defaultBanjo = new Banjo(21, [
		G,
		D,
		G,
		B,
		D
	]);

	t.ok(defaultBanjo);

	t.same(defaultBanjo.getCommonTunings(), [
		new Tuning("banjo", "standard", [G, D, G, B, D]),
		new Tuning("banjo", "double C", [G, C, G, C, D]),
		new Tuning("banjo", "drop C", [G, C, G, B, D]),
		new Tuning("banjo", "D", [Fs, D, Fs, A, D]),
		new Tuning("banjo", "G modal", [G, D, G, C, D]),
		new Tuning("banjo", "guitar", [G, D, G, B, E])
	], "common tunings found");

	t.same(defaultBanjo.getStandardTuning(), new Tuning("banjo", "standard", [G, D, G, B, D])
		, "standard tuning found");

	t.equal(defaultBanjo.fretBoard.courses.length, 5, "5 string has 5 courses");
	t.equal(
		defaultBanjo.fretBoard.courses.every(course => course.tunedStrings.length === 1),
		true,
		"5 string has all single strings"
	);

	t.end();
});
