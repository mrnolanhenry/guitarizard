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

const A = twelveTET.getNoteFromID("A");
const As = twelveTET.getNoteFromID("As");
const Bb = twelveTET.getNoteFromID("Bb");
const B = twelveTET.getNoteFromID("B");
const C = twelveTET.getNoteFromID("C");
const Cs = twelveTET.getNoteFromID("C#");
const D = twelveTET.getNoteFromID("D");
const Eb = twelveTET.getNoteFromID("Eb");
const E = twelveTET.getNoteFromID("E");
const F = twelveTET.getNoteFromID("F");
const Fs = twelveTET.getNoteFromID("F#");
const Gb = twelveTET.getNoteFromID("Gb");
const G = twelveTET.getNoteFromID("G");
const Ab = twelveTET.getNoteFromID("Ab");

tap.test("class FretBoard --- init", function (t) {
  const system = new Temperament("test", [new Note("X", NotePitch.Neither), new Note("Y", NotePitch.Neither)]);

  const courses = [
    new Course("X", [new TunedString("X", new Note("X", NotePitch.Neither), "metal", 0.25)]),
    new Course("Y", [new TunedString("Y", new Note("Y", NotePitch.Neither), "metal", 0.33)]),
  ];

  const stringConfig = [
    {
      fret: { start: 0, end: 2 },
    },
    {
      fret: { start: 1, end: 2 },
    },
  ];

  const fretBoard = new FretBoard(system, courses, stringConfig);

  t.same(fretBoard.getNotes(), [
    {
      course: courses[0],
      config: stringConfig[0],
      notes: [
        { value: new Note("X", NotePitch.Neither), fretNumber: 0 },
        { value: new Note("Y", NotePitch.Neither), fretNumber: 1 },
        { value: new Note("X", NotePitch.Neither), fretNumber: 2 },
      ],
    },
    {
      course: courses[1],
      config: stringConfig[1],
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

  const stringConfig = [
    { fret: { start: 0, end: 5 } },
    { fret: { start: 0, end: 5 } },
  ];

  const stubbyBoard = new FretBoard(twelveTET, courses, stringConfig);

  const chromatic = new Scale(
    "chromatic",
    twelveTET,
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  );

  t.same(stubbyBoard.getNotesInScale(chromatic, new Note("A", NotePitch.Neither)), [
    {
      course: courses[0],
      config: stringConfig[0],
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
      config: stringConfig[1],
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
    stubbyBoard.getNotesInScale(chromatic, new Note("A")),
    stubbyBoard.getNotesInScale(chromatic, new Note("B")),
    "chromatic scale does not change based on key"
  );

  t.same(
    stubbyBoard.getNotesInScale(chromatic, new Note("A")),
    stubbyBoard.getNotes(),
    "chromatic scale is the same as `getNotes()`"
  );

  const blues = new Scale("blues", twelveTET, [0, 3, 5, 6, 7, 10, 12]);

  t.same(
    stubbyBoard.getNotesInScale(blues, new Note("A")),
    [
      {
        course: courses[0],
        config: stringConfig[0],
        notes: [
          { value: E, fretNumber: 0 },
          { value: G, fretNumber: 3 },
          { value: A, fretNumber: 5 },
        ],
      },
      {
        course: courses[1],
        config: stringConfig[1],
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
    stubbyBoard.getNotesInScale(blues, new Note("F#", { isSharp: true })),
    [
      {
        course: courses[0],
        config: stringConfig[0],
        notes: [
          { value: E, fretNumber: 0 },
          { value: Fs, fretNumber: 2 },
          { value: A, fretNumber: 5 },
        ],
      },
      {
        course: courses[1],
        config: stringConfig[1],
        notes: [
          { value: A, fretNumber: 0 },
          { value: B, fretNumber: 2 },
          { value: C, fretNumber: 3 },
          { value: Cs, fretNumber: 4 },
        ],
      },
    ],
    "blues scale in F# works ok"
  );

  t.end();
});

tap.test("class FretBoard --- toJSON / valueOf / toString", function (t) {
  const courses = [
    new TunedString("0", E, "metal", 0.254),
    new TunedString("1", A, "metal", 0.3302),
  ];

  const stringConfig = [
    { fret: { start: 0, end: 5 } },
    { fret: { start: 0, end: 5 } },
  ];

  const stubbyBoard = new FretBoard(twelveTET, courses, stringConfig);

  t.same(
    stubbyBoard.toJSON(),
    {
      temperament: twelveTET,
      courses,
      stringConfig,
    },
    "correct json format"
  );

  t.same(stubbyBoard.valueOf(), JSON.stringify(stubbyBoard.toJSON()));
  t.same(stubbyBoard.toString(), JSON.stringify(stubbyBoard.toJSON()));

  t.end();
});

tap.test("setStringTuningNote()", (t) => {
  const courses = [
    new TunedString("x", E, "metal", 0.254),
    new TunedString("y", A, "metal", 0.3302),
  ];

  const stringConfig = [
    { fret: { start: 0, end: 5 } },
    { fret: { start: 0, end: 5 } },
  ];

  const stubbyBoard = new FretBoard(twelveTET, courses, stringConfig);

  t.equal(stubbyBoard.courses[0].tuningNote, E);
  t.equal(stubbyBoard.courses[1].tuningNote, A);

  stubbyBoard.setStringTuningNote("x", C);

  t.equal(stubbyBoard.courses[0].tuningNote, C);
  t.equal(stubbyBoard.courses[1].tuningNote, A);

  t.end();
});

tap.test("getFretCount()", (t) => {
  const courses = [
    new TunedString("x", E, "metal", 0.254),
    new TunedString("y", A, "metal", 0.3302),
  ];

  const stringConfig = [
    { fret: { start: 0, end: 5 } },
    { fret: { start: 0, end: 5 } },
  ];

  const stubbyBoard = new FretBoard(twelveTET, courses, stringConfig);

  t.equal(stubbyBoard.getFretCount(), 5);

  t.end();
});
