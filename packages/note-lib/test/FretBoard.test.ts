import tap from "tap";
import {
  twelveTET,
  notes as twelveTET_notes,
} from "../src/data/temperaments/twelveTET";
import { Note } from "../src/Note";
import { Temperament } from "../src/Temperament";
import { Scale } from "../src/Scale";
import { TunedString } from "../src/TunedString";
import { FretBoard } from "../src/FretBoard";

tap.test("class FretBoard --- init", function (t) {
  const system = new Temperament("test", [new Note("X"), new Note("Y")]);

  const tunedStrings = [
    new TunedString("X", new Note("X"), "metal", 0.25),
    new TunedString("X", new Note("Y"), "metal", 0.33),
  ];

  const stringConfig = [
    {
      fret: { start: 0, end: 2 },
    },
    {
      fret: { start: 1, end: 2 },
    },
  ];

  const fretBoard = new FretBoard(system, tunedStrings, stringConfig);

  t.same(fretBoard.getNotes(), [
    {
      tunedString: tunedStrings[0],
      config: stringConfig[0],
      notes: [
        { value: new Note("X"), fretNumber: 0 },
        { value: new Note("Y"), fretNumber: 1 },
        { value: new Note("X"), fretNumber: 2 },
      ],
    },
    {
      tunedString: tunedStrings[1],
      config: stringConfig[1],
      notes: [
        { value: new Note("Y"), fretNumber: 1 },
        { value: new Note("X"), fretNumber: 2 },
      ],
    },
  ]);

  t.end();
});

tap.test("class FretBoard --- getNotesInScale", function (t) {
  const tunedStrings = [
    new TunedString("0", twelveTET_notes.E, "metal", 0.254),
    new TunedString("1", twelveTET_notes.A, "metal", 0.3302),
  ];

  const stringConfig = [
    { fret: { start: 0, end: 5 } },
    { fret: { start: 0, end: 5 } },
  ];

  const stubbyBoard = new FretBoard(twelveTET, tunedStrings, stringConfig);

  const chromatic = new Scale(
    "chromatic",
    twelveTET,
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  );

  t.same(stubbyBoard.getNotesInScale(chromatic, new Note("A")), [
    {
      tunedString: tunedStrings[0],
      config: stringConfig[0],
      notes: [
        { value: twelveTET_notes.E, fretNumber: 0 },
        { value: twelveTET_notes.F, fretNumber: 1 },
        { value: twelveTET_notes.Gb, fretNumber: 2 },
        { value: twelveTET_notes.G, fretNumber: 3 },
        { value: twelveTET_notes.Ab, fretNumber: 4 },
        { value: twelveTET_notes.A, fretNumber: 5 },
      ],
    },
    {
      tunedString: tunedStrings[1],
      config: stringConfig[1],
      notes: [
        { value: twelveTET_notes.A, fretNumber: 0 },
        { value: twelveTET_notes.Bb, fretNumber: 1 },
        { value: twelveTET_notes.B, fretNumber: 2 },
        { value: twelveTET_notes.C, fretNumber: 3 },
        { value: twelveTET_notes.Db, fretNumber: 4 },
        { value: twelveTET_notes.D, fretNumber: 5 },
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
        tunedString: tunedStrings[0],
        config: stringConfig[0],
        notes: [
          { value: twelveTET_notes.E, fretNumber: 0 },
          { value: twelveTET_notes.G, fretNumber: 3 },
          { value: twelveTET_notes.A, fretNumber: 5 },
        ],
      },
      {
        tunedString: tunedStrings[1],
        config: stringConfig[1],
        notes: [
          { value: twelveTET_notes.A, fretNumber: 0 },
          { value: twelveTET_notes.C, fretNumber: 3 },
          { value: twelveTET_notes.D, fretNumber: 5 },
        ],
      },
    ],
    "blues scale in A works ok"
  );

  t.same(
    stubbyBoard.getNotesInScale(blues, new Note("F#", { isSharp: true })),
    [
      {
        tunedString: tunedStrings[0],
        config: stringConfig[0],
        notes: [
          { value: twelveTET_notes.E, fretNumber: 0 },
          { value: twelveTET_notes.Fs, fretNumber: 2 },
          { value: twelveTET_notes.A, fretNumber: 5 },
        ],
      },
      {
        tunedString: tunedStrings[1],
        config: stringConfig[1],
        notes: [
          { value: twelveTET_notes.A, fretNumber: 0 },
          { value: twelveTET_notes.B, fretNumber: 2 },
          { value: twelveTET_notes.C, fretNumber: 3 },
          { value: twelveTET_notes.Cs, fretNumber: 4 },
        ],
      },
    ],
    "blues scale in F# works ok"
  );

  t.end();
});

tap.test("class FretBoard --- toJSON / valueOf / toString", function (t) {
  const tunedStrings = [
    new TunedString("0", twelveTET_notes.E, "metal", 0.254),
    new TunedString("1", twelveTET_notes.A, "metal", 0.3302),
  ];

  const stringConfig = [
    { fret: { start: 0, end: 5 } },
    { fret: { start: 0, end: 5 } },
  ];

  const stubbyBoard = new FretBoard(twelveTET, tunedStrings, stringConfig);

  t.same(
    stubbyBoard.toJSON(),
    {
      temperament: twelveTET,
      tunedStrings,
      stringConfig,
    },
    "correct json format"
  );

  t.same(stubbyBoard.valueOf(), JSON.stringify(stubbyBoard.toJSON()));
  t.same(stubbyBoard.toString(), JSON.stringify(stubbyBoard.toJSON()));

  t.end();
});

tap.test("setStringTuningNote()", (t) => {
  const tunedStrings = [
    new TunedString("x", twelveTET_notes.E, "metal", 0.254),
    new TunedString("y", twelveTET_notes.A, "metal", 0.3302),
  ];

  const stringConfig = [
    { fret: { start: 0, end: 5 } },
    { fret: { start: 0, end: 5 } },
  ];

  const stubbyBoard = new FretBoard(twelveTET, tunedStrings, stringConfig);

  t.equal(stubbyBoard.tunedStrings[0].tuningNote, twelveTET_notes.E);
  t.equal(stubbyBoard.tunedStrings[1].tuningNote, twelveTET_notes.A);

  stubbyBoard.setStringTuningNote("x", twelveTET_notes.C);

  t.equal(stubbyBoard.tunedStrings[0].tuningNote, twelveTET_notes.C);
  t.equal(stubbyBoard.tunedStrings[1].tuningNote, twelveTET_notes.A);

  t.end();
});

tap.test("getFretCount()", (t) => {
  const tunedStrings = [
    new TunedString("x", twelveTET_notes.E, "metal", 0.254),
    new TunedString("y", twelveTET_notes.A, "metal", 0.3302),
  ];

  const stringConfig = [
    { fret: { start: 0, end: 5 } },
    { fret: { start: 0, end: 5 } },
  ];

  const stubbyBoard = new FretBoard(twelveTET, tunedStrings, stringConfig);

  t.equal(stubbyBoard.getFretCount(), 5);

  t.end();
});
