import { twelveTET, twelveTETNotes } from "../data/temperaments/twelveTET";
import { FretBoard } from "../FretBoard";
import { TunedString } from "../TunedString";
import { Note } from "../Note";
import { Course } from "../Course";
import { FrettedInstrument } from "./FrettedInstrument";
import * as Constants from "../constants/Constants";
import { Tuning } from "../Tuning";

const { A, Bb, B, C, Cs, Db, D, Ds, Eb, E, F, Fs, Gb, G, Gs, Ab } = twelveTETNotes;

export class Ukulele extends FrettedInstrument {
  name: string;
  fretBoard: FretBoard;
  commonTunings: Tuning[];
  standardTuning: Tuning;
  constructor(fretCount: number, tuning: Note[]) {
    super();

    const courses: Course[] = [
      new Course("G-1", [new TunedString("G-1", tuning[0], "nylon", 0.11)]),
      new Course("C-2", [new TunedString("C-2", tuning[1], "nylon", 0.13)]),
      new Course("E-3", [new TunedString("E-3", tuning[2], "nylon", 0.17)]),
      new Course("A-4", [new TunedString("A-4", tuning[3], "nylon", 0.26)]),
    ];

    const fretSpan = this.getDefaultFretSpan(fretCount, tuning);

    const commonTunings = [
      new Tuning("standard", [G, C, E, A]),
      new Tuning("D", [A, D, Fs, B]),
      new Tuning("baritone", [D, G, B, E]),
    ];

    this.name = Constants.UKULELE;
    this.fretBoard = new FretBoard(twelveTET, courses, fretSpan);
    this.commonTunings = commonTunings;
    this.standardTuning = commonTunings[0];
  }
}
