import { Note } from "./Note";
import { ChordType } from "./ChordType";

import chordtypes from "./data/chordtypes";
import * as util from "./util";
import isEqual from "lodash/isEqual";

export class Chord {
  note: Note;
  chordtype: ChordType;
  constructor(note: Note, chordtype: ChordType) {
    this.note = note;
    this.chordtype = chordtype;
  }

  // Given a key's note and chordtype, return equivalent keys if you were to transpose into other notes & chordtypes
  // e.g. the B Lydian chordtype is exactly the same series of notes as the Bb neapolitan minor or Db mixolydian, just with a different note designated as the 'key' or root.
  getEquivChords(): Chord[] {
    const equivChords: Chord[] = [];
    const chordtypeArray: number[] = [];
    const chordtypeLength: number = this.chordtype.intervals.length;

    // Fill array of intervalsBySemitones for the given chordtype
    for (let i = 0; i < chordtypeLength; i++) {
      chordtypeArray.push(this.chordtype.intervals[i].semitones as number);
    }

    // Remove last semitone, which should be the duplicate '12' note in a twelveTET system, for example.
    chordtypeArray.pop();

    // Loop through each note in the temperament to check for equivalent chordtypes given that note
    for (let j = 0; j < this.chordtype.temperament.notes.length; j++) {
      const noteInterval = this.chordtype.temperament.getNoteInterval(
        this.note,
        this.chordtype.temperament.notes[j],
      );
      // Loop through each chordtype and create an array of intervalsBySemitones that we adjust by the interval between the key notes
      for (let k = 0; k < chordtypes.length; k++) {
        // This if check is only here to speed up function - testing dropped from ~71ms to ~47ms
        if (chordtypeLength === chordtypes[k].intervals.length) {
          const newChordTypeArray = [];
          for (let l = 0; l < chordtypes[k].intervals.length; l++) {
            newChordTypeArray.push(
              (chordtypes[k].intervals[l].semitones + noteInterval) %
                this.chordtype.temperament.notes.length,
            );
          }

          // Remove last semitone, which should be some offset of the duplicate '12' note in a twelveTET system, for example.
          newChordTypeArray.pop();
          util.sortNumericArray(newChordTypeArray);

          // Check if arrays are equal after having sorted the newChordType
          if (isEqual(chordtypeArray, newChordTypeArray)) {
            const key = new Chord(this.chordtype.temperament.notes[j], chordtypes[k]);
            equivChords.push(key);
          }
        }
      }
    }
    return equivChords;
  }

  getDisplayName(): string {
    return this.note.id + " " + this.chordtype.shortHand;
  }

  getFullNames(): string[] {
    return this.chordtype.names.map((name) => this.note.id + " " + name);
  }

  toJSON() {
    return {
      note: this.note,
      chordtype: this.chordtype,
    };
  }

  valueOf() {
    return JSON.stringify(this);
  }

  toString() {
    return JSON.stringify(this);
  }
}
