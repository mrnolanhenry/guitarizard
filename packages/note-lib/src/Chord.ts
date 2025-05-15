import { Note } from "./Note";
import { ChordType } from "./ChordType";

import chordTypes from "./data/chordTypes";
import * as util from "./util";
import isEqual from "lodash/isEqual";

export class Chord {
  note: Note;
  chordType: ChordType;
  constructor(note: Note, chordType: ChordType) {
    this.note = note;
    this.chordType = chordType;
  }

  // Given a key's note and chordType, return equivalent keys if you were to transpose into other notes & chordTypes
  // e.g. the B Lydian chordType is exactly the same series of notes as the Bb neapolitan minor or Db mixolydian, just with a different note designated as the 'key' or root.
  getEquivChords(): Chord[] {
    const equivChords: Chord[] = [];
    const chordTypeArray: number[] = [];
    const chordTypeLength: number = this.chordType.intervals.length;

    // Fill array of intervalsBySemitones for the given chordType
    for (let i = 0; i < chordTypeLength; i++) {
      chordTypeArray.push(this.chordType.intervals[i].semitones as number);
    }

    // Remove last semitone, which should be the duplicate '12' note in a twelveTET system, for example.
    chordTypeArray.pop();

    // Loop through each note in the temperament to check for equivalent chordTypes given that note
    for (let j = 0; j < this.chordType.temperament.notes.length; j++) {
      const noteInterval = this.chordType.temperament.getSemitonesBetweenNotes(
        this.note,
        this.chordType.temperament.notes[j],
      );
      // Loop through each chordType and create an array of intervalsBySemitones that we adjust by the interval between the key notes
      for (let k = 0; k < chordTypes.length; k++) {
        // This if check is only here to speed up function - testing dropped from ~71ms to ~47ms
        if (chordTypeLength === chordTypes[k].intervals.length) {
          const newChordTypeArray = [];
          for (let l = 0; l < chordTypes[k].intervals.length; l++) {
            newChordTypeArray.push(
              (chordTypes[k].intervals[l].semitones + noteInterval) %
                this.chordType.temperament.notes.length,
            );
          }

          // Remove last semitone, which should be some offset of the duplicate '12' note in a twelveTET system, for example.
          newChordTypeArray.pop();
          util.sortNumericArray(newChordTypeArray);

          // Check if arrays are equal after having sorted the newChordType
          if (isEqual(chordTypeArray, newChordTypeArray)) {
            const key = new Chord(this.chordType.temperament.notes[j], chordTypes[k]);
            equivChords.push(key);
          }
        }
      }
    }
    return equivChords;
  }

  getDisplayName(): string {
    return this.note.id + " " + this.chordType.shortHand;
  }

  getFullNames(): string[] {
    return this.chordType.names.map((name) => this.note.id + " " + name);
  }

  toJSON() {
    return {
      note: this.note,
      chordType: this.chordType,
    };
  }

  valueOf() {
    return JSON.stringify(this);
  }

  toString() {
    return JSON.stringify(this);
  }
}
