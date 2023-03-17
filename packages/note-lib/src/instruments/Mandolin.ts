import { FretBoard } from "../FretBoard";
import { twelveTET } from "../data/temperaments/twelveTET";
import { TunedString } from "../TunedString";
import type { Note } from "../Note";
import { IFrettedInstrument } from "../IFrettedInstrument";
import { getFrettedInstrumentCommonTunings, getFrettedInstrumentStandardTuning } from "../util";

// TODO: Implement support for "Courses" or "double stringed" instruments (e.g. 12-string guitar, Bouzouki, https://en.wikipedia.org/wiki/Lute, etc.)
// For now, representing Mandolin without doubled strings.
// https://en.wikipedia.org/wiki/Mandolin
// https://en.wikipedia.org/wiki/Course_(music)

export class Mandolin implements IFrettedInstrument{
  name: string;
  fretBoard: FretBoard;
  constructor(fretCount: number, tuning: Note[]) {
    this.name = "mandolin";

    // left to right on the guitar
    const tunedStrings = [
      new TunedString("E-string-1", tuning[0], "metal", 4),
      new TunedString("A-string-1", tuning[1], "metal", 3),
      new TunedString("D-string-1", tuning[2], "metal", 2),
      new TunedString("G-string-1", tuning[3], "metal", 1),
    ];

    const stringConfig = [
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
