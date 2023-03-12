import { diatonic } from "../data/scaleSystem/diatonic";
import { FretBoard } from "./FretBoard";
import { TunedString } from "./TunedString";
import { Tunings } from "../data/tunings";
import type { Note } from "../Note";

export class Bass {
  name: string;
  fretBoard: any;

  constructor(fretCount: number, tuning: Note[]) {
    const stringCount = tuning.length;

    this.name = `bass-${stringCount}`;

    let tunedStrings: TunedString[];

    if (stringCount === 4) {
      tunedStrings = [
        new TunedString("string-4", tuning[0], "metal", 4),
        new TunedString("string-3", tuning[1], "metal", 3),
        new TunedString("string-2", tuning[2], "metal", 2),
        new TunedString("string-1", tuning[3], "metal", 1),
      ];
    } else if (stringCount === 5) {
      tunedStrings = [
        new TunedString("string-5", tuning[0], "metal", 5),
        new TunedString("string-4", tuning[1], "metal", 4),
        new TunedString("string-3", tuning[2], "metal", 3),
        new TunedString("string-2", tuning[3], "metal", 2),
        new TunedString("string-1", tuning[4], "metal", 1),
      ];
    } else if (stringCount === 6) {
      tunedStrings = [
        new TunedString("string-6", tuning[0], "metal", 6),
        new TunedString("string-5", tuning[1], "metal", 5),
        new TunedString("string-4", tuning[2], "metal", 4),
        new TunedString("string-3", tuning[3], "metal", 3),
        new TunedString("string-2", tuning[4], "metal", 2),
        new TunedString("string-1", tuning[5], "metal", 1),
      ];
    } else {
      throw `Invalid String length of ${stringCount} for Bass!`;
    }

    const stringConfig = tuning.map(() => {
      return { fret: { start: 0, end: fretCount } };
    });

    this.fretBoard = new FretBoard(diatonic, tunedStrings, stringConfig);
  }

  // getCommonTunings() {
  //   let commonTunings = [];
  //   for (let i = 0; i < Tunings.length; i++) {
  //     if (Tunings[i].instrument === this.name) {
  //       commonTunings.push(Tunings[i]);
  //     }
  //   }
  //   return commonTunings;
  // }

  // getStandardTuning() {
  //   return this.getCommonTunings()[0];
  // }
}
