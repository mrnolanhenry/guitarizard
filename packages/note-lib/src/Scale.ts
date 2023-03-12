import { Interval } from "./Interval";
import { ScaleSystem } from "./ScaleSystem";
import { mainIntervals } from "./data/intervals";
import { Note } from "./Note";

/**
 * A single scale.
 *
 * e.g. "play me the Blues scale, bro"
 *
 * If you were a formal person, you'd call this a "mode".
 */
export class Scale {
  name: string;
  scaleSystem: ScaleSystem;
  intervals: Interval[];

  constructor(
    name: string,
    scaleSystem: ScaleSystem,
    intervalsBySemitones: number[]
  ) {
    this.name = name;
    this.scaleSystem = scaleSystem;
    this.intervals = intervalsBySemitones.map(
      (semitone) => mainIntervals[semitone]
    );
  }

  getNotesInKey(keyNote: Note) {
    // start the scale system at the correct note
    const shiftedNotes = this.scaleSystem.getShiftedNotes(keyNote);

    // pull correct note aliases
    const notes = shiftedNotes.map((note) => {
      if (keyNote.attributes.isSharp) {
        const sharpNote = note.findSharp();
        if (sharpNote) {
          return sharpNote;
        }
      }

      return note;
    });

    // map notes to given intervals
    return this.intervals.map((interval) => {
      return notes[interval.semitones % this.scaleSystem.notes.length];
    });
  }

  // Given a scale, return equivalent scales that have the same notes
  // e.g. the Ionian scale is exactly the same series of notes as the Major scale and Ethiopian (a raray) scale.
  getEquivScales(scales: Scale[]) {
    let equivScales = [];
    let scaleLength = this.intervals.length;

    // Loop through each scale
    for (let i = 0; i < scales.length; i++) {
      // Loop through each scale's intervals
      loopThruIntervals: {
        // This if check is only here to speed up function
        if (scaleLength === scales[i].intervals.length) {
          for (let j = 0; j < scales[i].intervals.length; j++) {
            if (
              this.intervals[j].semitones !== scales[i].intervals[j].semitones
            ) {
              break loopThruIntervals;
            }
          }
          equivScales.push(scales[i]);
        }
      }
    }
    return equivScales;
  }

  toJSON() {
    return {
      name: this.name,
      scaleSystem: this.scaleSystem,
      intervals: this.intervals,
    };
  }

  valueOf() {
    return JSON.stringify(this);
  }

  toString() {
    return JSON.stringify(this);
  }
}
