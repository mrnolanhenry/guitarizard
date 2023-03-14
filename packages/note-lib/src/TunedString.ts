import type { Note } from "./Note";
import type { Temperament } from "./Temperament";

/**
 *  A string that exists in
 *  the given `temperament`
 *
 * @param 'tuningNote' - what is this strings tuning note?
 * @param 'material' - what material is this string made out of?
 * @param 'gauge' - what gauge (in millimeters) is this string?
 */
export class TunedString {
  id: string;
  tuningNote: Note;
  material: string;
  gauge: number;

  constructor(id: string, tuningNote: Note, material: string, gauge: number) {
    this.id = id;
    this.tuningNote = tuningNote;
    this.material = material;
    this.gauge = gauge;
  }

  setTuningNote(note: Note) {
    this.tuningNote = note;
  }

  /**
   * If this string was sitting on a fret board,
   * return the notes associated with it up to
   * the given `fretSpan`
   */
  getFrettedNotes(temperament: Temperament, fretSpan: number) {
    const frettedNotes = [];

    for (let i = 0; i <= fretSpan; i++) {
      const note = temperament.getNextNote(this.tuningNote, i);
      frettedNotes.push(note);
    }

    return frettedNotes;
  }

  toJSON() {
    return {
      tuningNote: this.tuningNote,
      material: this.material,
      gauge: this.gauge,
    };
  }

  valueOf() {
    return JSON.stringify(this);
  }

  toString() {
    return JSON.stringify(this);
  }
}
