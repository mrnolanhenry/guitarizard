const Scale = require('../src/Scale');
const diatonic = require('../src/data/scaleSystem/diatonic');
const Scales = require('../src/data/scales');
const { mainIntervals } = require('../src/data/intervals')



module.exports = class Key {
    constructor(name, scale) {
      this.name = name;
      this.scale = scale;
    }


// Given a key's note and scale, return equivalent keys if you were to transpose into other note & scale
function getEquivKeys(note, scaleName) {
    let equivKeys = [];
    let noteOffsetInput = getNoteOffset(note);
    let scaleArrayInput = getScaleArray(scaleName);
    // Remove last semitone, which should be the duplicate '12' note.
    scaleArrayInput.pop();

    for (let h = 0; h < diatonic.notes.length; h++) {
        let noteOffset = getNoteOffset(diatonic.notes[h].id);
        let delta = (noteOffset - noteOffsetInput + 12) % 12;
        for (let i = 0; i < Scales.length; i++) {
            let scaleArray = getScaleArray(Scales[i].name);
            for (let j = 0; j < scaleArray.length; j++) {
                scaleArray[j] = (scaleArray[j] + delta) % 12;
            }

            // Remove last semitone, which should be some offset of the duplicate '12' note.
            scaleArray.pop();
            sortArray(scaleArray);
            if (isEqual1DArray(scaleArrayInput, scaleArray)) {
                let key = {
                    note: diatonic.notes[h].id,
                    scale: Scales[i]
                }
                equivKeys.push(key);
            }
        }
    }
    return equivKeys;
}

let equivKeys = getEquivKeys("B", "lydian");
for (let i = 0; i < equivKeys.length; i++) {
    console.log(equivKeys[i].note,equivKeys[i].scale.name );
}
// console.log(equivKeys);


// Given an array with numeric values, sort them in ascending order.
function sortArray(array) {
    array.sort(function (a, b) { return a - b });
    return array;
}

function isEqual1DArray(array1, array2) {
    let len = array1.length
    if (len === array2.length) {
        for (let i = 0; i < len; i++) {
            if (array1[i] !== array2[i]) {
                return false;
            }
        }
        return true;
    }
    else {
        return false;
    }
}

let arr1 = [0, 1, 2];
let arr2 = [0, 1, 2];
let equalCheck = isEqual1DArray(arr1, arr2);
// console.log(equalCheck);

// Given a scale's name, return its simplified array in terms of semitones
function getScaleArray(scaleName) {
    for (let i = 0; i < Scales.length; i++) {
        let scaleArray = [];
        if (scaleName === Scales[i].name) {
            for (let j = 0; j < Scales[i].intervals.length; j++) {
                scaleArray.push(Scales[i].intervals[j].semitones);
            }
            return scaleArray;
        }
    }
}

let aeolianArray = getScaleArray('aeolian')
// console.log(aeolianArray);

let scalesArray = getScalesArray()
// console.log(scalesArray);

// Given note, return offset from sequence of notes starting with A.
function getNoteOffset(note) {
    for (let i = 0; i < diatonic.notes.length; i++) {
        if (note === diatonic.notes[i].id) {
            return i;
        }
    }
}

let noteOffset = getNoteOffset('B');
// console.log(noteOffset);

}