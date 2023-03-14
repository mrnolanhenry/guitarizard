import { Note } from "./Note";
import { Scale } from "./Scale";

import Scales from "./data/scales";
import * as util from "./util";

export class Key {
  note: Note;
  scale: Scale;
  constructor(note: Note, scale: Scale) {
    this.note = note;
    this.scale = scale;
  }

  // Given a key's note and scale, return equivalent keys if you were to transpose into other notes & scales
  // e.g. the B Lydian scale is exactly the same series of notes as the Bb neapolitan minor or Db mixolydian, just with a different note designated as the 'key' or root.
  getEquivKeys() {
    let equivKeys = [];
    let scaleArray = [];
    let scaleLength = this.scale.intervals.length;

    // Fill array of intervalsBySemitones for the given scale
    for (let i = 0; i < scaleLength; i++) {
      scaleArray.push(this.scale.intervals[i].semitones);
    }

    // Remove last semitone, which should be the duplicate '12' note in a twelveTET system, for example.
    scaleArray.pop();

    // Loop through each note in the temperament to check for equivalent scales given that note
    for (let j = 0; j < this.scale.temperament.notes.length; j++) {
      let noteInterval = this.scale.temperament.getNoteInterval(
        this.note,
        this.scale.temperament.notes[j]
      );
      // Loop through each scale and create an array of intervalsBySemitones that we adjust by the interval between the key notes
      for (let k = 0; k < Scales.length; k++) {
        // This if check is only here to speed up function - testing dropped from ~71ms to ~47ms
        if (scaleLength === Scales[k].intervals.length) {
          let newScaleArray = [];
          for (let l = 0; l < Scales[k].intervals.length; l++) {
            newScaleArray.push(
              (Scales[k].intervals[l].semitones + noteInterval) %
                this.scale.temperament.notes.length
            );
          }

          // Remove last semitone, which should be some offset of the duplicate '12' note in a twelveTET system, for example.
          newScaleArray.pop();
          util.sortArray(newScaleArray);

          // Check if arrays are equal after having sorted the newScale
          if (util.isEqualArray1D(scaleArray, newScaleArray)) {
            let key = new Key(this.scale.temperament.notes[j], Scales[k]);
            equivKeys.push(key);
          }
        }
      }
    }
    return equivKeys;
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
