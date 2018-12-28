const { mainIntervals } = require('./data/intervals')

/**
 * A single scale.
 *
 * e.g. "play me the Blues scale, bro"
 *
 * If you were a formal person, you'd call this a "mode".
 */
module.exports = class Scale {
  constructor(name, scaleSystem, intervalsBySemitones) {
    this.name = name;
    this.scaleSystem = scaleSystem;
    this.intervals = intervalsBySemitones.map(semitone =>
      mainIntervals[semitone]);
  }

  getNotesInKey(keyNote) {
    // start the scale system at the correct note
    const shiftedNotes = this.scaleSystem.getShiftedNotes(keyNote);

    // pull correct note aliases
    const notes = shiftedNotes.map(note => {
      if (keyNote.attributes.isSharp) {
        const sharpNote = note.findSharp();
        if (sharpNote) { return sharpNote; }
      }

      return note;
    });

    // map notes to given intervals
    return this.intervals.map((interval) => {
      return notes[interval.semitones % (this.scaleSystem.notes.length)];
    });
  }

  toJSON(key) {
    return {
      name: this.name,
      scaleSystem: this.scaleSystem,
      intervals: this.intervals
    };
  }

  valueOf() {
    return JSON.stringify(this);
  }

  toString() {
    return JSON.stringify(this);
  }
}
