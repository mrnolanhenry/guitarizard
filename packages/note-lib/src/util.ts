import { Tunings } from "./data/tunings";
import { IStringConfig } from "./IStringConfig";
import { Note } from "./Note";
import { Tuning } from "./Tuning";

// Given an array with numeric values, sort them in ascending order.
const sortArray = <T,>(array: Array<T>): Array<T> => {
  array.sort(function (a: any, b: any): number {
    return a - b;
  });
  return array;
};

const getFrettedInstrumentCommonTunings = (name: string): Tuning[] => {
  let commonTunings = [];
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

const getDefaultStringConfig = (fretCount: number, tuning: Note[]): IStringConfig[] => tuning.map(() => {
  return { fret: { start: 0, end: fretCount - 1 } };
});

export { getDefaultStringConfig, getFrettedInstrumentCommonTunings, getFrettedInstrumentStandardTuning, sortArray };
