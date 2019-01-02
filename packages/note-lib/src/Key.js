const Scales = require('./data/scales');
const util = require('./util.js');

module.exports = class Key {
    constructor(note, scale) {
        this.note = note;
        this.scale = scale;
    }

    // Given a key's note and scale, return equivalent keys if you were to transpose into other notes & scales
    // e.g. the B Lydian scale is exactly the same series of notes as the Bb neapolitan minor or Db mixolydian, just with a different note designated as the 'key' or root.
    getEquivKeys() {
        let equivKeys = [];
        let scaleArray = [];
        let scaleLength = this.scale.intervals.length;

        // Fill array of intervalsBySemitones for the given scale
        for (let i = 0; i < scaleLength; i++) {
            scaleArray.push(this.scale.intervals[i].semitones);
        }

        // Remove last semitone, which should be the duplicate '12' note in a diatonic system, for example.
        scaleArray.pop();

        // Loop through each note in the scale system to check for equivalent scales given that note
        for (let j = 0; j < this.scale.scaleSystem.notes.length; j++) {
            let noteInterval = this.scale.scaleSystem.getNoteInterval(this.note, this.scale.scaleSystem.notes[j])
            // Loop through each scale and create an array of intervalsBySemitones that we adjust by the interval between the key notes
            for (let k = 0; k < Scales.length; k++) {
                // This if check is only here to speed up function - testing dropped from ~71ms to ~47ms
                if (scaleLength === Scales[k].intervals.length) {
                    let newScaleArray = [];
                    for (let l = 0; l < Scales[k].intervals.length; l++) {
                        newScaleArray.push((Scales[k].intervals[l].semitones + noteInterval) % this.scale.scaleSystem.notes.length);
                    }

                    // Remove last semitone, which should be some offset of the duplicate '12' note in a diatonic system, for example.
                    newScaleArray.pop();
                    util.sortArray(newScaleArray);

                    // Check if arrays are equal after having sorted the newScale
                    if (util.isEqualArray1D(scaleArray, newScaleArray)) {
                        let key = {
                            note: this.scale.scaleSystem.notes[j].id,
                            scale: Scales[k]
                        }
                        equivKeys.push(key);
                    }
                }
            }
        }
        return equivKeys;
    }
}
// -- END of MODULE

// -- TESTING

// const Scale = require('../src/Scale');
// const Note = require('../src/Note');
// const diatonic = require('../src/data/scaleSystem/diatonic');
// const Key = require('./Key.js');

// let testKey = new Key(new Note('A#'),new Scale('lydian',diatonic,[0,2,4,6,7,9,11,12]))

// let equivKeys = testKey.getEquivKeys();
// for (let i = 0; i < equivKeys.length; i++) {
//     console.log(equivKeys[i].note, equivKeys[i].scale.name);
// }