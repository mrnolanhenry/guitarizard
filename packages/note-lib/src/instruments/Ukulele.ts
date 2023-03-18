import { twelveTET } from "../data/temperaments/twelveTET";
import { FretBoard } from "../FretBoard";
import { TunedString } from "../TunedString";
import type { Note } from "../Note";
import { getDefaultStringConfig, getFrettedInstrumentCommonTunings, getFrettedInstrumentStandardTuning } from "../util";

export class Ukulele {
  name: string;
  fretBoard: FretBoard;

  constructor(fretCount: number, tuning: Note[]) {
    this.name = "ukulele";

    const tunedStrings = [
      new TunedString("G-1", tuning[0], "nylon", 0.11),
      new TunedString("C-2", tuning[1], "nylon", 0.13),
      new TunedString("E-3", tuning[2], "nylon", 0.17),
      new TunedString("A-4", tuning[3], "nylon", 0.26),
    ];

    const stringConfig = getDefaultStringConfig(fretCount, tuning);

    this.fretBoard = new FretBoard(twelveTET, tunedStrings, stringConfig);
  }


  getCommonTunings = () => getFrettedInstrumentCommonTunings(this.name);
  getStandardTuning = () => getFrettedInstrumentStandardTuning(this.name);
}
