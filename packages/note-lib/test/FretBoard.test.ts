import { describe, it } from "node:test";
import assert from "node:assert";
import { twelveTET, twelveTETIntervals, twelveTETNotes } from "../src/data/temperaments";
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

describe("class Fretboard", () => {
  const { Ab, A, Bb, B, C, Cs, Db, D, E, F, Fs, Gb, G } = twelveTETNotes;
  const {   
    twelveTETP1,
    twelveTETm2,
    twelveTETM2,
    twelveTETm3,
    twelveTETM3,
    twelveTETP4,
    twelveTETd5,
    twelveTETP5,
    twelveTETm6,
    twelveTETM6,
    twelveTETm7,
    twelveTETM7,
    twelveTETP8,  
  } = twelveTETIntervals;

  const noteX = new Note("X", NotePitch.Natural);
  const noteY = new Note("Y", NotePitch.Natural);

  const twoTETsystem = new Temperament("test", [twelveTET.intervals[0], twelveTET.intervals[1]], [noteX, noteY]);

  const courses = [
    new Course("X", [
      new TunedString("X", noteX, "metal", 0.25),
    ]),
    new Course("Y", [
      new TunedString("Y", noteY, "metal", 0.33),
    ]),
  ];

  const shortFretSpan: IFretSpan[] = [
    { fret: { start: 0, end: 2 } },
    { fret: { start: 1, end: 2 } },
  ];

  const fretBoard = new FretBoard(twoTETsystem, courses, shortFretSpan);

  const stubbyCourses = [
    new Course("x", [new TunedString("x", E, "metal", 0.254)]),
    new Course("y", [new TunedString("y", A, "metal", 0.3302)]),
  ];

  const stubbyFretSpan: IFretSpan[] = [
    { fret: { start: 0, end: 5 } },
    { fret: { start: 0, end: 5 } },
  ];

  const stubbyBoard = new FretBoard(twelveTET, stubbyCourses, stubbyFretSpan);

  it('toJSON, valueOf, toString', () => {
    assert.deepEqual(
      fretBoard.toJSON(),
      {
        temperament: twoTETsystem,
        courses,
        fretSpan: shortFretSpan,
      },
      "correct json format",
    );
  
    assert.deepEqual(fretBoard.valueOf(), JSON.stringify(fretBoard.toJSON()));
    assert.deepEqual(
      fretBoard.toString(),
      JSON.stringify(fretBoard.toJSON()),
    );
  });

  it('getNotes', () => {
    assert.deepEqual(fretBoard.getNotes(), [
      {
        course: courses[0],
        config: shortFretSpan[0],
        notes: [
          { value: noteX, fretNumber: 0 },
          { value: noteY, fretNumber: 1 },
          { value: noteX, fretNumber: 2 },
        ],
      },
      {
        course: courses[1],
        config: shortFretSpan[1],
        notes: [
          { value: noteY, fretNumber: 1 },
          { value: noteX, fretNumber: 2 },
        ],
      },
    ]);
  });

  it('getNotesInKey', () => {
    const courses = [
      new Course("0", [new TunedString("0", E, "metal", 0.254)]),
      new Course("1", [new TunedString("1", A, "metal", 0.3302)]),
    ];
  
    const stubbyBoard = new FretBoard(twelveTET, courses, stubbyFretSpan);
  
    const chromatic = new Scale(
      "chromatic",
      twelveTET,
      [twelveTETP1, twelveTETm2, twelveTETM2, twelveTETm3, twelveTETM3, twelveTETP4, twelveTETd5, twelveTETP5, twelveTETm6, twelveTETM6, twelveTETm7, twelveTETM7, twelveTETP8],
    );
  
    const noteA = new Note(lib.Constants.A, NotePitch.Natural);
    const noteB = new Note(lib.Constants.B, NotePitch.Natural);
    const noteFs = new Note(lib.Constants.F_SHARP, NotePitch.Sharp)
  
    assert.deepEqual(
      stubbyBoard.getNotesInKey(new Key(noteA, chromatic)),
      [
        {
          course: courses[0],
          config: stubbyFretSpan[0],
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
          config: stubbyFretSpan[1],
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
  
    const blues = new Scale("blues", twelveTET, [twelveTETP1, twelveTETm3, twelveTETP4, twelveTETd5, twelveTETP5, twelveTETm7, twelveTETP8]);
  
    assert.deepEqual(
      stubbyBoard.getNotesInKey(new Key(noteA, blues)),
      [
        {
          course: courses[0],
          config: stubbyFretSpan[0],
          notes: [
            { value: E, fretNumber: 0 },
            { value: G, fretNumber: 3 },
            { value: A, fretNumber: 5 },
          ],
        },
        {
          course: courses[1],
          config: stubbyFretSpan[1],
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
          config: stubbyFretSpan[0],
          course: courses[0],
          notes: [
            { value: E, fretNumber: 0 },
            { value: Fs, fretNumber: 2 },
            { value: A, fretNumber: 5 },
          ],
        },
        {
          config: stubbyFretSpan[1],
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

  it('getFretCount', () => {
    assert.deepEqual(stubbyBoard.getFretCount(), 5);
  });

  it('setCourseTuningNote', () => {
    assert.deepEqual(stubbyBoard.courses[0].tunedStrings[0].tuningNote, E);
    assert.deepEqual(stubbyBoard.courses[1].tunedStrings[0].tuningNote, A);
  
    stubbyBoard.setCourseTuningNote("x", C);
  
    assert.deepEqual(stubbyBoard.courses[0].tunedStrings[0].tuningNote, C);
    assert.deepEqual(stubbyBoard.courses[1].tunedStrings[0].tuningNote, A);
  });
});
