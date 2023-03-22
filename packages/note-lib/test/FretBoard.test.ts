import tap from "tap";
import {
  twelveTET,
} from "../src/data/temperaments/twelveTET";
import { Note } from "../src/Note";
import { Temperament } from "../src/Temperament";
import { Scale } from "../src/Scale";
import { TunedString } from "../src/TunedString";
import { FretBoard } from "../src/FretBoard";
import { NotePitch } from "../src/enums/NotePitch";
import { Course } from "../src/Course";
import { IFretSpan } from "../src/interfaces/IFretSpan";

const A: Note = twelveTET.getNoteFromID("A");
const Bb: Note = twelveTET.getNoteFromID("Bb");
const B: Note = twelveTET.getNoteFromID("B");
const C: Note = twelveTET.getNoteFromID("C");
const Cs: Note = twelveTET.getNoteFromID("C#");
const Db: Note = twelveTET.getNoteFromID("Db");
const D: Note = twelveTET.getNoteFromID("D");
const E: Note = twelveTET.getNoteFromID("E");
const F: Note = twelveTET.getNoteFromID("F");
const Fs: Note = twelveTET.getNoteFromID("F#");
const Gb: Note = twelveTET.getNoteFromID("Gb");
const G: Note = twelveTET.getNoteFromID("G");
const Ab: Note = twelveTET.getNoteFromID("Ab");

tap.test("class FretBoard --- init", function (t) {
  const system = new Temperament("test", [new Note("X", NotePitch.Neither), new Note("Y", NotePitch.Neither)]);

  const courses = [
    new Course("X", [new TunedString("X", new Note("X", NotePitch.Neither), "metal", 0.25)]),
    new Course("Y", [new TunedString("Y", new Note("Y", NotePitch.Neither), "metal", 0.33)]),
  ];

  const fretSpan: IFretSpan[] = [
    {
      fret: { start: 0, end: 2 },
    },
    {
      fret: { start: 1, end: 2 },
    },
  ];

  const fretBoard = new FretBoard(system, courses, fretSpan);

  t.same(fretBoard.getNotes(), [
    {
      course: courses[0],
      config: fretSpan[0],
      notes: [
        { value: new Note("X", NotePitch.Neither), fretNumber: 0 },
        { value: new Note("Y", NotePitch.Neither), fretNumber: 1 },
        { value: new Note("X", NotePitch.Neither), fretNumber: 2 },
      ],
    },
    {
      course: courses[1],
      config: fretSpan[1],
      notes: [
        { value: new Note("Y", NotePitch.Neither), fretNumber: 1 },
        { value: new Note("X", NotePitch.Neither), fretNumber: 2 },
      ],
    },
  ]);

  t.end();
});

tap.test("class FretBoard --- getNotesInScale", function (t) {
  const courses = [
    new Course("0", [new TunedString("0", E, "metal", 0.254)]),
    new Course("1", [new TunedString("1", A, "metal", 0.3302)]),
  ];

  const fretSpan: IFretSpan[] = [
    { fret: { start: 0, end: 5 } },
    { fret: { start: 0, end: 5 } },
  ];

  const stubbyBoard = new FretBoard(twelveTET, courses, fretSpan);

  const chromatic = new Scale(
    "chromatic",
    twelveTET,
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  );

  t.same(stubbyBoard.getNotesInScale(chromatic, new Note("A", NotePitch.Neither)), [
    {
      course: courses[0],
      config: fretSpan[0],
      notes: [
        { value: E, fretNumber: 0 },
        { value: F, fretNumber: 1 },
        { value: Gb, fretNumber: 2 },
        { value: G, fretNumber: 3 },
        { value: Ab, fretNumber: 4 },
        { value: A, fretNumber: 5 },
      ],
    },
    {
      course: courses[1],
      config: fretSpan[1],
      notes: [
        { value: A, fretNumber: 0 },
        { value: Bb, fretNumber: 1 },
        { value: B, fretNumber: 2 },
        { value: C, fretNumber: 3 },
        { value: Db, fretNumber: 4 },
        { value: D, fretNumber: 5 },
      ],
    },
  ]);

  t.same(
    stubbyBoard.getNotesInScale(chromatic, new Note("A", NotePitch.Neither)),
    stubbyBoard.getNotesInScale(chromatic, new Note("B", NotePitch.Neither)),
    "chromatic scale does not change based on key"
  );

  t.same(
    stubbyBoard.getNotesInScale(chromatic, new Note("A", NotePitch.Neither)),
    stubbyBoard.getNotes(),
    "chromatic scale is the same as `getNotes()`"
  );

  const blues = new Scale("blues", twelveTET, [0, 3, 5, 6, 7, 10, 12]);

  t.same(
    stubbyBoard.getNotesInScale(blues, new Note("A", NotePitch.Neither)),
    [
      {
        course: courses[0],
        config: fretSpan[0],
        notes: [
          { value: E, fretNumber: 0 },
          { value: G, fretNumber: 3 },
          { value: A, fretNumber: 5 },
        ],
      },
      {
        course: courses[1],
        config: fretSpan[1],
        notes: [
          { value: A, fretNumber: 0 },
          { value: C, fretNumber: 3 },
          { value: D, fretNumber: 5 },
        ],
      },
    ],
    "blues scale in A works ok"
  );

  t.same(
    stubbyBoard.getNotesInScale(blues, new Note("F#", NotePitch.Sharp)),
    [
      {
        course: courses[0],
        config: fretSpan[0],
        notes: [
          { value: E, fretNumber: 0 },
          { value: Fs.aliasNotes[0], fretNumber: 2 },
          { value: A, fretNumber: 5 },
        ],
      },
      {
        course: courses[1],
        config: fretSpan[1],
        notes: [
          { value: A, fretNumber: 0 },
          { value: B, fretNumber: 2 },
          { value: C, fretNumber: 3 },
          { value: Cs.aliasNotes[0], fretNumber: 4 },
        ],
      },
    ],
    "blues scale in F# works ok"
  );

  t.end();
});

tap.test("class FretBoard --- toJSON / valueOf / toString", function (t) {
  const courses = [
    new Course("0", [new TunedString("0", E, "metal", 0.254)]),
    new Course("1", [new TunedString("1", A, "metal", 0.3302)]),
  ];

  const fretSpan: IFretSpan[] = [
    { fret: { start: 0, end: 5 } },
    { fret: { start: 0, end: 5 } },
  ];

  const stubbyBoard = new FretBoard(twelveTET, courses, fretSpan);

  t.same(
    stubbyBoard.toJSON(),
    {
      temperament: twelveTET,
      courses,
      fretSpan,
    },
    "correct json format"
  );

  t.same(stubbyBoard.valueOf(), JSON.stringify(stubbyBoard.toJSON()));
  t.same(stubbyBoard.toString(), JSON.stringify(stubbyBoard.toJSON()));

  t.end();
});

tap.test("setCourseTuningNote()", (t) => {
  const courses = [
    new Course("x", [new TunedString("x", E, "metal", 0.254)]),
    new Course("y", [new TunedString("y", A, "metal", 0.3302)]),
  ];

  const fretSpan: IFretSpan[] = [
    { fret: { start: 0, end: 5 } },
    { fret: { start: 0, end: 5 } },
  ];

  const stubbyBoard = new FretBoard(twelveTET, courses, fretSpan);

  t.equal(stubbyBoard.courses[0].tunedStrings[0].tuningNote, E);
  t.equal(stubbyBoard.courses[1].tunedStrings[0].tuningNote, A);

  stubbyBoard.setCourseTuningNote("x", C);

  t.equal(stubbyBoard.courses[0].tunedStrings[0].tuningNote, C);
  t.equal(stubbyBoard.courses[1].tunedStrings[0].tuningNote, A);

  t.end();
});

tap.test("getFretCount()", (t) => {
  const courses = [
    new Course("x", [new TunedString("x", E, "metal", 0.254)]),
    new Course("y", [new TunedString("y", A, "metal", 0.3302)]),
  ];

  const fretSpan: IFretSpan[] = [
    { fret: { start: 0, end: 5 } },
    { fret: { start: 0, end: 5 } },
  ];

  const stubbyBoard = new FretBoard(twelveTET, courses, fretSpan);

  t.equal(stubbyBoard.getFretCount(), 5);

  t.end();
});
