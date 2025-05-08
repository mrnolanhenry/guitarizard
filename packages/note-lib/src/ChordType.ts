import { Interval } from "./Interval";
import { Temperament } from "./Temperament";
import { mainIntervals } from "./data/intervals";
import { Note } from "./Note";
import { NotePitch } from "./enums/NotePitch";

/**
 * A single chord "type."
 *
 * e.g. "7th chord" or "major chord"
 *
 * Technically this is would be called a chord.
 * NOT to be confused with specifying the key note and its chord type, like "C7" or "Em."
 * For simplicity, THAT level of specificity (i.e. key note and chord type together) will be referred to as a chord. 
 * A chord's "type" will not tell you which notes to play, like A# or Eb, but instead about the intervals within the chord.
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
    intervalsBySemitones: number[],
    names?: string[],
  ) {
    this.shortHand = shortHand;
    this.names = names ? [...names, shortHand] : [shortHand];
    this.temperament = temperament;
    this.intervals = intervalsBySemitones.map(
      (semitone) => mainIntervals[semitone],
    );
  }

  getNotesFromKeyNote(keyNote: Note): Note[] {
    // start the temperament at the correct note
    const shiftedNotes: Note[] = this.temperament.getShiftedNotes(keyNote);

    // pull correct note aliases
    const notes: Note[] = shiftedNotes.map((note) => {
      if (keyNote.pitch === NotePitch.Sharp) {
        const sharpNote = note.findSharp();
        if (sharpNote) {
          return sharpNote;
        }
      }

      return note;
    });

    // map notes to given intervals
    return this.intervals.map((interval) => {
      return notes[interval.semitones % this.temperament.notes.length];
    });
  }

  // Given a chord type, return equivalent chord types that have the same intervals
  // NOLAN TODO - determine if this function is necessary or useful. 
  // There may not be cases of chord types overlapping in terms of intervals,
  // unless they go by different names in western vs. eastern theory
  // but these would have to still be under the same temperament anyways...
  // so, unlikely.
  getEquivChordTypes(scales: ChordType[]): ChordType[] {
    const equivChordTypes: ChordType[] = [];
    const scaleLength: number = this.intervals.length;

    // Loop through each scale
    for (let i = 0; i < scales.length; i++) {
      // Loop through each scale's intervals
      // eslint-disable-next-line no-labels
      loopThruIntervals: {
        // This if check is only here to speed up function
        if (scaleLength === scales[i].intervals.length) {
          for (let j = 0; j < scales[i].intervals.length; j++) {
            if (
              this.intervals[j].semitones !== scales[i].intervals[j].semitones
            ) {
              // eslint-disable-next-line no-labels
              break loopThruIntervals;
            }
          }
          equivChordTypes.push(scales[i]);
        }
      }
    }
    return equivChordTypes;
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
