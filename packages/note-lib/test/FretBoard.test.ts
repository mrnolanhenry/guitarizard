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
import { Chord, ChordType, Constants, Interval } from "../src";

describe("class Fretboard", () => {
  const { Ab, A, As, Bb, B, C, Cs, Db, D, Ds, Eb, E, F, Fs, Gb, G } = twelveTETNotes;
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

  const majorChordType = new ChordType("maj", twelveTET, [twelveTETP1, twelveTETM3, twelveTETP5], [Constants.MAJOR.toLocaleLowerCase()]);
  const minorChordType = new ChordType("m", twelveTET, [twelveTETP1, twelveTETm3, twelveTETP5], [Constants.MINOR.toLocaleLowerCase()]);

  const FsMajorChord = new Chord(Fs,majorChordType);
  const FsMinorChord = new Chord(Fs, minorChordType);

  const GbMajorChord = new Chord(Gb,majorChordType);
  const GbMinorChord = new Chord(Gb, minorChordType);

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

  it('getNotesInKeyOrChord(Key)', () => {
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

  
    assert.deepEqual(
      stubbyBoard.getNotesInKeyOrChord(new Key(A, chromatic)),
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
      stubbyBoard.getNotesInKeyOrChord(new Key(A, chromatic)),
      stubbyBoard.getNotesInKeyOrChord(new Key(B,chromatic)),
      "chromatic scale does not change based on key",
    );
  
    assert.deepEqual(
      stubbyBoard.getNotesInKeyOrChord(new Key(A, chromatic)),
      stubbyBoard.getNotes(),
      "chromatic scale is the same as `getNotes()`",
    );
  
    const blues = new Scale("blues", twelveTET, [twelveTETP1, twelveTETm3, twelveTETP4, twelveTETd5, twelveTETP5, twelveTETm7, twelveTETP8]);
  
    assert.deepEqual(
      stubbyBoard.getNotesInKeyOrChord(new Key(A, blues)),
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
      stubbyBoard.getNotesInKeyOrChord(new Key(Fs, blues)),
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

  it('getNotesInKeyOrChord(Chord)', () => {
    const courses = [
      new Course("0", [new TunedString("0", E, "metal", 0.254)]),
      new Course("1", [new TunedString("1", A, "metal", 0.3302)]),
      new Course("2", [new TunedString("2", D, "metal", 0.4)]),
    ];

    const threeCourseFretSpan: IFretSpan[] = [
      { fret: { start: 0, end: 5 } },
      { fret: { start: 0, end: 5 } },
      { fret: { start: 0, end: 5 } },
    ];
  
    const stubbyBoard = new FretBoard(twelveTET, courses, threeCourseFretSpan);
  
    assert.deepEqual(
      stubbyBoard.getNotesInKeyOrChord(FsMajorChord),
      [
        {
          course: courses[0],
          config: threeCourseFretSpan[0],
          notes: [
            { value: Fs, fretNumber: 2 },
          ],
        },
        {
          course: courses[1],
          config: threeCourseFretSpan[1],
          notes: [
            { value: As, fretNumber: 1 },
            { value: Cs, fretNumber: 4 },
          ],
        },
        {
          course: courses[2],
          config: threeCourseFretSpan[2],
          notes: [
            { value: Fs, fretNumber: 4 },
          ],
        },
      ],
    );
  
    assert.deepEqual(
      stubbyBoard.getNotesInKeyOrChord(FsMinorChord),
      [
        {
          course: courses[0],
          config: threeCourseFretSpan[0],
          notes: [
            { value: Fs, fretNumber: 2 },
            { value: A, fretNumber: 5 },
          ],
        },
        {
          course: courses[1],
          config: threeCourseFretSpan[1],
          notes: [
            { value: A, fretNumber: 0 },
            { value: Cs, fretNumber: 4 },
          ],
        },
        {
          course: courses[2],
          config: threeCourseFretSpan[2],
          notes: [
            { value: Fs, fretNumber: 4 },
          ],
        },
      ],
    );
  
    assert.deepEqual(
      stubbyBoard.getNotesInKeyOrChord(GbMajorChord),
      [
        {
          course: courses[0],
          config: threeCourseFretSpan[0],
          notes: [
            { value: Gb, fretNumber: 2 },
          ],
        },
        {
          course: courses[1],
          config: threeCourseFretSpan[1],
          notes: [
            { value: Bb, fretNumber: 1 },
            { value: Db, fretNumber: 4 },
          ],
        },
        {
          course: courses[2],
          config: threeCourseFretSpan[2],
          notes: [
            { value: Gb, fretNumber: 4 },
          ],
        },
      ],
    );
    assert.deepEqual(
      stubbyBoard.getNotesInKeyOrChord(GbMinorChord),
      [
        {
          course: courses[0],
          config: threeCourseFretSpan[0],
          notes: [
            { value: Gb, fretNumber: 2 },
            { value: A, fretNumber: 5 },
          ],
        },
        {
          course: courses[1],
          config: threeCourseFretSpan[1],
          notes: [
            { value: A, fretNumber: 0 },
            { value: Db, fretNumber: 4 },
          ],
        },
        {
          course: courses[2],
          config: threeCourseFretSpan[2],
          notes: [
            { value: Gb, fretNumber: 4 },
          ],
        },
      ],
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
