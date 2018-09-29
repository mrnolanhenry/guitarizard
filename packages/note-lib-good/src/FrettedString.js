/**
 *  A single fretted string that exists in
 *  the given `scaleSystem`
 */
module.exports = class FrettedString {
  constructor(scaleSystem, tuningNote) {
    this.scaleSystem = scaleSystem;
    this.tuningNote = tuningNote;
  }

  getFrettedNotes(startFret, endFret) {
    const frettedNotes = [];

    for (let i = startFret; i <= endFret; i++) {
      const note = this.scaleSystem.getNextNote(this.tuningNote, i)
      frettedNotes.push(note);
    }

    return frettedNotes;
  }

  toJSON(key) {
    return {
      scaleSystem: this.scaleSystem,
      startNote: this.startNote,
      startFret: this.startFret,
      endFret: this.endFret
    };
  }

  valueOf() {
    return JSON.stringify(this);
  }

  toString() {
    return JSON.stringify(this);
  }
}