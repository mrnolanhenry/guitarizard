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

  getNotesInKey(key) {
    const notes = this.scaleSystem.getShiftedNotes(key);

    return this.intervals.map((interval) => {
      return notes[interval.semitones];
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
