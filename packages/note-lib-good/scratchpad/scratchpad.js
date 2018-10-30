// const assert = require('assert');

//Data Dump of individual scales that go into scales array
const pentatonicMinor = [0,3,5,7,10];
const blues = [0,3,5,6,7,10];
const chromatic = [0,1,2,3,4,5,6,7,8,9,10,11];
const scales = {
  pentatonicMinor,
  blues,
  chromatic
};

const _7 = [0,4,7,10];
const _5 = [0,7,0];
const _maj13 = [0,2,4,7,9,11];
const chords = {
  _7,
  _5,
  _maj13
};

const notes = [ ['A', 'A#', 'B','C','C#','D','D#','E','F','F#','G','G#'],
                ['A', 'Bb', 'B','C','Db','D','Eb','E','F','Gb','G','Ab']];

// Given a "key" or a note
function noteExists(note) {
  return notes[0].indexOf(note) !== -1 || notes[1].indexOf(note) !== -1;
}

// Given a key (e.g. 'Gb') and a scale (e.g. 'blues'), this function spits out an array 'newScale' of objects, with each note in the scale.
function getNotesInScale(key,scale) {
  if (!noteExists(key)) {
    return;
  }

  const newNotes = (notes[1].indexOf(key) === -1) ? notes[0] : notes[1]
  const stepsFromA = newNotes.indexOf(key);
  const newScale = [];

  for (let i = 0; i < scale.length; i++) {
    const notesFromA = (scale[i] + stepsFromA) % 12;
    newScale.push({
      note: newNotes[notesFromA],
    });
  }
  return newScale;
}

// console.log(getNotesInScale('F',blues));
// console.log(getNotesInScale('A',blues));

// Given a note and a chord (e.g. '_7 this function spits out an array 'newChord' of objects, with each note in the Chord.
function getNotesInChord(note,chord) {
  if (!noteExists(note)) {
    return;
  }

  const newNotes = (notes[1].indexOf(note) === -1) ? notes[0] : notes[1]
  const stepsFromA = newNotes.indexOf(note);
  const newChord = [];

  for (let i = 0; i < chord.length; i++) {
    const notesFromA = (chord[i] + stepsFromA) % 12;
    newChord.push({
      note: newNotes[notesFromA],
    });
  }
  return newChord;

}
// Test - getNotesInChord function
// console.log(getNotesInChord('B',_7));
// console.log(getNotesInChord('E',_maj13));

// Test case error check - getNotesInScale function
// assert.deepStrictEqual (getNotesInChord('B',_7), [
//  { note: 'B' },
//  { note: 'Eb' },
//  { note: 'Gb' },
//  { note: 'A' } ]
//                        ,'You fucked up');


// Given an array representing a chord and the amount of notes in that chord,
// provide an array with each possible arrays with one extra length, made up of one of those elements.
// Confused?? Example: the _7 chord is [0,4,7,10] of length 4. This should generate an array which includes each of the below arrays:
// [0,4,7,10,0] , [0,4,7,10,4] , [0,4,7,10,7], and [0,4,7,10,10]
// Each of these would then be permutated using the permuteArray function later on.
function getChordVoicings (chord, chordLength) {
  let newArr = [];
  for (let i = 0; i < chordLength; i++) {
    let newInput = chord.slice();
    newInput.push(chord[i]);
    newArr.push(newInput);
  }
  return newArr;
}

// console.log(JSON.stringify(getChordVoicings(_7,_7.length),null,4));
// console.log(getChordVoicings(_7,_7.length).length);
// console.log(JSON.stringify(getChordVoicings(_5,_5.length),null,4));


//Given array from getChordVoicings function and an original chordLength (i.e. 4 for _7 chord: [0,4,7,10]),
//Returns another set of voicings within an array.
function getMultipleVoicings(chordVoicings,chordLength) {
  let newArr = [];
    for (let i = 0; i < chordVoicings.length; i++) {
      newArr = newArr.concat(getChordVoicings(chordVoicings[i],chordLength));
    }
  return newArr;
}

// console.log(JSON.stringify(getMultipleVoicings(getChordVoicings(_7,_7.length),_7.length),null,4));
// console.log(getMultipleVoicings(getChordVoicings(_7,_7.length),_7.length).length);
//
// console.log(JSON.stringify(getMultipleVoicings(getMultipleVoicings(getChordVoicings(_7,_7.length),_7.length),_7.length),null,4));
// console.log(getMultipleVoicings(getMultipleVoicings(getChordVoicings(_7,_7.length),_7.length),_7.length).length);


// Given a single chord, get all possible chord Voicings in a single array
// based on length of given chord and how long you want the chord to be
// e.g. if limited to six strings, upToLength would be 6
function getAllVoicings (chord, upToLength){
  let voicings = [];
  let newVoicings = [[]];
  let chordLength = chord.length;
  let iterations = upToLength - chordLength;
  if (iterations <= 0) {
    return chord;
  }
  voicings = voicings.concat(getChordVoicings(chord, chordLength));
  iterations -= 1;
  if (iterations >= 1) {
    for (let i = 0; i < iterations; i++) {
      newVoicings[i+1] = getMultipleVoicings(voicings,chordLength);
      voicings = voicings.concat(newVoicings[i+1]);
      voicings.splice(newVoicings[i].length,newVoicings[i].length);
    }
  }
  voicings.unshift(chord);
  return voicings;
}

// console.log(JSON.stringify(getAllVoicings(_5,7),null,4));
// console.log(getAllVoicings(_5,7).length);

// console.log(JSON.stringify(getAllVoicings(_7,8),null,4));
// console.log(getAllVoicings(_7,8).length);

// console.log(JSON.stringify(getAllVoicings(_maj13,6),null,4));
// console.log(getAllVoicings(_maj13,6).length);


// Given an array with numeric values, sort them in ascending order.
function sortArray (array){
  array.sort(function(a, b){return a - b});
  return array;
}

// console.log(sortArray(getChordVoicings(_5,_5.length)[2]));

function sortEachArray (array){
  let newArr = [];
  for (let i = 0; i < array.length; i++) {
    newArr.push(sortArray(array[i]));
  }
  return newArr;
}

// console.log(JSON.stringify(sortEachArray(getAllVoicings(_7,6)),null,4));
// console.log(sortEachArray(getAllVoicings(_7,6)).length);


// Given an array's index number [n] within a larger array,
// return true if it is unique up to position n or false if it matches another array[i], where i < n.
function isUniqueArray (n,withinArray) {
  for (let i = 0; i < n; i++){
    let countEquivElements = 0;
    for (let j = 0; j < withinArray[i].length; j++) {
      if (withinArray[n][j] === withinArray[i][j] && n !== i) {
        countEquivElements += 1;
      }
      if (countEquivElements === withinArray[i].length && withinArray[n].length === withinArray[i].length) {
        return false;
      }
    }
  }
  return true;
}

// console.log(isUniqueArray(2,getChordVoicings(_5,_5.length)));


// Given a single chord, use getAllVoicings function to
// get all possible chord Voicings in a single array
// based on length of given chord and how long you want the chord to be
// e.g. if limited to six strings, upToLength would be 6
// THEN sort each voicing numerically to check whether they are unique
// and only return those that are.
function getUniqueVoicings (chord, upToLength) {
  let uniqueVoicings = [];
  if (chord.length === upToLength){
    uniqueVoicings = [chord];
    return uniqueVoicings;
  }
  let allVoicings = getAllVoicings(chord, upToLength);
  allVoicings = sortEachArray(allVoicings);
  for (let i = 0; i < allVoicings.length; i++) {
    if (isUniqueArray (i,allVoicings)) {
      uniqueVoicings.push(allVoicings[i]);
    }
  }
  return uniqueVoicings;
}

// console.log(JSON.stringify(getUniqueVoicings(_7,6),null,4));
// console.log(getUniqueVoicings(_7,6));
// console.log(getUniqueVoicings(_7,6).length);

// console.log(JSON.stringify(getUniqueVoicings(_5,6),null,4));
// console.log(getUniqueVoicings(_5,6).length);



function permuteArray(input) {
  var length = input.length,
      result = [input.slice()],
      c = new Array(length).fill(0),
      i = 1, k, p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = input[i];
      input[i] = input[k];
      input[k] = p;
      ++c[i];
      i = 1;
      if(input !== result[result.length - 1]) {
        result.push(input.slice());
      }
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}

// console.log(JSON.stringify(permuteArray(_7)));
// console.log(permuteArray(_7).length);

function permuteUnique(input) {
  let uniquePermute = [];
  let permuted = permuteArray(input);
  for (let i = 0; i < permuted.length; i++) {
    if (isUniqueArray (i,permuted)) {
      uniquePermute.push(permuted[i]);
    }
  }
  return uniquePermute;
}

// console.log(JSON.stringify(permuteUnique(_7)));
// console.log(permuteUnique(_7).length);

// console.log(JSON.stringify(permuteUnique([0,4,7,10,0,4,7])));
// console.log(permuteUnique([0,4,7,10,0,4,7]).length);



function getChordPermutations (chord, upToLength) {
  let allPermutations = [];
  let permutation = [];
  let uniqueVoicings = getUniqueVoicings(chord, upToLength);
  for (let i = 0; i < uniqueVoicings.length; i++) {
    permutation[i] = permuteArray(uniqueVoicings[i]);
    allPermutations = allPermutations.concat(permutation[i]);
  }
  return allPermutations;
}

// console.log(getChordPermutations(_7,6));
// console.log(getChordPermutations(_7,6).length);

// console.log(getChordPermutations(_maj13,6));
// console.log(getChordPermutations(_maj13,6).length);



//TEST FUNCTION
function getUniquePermutations(chord,upToLength){
  let allPermutations = getChordPermutations(chord,upToLength);
  let uniquePermutations = [];
  for (let i = 0; i < allPermutations.length; i++) {
    if (isUniqueArray (i,allPermutations)) {
      uniquePermutations.push(allPermutations[i]);
    }
  }
  return uniquePermutations;
}

// console.log(getUniquePermutations(_7,6));
// console.log(getUniquePermutations(_7,6).length);



//Given a from note and to note, get distance between 2 notes in semitones
function getNoteDistance(fromNote,toNote) {
  const fromNoteRow = (notes[1].indexOf(fromNote) === -1) ? notes[0] : notes[1];
  const toNoteRow = (notes[1].indexOf(fromNote) === -1) ? notes[0] : notes[1];
  const fromIndex = fromNoteRow.indexOf(fromNote);
  const toIndex = toNoteRow.indexOf(toNote);

  return (toIndex - fromIndex + 12) % 12;
}

// console.log(getNoteDistance('B','E'));
// console.log(getNoteDistance('E','B'));
// console.log(getNoteDistance('B','B'));

// Given a chord, offset each value of it by some number
//TO BE USED with getNoteDistance as offsetNum
function offsetChord(chord,offsetNum) {
  let newChord = [];
  for (let i = 0; i < chord.length; i++) {
    newChord.push((chord[i]+offsetNum) % 12);
  }
  return sortArray(newChord);
}

// console.log(offsetChord(_7,7));
// console.log(offsetChord(_7,getNoteDistance('E','B')));
// console.log(_7);

// const exChord = offsetChord(_7,getNoteDistance('E','B'));
// console.log(getChordPermutations(exChord,6));

// Generates a 1d array of strings for x number of strings
// with the first argument being amount of frets
// and second being starting fret
// e.g. genericStrings(11,4)
// produces an array with [4,5,6,7,8,9,10,11]
function genericString(frets,startFret){
  let genericString = [];
  for (let i = 0; i <= frets; i++) {
    if (i >= startFret) {
      genericString.push(i);
    }
    else {
      genericString.push();
    }
  }
  return genericString;
}

// console.log(genericString(21,5));

function modifyString(){
  
}

// Generates a 2d array of strings for x number of strings
// arguments are passed like genericString function
// with the first being amount of frets
// and second being starting fret
// e.g. genericStrings(21,0,21,0,21,0,21,0,21,5)
// produces an array representing 5 strings, each up to fret 21,
// with the last string starting at 5
function genericStrings() {
  let genericStrings = [];
  for (let i=0; i < arguments.length; i++) {
    genericStrings.push(genericString(arguments[i],arguments[i+1]));
    i++;
    }
  return genericStrings;
}

// console.log(genericStrings(21,0,21,0,21,0,21,0,21,5));
console.log(genericStrings(21,0,21,0,21,0,21,0,21,0,21,0));
