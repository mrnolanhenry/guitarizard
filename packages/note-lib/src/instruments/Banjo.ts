import { twelveTET } from "../data/temperaments/twelveTET";
import { FretBoard } from "../FretBoard";
import { TunedString } from "../TunedString";
import { Note } from "../Note";
import { Course } from "../Course";
import { IFretSpan } from "../interfaces/IFretSpan";
import { FrettedInstrument } from "./FrettedInstrument";
import * as Constants from "../constants/Constants";

export class Banjo extends FrettedInstrument {
  name: string;
  fretBoard: FretBoard;

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

    this.fretBoard = new FretBoard(twelveTET, courses, fretSpan);
  }
}
