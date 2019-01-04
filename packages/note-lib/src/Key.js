const Scales = require('./data/scales');
const util = require('./util.js');

class Key {
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
                        let key = new Key(
                            this.scale.scaleSystem.notes[j],
                            Scales[k]
                        );
                        equivKeys.push(key);
                    }
                }
            }
        }
        return equivKeys;
    }

    toJSON(key) {
        return {
          note: this.note,
          scale: this.scale
        };
      }
    
      valueOf() {
        return JSON.stringify(this);
      }
    
      toString() {
        return JSON.stringify(this);
      }
}

module.exports = Key;
// -- END of MODULE

// -- TESTING - please leave until Key.js implemented with UI

const Scale = require('../src/Scale');
const Note = require('../src/Note');
const diatonic = require('../src/data/scaleSystem/diatonic');

let testKey = new Key(new Note('A#'),new Scale('lydian',diatonic,[0,2,4,6,7,9,11,12]))

let equivKeys = testKey.getEquivKeys();
for (let i = 0; i < equivKeys.length; i++) {
    // console.log(equivKeys[i].note, equivKeys[i].scale.name);
}

// console.log(equivKeys);

// console.log(equivKeys[0]);
// console.log('compare');
// console.log(new Key(new Note('A'), new Scale('neapolitan minor', diatonic, [0, 1, 3, 5, 7, 8, 10, 12])));
