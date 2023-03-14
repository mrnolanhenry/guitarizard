import { FretBoard } from "../FretBoard";
import { twelveTET } from "../data/temperaments/twelveTET";
import { TunedString } from "../TunedString";
import { Tunings } from "../data/tunings";
import type { Note } from "../Note";
import { IFrettedInstrument } from "../IFrettedInstrument";
import { Tuning } from "../Tuning";
import { getFrettedInstrumentCommonTunings, getFrettedInstrumentStandardTuning } from "../util";

export class Guitar implements IFrettedInstrument{
  name: string;
  fretBoard: FretBoard;
  constructor(fretCount: number, tuning: Note[]) {
    this.name = "guitar";

    // left to right on the guitar
    const tunedStrings = [
      new TunedString("high-e-string", tuning[5], "metal", 0.254),
      new TunedString("B-string", tuning[1], "metal", 0.9144),
      new TunedString("G-string", tuning[2], "metal", 0.6604),
      new TunedString("D-string", tuning[3], "metal", 0.4318),
      new TunedString("A-string", tuning[4], "metal", 0.3302),
      new TunedString("E-string", tuning[0], "metal", 1.1684),
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
