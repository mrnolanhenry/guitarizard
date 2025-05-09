/* eslint-disable @typescript-eslint/no-unsafe-argument */
// Useful Table:
// https://en.wikipedia.org/wiki/Interval_(music)#Main_intervals

import * as Constants from "./constants/Constants";
import { IIntervalAlias } from "./interfaces/IIntervalAlias";

// NOLAN TODO: 
// Consider adding a "quality" property to the Interval class, which could be an enum or string that indicates the quality of the interval (e.g., "perfect", "major", "minor", "diminished", "augmented").
// Consider adding "ordinalNumer" to the Interval class, which would be a string that describes the interval's function in a scale or chord (e.g., "root", "third", "fifth").
// This may require significant refactor, and actually may be better suited to the IIntervalAlias interface instead of the Interval class itself.
// That, or this Interval class should correspond to only one IIntervalAlias, and the Temperament class should be constructed with "duplicate" Intervals that share the same number of semitones.
export class Interval {
  semitones: number;
  aliases: IIntervalAlias[];
  isMajor: boolean;
  isMinor: boolean;
  isAugmented: boolean;
  isDiminished: boolean;
  isPerfect: boolean;
  isRoot: boolean;

  constructor(semitones: number, aliases: IIntervalAlias[]) {
    this.semitones = semitones;
    this.aliases = aliases;

    this.isMajor = this.hasAliasName(Constants.MAJOR);
    this.isMinor = this.hasAliasName(Constants.MINOR);
    this.isAugmented = this.hasAliasName(Constants.AUGMENTED);
    this.isDiminished = this.hasAliasName(Constants.DIMINISHED);
    this.isPerfect = this.hasAliasName(Constants.PERFECT);
    this.isRoot = this.hasAliasName(Constants.ROOT);
  }

  hasAliasName(name: string) {
    const alias = this.aliases.find((a) => a.name === name);
    return typeof alias !== "undefined";
  }

  toJSON() {
    return {
      semitones: this.semitones,
      aliases: this.aliases,
      isMajor: this.isMajor,
      isMinor: this.isMinor,
      isAugmented: this.isAugmented,
      isDiminished: this.isDiminished,
      isPerfect: this.isPerfect,
      isRoot: this.isRoot,
    };
  }

  valueOf() {
    return JSON.stringify(this);
  }

  toString() {
    return JSON.stringify(this);
  }
}
