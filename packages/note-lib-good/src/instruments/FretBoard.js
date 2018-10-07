module.exports = class FretBoard {

  /**
   * A FretBoard that holds strings.
   *
   * @param scaleSystem : what scale system do the
   *   frets on this bord conform to?
   *
   * @param tunedStrings (TunedString[]): left to right
   *   order---imagine a guitar hanging on the wall: The
   *   "A" string would be second from the left, and the
   *   high "e" string would be wayyyy on the right, or in
   *   this example, the last element in the array.
   *
   * @param stringConfig (Array<{ fret: { start,  end } }>):
   *   Defines the position of the strings on the FretBoard
   *   with the string's starting position, and tohe
   */
  constructor(scaleSystem, tunedStrings, stringConfig) {
    this.scaleSystem = scaleSystem;
    this.tunedStrings = tunedStrings;
    this.stringConfig = stringConfig;

    // calculate fretCount as the longest given bound
    this.fretCount = this.stringConfig.reduce((max, config) => {
      return (config.fret.end > max) ? config.fret.end : max;
    }, 0)

    this.stringNotes = this._getNotes();
  }

  getString(stringIndex) {
    return this.tunedStrings[stringIndex];
  }

  /**
   *
   */
  _getNotes() {
    return this.tunedStrings.map((tunedString, i) => {
      const config = this.stringConfig[i];

      const fret = config.fret;
      const fretSpan = fret.end - fret.start;

      const notesOnString = tunedString.getFrettedNotes(
        this.scaleSystem, fretSpan);

      const notes = notesOnString.map((note, offset) => ({
        fretNumber: fret.start + offset,
        value: note
      }));

      return { tunedString, config, notes };
    });
  }

  // same result as `_getNotes`, but the notes are filtered
  // out according to the scale given. EG. A chromatic
  // scale will always equal the output of `_getNotes`
  getNotesInScale(scale, key) {
    const keyNotes = scale.getNotesInKey(key);

    return this.stringNotes.map(string => {

      // filter out any notes that don't exist
      // in the `keyNotes` array
      const notes = string.notes.filter(note => {
        for (let i = 0; i < keyNotes.length; i++) {
          const keyNote = keyNotes[i];

          if (keyNote === note.value) {
            return true;
          }
        }

        return false;
      })

      return {
        tunedString: string.tunedString,
        config: string.config,
        notes
      };      
    })
  }

  toJSON(key) {
    return { 
      scaleSystem: this.scaleSystem,
      tunedStrings: this.tunedStrings,
      stringConfig: this.stringConfig,
      fretCount: this.fretCount,
      stringNotes: this.stringNotes
    };
  }

  valueOf() {
    return JSON.stringify(this);
  }

  toString() {
    return JSON.stringify(this);
  }

}
