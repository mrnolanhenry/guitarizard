import { twelveTET } from "../data/temperaments/twelveTET";
import { FretBoard } from "../FretBoard";
import { TunedString } from "../TunedString";
import type { Note } from "../Note";
import { Course } from "../Course";
import { FrettedInstrument } from "./FrettedInstrument";
import { Constants } from "../constants/Constants";

export class Ukulele extends FrettedInstrument{
  name: string;
  fretBoard: FretBoard;

  constructor(fretCount: number, tuning: Note[]) {
    super();
    this.name = Constants.UKULELE;

    const courses: Course[] = [
      new Course("G-1", [new TunedString("G-1", tuning[0], "nylon", 0.11)]),
      new Course("C-2", [new TunedString("C-2", tuning[1], "nylon", 0.13)]),
      new Course("E-3", [new TunedString("E-3", tuning[2], "nylon", 0.17)]),
      new Course("A-4", [new TunedString("A-4", tuning[3], "nylon", 0.26)]),
    ];

    const fretSpan = this.getDefaultFretSpan(fretCount, tuning);

    this.fretBoard = new FretBoard(twelveTET, courses, fretSpan);
  }
}
