import { Note } from "./Note";
import { Scale } from "./Scale";

import Scales from "./data/scales";
import * as util from "./util";
import isEqual from "lodash/isEqual";

export class Key {
  note: Note;
  scale: Scale;
  constructor(note: Note, scale: Scale) {
    this.note = note;
    this.scale = scale;
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
      const noteInterval = this.scale.temperament.getNoteInterval(
        this.note,
        this.scale.temperament.notes[j],
      );
      // Loop through each scale and create an array of intervalsBySemitones that we adjust by the interval between the key notes
      for (let k = 0; k < Scales.length; k++) {
        // This if check is only here to speed up function - testing dropped from ~71ms to ~47ms
        if (scaleLength === Scales[k].intervals.length) {
          const newScaleArray = [];
          for (let l = 0; l < Scales[k].intervals.length; l++) {
            newScaleArray.push(
              (Scales[k].intervals[l].semitones + noteInterval) %
                this.scale.temperament.notes.length,
            );
          }

          // Remove last semitone, which should be some offset of the duplicate '12' note in a twelveTET system, for example.
          newScaleArray.pop();
          util.sortNumericArray(newScaleArray);
          
          // Check if arrays are equal after having sorted the newScale
          if (isEqual(scaleArray, newScaleArray)) {
            const key = new Key(this.scale.temperament.notes[j], Scales[k]);
            equivKeys.push(key);

            const aliasNotes = this.scale.temperament.notes[j].aliasNotes;
            aliasNotes.forEach((aliasNote) => {
                const aliasKey = new Key(aliasNote, Scales[k]);
                equivKeys.push(aliasKey);
            });
          }
        }
      }
    }

    const sortedEquivKeys = util.sortKeysByNoteAndScale(equivKeys, this);
    return sortedEquivKeys;
  }

  getDisplayName(): string {
    return this.note.id + " " + this.scale.name;
  }

  toJSON() {
    return {
      note: this.note,
      scale: this.scale,
    };
  }

  valueOf() {
    return JSON.stringify(this);
  }

  toString() {
    return JSON.stringify(this);
  }
}
