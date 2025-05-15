import test from "node:test";
import assert from "node:assert";
import { twelveTET, twelveTETNotes } from "../src/data/temperaments";
import { Note } from "../src/Note";
import { Key } from "../src/Key";
import { Temperament } from "../src/Temperament";
import { Scale } from "../src/Scale";
import { TunedString } from "../src/TunedString";
import { FretBoard } from "../src/FretBoard";
import { NotePitch } from "../src/enums/NotePitch";
import { Course } from "../src/Course";
import { IFretSpan } from "../src/interfaces/IFretSpan";
import * as lib from "../src";

const { Ab, A, Bb, B, C, Cs, Db, D, E, F, Fs, Gb, G } = twelveTETNotes;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
test("class FretBoard --- init", function (_t) {
  const system = new Temperament("test", [twelveTET.intervals[0], twelveTET.intervals[1]], [
    new Note("X", NotePitch.Natural),
    new Note("Y", NotePitch.Natural),
  ]);

  const courses = [
    new Course("X", [
      new TunedString("X", new Note("X", NotePitch.Natural), "metal", 0.25),
    ]),
    new Course("Y", [
      new TunedString("Y", new Note("Y", NotePitch.Natural), "metal", 0.33),
    ]),
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

  assert.deepEqual(fretBoard.getNotes(), [
    {
      course: courses[0],
      config: fretSpan[0],
      notes: [
        { value: new Note("X", NotePitch.Natural), fretNumber: 0 },
        { value: new Note("Y", NotePitch.Natural), fretNumber: 1 },
        { value: new Note("X", NotePitch.Natural), fretNumber: 2 },
      ],
    },
    {
      course: courses[1],
      config: fretSpan[1],
      notes: [
        { value: new Note("Y", NotePitch.Natural), fretNumber: 1 },
        { value: new Note("X", NotePitch.Natural), fretNumber: 2 },
      ],
    },
  ]);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
test("class FretBoard --- getNotesInKey", function (_t) {
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
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  );

  const noteA = new Note(lib.Constants.A, NotePitch.Natural);
  const noteB = new Note(lib.Constants.B, NotePitch.Natural);
  const noteFs = new Note(lib.Constants.F_SHARP, NotePitch.Sharp)

  assert.deepEqual(
    stubbyBoard.getNotesInKey(new Key(noteA, chromatic)),
    [
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
    ],
  );

  assert.deepEqual(
    stubbyBoard.getNotesInKey(new Key(noteA, chromatic)),
    stubbyBoard.getNotesInKey(new Key(noteB,chromatic)),
    "chromatic scale does not change based on key",
  );

  assert.deepEqual(
    stubbyBoard.getNotesInKey(new Key(noteA, chromatic)),
    stubbyBoard.getNotes(),
    "chromatic scale is the same as `getNotes()`",
  );

  const blues = new Scale("blues", twelveTET, [0, 3, 5, 6, 7, 10, 12]);

  assert.deepEqual(
    stubbyBoard.getNotesInKey(new Key(noteA, blues)),
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
    "blues scale in A works ok",
  );

  assert.deepEqual(
    stubbyBoard.getNotesInKey(new Key(noteFs, blues)),
    [
      {
        config: fretSpan[0],
        course: courses[0],
        notes: [
          { value: E, fretNumber: 0 },
          { value: Fs, fretNumber: 2 },
          { value: A, fretNumber: 5 },
        ],
      },
      {
        config: fretSpan[1],
        course: courses[1],
        notes: [
          { value: A, fretNumber: 0 },
          { value: B, fretNumber: 2 },
          { value: C, fretNumber: 3 },
          { value: Cs, fretNumber: 4 },
        ],
      },
    ],
    "blues scale in F# works ok",
  );
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
test("class FretBoard --- toJSON / valueOf / toString", function (_t) {
  const courses = [
    new Course("0", [new TunedString("0", E, "metal", 0.254)]),
    new Course("1", [new TunedString("1", A, "metal", 0.3302)]),
  ];

  const fretSpan: IFretSpan[] = [
    { fret: { start: 0, end: 5 } },
    { fret: { start: 0, end: 5 } },
  ];

  const stubbyBoard = new FretBoard(twelveTET, courses, fretSpan);

  assert.deepEqual(
    stubbyBoard.toJSON(),
    {
      temperament: twelveTET,
      courses,
      fretSpan,
    },
    "correct json format",
  );

  assert.deepEqual(stubbyBoard.valueOf(), JSON.stringify(stubbyBoard.toJSON()));
  assert.deepEqual(
    stubbyBoard.toString(),
    JSON.stringify(stubbyBoard.toJSON()),
  );
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
test("setCourseTuningNote()", (_t) => {
  const courses = [
    new Course("x", [new TunedString("x", E, "metal", 0.254)]),
    new Course("y", [new TunedString("y", A, "metal", 0.3302)]),
  ];

  const fretSpan: IFretSpan[] = [
    { fret: { start: 0, end: 5 } },
    { fret: { start: 0, end: 5 } },
  ];

  const stubbyBoard = new FretBoard(twelveTET, courses, fretSpan);

  assert.deepEqual(stubbyBoard.courses[0].tunedStrings[0].tuningNote, E);
  assert.deepEqual(stubbyBoard.courses[1].tunedStrings[0].tuningNote, A);

  stubbyBoard.setCourseTuningNote("x", C);

  assert.deepEqual(stubbyBoard.courses[0].tunedStrings[0].tuningNote, C);
  assert.deepEqual(stubbyBoard.courses[1].tunedStrings[0].tuningNote, A);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
test("getFretCount()", (_t) => {
  const courses = [
    new Course("x", [new TunedString("x", E, "metal", 0.254)]),
    new Course("y", [new TunedString("y", A, "metal", 0.3302)]),
  ];

  const fretSpan: IFretSpan[] = [
    { fret: { start: 0, end: 5 } },
    { fret: { start: 0, end: 5 } },
  ];

  const stubbyBoard = new FretBoard(twelveTET, courses, fretSpan);

  assert.deepEqual(stubbyBoard.getFretCount(), 5);
});
