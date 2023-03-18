import { twelveTET } from "../data/temperaments/twelveTET";
import { FretBoard } from "../FretBoard";
import { TunedString } from "../TunedString";
import type { Note } from "../Note";
import { getFrettedInstrumentCommonTunings, getFrettedInstrumentStandardTuning } from "../util";

export class Banjo {
  name: string;
  fretBoard: FretBoard;

  constructor(fretCount: number, tuning: Note[]) {
    this.name = "banjo";

    const tunedStrings = [
      new TunedString("first-G-string", tuning[0], "metal", 0.11),
      new TunedString("first-D-string", tuning[1], "metal", 0.13),
      new TunedString("second-G-string", tuning[2], "metal", 0.17),
      new TunedString("B-string", tuning[3], "metal", 0.26),
      new TunedString("second-D-string", tuning[4], "metal", 0.11),
    ];

    const stringConfig = [
      { fret: { start: 5, end: fretCount - 1 } },
      { fret: { start: 0, end: fretCount - 1 } },
      { fret: { start: 0, end: fretCount - 1 } },
      { fret: { start: 0, end: fretCount - 1 } },
      { fret: { start: 0, end: fretCount - 1 } },
    ];

    this.fretBoard = new FretBoard(twelveTET, tunedStrings, stringConfig);
  }

  getCommonTunings = () => getFrettedInstrumentCommonTunings(this.name);
  getStandardTuning = () => getFrettedInstrumentStandardTuning(this.name);
}
