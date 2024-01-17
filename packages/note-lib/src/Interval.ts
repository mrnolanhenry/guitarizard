// Useful Table:
// https://en.wikipedia.org/wiki/Interval_(music)#Main_intervals

import { Constants } from "./constants/Constants";
import { IIntervalAlias } from "./interfaces/IIntervalAlias";

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
    return typeof alias !== Constants.UNDEFINED;
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
