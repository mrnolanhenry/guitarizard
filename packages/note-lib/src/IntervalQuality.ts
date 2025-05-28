/* eslint-disable @typescript-eslint/no-unsafe-argument */
// Useful Table:
// https://en.wikipedia.org/wiki/Interval_(music)

import { IntervalQualityName, IntervalQualityShortHand, IntervalQualitySymbol } from "./enums/IntervalQualityEnums";

export class IntervalQuality {
  name: IntervalQualityName; // The name of the interval quality (e.g., "Perfect", "Major", "Diminished").
  shortHands: IntervalQualityShortHand[]; // A short representation of the interval (e.g., "P", "M","d").
  symbols?: IntervalQualitySymbol[]; // Symbols that represent the interval quality (e.g., "P", "M", "m", "A", "d").

  constructor(name: IntervalQualityName, shortHands?: IntervalQualityShortHand[], symbols?: IntervalQualitySymbol[]) {
    this.name = name;
    this.shortHands = shortHands ?? this.getDefaultShortHand();
    this.symbols = this.symbols;
  }
  
    getDefaultShortHand(): IntervalQualityShortHand[] {
        const shouldLowerCase = this.isMinor() || this.isDiminished();
        const initial = this.name.substring(0, 1);
        const shortHand =  shouldLowerCase ? initial.toLowerCase() as IntervalQualityShortHand : initial as IntervalQualityShortHand;
        return [shortHand];
    }

    isPerfect(): boolean {
        return this.name === IntervalQualityName.Perfect;
    }

    isMajor(): boolean {
        return this.name === IntervalQualityName.Major;
    }

    isMinor(): boolean {
        return this.name === IntervalQualityName.Minor;
    }

    isAugmented(): boolean {
        return this.name === IntervalQualityName.Augmented;
    }

    isDiminished(): boolean {
        return this.name === IntervalQualityName.Diminished;
    }

    toJSON() {
        return {
        name: this.name,
        shortHands: this.shortHands,
        symbols: this.symbols,
        };
    }

    valueOf() {
        return JSON.stringify(this);
    }

    toString() {
        return JSON.stringify(this);
    }
}
