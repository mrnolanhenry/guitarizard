import { Interval } from "./Interval";
import { Temperament } from "./Temperament";
import { mainIntervals } from "./data/intervals";
import { Note } from "./Note";
import { NotePitch } from "./enums/NotePitch";

/**
 * A single scale.
 *
 * e.g. "play me the Blues scale, bro"
 *
 * If you were a formal person, you'd call this a "mode".
 */
export class Scale {
  name: string;
  temperament: Temperament;
  intervals: Interval[];

  constructor(
    name: string,
    temperament: Temperament,
    intervalsBySemitones: number[]
  ) {
    this.name = name;
    this.temperament = temperament;
    this.intervals = intervalsBySemitones.map(
      (semitone) => mainIntervals[semitone]
    );
  }

  getNotesInKey(keyNote: Note): Note[] {
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

  // Given a scale, return equivalent scales that have the same notes
  // e.g. the Ionian scale is exactly the same series of notes as the Major scale and Ethiopian (a raray) scale.
  getEquivScales(scales: Scale[]): Scale[] {
    let equivScales: Scale[] = [];
    let scaleLength: number = this.intervals.length;

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
      temperament: this.temperament,
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
