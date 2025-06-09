import { Chord } from "./Chord";
import { Note } from "./Note";
import { NoteCollection } from "./NoteCollection";
import { Scale } from "./Scale";
import chordTypes from "./data/chordTypes";

import scales from "./data/scales";
import { NotePitch } from "./enums/NotePitch";
import * as util from "./util";
import isEqual from "lodash/isEqual";

export class Key extends NoteCollection {
  name: string;
  tonic: Note; // the tonic note AKA the root note or first scale degree
  scale: Scale;
  notes: Note[];
  constructor(tonic: Note, scale: Scale) {
    super();
    this.tonic = tonic;
    this.scale = scale;
    this.name = this.getDisplayName();
    this.notes = this.getNotesInKey();
  }

  // Return equivalent keys if you were to transpose into other notes & scales
  // e.g. the B Lydian scale is exactly the same series of notes as the Bb neapolitan minor or Db mixolydian, just with a different note designated as the 'tonic' or root.
  getEquivKeys(): Key[] {
    const equivKeys: Key[] = [];
    const scaleArray: number[] = [];
    const scaleLength: number = this.scale.intervals.length;

    // Fill array of intervalsBySemitones for the given scale
    for (let i = 0; i < scaleLength; i++) {
      scaleArray.push(this.scale.intervals[i].semitones as number);
    }

    // Remove last semitone, which should be the duplicate '12' note in a twelveTET system, for example.
    scaleArray.pop();

    // Loop through each note in the temperament to check for equivalent scales given that note
    for (let j = 0; j < this.scale.temperament.notes.length; j++) {
      const noteInterval = this.scale.temperament.getSemitonesBetweenNotes(
        this.tonic,
        this.scale.temperament.notes[j],
      );
      // Loop through each scale and create an array of intervalsBySemitones that we adjust by the interval between the key notes
      for (let k = 0; k < scales.length; k++) {
        // This if check is only here to speed up function - testing dropped from ~71ms to ~47ms
        if (scaleLength === scales[k].intervals.length) {
          const newScaleArray: number[] = [];
          for (let l = 0; l < scales[k].intervals.length; l++) {
            newScaleArray.push(
              (scales[k].intervals[l].semitones + noteInterval) %
                this.scale.temperament.notes.length,
            );
          }

          // Remove last semitone, which should be some offset of the duplicate '12' note in a twelveTET system, for example.
          newScaleArray.pop();
          util.sortNumericArray(newScaleArray);
          
          // Check if arrays are equal after having sorted the newScale
          if (isEqual(scaleArray, newScaleArray)) {
            const key = new Key(this.scale.temperament.notes[j], scales[k]);
            equivKeys.push(key);

            const aliasNotes = this.scale.temperament.notes[j].aliasNotes;
            aliasNotes.forEach((aliasNote) => {
                const aliasKey = new Key(aliasNote, scales[k]);
                equivKeys.push(aliasKey);
            });
          }
        }
      }
    }
    return util.sortKeysByTonicAndScale(equivKeys, this);
  }

  
  // Return equivalent keys if you were to transpose into other notes & scales (given array of keys to filter)
  // e.g. the E m7b5 chord is exactly the same series of notes as the G m6 chord (and E dim7 chord), just with a different note designated as the root.
  getEquivKeysFromArray(keys: Key[]): Key[] {
    return keys.filter((key: Key) => {
      return this.sharesEquivalentNotes(key);
    });
  }

  // Return Chords that include equivalent Notes as this Chord's notes
  getIncludedChords(): Chord[] {
    const includedChords: Chord[] = [];
    const scaleArray: number[] = [];
    const scaleLength: number = this.scale.intervals.length;

    // Fill array of intervalsBySemitones for the given scale
    for (let i = 0; i < scaleLength; i++) {
      scaleArray.push(this.scale.intervals[i].semitones as number);
    }

    // Remove last semitone, which should be the duplicate '12' note in a twelveTET system, for example.
    scaleArray.pop();

    // Loop through each note in the temperament to check for equivalent scales given that note
    for (let j = 0; j < this.scale.temperament.notes.length; j++) {
      const semitonesFromTonic = this.scale.temperament.getSemitonesBetweenNotes(
        this.tonic,
        this.scale.temperament.notes[j],
      );
      // Loop through each scale and create an array of intervalsBySemitones that we adjust by the interval between the key notes
      for (let k = 0; k < chordTypes.length; k++) {
        const newChord = new Chord(this.scale.temperament.notes[j], chordTypes[k]);
        
        // Check if this scale includes notes of new chord after having sorted the newScale
        if (this.includesChord(newChord)) {
          includedChords.push(newChord);
          const aliasNotes = this.scale.temperament.notes[j].aliasNotes;
          aliasNotes.forEach((aliasNote) => {
              const aliasChord = new Chord(aliasNote, chordTypes[k]);
              includedChords.push(aliasChord);
          });
        }
        const newSlashChords = newChord.getSlashChords();
        newSlashChords.forEach((slashChord) => {
          if(this.includesEquivalentNotes(slashChord)) {
            includedChords.push(slashChord);
            const aliasNotes = slashChord.root.aliasNotes;
            aliasNotes.forEach((aliasNote) => {
              const aliasSlashChord = new Chord(aliasNote, slashChord.chordType);
              includedChords.push(aliasSlashChord);
            });
          }
        });
      }
    }
    return util.sortChordsByRoot(includedChords);
  }

  // // Return Chords that include equivalent Notes as this Chord's notes
  // getIncludedChords(): Chord[] {
  //   const includedChords: Chord[] = [];
  //   const scaleArray: number[] = [];
  //   const scaleLength: number = this.scale.intervals.length;

  //   // Fill array of intervalsBySemitones for the given scale
  //   for (let i = 0; i < scaleLength; i++) {
  //     scaleArray.push(this.scale.intervals[i].semitones as number);
  //   }

  //   // Remove last semitone, which should be the duplicate '12' note in a twelveTET system, for example.
  //   scaleArray.pop();

  //   // Loop through each note in the temperament to check for equivalent scales given that note
  //   for (let j = 0; j < this.scale.temperament.notes.length; j++) {
  //     const semitonesFromTonic = this.scale.temperament.getSemitonesBetweenNotes(
  //       this.tonic,
  //       this.scale.temperament.notes[j],
  //     );
  //     // Loop through each scale and create an array of intervalsBySemitones that we adjust by the interval between the key notes
  //     for (let k = 0; k < chordTypes.length; k++) {
  //       const newChordArray: number[] = [];
  //       for (let l = 0; l < chordTypes[k].intervals.length; l++) {
  //         newChordArray.push(
  //           (chordTypes[k].intervals[l].semitones + semitonesFromTonic) %
  //             this.scale.temperament.notes.length,
  //         );
  //       }

  //       util.sortNumericArray(newChordArray);
        
  //       const isIncluded = newChordArray.every((semitone) => scaleArray.includes(semitone));

  //       // Check if arrays are equal after having sorted the newScale
  //       if (isIncluded) {
  //         const chord = new Chord(this.scale.temperament.notes[j], chordTypes[k]);
  //         includedChords.push(chord);

  //         const aliasNotes = this.scale.temperament.notes[j].aliasNotes;
  //         aliasNotes.forEach((aliasNote) => {
  //             const aliasChord = new Chord(aliasNote, chordTypes[k]);
  //             includedChords.push(aliasChord);
  //         });
  //       }
  //     }
  //   }
  //   return util.sortChordsByRoot(includedChords);
  // }

  // Given an array of Chords to filter,
  // Return Chords that include equivalent Notes as this Chord's notes
  getIncludedChordsFromArray(chords: Chord[]): Chord[] {
    return chords.filter((chord: Chord) => {
      return this.includesChord(chord);
    });
  }

  // Given a Chord,
  // Return true if the Chord includes equivalent Notes as this Key's notes
  includesChord(chord: Chord) {
    return this.includesEquivalentNotes(chord)
  }

  // Generic method derived from NoteCollection that makes logic simpler when using ambiguous types of 
  // Keys or Chords & Scales or ChordTypes 
  getIntervalCollection() {
    return this.scale;
  }

  toJSON() {
    return {
      name: this.name,
      tonic: this.tonic,
      scale: this.scale,
      notes: this.notes,
    };
  }

  valueOf() {
    return JSON.stringify(this);
  }

  toString() {
    return JSON.stringify(this);
  }

  private getDisplayName(): string {
    return this.tonic.id + " " + this.scale.name;
  }

  // Get all notes that are in the key
  private getNotesInKey(): Note[] {
    // start the temperament at the correct note
    const shiftedNotes: Note[] = this.scale.temperament.getShiftedNotes(this.tonic);

    // pull correct note aliases
    const notes: Note[] = shiftedNotes.map((note) => {
      if (this.tonic.pitch === NotePitch.Sharp) {
        const sharpNote = note.findSharp();
        if (sharpNote) {
          return sharpNote;
        }
      }

      return note;
    });

    // map notes to given intervals
    return this.scale.intervals.map((interval) => {
      return notes[interval.semitones % this.scale.temperament.notes.length];
    });
  }
}
