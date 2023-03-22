import { twelveTET } from "../data/temperaments/twelveTET";
import { FretBoard } from "../FretBoard";
import { TunedString } from "../TunedString";
import type { Note } from "../Note";
import { Course } from "../Course";
import { IFretSpan } from "../interfaces/IFretSpan";
import { FrettedInstrument } from "./FrettedInstrument";

export class Bass extends FrettedInstrument {
  name: string;
  fretBoard: FretBoard;

  constructor(fretCount: number, tuning: Note[]) {
    super();
    const courseCount: number = tuning.length;

    const instrumentName: string = courseCount === 4 ? "bass" : `bass (${courseCount} string)`;
    this.name = instrumentName;

    let courses: Course[];

    if (courseCount === 4) {
      courses = [
        new Course("E-string", [new TunedString("E-string", tuning[0], "metal", 4)]),
        new Course("A-string", [new TunedString("A-string", tuning[1], "metal", 3)]),
        new Course("D-string", [new TunedString("D-string", tuning[2], "metal", 2)]),
        new Course("G-string", [new TunedString("G-string", tuning[3], "metal", 1)]),
      ];
    } else if (courseCount === 5) {
      courses = [
        new Course("string-5", [new TunedString("string-5", tuning[0], "metal", 5)]),
        new Course("string-4", [new TunedString("string-4", tuning[1], "metal", 4)]),
        new Course("string-3", [new TunedString("string-3", tuning[2], "metal", 3)]),
        new Course("string-2", [new TunedString("string-2", tuning[3], "metal", 2)]),
        new Course("string-1", [new TunedString("string-1", tuning[4], "metal", 1)]),
      ];
    } else if (courseCount === 6) {
      courses = [
        new Course("string-6", [new TunedString("string-6", tuning[0], "metal", 6)]),
        new Course("string-5", [new TunedString("string-5", tuning[1], "metal", 5)]),
        new Course("string-4", [new TunedString("string-4", tuning[2], "metal", 4)]),
        new Course("string-3", [new TunedString("string-3", tuning[3], "metal", 3)]),
        new Course("string-2", [new TunedString("string-2", tuning[4], "metal", 2)]),
        new Course("string-1", [new TunedString("string-1", tuning[5], "metal", 1)]),
      ];
    } else {
      throw `Invalid String length of ${courseCount} for ${instrumentName}!`;
    }

    const fretSpan: IFretSpan[] = this.getDefaultFretSpan(fretCount, tuning);

    this.fretBoard = new FretBoard(twelveTET, courses, fretSpan);
  }
}
