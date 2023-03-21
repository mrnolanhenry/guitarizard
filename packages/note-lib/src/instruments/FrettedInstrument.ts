import { FretBoard } from "../FretBoard";
import type { Note } from "../Note";
import { Tuning } from "../Tuning";
import { Tunings } from "../data/tunings";
import { IStringConfig } from "../IStringConfig";

const getFrettedInstrumentCommonTunings = (name: string): Tuning[] => {
    let commonTunings: Tuning[] = [];
    for (let i = 0; i < Tunings.length; i++) {
      if (Tunings[i].instrument === name) {
        commonTunings.push(Tunings[i]);
      }
    }
    return commonTunings;
  }
  
  const getFrettedInstrumentStandardTuning = (name: string): Tuning => {
    return getFrettedInstrumentCommonTunings(name)[0];
  }

export abstract class FrettedInstrument {
  abstract name: string;
  abstract fretBoard: FretBoard;
  getDefaultStringConfig = (fretCount: number, tuning: Note[]): IStringConfig[] => tuning.map(() => {
    return { fret: { start: 0, end: fretCount - 1 } };
  });
  getCommonTunings = (): Tuning[] => getFrettedInstrumentCommonTunings(this.name);
  getStandardTuning = (): Tuning => getFrettedInstrumentStandardTuning(this.name);
}
