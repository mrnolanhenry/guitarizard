/* eslint-disable @typescript-eslint/no-unsafe-argument */
// Useful Table:
// https://en.wikipedia.org/wiki/Interval_(music)

import { IntervalScaleDegreeSpelledOut, IntervalScaleDegreeOrdinal, IntervalScaleDegreeNumeric } from "./enums/IntervalScaleDegreeEnums";

export class IntervalScaleDegree {
  name: IntervalScaleDegreeSpelledOut; // The name of the interval quality (e.g., "Perfect", "Major", "Diminished").
  ordinal: IntervalScaleDegreeOrdinal; // A short representation of the interval (e.g., "P", "M","d").
  numeric: IntervalScaleDegreeNumeric; // Symbols that represent the interval quality (e.g., "P", "M", "m", "A", "d").

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
