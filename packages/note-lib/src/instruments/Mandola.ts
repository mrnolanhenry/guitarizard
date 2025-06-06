import { FretBoard } from "../FretBoard";
import { twelveTET, twelveTETNotes } from "../data/temperaments/twelveTET";
import { TunedString } from "../TunedString";
import { Course } from "../Course";
import { Note } from "../Note";
import { FrettedInstrument } from "./FrettedInstrument";
import * as Constants from "../constants/Constants";
import { Tuning } from "../Tuning";

const { A, Bb, B, C, Cs, Db, D, Ds, Eb, E, F, Fs, Gb, G, Gs, Ab } = twelveTETNotes;

// TODO: Implement support for other "double stringed" instruments (e.g. Bouzouki, https://en.wikipedia.org/wiki/Lute, etc.)

// https://en.wikipedia.org/wiki/Course_(music)

export class Mandola extends FrettedInstrument {
  name: string;
  fretBoard: FretBoard;
  commonTunings: Tuning[];
  standardTuning: Tuning;
  constructor(fretCount: number, tuning: Note[]) {
    super();

    const course1 = new Course("C-strings", [
      new TunedString("C-string-1", tuning[0], "metal", 4),
      new TunedString("C-string-2", tuning[0], "metal", 4),
    ]);
    const course2 = new Course("G-strings", [
      new TunedString("G-string-1", tuning[1], "metal", 3),
      new TunedString("G-string-2", tuning[1], "metal", 3),
    ]);
    const course3 = new Course("D-strings", [
      new TunedString("D-string-1", tuning[2], "metal", 2),
      new TunedString("D-string-2", tuning[2], "metal", 2),
    ]);
    const course4 = new Course("A-strings", [
      new TunedString("A-string-1", tuning[3], "metal", 1),
      new TunedString("A-string-2", tuning[3], "metal", 1),
    ]);

    const courses: Course[] = [course1, course2, course3, course4];

    const fretSpan = this.getDefaultFretSpan(fretCount, tuning);

    this.name = Constants.MANDOLA;
    this.fretBoard = new FretBoard(twelveTET, courses, fretSpan);
    this.commonTunings = [
      new Tuning("standard", [C, G, D, A]),
      new Tuning("F-C-G-C", [F, C, G, C]),
      new Tuning("D-A-E-A", [D, A, E, A]),
    ];
    this.standardTuning = this.commonTunings[0];
  }
}
