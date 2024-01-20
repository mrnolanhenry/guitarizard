/* eslint-disable */
// ^ TURNS OFF ESLINT FOR THIS SCRATCHPAD FILE!!

// const assert = require('assert');

//Data Dump of individual scales that go into scales array
const pentatonicMinor = [0, 3, 5, 7, 10];
const blues = [0, 3, 5, 6, 7, 10];
const chromatic = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const scales = {
  pentatonicMinor,
  blues,
  chromatic,
};

const _7 = [0, 4, 7, 10];
const _5 = [0, 7, 0];
const _maj13 = [0, 2, 4, 7, 9, 11];
const chords = {
  _7,
  _5,
  _maj13,
};

const notes = [
  ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"],
  ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"],
];

// Given a "key" or a note
function noteExists(note) {
  return notes[0].indexOf(note) !== -1 || notes[1].indexOf(note) !== -1;
}

// Given a key (e.g. 'Gb') and a scale (e.g. 'blues'), this function spits out an array 'newScale' of objects, with each note in the scale.
function getNotesInScale(key, scale) {
  if (!noteExists(key)) {
    return;
  }

  const newNotes = notes[1].indexOf(key) === -1 ? notes[0] : notes[1];
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
function getNotesInChord(note, chord) {
  if (!noteExists(note)) {
    return;
  }

  const newNotes = notes[1].indexOf(note) === -1 ? notes[0] : notes[1];
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
function getChordVoicings(chord, chordLength) {
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
function getMultipleVoicings(chordVoicings, chordLength) {
  let newArr = [];
  for (let i = 0; i < chordVoicings.length; i++) {
    newArr = newArr.concat(getChordVoicings(chordVoicings[i], chordLength));
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
function getAllVoicings(chord, upToLength) {
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
      newVoicings[i + 1] = getMultipleVoicings(voicings, chordLength);
      voicings = voicings.concat(newVoicings[i + 1]);
      voicings.splice(newVoicings[i].length, newVoicings[i].length);
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
function sortArray(array) {
  array.sort(function (a, b) {
    return a - b;
  });
  return array;
}

// console.log(sortArray(getChordVoicings(_5,_5.length)[2]));

function sortEachArray(array) {
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
function isUniqueArray(n, withinArray) {
  for (let i = 0; i < n; i++) {
    let countEquivElements = 0;
    for (let j = 0; j < withinArray[i].length; j++) {
      if (withinArray[n][j] === withinArray[i][j] && n !== i) {
        countEquivElements += 1;
      }
      if (
        countEquivElements === withinArray[i].length &&
        withinArray[n].length === withinArray[i].length
      ) {
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
function getUniqueVoicings(chord, upToLength) {
  let uniqueVoicings = [];
  if (chord.length === upToLength) {
    uniqueVoicings = [chord];
    return uniqueVoicings;
  }
  let allVoicings = getAllVoicings(chord, upToLength);
  allVoicings = sortEachArray(allVoicings);
  for (let i = 0; i < allVoicings.length; i++) {
    if (isUniqueArray(i, allVoicings)) {
      uniqueVoicings.push(allVoicings[i]);
    }
  }
  return uniqueVoicings;
}

// console.log(JSON.stringify(getUniqueVoicings(_7,8),null,4));
// console.log(getUniqueVoicings(_7,8).length);

// console.log(JSON.stringify(getUniqueVoicings(_5,6),null,4));
// console.log(getUniqueVoicings(_5,6).length);

// PERMUTATIONS of array length given an array.
// FUNKY RECURSION makes nesting this function necessary.
function permuteArray(input) {
  let permArr = [],
    usedChars = [];

  function permutate(input) {
    let i, ch;
    let newInput = input.slice();
    for (i = 0; i < newInput.length; i++) {
      ch = newInput.splice(i, 1)[0];
      usedChars.push(ch);
      if (newInput.length === 0) {
        permArr.push(usedChars.slice());
      }
      permutate(newInput);
      newInput.splice(i, 0, ch);
      usedChars.pop();
    }
    return permArr;
  }

  return permutate(input);
}

// console.log(JSON.stringify(permuteArray(_7)));
// console.log(permuteArray(_7).length);

function permuteUnique(input) {
  let uniquePermute = [];
  let permuted = permuteArray(input);
  for (let i = 0; i < permuted.length; i++) {
    if (isUniqueArray(i, permuted)) {
      uniquePermute.push(permuted[i]);
    }
  }
  return uniquePermute;
}

// console.log(JSON.stringify(permuteUnique(_7)));
// console.log('permuteUnique: ', permuteUnique(_7).length);
// console.log('permuteUnique: ', permuteUnique([0,4,7,10,0,4,7]).length);

function getChordPermutations(chord, upToLength) {
  let allPermutations = [];
  let permutation = [];
  let uniqueVoicings = getUniqueVoicings(chord, upToLength);
  for (let i = 0; i < uniqueVoicings.length; i++) {
    permutation[i] = permuteUnique(uniqueVoicings[i]);
    allPermutations = allPermutations.concat(permutation[i]);
  }
  return allPermutations;
}

// console.log(getChordPermutations(_7,6));
// console.log(getChordPermutations(_7,6).length);

// console.log(getChordPermutations(_maj13,6));
// console.log(getChordPermutations(_maj13,6).length);

// Given a starting Note, starting fret, end fret, and order of String within instrument,
// create a string: array of objects that have note and fret Number properties.
function createString(startNote, startFret, endFret, stringOrder) {
  if (!noteExists(startNote) || isNaN(endFret)) {
    return;
  }
  if (isNaN(startFret)) {
    startFret = 0;
  }
  const newNotes = notes[1].indexOf(startNote) === -1 ? notes[0] : notes[1];
  const stepsFromA = newNotes.indexOf(startNote);
  const newStringNotes = [];

  for (let i = startFret; i <= endFret; i++) {
    const fretNum = i;
    const notesFromA = (i - startFret + stepsFromA) % 12;
    newStringNotes.push({
      fretNum: fretNum,
      note: newNotes[notesFromA],
    });
  }
  const newString = {
    stringTuning: startNote,
    stringOrder: stringOrder,
    notes: newStringNotes,
  };

  return newString;
}

// console.log(createString('A',5,21,1));

// Test case error check - createString function
// assert.deepStrictEqual (createString('A',5,16,1), { stringTuning: 'A',
//   stringOrder: 1,
//   notes:
//    [ { fretNum: 5, note: 'A' },
//      { fretNum: 6, note: 'Bb' },
//      { fretNum: 7, note: 'B' },
//      { fretNum: 8, note: 'C' },
//      { fretNum: 9, note: 'Db' },
//      { fretNum: 10, note: 'D' },
//      { fretNum: 11, note: 'Eb' },
//      { fretNum: 12, note: 'E' },
//      { fretNum: 13, note: 'F' },
//      { fretNum: 14, note: 'Gb' },
//      { fretNum: 15, note: 'G' },
//      { fretNum: 16, note: 'Ab' } ] }
//                        ,'You fucked up');

// Example - create a guitar using createString function
const guitar = {
  strings: [
    createString("E", 0, 21, 5),
    createString("B", 0, 21, 4),
    createString("G", 0, 21, 3),
    createString("D", 0, 21, 2),
    createString("A", 0, 21, 1),
    createString("E", 0, 21, 0),
  ],
};

// Example - create a banjo using createString function
const banjo = {
  strings: [
    createString("D", 0, 21, 3),
    createString("B", 0, 21, 2),
    createString("G", 0, 21, 1),
    createString("D", 0, 21, 0),
    createString("G", 5, 21, 4),
  ],
};

// Example - create a made up instrument using createString function
const stubby = {
  strings: [
    createString("E", 0, 5, 5),
    createString("B", 0, 5, 4),
    createString("G", 0, 5, 3),
    createString("D", 0, 5, 2),
    createString("A", 0, 5, 1),
    createString("E", 0, 5, 0),
  ],
};

const testInstrument = {
  strings: [
    {
      stringTuning: "D",
      stringOrder: 3,
      notes: [
        { fretNum: 0, note: "D" },
        { fretNum: 1, note: "Eb" },
        { fretNum: 2, note: "E" },
        { fretNum: 3, note: "F" },
        { fretNum: 4, note: "Gb" },
        { fretNum: 5, note: "G" },
        { fretNum: 6, note: "Ab" },
        { fretNum: 8, note: "Bb" },
        { fretNum: 9, note: "B" },
        { fretNum: 10, note: "C" },
        { fretNum: 11, note: "Db" },
        { fretNum: 12, note: "D" },
        { fretNum: 13, note: "Eb" },
        { fretNum: 14, note: "E" },
        { fretNum: 15, note: "F" },
        { fretNum: 16, note: "Gb" },
        { fretNum: 17, note: "G" },
        { fretNum: 18, note: "Ab" },
        { fretNum: 20, note: "Bb" },
        { fretNum: 21, note: "B" },
      ],
    },
    {
      stringTuning: "B",
      stringOrder: 2,
      notes: [
        { fretNum: 0, note: "B" },
        { fretNum: 1, note: "C" },
        { fretNum: 2, note: "Db" },
        { fretNum: 3, note: "D" },
        { fretNum: 4, note: "Eb" },
        { fretNum: 5, note: "E" },
        { fretNum: 6, note: "F" },
        { fretNum: 7, note: "Gb" },
        { fretNum: 8, note: "G" },
        { fretNum: 9, note: "Ab" },
        { fretNum: 10, note: "A" },
        { fretNum: 11, note: "Bb" },
        { fretNum: 12, note: "B" },
        { fretNum: 13, note: "C" },
        { fretNum: 14, note: "Db" },
        { fretNum: 15, note: "D" },
        { fretNum: 16, note: "Eb" },
        { fretNum: 17, note: "E" },
        { fretNum: 18, note: "F" },
        { fretNum: 19, note: "Gb" },
        { fretNum: 20, note: "G" },
        { fretNum: 21, note: "Ab" },
      ],
    },
    {
      stringTuning: "G",
      stringOrder: 1,
      notes: [
        { fretNum: 0, note: "G" },
        { fretNum: 1, note: "Ab" },
        { fretNum: 2, note: "A" },
        { fretNum: 3, note: "Bb" },
        { fretNum: 4, note: "B" },
        { fretNum: 5, note: "C" },
        { fretNum: 6, note: "Db" },
        { fretNum: 7, note: "D" },
        { fretNum: 8, note: "Eb" },
        { fretNum: 9, note: "E" },
        { fretNum: 10, note: "F" },
        { fretNum: 11, note: "Gb" },
        { fretNum: 12, note: "G" },
        { fretNum: 13, note: "Ab" },
        { fretNum: 14, note: "A" },
        { fretNum: 15, note: "Bb" },
        { fretNum: 16, note: "B" },
        { fretNum: 17, note: "C" },
        { fretNum: 18, note: "Db" },
        { fretNum: 19, note: "D" },
        { fretNum: 20, note: "Eb" },
        { fretNum: 21, note: "E" },
      ],
    },
    {
      stringTuning: "D",
      stringOrder: 0,
      notes: [
        { fretNum: 0, note: "D" },
        { fretNum: 1, note: "Eb" },
        { fretNum: 2, note: "E" },
        { fretNum: 3, note: "F" },
        { fretNum: 4, note: "Gb" },
        { fretNum: 5, note: "G" },
        { fretNum: 6, note: "Ab" },
        { fretNum: 7, note: "A" },
        { fretNum: 8, note: "Bb" },
        { fretNum: 9, note: "B" },
        { fretNum: 10, note: "C" },
        { fretNum: 11, note: "Db" },
        { fretNum: 12, note: "D" },
        { fretNum: 13, note: "Eb" },
        { fretNum: 14, note: "E" },
        { fretNum: 15, note: "F" },
        { fretNum: 16, note: "Gb" },
        { fretNum: 17, note: "G" },
        { fretNum: 18, note: "Ab" },
        { fretNum: 19, note: "A" },
        { fretNum: 20, note: "Bb" },
        { fretNum: 21, note: "B" },
      ],
    },
    {
      stringTuning: "G",
      stringOrder: 4,
      notes: [
        { fretNum: 5, note: "G" },
        { fretNum: 6, note: "Ab" },
        { fretNum: 8, note: "Bb" },
        { fretNum: 9, note: "B" },
        { fretNum: 10, note: "C" },
        { fretNum: 11, note: "Db" },
        { fretNum: 12, note: "D" },
        { fretNum: 13, note: "Eb" },
        { fretNum: 14, note: "E" },
        { fretNum: 15, note: "F" },
        { fretNum: 16, note: "Gb" },
        { fretNum: 17, note: "G" },
        { fretNum: 18, note: "Ab" },
        { fretNum: 19, note: "A" },
        { fretNum: 20, note: "Bb" },
        { fretNum: 21, note: "B" },
      ],
    },
  ],
};

// Given an instrument, sort it by string Order and return a new instrument
function sortByStringOrder(instrument) {
  const clonedInstrument = JSON.parse(JSON.stringify(instrument));
  clonedInstrument.strings.sort(function (a, b) {
    return a.stringOrder - b.stringOrder;
  });
  return clonedInstrument;
}

// console.log(JSON.stringify(sortByStringOrder(banjo),null,4));
// console.log(JSON.stringify(banjo,null,4));

// Given an instrument, get a list of valid strings to loop through when finding chords
function getValidStrings(instrument) {
  let validStrings = [];
  for (let i = 0; i < instrument.strings.length; i++) {
    validStrings.push(i);
  }
  return validStrings;
}

// console.log(getValidStrings(guitar));

// Given an array of valid strings, set one as invalid (based on stringOrder) to no longer loop through
function removeInvalidString(validStrings, invalidString) {
  const invalidStringIndex = validStrings.indexOf(invalidString);
  if (invalidStringIndex === -1) {
    return validStrings;
  }
  validStrings.splice(invalidStringIndex, 1);
  return validStrings;
}

// console.log(removeInvalidString(getValidStrings(guitar),7));

// Given a fret (by fretNumber) and string object,
// return modified version of the string with the fret removed
// this function to be used in looping through and creating different chords.
function removeInvalidFret(fretNum, string) {
  let newString = string;

  for (let j = 0; j < newString.notes.length; j++) {
    if (newString.notes[j].fretNum === fretNum) {
      // console.log(newString.notes[j])
      newString.notes.splice(j, 1);
    }
  }
  return newString;
}

// console.log(guitar.strings[4]);
// console.log(removeInvalidFret(17,guitar.strings[4]));

// Given a fret (by fretNumber), string, and instrument
// return modified version of the instrument with the fret removed
// this function to be used in looping through and creating different chords.
function removeFretFromInstrument(fretNum, string, instrument) {
  let newInstrument = JSON.parse(JSON.stringify(instrument));
  const newString = removeInvalidFret(fretNum, string);
  for (let i = 0; i < newInstrument.strings.length; i++) {
    if (string.stringOrder === newInstrument.strings[i].stringOrder) {
      newInstrument.strings.splice(i, 1, newString);
    }
  }
  return newInstrument;
}

// const moddedGuitar = removeFretFromInstrument(17,guitar.strings[4],guitar)
// console.log(JSON.stringify(moddedGuitar,null,4));
// console.log(moddedGuitar.strings[4]);

// Given an array of valid strings, set all including first valid string as invalid (based on stringOrder) to no longer loop through
function removeInvalidStringsBelow(validStrings, firstValidString) {
  const stringIndex = validStrings.indexOf(firstValidString);
  if (stringIndex === -1) {
    return validStrings;
  }
  validStrings.splice(0, stringIndex + 1);
  return validStrings;
}

// console.log(removeInvalidStringsBelow(getValidStrings(guitar),7));

// Given a Note, Instrument, and String index number, returns Note object on given String with fretNum and other helpful info.
function findNoteOnString(note, string) {
  for (let j = 0; j < string.notes.length; j++) {
    if (string.notes[j].note === note) {
      return {
        stringTuning: string.stringTuning,
        stringOrder: string.stringOrder,
        fretNum: string.notes[j].fretNum,
        note: string.notes[j].note,
      };
    }
  }
}

// console.log(findNoteOnString('B',guitar.strings[5]));
// console.log(findNoteOnString('E',stubby.strings[5]));

// Given a Note, Instrument, and valid strings, finds Note object based on StringOrder with fretNum and other helpful info.
function findNoteOnInstrument(note, instrument, validStrings) {
  for (let i = validStrings[0]; i < instrument.strings.length; i++) {
    const noteFound = findNoteOnString(note, instrument.strings[i]);
    if (validStrings.indexOf(i) !== -1 && typeof noteFound !== "undefined") {
      return noteFound;
    }
  }
}

// console.log(findNoteOnInstrument('Db',guitar,getValidStrings(guitar)));
// console.log(findNoteOnInstrument('Db',guitar,removeInvalidString(getValidStrings(guitar),0)));

// Given a key, scale, instrument, and string returns an object with each Note in the scale found on the string
function findScaleOnString(key, scale, string) {
  const newScale = getNotesInScale(key, scale);
  let newScaleNotes = [];
  for (let j = 0; j < string.notes.length; j++) {
    for (let i = 0; i < newScale.length; i++) {
      if (string.notes[j].note === newScale[i].note) {
        newScaleNotes.push({
          stringTuning: string.notes[0].note,
          stringOrder: string.stringOrder,
          fretNum: string.notes[j].fretNum,
          note: string.notes[j].note,
        });
      }
    }
  }
  return newScaleNotes;
}

// console.log(getNotesInScale('B',blues));
// console.log(findScaleOnString('B',blues,guitar.strings[5]));

// Given a key, scale, and instrument, returns an object with each Note in the scale found on the instrument
function findScaleOnInstrument(key, scale, instrument) {
  const newScale = [];
  const clonedInstrument = sortByStringOrder(instrument);
  const validStrings = getValidStrings(clonedInstrument);
  for (let i = validStrings[0]; i < clonedInstrument.strings.length; i++) {
    const scaleFound = findScaleOnString(
      key,
      scale,
      clonedInstrument.strings[i],
    );
    if (validStrings.indexOf(i) !== -1 && typeof scaleFound !== "undefined") {
      newScale.push(scaleFound);
    }
  }
  return newScale;
}

// console.log(findScaleOnInstrument('B',blues,guitar));
// console.log(JSON.stringify(findScaleOnInstrument('B',blues,guitar),null,4));

// Given a note, type of chord (e.g. '_7' for 7th chord), and instrument, returns a Root Chord object with each string/note/fret number
function findChord(note, chord, instrument) {
  newChordNotes = getNotesInChord(note, chord);
  const clonedInstrument = sortByStringOrder(instrument);
  const newChord = {
    position: null,
    rootFreq: 0,
    fretWidth: null,
    strings: [],
  };
  let validStrings = getValidStrings(clonedInstrument);
  let fretLower, fretUpper;
  let rootCount = 0;
  for (let i = 0; i < newChordNotes.length; i++) {
    const notesLeft = newChordNotes.length - i;
    //FAILURE CASE
    //-----------------------------------------------------
    if (validStrings.length < notesLeft) {
      return;
    }
    //-----------------------------------------------------
    const noteFound = findNoteOnInstrument(
      newChordNotes[i].note,
      clonedInstrument,
      validStrings,
    );
    //FAILURE CASE
    //-----------------------------------------------------
    if (typeof noteFound === "undefined") {
      return;
    }
    //-----------------------------------------------------
    if (noteFound.note === note) {
      rootCount += 1;
    }
    currentFret = noteFound.fretNum;
    if (currentFret !== 0) {
      if (currentFret < fretLower || typeof fretLower === "undefined") {
        fretLower = currentFret;
      }
      if (currentFret > fretUpper || typeof fretUpper === "undefined") {
        fretUpper = currentFret;
      }
    }
    newChord.strings.push(noteFound);
    let stringFound = newChord.strings[i].stringOrder;
    removeInvalidStringsBelow(validStrings, stringFound);
  }
  if (chord[0] === 0) {
    newChord.position = "Root";
  } else {
    newChord.position = "Inversion";
  }
  newChord.rootFreq = rootCount;
  newChord.fretWidth = fretUpper - fretLower + 1;
  return newChord;
}

// console.log(findChord('B',_7,guitar));
// console.log(findChord('B',_7,stubby));
// console.log(findChord('B',_7,testInstrument));
// console.log(findChord('B',[10,4,7,10,0],banjo));

// console.log(findChord('C',_7,guitar));
// console.log(findChord('C',_7,stubby));

// Given a stringOrder from a string within a Chord,
// return full string of instrument

function findFullStringFromStringOrder(stringOrder, instrument) {
  for (let i = 0; i < instrument.strings.length; i++) {
    const stringFound = instrument.strings[i];
    if (stringOrder === stringFound.stringOrder) {
      return stringFound;
    }
  }
}

// console.log(findFullStringFromStringOrder(0,guitar));

// Given a note, type of chord (e.g. '_7' for 7th chord), and instrument, and stringIndexNumber of a single Note within Chord
// returns each available Chord object based on only changing ONE note within the chord
// TO BE NESTED WITHIN findVoicingPositions function to handle each note within the Chord
function findSomeVoicingPositions(note, chord, instrument, string) {
  let positions = [];
  let currentString = [];
  let newInstrument = JSON.parse(JSON.stringify(instrument));
  let currentChord;
  while ((currentChord = findChord(note, chord, newInstrument))) {
    positions = positions.concat(currentChord);
    currentString = findFullStringFromStringOrder(
      currentChord.strings[string].stringOrder,
      newInstrument,
    );
    newInstrument = removeFretFromInstrument(
      currentChord.strings[string].fretNum,
      currentString,
      newInstrument,
    );
  }
  // console.log('newInstrument ' ,newInstrument);
  return positions;
}

// console.log('SOME VOICING POSITIONS ',JSON.stringify(findSomeVoicingPositions('B',_7,guitar,3),null,4));
// console.log('SOME VOICING POSITIONS ',findSomeVoicingPositions('B',_7,guitar,3).length);

// console.log('SOME VOICING POSITIONS ',JSON.stringify(findSomeVoicingPositions('B',_7,guitar,2),null,4));
// console.log('SOME VOICING POSITIONS ',findSomeVoicingPositions('B',_7,guitar,2).length);

// console.log('SOME VOICING POSITIONS ',JSON.stringify(findSomeVoicingPositions('B',_7,guitar,1),null,4));
// console.log('SOME VOICING POSITIONS ',findSomeVoicingPositions('B',_7,guitar,1).length);

// console.log('SOME VOICING POSITIONS ',JSON.stringify(findSomeVoicingPositions('B',_7,guitar,0),null,4));
// console.log('SOME VOICING POSITIONS ',findSomeVoicingPositions('B',_7,guitar,0).length);

// const changingNote0 = findSomeVoicingPositions('B',_7,banjo,0);
// console.log('SOME VOICING POSITIONS ',JSON.stringify(changingNote0,null,4));
// console.log(changingNote0.length);

// const changingNote1 = findSomeVoicingPositions('B',_7,banjo,1);
// console.log('SOME VOICING POSITIONS ',JSON.stringify(changingNote1,null,4));
// console.log(changingNote1.length);
//
// const changingNote2 = findSomeVoicingPositions('B',_7,banjo,2);
// console.log('SOME VOICING POSITIONS ',JSON.stringify(changingNote2,null,4));
// console.log(changingNote2.length);
//
// const changingNote3 = findSomeVoicingPositions('B',_7,testInstrument,3);
// console.log('SOME VOICING POSITIONS ',JSON.stringify(changingNote3,null,4));
// console.log(changingNote3.length);

// Given a note, type of chord (e.g. '_7' for 7th chord), and instrument,
// returns each available Chord object with each string/note/fret number
// FOR SINGLE VOICING OF THAT CHORD
function findVoicingPositions(note, chord, instrument) {
  let voicingPositions = [];
  for (let i = 0; i < chord.length; i++) {
    let newPositions = [];
    newPositions = findSomeVoicingPositions(note, chord, instrument, i);
    if (i !== 0) {
      newPositions.shift();
    }
    voicingPositions = voicingPositions.concat(newPositions);
  }
  return voicingPositions;
}

// console.log('ALL Voicing Positions' ,JSON.stringify(findVoicingPositions('B',_7,guitar),null,4));
// console.log(findVoicingPositions('B',_7,guitar).length);
// console.log('ALL Voicing Positions' ,findVoicingPositions('B',_7,guitar));

// console.log('ALL Voicing Positions' ,JSON.stringify(findVoicingPositions('B',_7,banjo),null,4));
// console.log(findVoicingPositions('B',_7,banjo).length);

// console.log('ALL Voicing Positions' ,JSON.stringify(findVoicingPositions('B',_7,stubby),null,4));
// console.log(findVoicingPositions('B',_7,stubby).length);

// WIP
// Given a note, type of chord (e.g. '_7' for 7th chord), and instrument,
// returns each available Chord object with each string/note/fret number
// FOR ALL VOICINGS OF THAT CHORD
function findChordPositions(note, chord, instrument) {
  let chordPositions = [];
  chordPermutations = getChordPermutations(chord, instrument.strings.length);
  for (let i = 0; i < chordPermutations.length; i++) {
    let currentPositions = findVoicingPositions(
      note,
      chordPermutations[i],
      instrument,
    );
    let currentPositions4Wide = findVoicingPositions(
      note,
      chordPermutations[i],
      instrument,
    ).filter((data) => {
      return data.fretWidth <= 4;
    });
    // console.log('i',i,'chordPermutations[i]',chordPermutations[i],'positions at i:', currentPositions.length);
    // if(currentPositions.length !== 0){
    //   console.log('result:',JSON.stringify(currentPositions,null,4));
    //   // console.log('notes:',JSON.stringify(getNotesInChord('B',chordPermutations[i]),null,4));
    // }
    chordPositions = chordPositions.concat(currentPositions);
    // console.log('i',i,'chordPermutations[i]',chordPermutations[i],'positions at i:', currentPositions.length, 'total positions: ', chordPositions.length);
  }
  return chordPositions;
}

// console.log('ALL Chord Positions' ,findChordPositions('B',_7,stubby));
// console.log(findChordPositions('B',_7,stubby).length);

// console.log('ALL Chord Positions' ,JSON.stringify(findChordPositions('B',_7,guitar),null,4));
// console.log('ALL Chord Positions' ,findChordPositions('B',_7,guitar));
// console.log('ALL Chord Positions' ,JSON.stringify(findChordPositions('B',_7,banjo),null,4));
// console.log(findChordPositions('B',_7,guitar).length);
console.log(findChordPositions("B", _7, banjo));

const results = findChordPositions("B", _7, banjo).filter((data) => {
  return data.fretWidth <= 4;
});
console.log(JSON.stringify(results, null, 4));
console.log(results.length);

// // FILTER BANJO
// console.log(
//   'ALL Chord Positions WIDER THAN 4 FRETS' ,
//   JSON.stringify(findChordPositions('B',_7,banjo).filter(data => {
//       return data.fretWidth <= 4;
//   }),null,4));

// const poo = findChordPositions('B',_7,banjo,4).filter(data => {
//     return data.fretWidth <= 4;
// });
// console.log(JSON.stringify(poo,null,4));
// console.log(poo.length);

// Chord properties / qualities to consider sorting by:
// position: (Root Chord / first Inversion / second Inversion)
// rootFreq: (amount of times root note appears in the chord)
// fretWidth: (lowest fretNum to highest fretNum)
// Length: (# of notes / fullness)

// console.log('guitarcheatcodes.com','guitarizard.com','chordfix.com')
