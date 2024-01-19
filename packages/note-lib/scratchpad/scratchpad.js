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

// console.log(JSON.stringify(getUniqueVoicings(_7,6),null,4));
// console.log(getUniqueVoicings(_7,6));
// console.log(getUniqueVoicings(_7,6).length);

// console.log(JSON.stringify(getUniqueVoicings(_5,6),null,4));
// console.log(getUniqueVoicings(_5,6).length);

function permuteArray(input) {
  var length = input.length,
    result = [input.slice()],
    c = new Array(length).fill(0),
    i = 1,
    k,
    p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = input[i];
      input[i] = input[k];
      input[k] = p;
      ++c[i];
      i = 1;
      if (input !== result[result.length - 1]) {
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
    if (isUniqueArray(i, permuted)) {
      uniquePermute.push(permuted[i]);
    }
  }
  return uniquePermute;
}

// console.log(JSON.stringify(permuteUnique(_7)));
// console.log(permuteUnique(_7).length);

// console.log(JSON.stringify(permuteUnique([0,4,7,10,0,4,7])));
// console.log(permuteUnique([0,4,7,10,0,4,7]).length);

function getChordPermutations(chord, upToLength) {
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
function getUniquePermutations(chord, upToLength) {
  let allPermutations = getChordPermutations(chord, upToLength);
  let uniquePermutations = [];
  for (let i = 0; i < allPermutations.length; i++) {
    if (isUniqueArray(i, allPermutations)) {
      uniquePermutations.push(allPermutations[i]);
    }
  }
  return uniquePermutations;
}

// console.log(getUniquePermutations(_7,6));
// console.log(getUniquePermutations(_7,6).length);

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

// Example - create a made up instrument using createString function
const stubbyBanjo = {
  strings: [
    createString("D", 0, 15, 3),
    createString("B", 0, 15, 2),
    createString("G", 0, 15, 1),
    createString("D", 0, 15, 0),
    createString("G", 5, 15, 4),
  ],
};

// console.log(banjo);

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

// Given a full instrument with strings, notes, frets, etc.
// create a simpler instrument object with only necessary properties used to create numerical fretBoard for chord functions:
// strings, openFrets, and lastFret
function simplifyInstrument(instrument) {
  let clonedInstrument = sortByStringOrder(instrument);
  let simpleInstrument = {};
  let simpleStrings = [];
  let simpleopenFrets = [];
  for (let i = 0; i < clonedInstrument.strings.length; i++) {
    simpleStrings.push(clonedInstrument.strings[i].stringTuning);
    simpleopenFrets.push(clonedInstrument.strings[i].notes[0].fretNum);
  }
  simpleInstrument.strings = simpleStrings;
  simpleInstrument.openFrets = simpleopenFrets;
  let fretAmount = clonedInstrument.strings[0].notes.length - 1;
  simpleInstrument.lastFret =
    clonedInstrument.strings[0].notes[fretAmount].fretNum;
  return simpleInstrument;
}

const simpleBanjo = simplifyInstrument(banjo);
const simpleGuitar = simplifyInstrument(guitar);
// console.log('simple banjo',simplifyInstrument(banjo));
// console.log('simple guitar',simplifyInstrument(guitar));

//Given a from note and to note, get distance between 2 notes in semitones
function getNoteDistance(fromNote, toNote) {
  const fromNoteRow = notes[1].indexOf(fromNote) === -1 ? notes[0] : notes[1];
  const toNoteRow = notes[1].indexOf(fromNote) === -1 ? notes[0] : notes[1];
  const fromIndex = fromNoteRow.indexOf(fromNote);
  const toIndex = toNoteRow.indexOf(toNote);

  return (toIndex - fromIndex + 12) % 12;
}

// console.log(getNoteDistance('B','E'));
// console.log(getNoteDistance('E','B'));
// console.log(getNoteDistance('B','B'));

// Given an instrument and the root note of the chord you're passing (e.g. B for a B7 chord)
// return offsetNumber for offsetting a chord's intervals on instrument
function getOffsetNum(rootNote, simpleInstrument) {
  return getNoteDistance(simpleInstrument.strings[0], rootNote);
}

// console.log(getOffsetNum('B',simpleBanjo))
// console.log(getOffsetNum('B',simpleGuitar))

// Given a chord, offset each value of it by some number
//TO BE USED with getNoteDistance as offsetNum
function offsetChord(chord, offsetNum) {
  let newChord = [];
  for (let i = 0; i < chord.length; i++) {
    newChord.push((chord[i] + offsetNum) % 12);
  }
  return sortArray(newChord);
}

// console.log(offsetChord(_7,7));
// console.log(offsetChord(_7,getNoteDistance('E','B')));
// console.log(offsetChord(_7,getOffsetNum('B',simpleGuitar)));
// console.log(_7);

const exChord = offsetChord(_7, getNoteDistance("E", "B"));
// console.log(getChordPermutations(exChord,6));

// Given a simple instrument, rootNote (e.g. B), and type of chord (e.g. 7)
// return offsetChord based on the offsetNumber for that instrument.
function offsetChordOnInstrument(rootNote, chord, simpleInstrument) {
  let offsetNum = getOffsetNum(rootNote, simpleInstrument);
  return offsetChord(chord, offsetNum);
}

// console.log(offsetChordOnInstrument('B',_7,simpleBanjo));
// console.log(offsetChordOnInstrument('B',_7,simpleGuitar));

const B7OnBanjo = offsetChordOnInstrument("B", _7, simpleBanjo);
const B7OnGuitar = offsetChordOnInstrument("B", _7, simpleGuitar);

// Given a series of string's open notes, e.g. ('E','A','D','G','B','E'),
// return an array of note distances from first String's open note e.g. [0,5,10,15,19,24]
function getStringOffsets(array) {
  let stringOffsets = [0];
  for (let i = 0; i < array.length - 1; i++) {
    let currentOffset = getNoteDistance(array[i], array[i + 1]);
    if (i !== 0) {
      currentOffset += stringOffsets[i];
    }
    stringOffsets.push(currentOffset);
  }
  return stringOffsets;
}

// console.log(getStringOffsets(['E','A','D','G','B','E']));
// console.log(getStringOffsets(['D','G','B','D','G']));

// Generates a 1d array of strings for x number of strings
// with the first argument being amount of frets
// and second being starting fret
// e.g. genericString(11,4)
// produces an array with [4,5,6,7,8,9,10,11]
function genericString(frets, startFret) {
  let genericString = [];
  for (let i = 0; i <= frets; i++) {
    if (i >= startFret) {
      genericString.push(i);
    } else {
      genericString.push(null);
    }
  }
  return genericString;
}

// console.log(genericString(21,5));

//Given a string and a number of semitones to offset by, creates a new modified string
function modifyString(genericString, offsetNum) {
  let newString = [];
  // console.log(genericString.length);
  for (let i = 0; i < genericString.length; i++) {
    if (genericString[i] === null) {
      newString.push(genericString[i]);
    } else {
      newString.push(genericString[i] + offsetNum);
    }
  }
  return newString;
}

// console.log(modifyString(genericString(21,5),7));

// Given an instrument, creates a 2d array of numbers corresponding to intervals/semitones from lowest note
function genericFretBoard(simpleInstrument) {
  let newStrings = [];
  let stringOffsets = getStringOffsets(simpleInstrument.strings);
  let openFrets = simpleInstrument.openFrets;
  let lastFretNum = simpleInstrument.lastFret;
  for (let i = 0; i < stringOffsets.length; i++) {
    let currentString = genericString(lastFretNum, openFrets[i]);
    let currentModString = modifyString(
      currentString,
      stringOffsets[i] - openFrets[i]
    );
    newStrings.push(currentModString);
  }
  return newStrings;
}

// console.log(JSON.stringify(genericFretBoard(simplifyInstrument(banjo)),null,4));
// console.log(JSON.stringify(genericFretBoard(simplifyInstrument(guitar)),null,4));

const simpleBanjoBoard = genericFretBoard(simpleBanjo);
const simpleGuitarBoard = genericFretBoard(simpleGuitar);

// Given a simplified instrument, startingFret, and fretWidth,
// creates a 2d array of numbers corresponding to intervals/semitones from lowest note
// represents a cross section of the instrument to check Chords against.
function createCrossSection(simpleInstrument, startFret, fretWidth) {
  let newStrings = [];
  let stringOffsets = getStringOffsets(simpleInstrument.strings);
  let openFrets = simpleInstrument.openFrets;
  let lastFretNum = simpleInstrument.lastFret;
  for (let i = 0; i < stringOffsets.length; i++) {
    let currentStringOpen = genericString(lastFretNum, openFrets[i]).splice(
      openFrets[i],
      1
    );
    let currentStringPressed = genericString(lastFretNum, openFrets[i]).splice(
      startFret,
      fretWidth
    );
    let openFretIndex = currentStringPressed.indexOf(currentStringOpen[0]);
    if (openFretIndex !== -1) {
      currentStringPressed[openFretIndex] = null;
    }
    let currentString = currentStringOpen.concat(currentStringPressed);
    let currentModString = modifyString(
      currentString,
      stringOffsets[i] - openFrets[i]
    );
    newStrings.push(currentModString);
  }
  return newStrings;
}

// console.log(JSON.stringify(createCrossSection(simplifyInstrument(banjo),1,5),null,4));
// console.log(JSON.stringify(createCrossSection(simplifyInstrument(guitar),1,5),null,4));

// Given an instrument, get a list of valid strings to loop through when finding chords
function getValidStrings(simpleInstrument) {
  let validStrings = [];
  for (let i = 0; i < simpleInstrument.strings.length; i++) {
    validStrings.push(i);
  }
  return validStrings;
}

// console.log(getValidStrings(simplifyInstrument(guitar)));

const simpleBanjoStrings = getValidStrings(simpleBanjo);
const simpleGuitarStrings = getValidStrings(simpleGuitar);

// Given an array of valid strings, set one as invalid (based on stringOrder) to no longer loop through
function removeInvalidString(validStrings, invalidString) {
  const invalidStringIndex = validStrings.indexOf(invalidString);
  if (invalidStringIndex === -1) {
    return validStrings;
  }
  let newValidStrings = JSON.parse(JSON.stringify(validStrings));
  newValidStrings.splice(invalidStringIndex, 1);
  return newValidStrings;
}

// console.log(removeInvalidString(getValidStrings(simplifyInstrument(guitar)),3));

// Given an array of valid strings, set all including upToString as invalid (based on stringOrder) to no longer loop through
function removeInvalidStringsBelow(validStrings, upToString) {
  const stringIndex = validStrings.indexOf(upToString);
  if (stringIndex === -1) {
    return validStrings;
  }
  let newValidStrings = JSON.parse(JSON.stringify(validStrings));
  newValidStrings.splice(0, stringIndex + 1);
  return newValidStrings;
}

// console.log(removeInvalidStringsBelow(getValidStrings(simplifyInstrument(guitar)),3));

// Given an interval number and a generic string, find the index of that interval on the string
function findIntervalOnString(interval, string) {
  let newString = [];
  for (let i = 0; i < string.length; i++) {
    if (string[i] !== null) {
      newString[i] = string[i] % 12;
    } else {
      newString[i] = string[i];
    }
  }
  // console.log(JSON.stringify(string,null,4));
  // console.log(JSON.stringify(newString,null,4));
  return newString.indexOf(interval);
}

// console.log(findIntervalOnString(7,simpleBanjoBoard[0]));
// console.log(findIntervalOnString(7,simpleBanjoBoard[1]));
// console.log(findIntervalOnString(7,createCrossSection(simpleBanjo,1,5)[1]));

// console.log(findIntervalOnString(7,genericString(21,5)));
// console.log(findIntervalOnString(21,modifyString(genericString(21,5),7)));

function findIntervalOnBoard(interval, fretBoard, validStrings) {
  for (let i = validStrings[0]; i < fretBoard.length; i++) {
    // console.log(fretBoard);
    const indexFound = findIntervalOnString(interval, fretBoard[i]);
    if (validStrings.indexOf(i) !== -1 && indexFound !== -1) {
      return {
        relInterval: interval,
        absInterval: fretBoard[i][indexFound],
        string: i,
        fretNum: indexFound,
      };
    }
  }
}

const remainingBanjoStrings = removeInvalidStringsBelow(simpleBanjoStrings, 1);
const stubbyBanjoBoard = createCrossSection(simpleBanjo, 1, 5);
// console.log(remainingBanjoStrings);
// console.log(stubbyBanjoBoard);

// console.log(findIntervalOnBoard(7,simpleBanjoBoard, remainingBanjoStrings));
// console.log(findIntervalOnBoard(7,stubbyBanjoBoard, simpleBanjoStrings));

//Given a simplified instrument, return an offset chord at a given cross-section

function findChordAtSection(chord, simpleInstrument, startFret, fretWidth) {
  let crossSection = createCrossSection(simpleInstrument, startFret, fretWidth);
  let validStrings = getValidStrings(simpleInstrument);
  let chordAtSection = [];
  for (let i = 0; i < chord.length; i++) {
    let currentInterval = chord[i];
    intervalFound = findIntervalOnBoard(
      currentInterval,
      crossSection,
      validStrings
    );
    validStrings = removeInvalidStringsBelow(
      validStrings,
      intervalFound.string
    );
    chordAtSection.push(intervalFound);
  }
  return chordAtSection;
}

// console.log(findChordAtSection(B7OnBanjo,simpleBanjo,1,21))
// console.log(findChordAtSection(B7OnBanjo,simpleBanjo,1,9))
// console.log(findChordAtSection(B7OnBanjo,simpleBanjo,2,8))
// console.log(simpleBanjo.strings);

// console.log(findChordAtSection(B7OnGuitar,simpleGuitar,1,9))
// console.log(findChordAtSection(B7OnGuitar,simpleGuitar,1,5))
// console.log(simpleGuitar.strings);

function findChordPositionsAtSection(
  chord,
  simpleInstrument,
  startFret,
  fretWidth
) {}
