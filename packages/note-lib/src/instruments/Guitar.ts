import { FretBoard } from "../FretBoard";
import { twelveTET } from "../data/temperaments/twelveTET";
import { TunedString } from "../TunedString";
import type { Note } from "../Note";
import { IFrettedInstrument } from "../IFrettedInstrument";
import { getDefaultStringConfig, getFrettedInstrumentCommonTunings, getFrettedInstrumentStandardTuning } from "../util";

export class Guitar implements IFrettedInstrument{
  name: string;
  fretBoard: FretBoard;
  constructor(fretCount: number, tuning: Note[]) {
    const stringCount = tuning.length;

    const instrumentName: string = stringCount === 6 ? "guitar" : `guitar (${stringCount} string)`;
    this.name = instrumentName;

    let tunedStrings: TunedString[];

    if (stringCount === 6) {
      tunedStrings = [
      new TunedString("high-e-string", tuning[0], "metal", 6),
      new TunedString("B-string", tuning[1], "metal", 5),
      new TunedString("G-string", tuning[2], "metal", 4),
      new TunedString("D-string", tuning[3], "metal", 3),
      new TunedString("A-string", tuning[4], "metal", 2),
      new TunedString("E-string", tuning[5], "metal", 1),
      ];
    } else if (stringCount === 7) {
      tunedStrings = [
        new TunedString("high-e-string", tuning[0], "metal", 7),
        new TunedString("B-string", tuning[1], "metal", 6),
        new TunedString("G-string", tuning[2], "metal", 5),
        new TunedString("D-string", tuning[3], "metal", 4),
        new TunedString("A-string", tuning[4], "metal", 3),
        new TunedString("E-string", tuning[5], "metal", 2),
        new TunedString("low-B-string", tuning[6], "metal", 1),
      ];
    } else if (stringCount === 8) {
      tunedStrings = [
        new TunedString("high-e-string", tuning[0], "metal", 8),
        new TunedString("B-string", tuning[1], "metal", 7),
        new TunedString("G-string", tuning[2], "metal", 6),
        new TunedString("D-string", tuning[3], "metal", 5),
        new TunedString("A-string", tuning[4], "metal", 4),
        new TunedString("E-string", tuning[5], "metal", 3),
        new TunedString("low-B-string", tuning[6], "metal", 2),
        new TunedString("F-sharp-string", tuning[7], "metal", 1),
      ];
    }
     else {
      throw `Invalid String length of ${stringCount} for ${instrumentName}!`;
    }

    const stringConfig = getDefaultStringConfig(fretCount, tuning);

    this.fretBoard = new FretBoard(twelveTET, tunedStrings, stringConfig);
  }
  getCommonTunings = () => getFrettedInstrumentCommonTunings(this.name);
  getStandardTuning = () => getFrettedInstrumentStandardTuning(this.name);
}
