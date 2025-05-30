import { Note } from "./Note";
import { ChordType } from "./ChordType";

import chordTypes from "./data/chordTypes";
import * as util from "./util";
import isEqual from "lodash/isEqual";
import { NotePitch } from "./enums/NotePitch";
import { NoteCollection } from "./NoteCollection";
import { Key } from "./Key";
import scales from "./data/scales";

export class Chord extends NoteCollection{
  name: string;
  root: Note;
  chordType: ChordType;
  notes: Note[];
  constructor(root: Note, chordType: ChordType) {
    super();
    this.root = root;
    this.chordType = chordType;
    this.name = this.getDisplayName();
    this.notes = this.getNotesInChord();
  }

  // Return equivalent chords if you were to transpose into other notes & chordTypes
  // e.g. the E m7b5 chord is exactly the same series of notes as the G m6 chord (and E dim7 chord), just with a different note designated as the root.
  getEquivChords(): Chord[] {
    const equivChords: Chord[] = [];
    const chordTypeArray: number[] = [];
    const chordTypeLength: number = this.chordType.intervals.length;
    // Fill array of intervalsBySemitones for the given chordType
    for (let i = 0; i < chordTypeLength; i++) {
      chordTypeArray.push(this.chordType.intervals[i].semitones % this.chordType.temperament.notes.length);
    }
    util.sortNumericArray(chordTypeArray);

    // Loop through each note in the temperament to check for equivalent chordTypes given that note
    for (let j = 0; j < this.chordType.temperament.notes.length; j++) {
      const semitonesFromRoot = this.chordType.temperament.getSemitonesBetweenNotes(
        this.root,
        this.chordType.temperament.notes[j],
      );
      // Loop through each chordType and create an array of intervalsBySemitones that we adjust by the interval between the respective root notes
      for (let k = 0; k < chordTypes.length; k++) {
        // This if check is only here to speed up function - testing dropped from ~71ms to ~47ms
        if (chordTypeLength === chordTypes[k].intervals.length) {
          const newChordTypeArray: number[] = [];
          for (let l = 0; l < chordTypes[k].intervals.length; l++) {
            newChordTypeArray.push(
              (chordTypes[k].intervals[l].semitones + semitonesFromRoot) 
              % this.chordType.temperament.notes.length,
            );
          }

          util.sortNumericArray(newChordTypeArray);

          // Check if arrays are equal after having sorted the newChordType
          if (isEqual(chordTypeArray, newChordTypeArray)) {
            const chord = new Chord(this.chordType.temperament.notes[j], chordTypes[k]);
            equivChords.push(chord);

            const aliasNotes = this.chordType.temperament.notes[j].aliasNotes;
            aliasNotes.forEach((aliasNote) => {
                const aliasChord = new Chord(aliasNote, chordTypes[k]);
                equivChords.push(aliasChord);
            });
          }
        }
      }
    }
    return util.sortChordsByRoot(equivChords, this);;
  }

  // Return equivalent chords if you were to transpose into other notes & chordTypes (given array of chords to filter)
  // e.g. the E m7b5 chord is exactly the same series of notes as the G m6 chord (and E dim7 chord), just with a different note designated as the root.
  getEquivChordsFromArray(chords: Chord[]): Chord[] {
    return chords.filter((chord: Chord) => {
      return this.sharesEquivalentNotes(chord);
    });
  }

  // Return keys that include equivalent Notes as this Chord's notes
  getInclusiveKeys(): Key[] {
    const inclusiveKeys: Key[] = [];
    const chordTypeArray: number[] = [];
    const chordTypeLength: number = this.chordType.intervals.length;
    // Fill array of intervalsBySemitones for the given chordType
    for (let i = 0; i < chordTypeLength; i++) {
      chordTypeArray.push(this.chordType.intervals[i].semitones % this.chordType.temperament.notes.length);
    }
    util.sortNumericArray(chordTypeArray);

    // Loop through each note in the temperament to check for inclusive scales given that note
    for (let j = 0; j < this.chordType.temperament.notes.length; j++) {
      const semitonesFromRoot = this.chordType.temperament.getSemitonesBetweenNotes(
        this.root,
        this.chordType.temperament.notes[j],
      );
      // Loop through each chordType and create an array of intervalsBySemitones that we adjust by the interval between the respective root notes
      for (let k = 0; k < scales.length; k++) {
        const newScaleArray: number[] = [];
        for (let l = 0; l < scales[k].intervals.length; l++) {
          newScaleArray.push(
            (scales[k].intervals[l].semitones + semitonesFromRoot) 
            % this.chordType.temperament.notes.length,
          );
        }

        util.sortNumericArray(newScaleArray);

        const isInclusive = chordTypeArray.every((semitone) => newScaleArray.includes(semitone));

        // Check if arrays are equal after having sorted the newChordType
        if (isInclusive) {
          const key = new Key(this.chordType.temperament.notes[j], scales[k]);
          inclusiveKeys.push(key);

          const aliasNotes = this.chordType.temperament.notes[j].aliasNotes;
          aliasNotes.forEach((aliasNote) => {
              const aliasKey = new Key(aliasNote, scales[k]);
              inclusiveKeys.push(aliasKey);
          });
        }
      }
    }
    return util.sortKeysByTonicAndScale(inclusiveKeys);;
  }

  // Given an array of Keys to filter,
  // Return keys that include equivalent Notes as this Chord's notes
  getInclusiveKeysFromArray(keys: Key[]): Key[] {
    return keys.filter((key: Key) => {
      return this.isInKey(key);
    });
  }

  // Given a Key,
  // Return true if the Key includes equivalent Notes as this Chord's notes
  isInKey(key: Key) {
    return key.includesEquivalentNotes(this)
  }

  // Generic method derived from NoteCollection that makes logic simpler when using ambiguous types of 
  // Keys or Chords & Scales or ChordTypes 
  getIntervalCollection() {
    return this.chordType;
  }

  private getDisplayName(): string {
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
      notes: this.notes,
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
