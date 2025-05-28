/* eslint-disable @typescript-eslint/no-unsafe-argument */
// Useful Table:
// https://en.wikipedia.org/wiki/Interval_(music)

import { IntervalScaleDegreeSpelledOut, IntervalScaleDegreeOrdinal, IntervalScaleDegreeNumeric } from "./enums/IntervalScaleDegreeEnums";

export class IntervalScaleDegree {
  name: IntervalScaleDegreeSpelledOut; // The name of the interval quality fully spelled out (e.g., "Unison", "Fifth", "Seventh", "Octave").
  ordinal: IntervalScaleDegreeOrdinal; // A shorter representation of the interval as an ordinal (e.g., "5th", "7th").
  numeric: IntervalScaleDegreeNumeric; //Represent the interval quality by its IntervalNumber (e.g., 5, 7).

  constructor(name: IntervalScaleDegreeSpelledOut, ordinal: IntervalScaleDegreeOrdinal, numeric: IntervalScaleDegreeNumeric) {
    this.name = name;
    this.ordinal = ordinal;
    this.numeric = numeric;
  }

  isRoot(): boolean {
    return this.numeric === IntervalScaleDegreeNumeric.Unison;
  }

  toJSON() {
      return {
      name: this.name,
      ordinal: this.ordinal,
      numeric: this.numeric,
      };
  }

  valueOf() {
      return JSON.stringify(this);
  }

  toString() {
      return JSON.stringify(this);
  }
}
