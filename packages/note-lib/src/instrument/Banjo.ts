import { diatonic } from "../data/scaleSystem/diatonic";
import { FretBoard } from "./FretBoard";
import { TunedString } from "./TunedString";
import { Tunings } from "../data/tunings";
import type { Note } from "../Note";

export class Banjo {
  name: string;
  fretBoard: FretBoard;

  constructor(fretCount: number, tuning: Note[]) {
    this.name = "banjo";

    // ["G", "D", "G", "B", "D"]

    const tunedStrings = [
      new TunedString("first-G-string", tuning[0], "metal", 0.11),
      new TunedString("first-D-string", tuning[1], "metal", 0.13),
      new TunedString("second-G-string", tuning[2], "metal", 0.17),
      new TunedString("B-string", tuning[3], "metal", 0.26),
      new TunedString("second-D-string", tuning[4], "metal", 0.11),
    ];

    const stringConfig = [
      { fret: { start: 5, end: fretCount } },
      { fret: { start: 0, end: fretCount } },
      { fret: { start: 0, end: fretCount } },
      { fret: { start: 0, end: fretCount } },
      { fret: { start: 0, end: fretCount } },
    ];

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
