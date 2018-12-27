const Scale = require('../src/Scale');
const diatonic = require('../src/data/scaleSystem/diatonic');
const Scales = require('../src/data/scales');
const { mainIntervals } = require('../src/data/intervals')


// WIP -- changing starting from getScalesArray function
// Given a key's note and scale, return equivalent keys if you were to transpose into other note & scale
function getEquivKeys(note, scaleName) {
    let equivKeys = [];
    let transposedScales = [];
    let noteOffset = getNoteOffset(note);
    let scaleSemitones = getScaleArray(scaleName);
    scaleSemitones.pop();
    // console.log('Equivalents to ',note, scaleName, scaleSemitones)

    // Remove last semitone, which should be the duplicate '12' note.
    for (let h = 0; h < diatonic.notes.length; h++) {
        let hNoteOffset = getNoteOffset(diatonic.notes[h].id);
        let delta = ((noteOffset - hNoteOffset + 12) % 12);
        for (let i = 0; i < Scales.length; i++) {
            let semitoneArr = [];
            for (let j = 0; j < Scales[i].intervals.length; j++) {
                let offsetSemitone = (Scales[i].intervals[j].semitones - delta + 12) % 12;
                semitoneArr.push(offsetSemitone);
            }

            // Remove last semitone, which should be some offset of the duplicate '12' note.
            semitoneArr.pop();
            sortArray(semitoneArr);
            if (isEqual1DArray(scaleSemitones, semitoneArr)) {
                // console.log(diatonic.notes[h].id,Scales[i].name,getScaleArray(Scales[i].name));
                let key = {
                    note: diatonic.notes[h].id,
                    scale: Scales[i]
                }
                transposedScales.push(key);
            }
        }
    }
    return transposedScales;
}

let equivKeys = getEquivKeys("B", "lydian");
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
        let semitoneArrj = [];
        if (scaleName === Scales[i].name) {
            for (let j = 0; j < Scales[i].intervals.length; j++) {
                semitoneArrj.push(Scales[i].intervals[j].semitones);
            }
            return semitoneArrj;
        }

    }
}

let aeolianArray = getScaleArray('aeolian')
// console.log(aeolianArray);


// Returns scales.js export in simplified array in terms of semitones.
function getScalesArray() {
    let semitoneArri = [];
    for (let i = 0; i < Scales.length; i++) {
        let semitoneArrj = [];
        for (let j = 0; j < Scales[i].intervals.length; j++) {
            semitoneArrj.push(Scales[i].intervals[j].semitones);
        }
        semitoneArri.push(semitoneArrj);
    }
    return semitoneArri;
}

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
