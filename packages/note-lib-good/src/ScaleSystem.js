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

  // Given an alias, e.g. "A#", return the
  // "Note" instance, e.g. `new Note('Bb', ['A#', 'Bb'])`
  getNoteFromAlias(alias) {
    return this.notes.find((note) => {
      return note.aliases.indexOf(alias) !== -1;
    });
  }

  // TODO: bad name
  // TODO: docs:
  //
  // basically "shifts" the scale system to start at a new note
  getShiftedNotes(alias) {
    let notes = [];
    let currentNote = this.getNoteFromAlias(alias);

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
