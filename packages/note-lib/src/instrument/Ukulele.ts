import { diatonic } from "../data/scaleSystem/diatonic";
import { FretBoard } from "./FretBoard";
import { TunedString } from "./TunedString";
import type { Note } from "../Note";
import { Tunings } from "../data/tunings";

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

    const stringConfig = [
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
