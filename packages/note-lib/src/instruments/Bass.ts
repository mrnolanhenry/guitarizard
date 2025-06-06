import { twelveTET, twelveTETNotes } from "../data/temperaments/twelveTET";
import { FretBoard } from "../FretBoard";
import { TunedString } from "../TunedString";
import { Note } from "../Note";
import { Course } from "../Course";
import { IFretSpan } from "../interfaces/IFretSpan";
import { FrettedInstrument } from "./FrettedInstrument";
import * as Constants from "../constants/Constants";
import { Tuning } from "../Tuning";

export enum BassType {
  FOUR_STRING = "",
  FIVE_STRING = " (5 string)",
  SIX_STRING = " (6 string)",
}
const { A, Bb, B, C, Cs, Db, D, Ds, Eb, E, F, Fs, Gb, G, Gs, Ab } = twelveTETNotes;

const getCourses = (tuning: Note[]) => {
  const courseCount: number = tuning.length;
  if (courseCount === 4) {
    return [
      new Course("E-string", [
        new TunedString("E-string", tuning[0], "metal", 4),
      ]),
      new Course("A-string", [
        new TunedString("A-string", tuning[1], "metal", 3),
      ]),
      new Course("D-string", [
        new TunedString("D-string", tuning[2], "metal", 2),
      ]),
      new Course("G-string", [
        new TunedString("G-string", tuning[3], "metal", 1),
      ]),
    ];
  } else if (courseCount === 5) {
    return [
      new Course("string-5", [
        new TunedString("string-5", tuning[0], "metal", 5),
      ]),
      new Course("string-4", [
        new TunedString("string-4", tuning[1], "metal", 4),
      ]),
      new Course("string-3", [
        new TunedString("string-3", tuning[2], "metal", 3),
      ]),
      new Course("string-2", [
        new TunedString("string-2", tuning[3], "metal", 2),
      ]),
      new Course("string-1", [
        new TunedString("string-1", tuning[4], "metal", 1),
      ]),
    ];
  } else if (courseCount === 6) {
    return [
      new Course("string-6", [
        new TunedString("string-6", tuning[0], "metal", 6),
      ]),
      new Course("string-5", [
        new TunedString("string-5", tuning[1], "metal", 5),
      ]),
      new Course("string-4", [
        new TunedString("string-4", tuning[2], "metal", 4),
      ]),
      new Course("string-3", [
        new TunedString("string-3", tuning[3], "metal", 3),
      ]),
      new Course("string-2", [
        new TunedString("string-2", tuning[4], "metal", 2),
      ]),
      new Course("string-1", [
        new TunedString("string-1", tuning[5], "metal", 1),
      ]),
    ];
  } else {
    throw Error(
      `Invalid String length of ${courseCount}!`,
    );
  }
}

const getCommonTunings = (bassType: BassType) => {
  switch(bassType) {
    case BassType.FOUR_STRING:
      return [
        new Tuning("standard", [E, A, D, G]),
        new Tuning("drop D", [D, A, D, G]),
        new Tuning("D-standard", [D, G, C, F]),
        new Tuning("drop C", [C, G, C, F]),
        new Tuning("tenor", [A, D, G, C]),
        new Tuning("half step down", [Eb, Ab, Db, Gb]),
        new Tuning("whole step down", [D, G, C, F]),
    ]
    case BassType.FIVE_STRING:
      return [
        new Tuning("standard", [B, E, A, D, G]),
        new Tuning("tenor", [E, A, D, G, C]),
        new Tuning("half step down", [Bb, Eb, Ab, Db, Gb]),
        new Tuning("whole step down", [A, D, G, C, F]),
      ];
    case BassType.SIX_STRING:
      return [
        new Tuning("standard", [B, E, A, D, G, C]),
        new Tuning("half step down", [Bb, Eb, Ab, Db, Gb, B]),
        new Tuning("whole step down", [A, D, G, C, F, Bb]),
      ];
  }
}

export class Bass extends FrettedInstrument {
  name: string;
  fretBoard: FretBoard;
  commonTunings: Tuning[];
  standardTuning: Tuning;
  constructor(fretCount: number, tuning: Note[], bassType: BassType) {
    super();
    const courses: Course[] = getCourses(tuning);
    const fretSpan: IFretSpan[] = this.getDefaultFretSpan(fretCount, tuning);
    const commonTunings: Tuning[] = getCommonTunings(bassType);

    this.name = Constants.BASS + bassType;
    this.fretBoard = new FretBoard(twelveTET, courses, fretSpan);
    this.commonTunings = commonTunings;
    this.standardTuning = commonTunings[0];
  }
}
