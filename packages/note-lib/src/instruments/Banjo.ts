import { twelveTET, twelveTETNotes } from "../data/temperaments/twelveTET";
import { FretBoard } from "../FretBoard";
import { TunedString } from "../TunedString";
import { Note } from "../Note";
import { Course } from "../Course";
import { IFretSpan } from "../interfaces/IFretSpan";
import { FrettedInstrument } from "./FrettedInstrument";
import * as Constants from "../constants/Constants";
import { Tuning } from "../Tuning";

const { A, Bb, B, C, Cs, Db, D, Ds, Eb, E, F, Fs, Gb, G, Gs, Ab } = twelveTETNotes;

export class Banjo extends FrettedInstrument {
  name: string;
  fretBoard: FretBoard;
  commonTunings: Tuning[];
  standardTuning: Tuning;
  constructor(fretCount: number, tuning: Note[]) {
    super();
    this.name = Constants.BANJO;

    const courses: Course[] = [
      new Course("first-G-string", [
        new TunedString("first-G-string", tuning[0], "metal", 0.11),
      ]),
      new Course("first-D-string", [
        new TunedString("first-D-string", tuning[1], "metal", 0.13),
      ]),
      new Course("second-G-string", [
        new TunedString("second-G-string", tuning[2], "metal", 0.17),
      ]),
      new Course("B-string", [
        new TunedString("B-string", tuning[3], "metal", 0.26),
      ]),
      new Course("second-D-string", [
        new TunedString("second-D-string", tuning[4], "metal", 0.11),
      ]),
    ];

    const fretSpan: IFretSpan[] = [
      { fret: { start: 5, end: fretCount - 1 } },
      { fret: { start: 0, end: fretCount - 1 } },
      { fret: { start: 0, end: fretCount - 1 } },
      { fret: { start: 0, end: fretCount - 1 } },
      { fret: { start: 0, end: fretCount - 1 } },
    ];

    const commonTunings = [
      // currently just 5-string
      new Tuning("standard", [G, D, G, B, D]),
      // standard AKA open G
    
      new Tuning("double C", [G, C, G, C, D]),
      new Tuning("drop C", [G, C, G, B, D]),
      new Tuning("D", [Fs, D, Fs, A, D]),
      new Tuning("G modal", [G, D, G, C, D]),
      new Tuning("guitar", [G, D, G, B, E]),
    ];

    this.fretBoard = new FretBoard(twelveTET, courses, fretSpan);
    this.commonTunings = commonTunings;
    this.standardTuning = commonTunings[0];
  }
}
