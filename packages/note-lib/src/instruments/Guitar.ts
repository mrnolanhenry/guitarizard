import { FretBoard } from "../FretBoard";
import { twelveTET } from "../data/temperaments/twelveTET";
import { TunedString } from "../TunedString";
import type { Note } from "../Note";
import { IFrettedInstrument } from "../IFrettedInstrument";
import { getFrettedInstrumentCommonTunings, getFrettedInstrumentStandardTuning } from "../util";

export class Guitar implements IFrettedInstrument{
  name: string;
  fretBoard: FretBoard;
  constructor(fretCount: number, tuning: Note[]) {
    this.name = "guitar";

    // left to right on the guitar
    const tunedStrings = [
      new TunedString("high-e-string", tuning[0], "metal", 6),
      new TunedString("B-string", tuning[1], "metal", 5),
      new TunedString("G-string", tuning[2], "metal", 4),
      new TunedString("D-string", tuning[3], "metal", 3),
      new TunedString("A-string", tuning[4], "metal", 2),
      new TunedString("E-string", tuning[5], "metal", 1),
    ];

    const stringConfig = [
      { fret: { start: 0, end: fretCount } },
      { fret: { start: 0, end: fretCount } },
      { fret: { start: 0, end: fretCount } },
      { fret: { start: 0, end: fretCount } },
      { fret: { start: 0, end: fretCount } },
      { fret: { start: 0, end: fretCount } },
    ];

    this.fretBoard = new FretBoard(twelveTET, tunedStrings, stringConfig);
  }
  getCommonTunings = () => getFrettedInstrumentCommonTunings(this.name);
  getStandardTuning = () => getFrettedInstrumentStandardTuning(this.name);
}
