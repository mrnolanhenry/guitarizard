import { FretBoard } from "../FretBoard";
import { twelveTET, twelveTETNotes } from "../data/temperaments/twelveTET";
import { TunedString } from "../TunedString";
import { Course } from "../Course";
import { Note } from "../Note";
import { FrettedInstrument } from "./FrettedInstrument";
import * as Constants from "../constants/Constants";
import { Tuning } from "../Tuning";

const { A, Bb, B, C, Cs, Db, D, Ds, Eb, E, F, Fs, Gb, G, Gs, Ab } = twelveTETNotes;

// TODO: Implement support for other "double stringed" instruments (e.g. 12-string guitar, Bouzouki, https://en.wikipedia.org/wiki/Lute, etc.)
// https://en.wikipedia.org/wiki/Course_(music)

export class Mandolin extends FrettedInstrument {
  name: string;
  fretBoard: FretBoard;
  commonTunings: Tuning[];
  standardTuning: Tuning;
  constructor(fretCount: number, tuning: Note[]) {
    super();

    const course1 = new Course("G-strings", [
      new TunedString("G-string-1", tuning[0], "metal", 4),
      new TunedString("G-string-2", tuning[0], "metal", 4),
    ]);
    const course2 = new Course("D-strings", [
      new TunedString("D-string-1", tuning[1], "metal", 3),
      new TunedString("D-string-2", tuning[1], "metal", 3),
    ]);
    const course3 = new Course("A-strings", [
      new TunedString("A-string-1", tuning[2], "metal", 2),
      new TunedString("A-string-2", tuning[2], "metal", 2),
    ]);
    const course4 = new Course("E-strings", [
      new TunedString("E-string-1", tuning[3], "metal", 1),
      new TunedString("E-string-2", tuning[3], "metal", 1),
    ]);

    const courses: Course[] = [course1, course2, course3, course4];

    const fretSpan = this.getDefaultFretSpan(fretCount, tuning);

    const commonTunings = [
      new Tuning("standard", [G, D, A, E]),
      new Tuning("Cajun", [F, C, G, D]),
      new Tuning("open G", [G, D, G, B]),
      new Tuning("cross G", [G, D, G, D]),
      new Tuning("Gee-Dad", [G, D, A, D]),
      new Tuning("open D", [D, D, A, D]),
      new Tuning("high bass", [A, D, A, E]),
      new Tuning("cross A", [A, E, A, E]),
      new Tuning("open A", [A, E, A, Cs]),
    ]

    this.name = Constants.MANDOLIN;
    this.fretBoard = new FretBoard(twelveTET, courses, fretSpan);
    this.commonTunings = commonTunings;
    this.standardTuning = commonTunings[0];
  }
}
