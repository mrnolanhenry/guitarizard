import { FretBoard } from "../FretBoard";
import { twelveTET, twelveTETNotes } from "../data/temperaments/twelveTET";
import { TunedString } from "../TunedString";
import { Note } from "../Note";
import { FrettedInstrument } from "./FrettedInstrument";
import { Course } from "../Course";
import * as Constants from "../constants/Constants";
import { Tuning } from "../Tuning";

export enum GuitarType {
  SIX_STRING = "",
  SEVEN_STRING = " (7 string)",
  EIGHT_STRING = " (8 string)",
  TWELVE_STRING = " (12 string)",
}

const { A, Bb, B, C, Cs, Db, D, Ds, Eb, E, F, Fs, Gb, G, Gs, Ab } = twelveTETNotes;

const getCourses = (tuning: Note[], isDoubledStrings: boolean): Course[] => {
  const courseCount: number = tuning.length;
  if (courseCount === 6) {
    if (!isDoubledStrings) {
      return [
        new Course("E-string", [
          new TunedString("E-string", tuning[0], "metal", 6),
        ]),
        new Course("A-string", [
          new TunedString("A-string", tuning[1], "metal", 5),
        ]),
        new Course("D-string", [
          new TunedString("D-string", tuning[2], "metal", 4),
        ]),
        new Course("G-string", [
          new TunedString("G-string", tuning[3], "metal", 3),
        ]),
        new Course("B-string", [
          new TunedString("B-string", tuning[4], "metal", 2),
        ]),
        new Course("high-e-string", [
          new TunedString("high-e-string", tuning[5], "metal", 1),
        ]),
      ];
    } else {
      const course1 = new Course("E-strings", [
        new TunedString("E-string-1", tuning[0], "metal", 6),
        new TunedString("E-string-2", tuning[0], "metal", 6),
      ]);
      const course2 = new Course("A-strings", [
        new TunedString("A-string-1", tuning[1], "metal", 5),
        new TunedString("A-string-2", tuning[1], "metal", 5),
      ]);
      const course3 = new Course("D-strings", [
        new TunedString("D-string-1", tuning[2], "metal", 4),
        new TunedString("D-string-2", tuning[2], "metal", 4),
      ]);
      const course4 = new Course("G-strings", [
        new TunedString("G-string-1", tuning[3], "metal", 3),
        new TunedString("G-string-2", tuning[3], "metal", 3),
      ]);
      const course5 = new Course("B-strings", [
        new TunedString("B-string-1", tuning[4], "metal", 2),
        new TunedString("B-string-1", tuning[4], "metal", 2),
      ]);
      const course6 = new Course("high-E-strings", [
        new TunedString("high-E-string-1", tuning[5], "metal", 1),
        new TunedString("high-E-string-2", tuning[5], "metal", 1),
      ]);
      return [course1, course2, course3, course4, course5, course6];
    }
  } else if (courseCount === 7) {
    return [
      new Course("low-B-string", [
        new TunedString("low-B-string ", tuning[0], "metal", 7),
      ]),
      new Course("E-string", [
        new TunedString("E-string", tuning[1], "metal", 6),
      ]),
      new Course("A-string", [
        new TunedString("A-string", tuning[2], "metal", 5),
      ]),
      new Course("D-string", [
        new TunedString("D-string", tuning[3], "metal", 4),
      ]),
      new Course("G-string", [
        new TunedString("G-string", tuning[4], "metal", 3),
      ]),
      new Course("B-string", [
        new TunedString("B-string", tuning[5], "metal", 2),
      ]),
      new Course("high-e-string", [
        new TunedString("high-e-string", tuning[6], "metal", 1),
      ]),
    ];
  } else if (courseCount === 8) {
    return [
      new Course("F-sharp-string", [
        new TunedString("F-sharp-string", tuning[0], "metal", 8),
      ]),
      new Course("low-B-string", [
        new TunedString("low-B-string", tuning[1], "metal", 7),
      ]),
      new Course("E-string", [
        new TunedString("E-string", tuning[2], "metal", 6),
      ]),
      new Course("A-string", [
        new TunedString("A-string", tuning[3], "metal", 5),
      ]),
      new Course("D-string", [
        new TunedString("D-string", tuning[4], "metal", 4),
      ]),
      new Course("G-string", [
        new TunedString("G-string", tuning[5], "metal", 3),
      ]),
      new Course("B-string", [
        new TunedString("B-string", tuning[6], "metal", 2),
      ]),
      new Course("high-e-string", [
        new TunedString("high-e-string", tuning[7], "metal", 1),
      ]),
    ];
  } else {
    throw Error(`Invalid String length of ${courseCount}!`);
  }
};

const getCommonTunings = (guitarType: GuitarType) => {
  switch(guitarType) {
    case GuitarType.SIX_STRING:
      return [
        new Tuning("standard", [E, A, D, G, B, E]),
        new Tuning("drop D", [D, A, D, G, B, E]),
        new Tuning("half step down", [Eb, Ab, Db, Gb, Bb, Eb]),
        new Tuning("whole step down", [D, G, C, F, A, D]),
        new Tuning("open D", [D, A, D, Fs, A, D]),
        new Tuning("DADGAD", [D, A, D, G, A, D]),
        new Tuning("open G", [D, G, D, G, B, D]),
        new Tuning("open E", [E, B, E, Gs, B, E]),
        new Tuning("open A", [E, A, E, A, Cs, E]),
        new Tuning("new standard", [C, G, D, A, E, G]),
        new Tuning("all fifths", [C, G, D, A, E, B]),
        new Tuning("open C", [C, G, C, G, C, E]),
        new Tuning("open C (C5)", [C, G, C, G, G, E]),
        new Tuning("open C (repetitive)", [C, E, G, C, E, G]),
        new Tuning("drop C", [C, G, C, F, A, D]),
        new Tuning("open B", [B, Fs, B, Fs, B, Ds]),
        new Tuning("open F", [F, A, C, F, C, F]),
    ]
    case GuitarType.SEVEN_STRING: 
      return [
        new Tuning("standard", [B, E, A, D, G, B, E]),
        new Tuning("half step down", [Bb, Eb, Ab, Db, Gb, Bb, Eb]),
        new Tuning("whole step down", [A, D, G, C, F, A, D]),
      ]
    case GuitarType.EIGHT_STRING:
      return [
        new Tuning("standard", [Fs, B, E, A, D, G, B, E]),
        new Tuning("half step down", [F, Bb, Eb, Ab, Db, Gb, Bb, Eb]),
        new Tuning("whole step down", [E, A, D, G, C, F, A, D]),
      ]
    case GuitarType.TWELVE_STRING:
      return [
        new Tuning("standard", [E, A, D, G, B, E]),
        new Tuning("drop D", [D, A, D, G, B, E]),
        new Tuning("half step down", [Eb, Ab, Db, Gb, Bb, Eb]),
        new Tuning("whole step down", [D, G, C, F, A, D]),
        new Tuning("open D", [D, A, D, Fs, A, D]),
        new Tuning("DADGAD", [D, A, D, G, A, D]),
        new Tuning("open G", [D, G, D, G, B, D]),
        new Tuning("open E", [E, B, E, Gs, B, E]),
        new Tuning("open A", [E, A, E, A, Cs, E]),
        new Tuning("new standard", [C, G, D, A, E, G]),
        new Tuning("all fifths", [C, G, D, A, E, B]),
        new Tuning("open C", [C, G, C, G, C, E]),
        new Tuning("open C (C5)", [C, G, C, G, G, E]),
        new Tuning("open C (repetitive)", [C, E, G, C, E, G]),
        new Tuning("drop C", [C, G, C, F, A, D]),
        new Tuning("open B", [B, Fs, B, Fs, B, Ds]),
        new Tuning("open F", [F, A, C, F, C, F]),
      ]
  }
}

export class Guitar extends FrettedInstrument {
  name: string;
  fretBoard: FretBoard;
  commonTunings: Tuning[];
  standardTuning: Tuning;
  constructor(
    fretCount: number,
    tuning: Note[],
    guitarType: GuitarType,
    isDoubledStrings: boolean = false,
  ) {
    super();
    const courses = getCourses(tuning, isDoubledStrings);
    const fretSpan = this.getDefaultFretSpan(fretCount, tuning);
    const commonTunings = getCommonTunings(guitarType);

    this.name = Constants.GUITAR + guitarType;
    this.fretBoard = new FretBoard(twelveTET, courses, fretSpan);
    this.commonTunings = commonTunings;
    this.standardTuning = commonTunings[0];
  }
}
