import { Temperament } from "./Temperament";
import { Interval } from "./Interval";
import { IntervalCollection } from "./IntervalCollection";

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
export class ChordType extends IntervalCollection {
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
    super();
    this.shortHand = shortHand;
    this.names = names ? [...names, shortHand] : [shortHand];
    this.temperament = temperament;
    this.intervals = intervals;
  }

  // Return chord types that have the exact same intervals (checks by comparing interval names)
  // E.g. 9#5 and aug9 have the same intervals (including order of Intervals and 
  // each Interval's quality and scaleDegree), but different names.
  getIdenticalChordTypes(chordTypes: ChordType[]): ChordType[] {
    const identicalChordTypes: ChordType[] = [];
    const chordLength: number = this.intervals.length;

    // Loop through each scale
    for (let i = 0; i < chordTypes.length; i++) {
      // Loop through each scale's intervals
      // eslint-disable-next-line no-labels
      loopThruIntervals: {
        // This if check is only here to speed up function
        if (chordLength === chordTypes[i].intervals.length) {
          for (let j = 0; j < chordTypes[i].intervals.length; j++) {
            if (
              this.intervals[j].name !== chordTypes[i].intervals[j].name
            ) {
              // eslint-disable-next-line no-labels
              break loopThruIntervals;
            }
          }
          identicalChordTypes.push(chordTypes[i]);
        }
      }
    }
    return identicalChordTypes;
  }

  // NOLAN TODO:
  // This method is slightly less performant, but cleaner and doesn't depend on intervals being in a particular order. 
  // Consider using in the future if performance isn't a concern.
  // Return chord types that have the exact same intervals (checks by comparing interval names)
  // E.g. 9#5 and aug9 have the same intervals (including order of Intervals and 
  // each Interval's quality and scaleDegree), but different names.
  // getIdenticalChordTypes(chordTypes: ChordType[]): ChordType[] {
  //   return chordTypes.filter((chordType: ChordType) => {
  //     return this.sharesIdenticalIntervalNames(chordType);
  //   });
  // }

  // Return chord types that have equivalent Intervals as this ChordType's in terms of semitones
  // E.g. maj7add13 and maj7add6 have different names and a different order of Intervals,
  // with different Interval qualities and scaleDegrees, but based on their semitones, 
  // a Cmaj7add13 and a Cmaj7add6 would ultimately comprise the same notes in each chord.
  getEquivChordTypes(chordTypes: ChordType[]): ChordType[] {
    return chordTypes.filter((chordType: ChordType) => {
      return this.sharesEquivalentSemitones(chordType, this.temperament.notes.length);
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
      return chordType.includesEquivalentSemitones(this, this.temperament.notes.length);
    });
  }
  
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
}
