/**
 * A scale system defines the scale universe.
 *
 * e.g. diatonic
 *
 * If you were a formal person, you'd call this a "scale".
 */
module.exports = class ScaleSystem {
  constructor(name, notes) {
    this.name = name;
    this.notes = notes;
  }

  // Given an ID, e.g. "A#", return the "Note" instance
  // from this ScaleSystem.
  getNoteFromID(noteID) {
    for (let i = 0; i < this.notes.length; i++) {
      const note = this.notes[i];

      // ez -- found it right away
      if (note.id === noteID) {
        return note;
      }

      // else, check aliases for this note
      const aliasNote = note.aliasNotes.find(
        aliasNote => aliasNote.id === noteID
      )

      // return the note as it exists in the scale system
      // order and NOT the alias note. The note will
      // contain the alias should the consumer need it.
      if (typeof aliasNote !== 'undefined') {
        return note;
      }
    }
  }

  /**
   * Gets all notes for this scale system that can be used
   * as keys. Basically takes all availables notes, and
   * their aliases, and smushes them together.
   */
  getKeyNotes() {
    return this.notes.reduce((acc, note) => {
      acc = acc.concat([note]);
      acc = acc.concat(note.aliasNotes);
      return acc;
    }, []);
  }

  /**
   * Our scale system defines an "order" that starts at
   * a given note. This function effectivly "shifts" the
   * notes so that the scale system starts at a different
   * note.
   *
   * This funtion
   */
  getShiftedNotes(fromNote) {
    // Get the representation of this note as it appears in this system.
    const internalNote = this.getNoteFromID(fromNote.id);

    if (!internalNote) {
      throw `fromNote ${fromNote} provided does not exist in scale system`;
    }

    let notes = [];
    let currentNote = internalNote;

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
   * offset in the context of this Scale System.
   *
   * i.e. the relative offset to THIS scale system
   *
   */
  _getRelativeNoteOffset(fromNote) {
    // We have a list of notes in this "scale system" (this.notes)
    // and we want the offset that `fromNote` exists in it.
    //
    // `findIndex` loops over `this.notes`.
    //
    // If we return `true` from any iterations, then we have
    // found the note we were looking for!
    const offset = this.notes.findIndex((note) => {
      return note.id === fromNote.id;
    });

    return offset;
  }

  getNoteInterval(fromNote, toNote) {
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
   * Returns the next note in the scale system
   * given a starting note `fromNote`.
   *
   * An optional parameter `stepsAway` allows you
   * specify how steps to travel (default=1)
   *
   * e.g.
   *
   *  > if our system is 12EDO, then
   *  >
   *  > Given Note('B'), this will return Note('C')
   *
   * It will also properly "loop" around if
   * necessary,
   *
   * e.g.
   *
   *  > if our system is 12EDO, then
   *  >
   *  > Given Note('Ab'), this will return Note('A')
   *
   */
  getNextNote(fromNote, stepsAway) {
    if (typeof stepsAway === 'undefined') {
      stepsAway = 1;
    }

    const offset = this._getRelativeNoteOffset(fromNote);

    let index = (offset + stepsAway) % this.notes.length;

    if (index < 0) {
      index = this.notes.length + index;
    }

    return this.notes[index];
  }

  toJSON(key) {
    return {
      name: this.name,
      notes: this.notes
    };
  }

  valueOf() {
    return JSON.stringify(this);
  }

  toString() {
    return JSON.stringify(this);
  }
}
