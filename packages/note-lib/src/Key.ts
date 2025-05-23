import { Note } from "./Note";
import { Scale } from "./Scale";

import scales from "./data/scales";
import { NotePitch } from "./enums/NotePitch";
import * as util from "./util";
import isEqual from "lodash/isEqual";

export class Key {
  name: string;
  tonic: Note; // the tonic note AKA the root note or first scale degree
  scale: Scale;
  notesInKey: Note[];
  constructor(tonic: Note, scale: Scale) {
    this.tonic = tonic;
    this.scale = scale;
    this.name = this.getDisplayName();
    this.notesInKey = this.getNotesInKey();
  }

  // Given a key's note and scale, return equivalent keys if you were to transpose into other notes & scales
  // e.g. the B Lydian scale is exactly the same series of notes as the Bb neapolitan minor or Db mixolydian, just with a different note designated as the 'key' or root.
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
          const newScaleArray = [];
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

    const sortedEquivKeys = util.sortKeysByTonicAndScale(equivKeys, this);
    return sortedEquivKeys;
  }

  toJSON() {
    return {
      name: this.name,
      tonic: this.tonic,
      scale: this.scale,
      notesInKey: this.notesInKey,
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
