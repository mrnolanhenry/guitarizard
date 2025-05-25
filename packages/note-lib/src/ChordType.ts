import { Temperament } from "./Temperament";
import { Note } from "./Note";
import { NotePitch } from "./enums/NotePitch";
import { Interval } from "./Interval";

/**
 * A single chord "type."
 *
 * e.g. "7th chord" or "major chord"
 *
 * Technically this would be called a chord.
 * NOT to be confused with specifying the key note and its chord type, like "C7" or "Em."
 * For simplicity, THAT level of specificity (i.e. key note and chord type together) will be referred to as a chord. 
 * A chord's "type" or "family" will not tell you which notes to play, like A# or Eb, but instead about the intervals within the chord.
 * So, a "ChordType" is to a "Chord," what a "Scale" is to a "Key"
 */
export class ChordType {
  // shortHand e.g. "m7" or "maj13"
  shortHand: string;
  temperament: Temperament;
  intervals: Interval[];
  // array of names e.g. ["minor 7", "minor 7th"]
  names: string[];

  constructor(
    shortHand: string,
    temperament: Temperament,
    intervals: Interval[],
    names?: string[],
  ) {
    this.shortHand = shortHand;
    this.names = names ? [...names, shortHand] : [shortHand];
    this.temperament = temperament;
    this.intervals = intervals;
  }

  // Return chord types that have the exact same intervals (checks by comparing interval names)
  // E.g. 9#5 and aug9 have the same intervals (including order of Intervals and 
  // each Interval's quality and scaleDegree), but different names.
  getIdenticalChordTypes(chordTypes: ChordType[]): ChordType[] {
    return chordTypes.filter((chordType: ChordType) => {
      return this.sharesIdenticalIntervalNames(chordType);
    });
  }

  // Return chord types that have equivalent Intervals as this ChordType's in terms of semitones
  // E.g. maj7add13 and maj7add6 have different names and a different order of Intervals,
  // with different Interval qualities and scaleDegrees, but based on their semitones, 
  // a Cmaj7add13 and a Cmaj7add6 would ultimately comprise the same notes in each chord.
  getEquivChordTypes(chordTypes: ChordType[]): ChordType[] {
    return chordTypes.filter((chordType: ChordType) => {
      return this.sharesEquivalentSemitones(chordType);
    });
  }

  // Return chord types that have the exact same intervals (checks by comparing interval names) 
  // and possibly more intervals, i.e. what other ChordTypes does this ChordType fit into?
  // E.g. if "this" ChordType is "major", it would return "major 6th", among many others
  getChordTypesWithSameOrMoreIntervalNames(chordTypes: ChordType[]): ChordType[] {
    return chordTypes.filter((chordType: ChordType) => {
      return chordType.includesIdenticalIntervalNames(this);
    });
  }

  // Return chord types that have identical Intervals as this ChordType's in terms of semitones
  // and possibly more intervals, i.e. what other ChordTypes does this ChordType fit into?
  // E.g. if "this" ChordType is "major", it would return "major 6th", among many others
  getChordTypesWithSameOrMoreSemitones(chordTypes: ChordType[]): ChordType[] {
    return chordTypes.filter((chordType: ChordType) => {
      return chordType.includesIdenticalSemitones(this);
    });
  }

  // Return chord types that have equivalent Intervals as this ChordType's in terms of semitones
  // and possibly more intervals, i.e. what other ChordTypes does this ChordType fit into?
  // E.g. if "this" ChordType is "major", it would return "major 6th", among many others
  getChordTypesWithEquivOrMoreSemitones(chordTypes: ChordType[]): ChordType[] {
    return chordTypes.filter((chordType: ChordType) => {
      return chordType.includesEquivalentSemitones(this);
    });
  }

  // Given another ChordType,
  // return true if the amount of Intervals in the other ChordType are the same as the amount in this ChordType
  // AND all the Interval names in the other ChordType match the Interval names in this ChordType
  // In other words, this ChordType "shares" all the same intervals as otherChordType
  sharesIdenticalIntervalNames(otherChordType: ChordType): boolean {
    return this.intervals.length === otherChordType.intervals.length && this.includesIdenticalIntervalNames(otherChordType);
  };

  // Given another ChordType,
  // return true if the amount of Intervals in the other ChordType are the same as the amount in this ChordType
  // AND all the Interval semitones in the other ChordType match the Interval semitones in this ChordType
  // In other words, this ChordType "shares" all the same intervals as otherChordType
  sharesIdenticalSemitones(otherChordType: ChordType): boolean {
    return this.intervals.length === otherChordType.intervals.length && this.includesIdenticalSemitones(otherChordType);
  };

  // Given another ChordType,
  // return true if the amount of Intervals in the other ChordType are the same as the amount in this ChordType
  // AND all the Interval semitones in the other ChordType match the Interval semitones in this ChordType
  // OR their enharmonic equivalent Intervals (e.g. a minor 13rd and a minor 6th are equivalent in 12TET)
  // In other words, this ChordType "shares" all the same intervals as otherChordType, or equivalent intervals
  sharesEquivalentSemitones(otherChordType: ChordType): boolean {
    return this.intervals.length === otherChordType.intervals.length && this.includesEquivalentSemitones(otherChordType);
  };

  // Given another ChordType,
  // return true if all the Interval names in the other ChordType match the Interval names in this ChordType
  // In other words, this ChordType "includes" the intervals of otherChordType
  includesIdenticalIntervalNames(otherChordType: ChordType): boolean {
    return this.compareChordTypesByName(otherChordType);
  };

  // Given another ChordType,
  // return true if all the Interval semitones in the other ChordType match the Interval semitones in this ChordType
  // In other words, this ChordType "includes" the intervals of otherChordType
  includesIdenticalSemitones(otherChordType: ChordType): boolean {
    return this.compareChordTypesBySemitones(otherChordType, false);
  };

  // Given another ChordType,
  // return true if all the Interval semitones in the other ChordType match the Interval semitones in this ChordType
  // OR their enharmonic equivalent Intervals (e.g. a minor 13rd and a minor 6th are equivalent in 12TET)
  // In other words, this ChordType "includes" the intervals of otherChordType, or equivalent intervals
  includesEquivalentSemitones(otherChordType: ChordType): boolean {
    return this.compareChordTypesBySemitones(otherChordType);
  };
  
  toJSON() {
    return {
      shortHand: this.shortHand,
      temperament: this.temperament,
      intervals: this.intervals,
      names: this.names,
    };
  }

  valueOf() {
    return JSON.stringify(this);
  }

  toString() {
    return JSON.stringify(this);
  }

  // Given another ChordType,
  // return true if every interval in the other ChordType is found by name in this ChordType
  private compareChordTypesByName(otherChordType: ChordType): boolean {
    const namesInThisChordType: string[] = this.intervals.map((interval: Interval) => interval.name);
    return otherChordType.intervals.every((currentInterval: Interval) => {
      return namesInThisChordType.includes(currentInterval.name);
    });
  }

  // Given another ChordType,
  // return true if every interval in the other ChordType is found by the number of semitones in this ChordType
  // Optionally pass false to specifically look for the exact number of semitones instead of the equivalent
  // e.g. by default, a minor 13th and a minor 6th will be treated as having the equivalent number of semitones,
  // since in practice they lead to the same note
  private compareChordTypesBySemitones(otherChordType: ChordType, allowEquivalentSemitones: boolean = true): boolean {
    const numberOfNotesInThisTemperament = this.temperament.notes.length;
    const numberOfNotesInOtherTemperament = otherChordType.temperament.notes.length;
    const semitonesInThisChordType : number[] = this.intervals.map((interval: Interval) => allowEquivalentSemitones ? interval.semitones % numberOfNotesInThisTemperament : interval.semitones);
    return otherChordType.intervals.every((currentInterval: Interval) => {
      return semitonesInThisChordType.includes(allowEquivalentSemitones ? currentInterval.semitones % numberOfNotesInOtherTemperament : currentInterval.semitones);
    });
  };
}
