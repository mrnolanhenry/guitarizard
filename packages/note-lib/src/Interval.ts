/* eslint-disable @typescript-eslint/no-unsafe-argument */
// Useful Table:
// https://en.wikipedia.org/wiki/Interval_(music)#Main_intervals

// NOLAN TODO:
// https://en.wikipedia.org/wiki/Factor_(chord)
// It may still be useful to break Chord Factors into their own class vs using Interval

import { IntervalQuality } from "./IntervalQuality";
import { IntervalScaleDegree } from "./IntervalScaleDegree";

export class Interval {
  name: string; // The name of the interval (e.g., "Perfect unison", "Major third").
  nameOrdinal: string; // The ordinal name of the interval (e.g., "Perfect", "Major 3rd").
  shortHand: string; // A short representation of the interval (e.g., "P1", "M3").
  semitones: number;
  quality: IntervalQuality; // The quality of the interval (e.g., "perfect", "major", "minor", "diminished", "augmented").
  scaleDegree: IntervalScaleDegree; // Describes the interval's function in a scale or chord (e.g., "root", "third", "fifth").
  aliases: Interval[]; // Aliases are other intervals that are enharmonically equivalent to this interval
  priority: number; // Priority is used to determine the importance of the interval in a chord, with higher numbers indicating less important intervals - could also apply to scales

  constructor(semitones: number, quality: IntervalQuality, scaleDegree: IntervalScaleDegree, aliases?: Interval[], priority: number = 1) {
    this.semitones = semitones;
    this.quality = quality;
    this.scaleDegree = scaleDegree;
    this.aliases = aliases ?? [];
    this.priority = priority;

    this.name = this.getFullNameSpelledOut();
    this.nameOrdinal = this.getFullNameOrdinal();
    this.shortHand = this.getShorthand();
  }

  getFullNameSpelledOut(): string {
    return `${this.quality.name} ${this.scaleDegree.name}`;
  }

  getFullNameOrdinal(): string {
    return `${this.quality.name} ${this.scaleDegree.ordinal}`;
  }

  getShorthand(): string {
    return `${this.quality.shortHands[0]}${this.scaleDegree.numeric}`;
  }

  addAliasInterval(interval: Interval): void {
    this.aliases.push(interval);
  }

  // check if an Interval is similar to this one
  // e.g. M3 and d4 are enharmonically equivalent because they share the same number of semitones
  isSimilar(interval: Interval): boolean {
    // check the basics
    if (interval.semitones === this.semitones) {
      return true;
    }

    // check aliases for a match
    const aliasInterval: Interval | undefined = this.aliases.find(
      (alias) => alias.semitones === interval.semitones,
    );

    return !!aliasInterval; // force into a bool type (undefined ==> false);
  }

  isRoot(): boolean {
    return this.semitones === 0;
  }

  isHalfStep(): boolean {
    return this.semitones === 1;
  }

  isHalfTone(): boolean {
    return this.semitones === 1;
  }

  isWholeStep(): boolean {
    return this.semitones === 2;
  }

  isWholeTone(): boolean {
    return this.semitones === 2;
  }

  isTritone(): boolean {
    return this.semitones === 6;
  }

  //NOLAN TODO:
  // Remove if not needed
  // hasAliasQuality(quality: number) {
  //   const alias = this.aliases.find((a) => a.quality === quality);
  //   return typeof alias !== "undefined";
  // }

  toJSON() {
    return {
      semitones: this.semitones,
      aliases: this.aliases,
      priority: this.priority,
      name: this.name,
      nameOrdinal: this.nameOrdinal,
      shortHand: this.shortHand,
      quality: this.quality,
      scaleDegree: this.scaleDegree,
    };
  }

  valueOf() {
    return JSON.stringify(this);
  }

  toString() {
    return JSON.stringify(this);
  }
}
