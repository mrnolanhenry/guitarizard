import { IntervalScaleDegreeNumeric } from "./enums/IntervalScaleDegreeEnums";
import { Interval } from "./Interval";
import { Note, NoteID } from "./Note";

/**
 * A temperament is a musical system of defining intervals/notes... it's hard to explain.
 * https://en.wikipedia.org/wiki/Musical_temperament
 * https://en.wikipedia.org/wiki/Equal_temperament
 *
 * e.g. twelve-tone equal temperament (twelveTET or 12TET), the most common in western music, divides an octave into 12 intervals.
 * It also defines notes - you might think the number of notes needs to be equal to the number of intervals
 * but in twelveTET MORE than 12 Notes are defined (e.g. A# AND Bb).
 * and MORE than 12 Intervals are defined (e.g. major 6th AND diminished 7th, despite the same number of semitones).
 * INCLUDING intervals with more than 12 semitones for the purpose of chords (e.g. a 9th, 11th, and 13th).
 * When constructing the temperament though, you would first create each note and add either the sharps or flats as aliases
 * and THEN only pass 12 notes.
 * 
 *
 * If you were a formal person, you'd call this a "scale," but that could be confused with the other use of scale
 * as in "major" or "minor" scale.
 */
export class Temperament {
  name: string;
  intervals: Interval[];
  notes: Note[];

  constructor(name: string, intervals: Interval[], notes: Note[]) {
    this.name = name;
    this.intervals = intervals;
    this.notes = notes;
  }

  // Given an ID, e.g. "A#", return the "Note" instance
  // from this temperament.
  getNoteFromID(noteID: NoteID): Note | undefined {
    for (let i = 0; i < this.notes.length; i++) {
      const note: Note = this.notes[i];

      // easy -- found it right away
      if (note.id.toLowerCase() === noteID.toLowerCase()) {
        return note;
      }

      // else, check aliases for this note
      const aliasNote: Note | undefined = note.aliasNotes.find(
        (aliasNote) => aliasNote.id.toLowerCase() === noteID.toLowerCase(),
      );

      // return the note as it exists in the temperament
      // order and NOT the alias note. The note will
      // contain the alias should the consumer need it.
      if (typeof aliasNote !== "undefined") {
        return note;
      }
    }

    return undefined;
  }

  /**
   * Gets all notes for this temperament that can be used
   * as keys. Basically takes all availables notes, and
   * their aliases, and smushes them together.
   */
  getNotesInTemperament(): Note[] {
    return this.notes.reduce((acc: Note[], note: Note) => {
      acc = acc.concat(note.aliasNotes);
      acc = acc.concat([note]);
      return acc;
    }, []);
  }

    /**
   * Gets sort order from all availables notes and their aliases.
   */
    getSortOrderByNotes(): string[] {
      return this.getNotesInTemperament().map((note) => note.id);
    }

  /**
   * Our temperament defines an "order" that starts at
   * a given note. This function effectivly "shifts" the
   * notes so that the temperament starts at a different
   * note.
   *
   * This function
   */
  getShiftedNotes(fromNote: Note): Note[] {
    // Get the representation of this note as it appears in this system.
    const internalNote: Note = this.getNoteFromID(fromNote.id) as Note;

    if (!internalNote) {
      throw Error(`Note '${fromNote.id}' does not exist in Temperament '${this.name}'`);
    }

    const notes: Note[] = [];
    let currentNote: Note = internalNote;

    for (let i = 0; i < this.notes.length; i++) {
      notes.push(currentNote);
      currentNote = this.getNextNote(currentNote);
    }

    return notes;
  }

  /**
   * Internal function.
   *
   * Given a Note (object), it will return the
   * offset in the context of this temperament.
   *
   * i.e. the relative offset to THIS temperament
   *
   */
  _getRelativeNoteOffset(fromNote: Note): number {
    // We have a list of notes in this "temperament" (this.notes)
    // and we want the offset that `fromNote` exists in it.
    //
    // `findIndex` loops over `this.notes`.
    //
    // If we return `true` from any iterations, then we have
    // found the note we were looking for!

    const offset: number = this.notes.findIndex((note) => {
      return note.id === (this.getNoteFromID(fromNote.id) as Note).id;
    });

    return offset;
  }

  /** 
   * Given two notes, return the number of semitones between them.
  */
  getSemitonesBetweenNotes(fromNote: Note, toNote: Note): number {
    const fromNoteOffset = this._getRelativeNoteOffset(fromNote);
    const toNoteOffset = this._getRelativeNoteOffset(toNote);

    if (toNoteOffset > fromNoteOffset) {
      return toNoteOffset - fromNoteOffset;
    } else {
      return toNoteOffset - fromNoteOffset + this.notes.length;
    }
  }

  /**
   * Note -> Note
   *
   * Returns the next note in the temperament
   * given a starting note `fromNote`.
   *
   * An optional parameter `semitonesAway` allows you
   * specify how many semitones (steps) to travel (default=1)
   *
   * e.g.
   *
   *  > if our system is 12EDO(12TET), then
   *  >
   *  > Given Note('B'), this will return Note('C')
   *
   * It will also properly "loop" around if
   * necessary,
   *
   * e.g.
   *
   *  > if our system is 12EDO(12TET), then
   *  >
   *  > Given Note('Ab'), this will return Note('A')
   *
   */
  getNextNote(fromNote: Note, semitonesAway: number = 1): Note {
    const offset: number = this._getRelativeNoteOffset(fromNote);
    let index: number = (offset + semitonesAway) % this.notes.length;
    if (index < 0) {
      index = this.notes.length + index;
    }
    return this.notes[index];
  }

  /**
   * Given 2 Intervals, return true if they are enharmonically equivalent.
   * e.g. a 6th and a 13th have the same number of semitones in 12TET,
   */
  areIntervalsEquivalent(interval1: Interval, interval2: Interval): boolean {
    const interval1Mod = interval1.semitones % this.notes.length;
    const interval2Mod = interval2.semitones % this.notes.length;
    return interval1Mod === interval2Mod;
  }

  /**
   * Given a semitone, return an Interval[] of all those intervals that have that number of semitones
   */
    findIntervals(semitones: number, allowEquivalents: boolean = true): Interval[] {
      return this.intervals.filter((interval) => {
        const isExactMatch = interval.semitones === semitones;
        const isEquivalentMatch = interval.semitones % this.notes.length === semitones % this.notes.length
        return allowEquivalents ?  isEquivalentMatch : isExactMatch;
      });
    };

  /**
   * Given a semitone, return an Interval object.
   * By default, it will return the first interval that matches the number of semitones or enharmonic equivalent.
   * You can force this to look for an exact match (e.g. ignore a 6th when you're looking for a 13th)
   * However, if you want to find an interval with a specific scale degree,
   * you can pass in the scale degree's number as a third parameter.
   * e.g. for 12TET pass (2, false, 3) to get a diminished 3rd instead of the default major 2nd.
   */
  findInterval(semitones: number, allowEquivalents: boolean = false, scaleDegreeNumeric?: IntervalScaleDegreeNumeric): Interval | undefined {  
    return this.intervals.find((interval) => {
      const isExactMatch = interval.semitones === semitones;
      const isEquivalentMatch = interval.semitones % this.notes.length === semitones % this.notes.length;
      let isMatch = allowEquivalents ? isEquivalentMatch : isExactMatch;
      if (scaleDegreeNumeric) {
        const isScaleDegreeMatch = interval.scaleDegree.numeric === scaleDegreeNumeric;
        isMatch = isMatch && isScaleDegreeMatch;
      }
      return isMatch;
    });
  };

  toJSON() {
    return {
      name: this.name,
      notes: this.notes,
    };
  }

  valueOf() {
    return JSON.stringify(this);
  }

  toString() {
    return JSON.stringify(this);
  }
}
