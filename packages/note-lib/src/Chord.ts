import { Note } from "./Note";
import { ChordType } from "./ChordType";

import chordTypes from "./data/chordTypes";
import * as util from "./util";
import isEqual from "lodash/isEqual";
import { NotePitch } from "./enums/NotePitch";

export class Chord {
  name: string;
  root: Note;
  chordType: ChordType;
  notesInChord: Note[];
  constructor(root: Note, chordType: ChordType) {
    this.root = root;
    this.chordType = chordType;
    this.name = this.getDisplayName();
    this.notesInChord = this.getNotesInChord();
  }

  // Given a chord's note and chordType, return equivalent chords if you were to transpose into other notes & chordTypes
  // e.g. the E m7b5 chord is exactly the same series of notes as the G m6 chord (and E dim7 chord), just with a different note designated as the root.
  getEquivChords(): Chord[] {
    const equivChords: Chord[] = [];
    const chordTypeArray: number[] = [];
    const chordTypeLength: number = this.chordType.intervals.length;

    // Fill array of intervalsBySemitones for the given chordType
    for (let i = 0; i < chordTypeLength; i++) {
      chordTypeArray.push(this.chordType.intervals[i].semitones as number);
    }

    // Loop through each note in the temperament to check for equivalent chordTypes given that note
    for (let j = 0; j < this.chordType.temperament.notes.length; j++) {
      const noteInterval = this.chordType.temperament.getSemitonesBetweenNotes(
        this.root,
        this.chordType.temperament.notes[j],
      );
      // Loop through each chordType and create an array of intervalsBySemitones that we adjust by the interval between the respective root notes
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
    return this.root.id + " " + this.chordType.shortHand;
  }

  getFullNames(): string[] {
    return this.chordType.names.map((name) => this.root.id + " " + name);
  }

  toJSON() {
    return {
      name: this.name,
      root: this.root,
      chordType: this.chordType,
      notesInChord: this.notesInChord,
    };
  }

  valueOf() {
    return JSON.stringify(this);
  }

  toString() {
    return JSON.stringify(this);
  }

  // Get all notes that are in the key
  private getNotesInChord(): Note[] {
    // start the temperament at the correct note
    const shiftedNotes: Note[] = this.chordType.temperament.getShiftedNotes(this.root);

    // pull correct note aliases
    const notes: Note[] = shiftedNotes.map((note) => {
      if (this.root.pitch === NotePitch.Sharp) {
        const sharpNote = note.findSharp();
        if (sharpNote) {
          return sharpNote;
        }
      }

      return note;
    });

    // map notes to given intervals
    return this.chordType.intervals.map((interval) => {
      return notes[interval.semitones % this.chordType.temperament.notes.length];
    });
  }
}
