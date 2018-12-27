const Scale = require('../src/Scale');
const diatonic = require('../src/data/scaleSystem/diatonic');
const Scales = require('../src/data/scales');
const { mainIntervals } = require('../src/data/intervals')

// WIP -- changing starting from getScalesArray function
// Given a key note and scale, return equivalent scales if you were to transpose into other keys
function getTransposedScales(note, scaleName) {
    let semitoneArrh = [];
    let noteOffset = getNoteOffset(note);
    for (let h = 0; h < diatonic.notes.length; h++) {
        let semitoneArri = [];
        let hNoteOffset = getNoteOffset(diatonic.notes[h].id);
        let delta = ((noteOffset - hNoteOffset + 12) % 12);
        for (let i = 0; i < Scales.length; i++) {
            let semitoneArrj = [];
            for (let j = 0; j < Scales[i].intervals.length; j++) { 
                let offsetSemitone = (Scales[i].intervals[j].semitones - delta + 12) % 12;
                semitoneArrj.push(offsetSemitone);
            }
            // console.log(diatonic.notes[h].id,delta,semitoneArrj);
            sortArray(semitoneArrj);
            semitoneArri.push(semitoneArrj);
        }
        semitoneArrh.push(semitoneArri);
    }
    return semitoneArrh;
}

let transposedScales = getTransposedScales("B", "aeolian");
console.log(transposedScales);


// Given an array with numeric values, sort them in ascending order.
function sortArray (array){
    array.sort(function(a, b){return a - b});
    return array;
  }


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
