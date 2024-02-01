import { twelveTET } from "../data/temperaments/twelveTET";
import { FretBoard } from "../FretBoard";
import { TunedString } from "../TunedString";
import { Note } from "../Note";
import { Course } from "../Course";
import { FrettedInstrument } from "./FrettedInstrument";
import * as Constants from "../constants/Constants";

// For intents and purposes, a piano can be considered a fretted instrument with a single course/string, 88 "frets" long
export class Piano extends FrettedInstrument {
  name: string;
  fretBoard: FretBoard;

  constructor(fretCount: number, tuning: Note[]) {
    super();
    this.name = Constants.PIANO;

    const courses: Course[] = [
      new Course("C-2", [new TunedString("C-2", tuning[0], "plastic", 0.5)]),
    ];

    const fretSpan = this.getDefaultFretSpan(fretCount, tuning);

    this.fretBoard = new FretBoard(twelveTET, courses, fretSpan);
  }
}
