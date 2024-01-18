import tap from "tap";
import { Course } from "../src/Course";
import { NoteFretNumberPair } from "../src/NoteFretNumberPair";
import { IFretSpan } from "../src/interfaces/IFretSpan";
import { TunedString } from "../src/TunedString";
import { twelveTET } from "../src/data/temperaments/twelveTET";
import { ScaleOnCourse } from "../src/ScaleOnCourse";
import { notes } from "../src/data/temperaments";

void tap.test("class ScaleOnCourse", function (t) {
	const { A, E } = notes;

	const courses = [
		new Course("x", [new TunedString("x", E, "metal", 0.254), new TunedString("x", E, "metal", 0.254)]),
		new Course("y", [new TunedString("y", A, "metal", 0.3302), new TunedString("y", A, "metal", 0.3302)])
	];

	const fretSpan: IFretSpan[] = [
		{ fret: { start: 0, end: 5 } },
		{ fret: { start: 0, end: 5 } }
	];

	const config1 = fretSpan[0];
	const config2 = fretSpan[1];

	const fretSpan1 = config1.fret.end - config1.fret.start;
	const fretSpan2 = config1.fret.end - config1.fret.start;
	const notesOnCourse1String1 = courses[0].tunedStrings[0].getFrettedNotes(
		twelveTET,
		fretSpan1
	);
	const notesOnCourse1String2 = courses[0].tunedStrings[1].getFrettedNotes(
		twelveTET,
		fretSpan1
	);
	const notesOnCourse2String1 = courses[1].tunedStrings[0].getFrettedNotes(
		twelveTET,
		fretSpan2
	);
	const notesOnCourse2String2 = courses[1].tunedStrings[1].getFrettedNotes(
		twelveTET,
		fretSpan2
	);

	const notes1 = notesOnCourse1String1.map((note, offset) => (
		new NoteFretNumberPair(note, config1.fret.start + offset)
	));
	const notes2 = notesOnCourse1String2.map((note, offset) => (
		new NoteFretNumberPair(note, config1.fret.start + offset)
	));
	const notes3 = notesOnCourse2String1.map((note, offset) => (
		new NoteFretNumberPair(note, config2.fret.start + offset)
	));
	const notes4 = notesOnCourse2String2.map((note, offset) => (
		new NoteFretNumberPair(note, config2.fret.start + offset)
	));

	const scaleOnCourse1String1 = new ScaleOnCourse(courses[0], config1, notes1);
	const scaleOnCourse1String2 = new ScaleOnCourse(courses[0], config1, notes2);
	const scaleOnCourse2String1 = new ScaleOnCourse(courses[0], config2, notes3);
	const scaleOnCourse4String2 = new ScaleOnCourse(courses[0], config2, notes4);

	t.same(scaleOnCourse1String1, scaleOnCourse1String2, "scale is same based on either string in course1");
	t.same(scaleOnCourse2String1, scaleOnCourse4String2, "scale is same based on either string in course2");
	t.notSame(scaleOnCourse1String1, scaleOnCourse2String1, "scale is NOT same from course to course");

	t.equal(scaleOnCourse1String1.valueOf(), JSON.stringify(scaleOnCourse1String1));
	t.equal(scaleOnCourse1String1.toString(), JSON.stringify(scaleOnCourse1String1));

	t.end();
});
