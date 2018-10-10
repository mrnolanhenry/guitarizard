/**
 *  A string that exists in
 *  the given `scaleSystem`
 *
 * @param 'tuningNote' - what is this strings tuning note?
 * @param 'material' - what material is this string made out of?
 * @param 'gauge' - what gauge (in millimeters) is this string?
 */
module.exports = class TunedString {
  constructor(tuningNote, material, gauge) {
    this.tuningNote = tuningNote;
    this.material = material;
    this.gauge = gauge;
  }

  /**
   * If this string was sitting on a fret board,
   * return the notes associated with it up to
   * the given `fretSpan`
   */
  getFrettedNotes(scaleSystem, fretSpan) {
    const frettedNotes = [];

    for (let i = 0; i <= fretSpan; i++) {
      const note = scaleSystem.getNextNote(this.tuningNote, i)
      frettedNotes.push(note);
    }

    return frettedNotes;
  }

  toJSON(key) {
    return {
      tuningNote: this.tuningNote,
      material: this.material,
      gauge: this.gauge
    };
  }

  valueOf() {
    return JSON.stringify(this);
  }

  toString() {
    return JSON.stringify(this);
  }
}
