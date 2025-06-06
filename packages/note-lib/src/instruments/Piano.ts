import { twelveTET, twelveTETNotes } from "../data/temperaments/twelveTET";
import { FretBoard } from "../FretBoard";
import { TunedString } from "../TunedString";
import { Note } from "../Note";
import { Course } from "../Course";
import { FrettedInstrument } from "./FrettedInstrument";
import * as Constants from "../constants/Constants";
import { Tuning } from "../Tuning";

const { A, Bb, B, C, Cs, Db, D, Ds, Eb, E, F, Fs, Gb, G, Gs, Ab } = twelveTETNotes;

// For intents and purposes, a piano can be considered a fretted instrument with a single course/string, 88 "frets" long
export class Piano extends FrettedInstrument {
  name: string;
  fretBoard: FretBoard;
  commonTunings: Tuning[];
  standardTuning: Tuning;
  constructor(fretCount: number, tuning: Note[]) {
    super();

    const courses: Course[] = [
      new Course("C-2", [new TunedString("C-2", tuning[0], "plastic", 0.5)]),
    ];

    const fretSpan = this.getDefaultFretSpan(fretCount, tuning);

    const commonTunings = [
      new Tuning("standard", [C]),
    ];

    this.name = Constants.PIANO;
    this.fretBoard = new FretBoard(twelveTET, courses, fretSpan);
    this.commonTunings = commonTunings;
    this.standardTuning = commonTunings[0];
  }
}
