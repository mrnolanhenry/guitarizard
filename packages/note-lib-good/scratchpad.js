const assert = require('assert');

//Data Dump of individual scales that go into scales array
const pentatonicMinor = [0,3,5,7,10];
const blues = [0,3,5,6,7,10];
const chromatic = [0,1,2,3,4,5,6,7,8,9,10,11];
const scales = {
  pentatonicMinor,
  blues,
  chromatic
};

const notes = [ ['A', 'A#', 'B','C','C#','D','D#','E','F','F#','G','G#'],
                ['A', 'Bb', 'B','C','Db','D','Eb','E','F','Gb','G','Ab']];

// Given a "key" or a note
function noteExists(key) {
  return notes[0].indexOf(key) !== -1 || notes[1].indexOf(key) !== -1;
}

// Given a key (e.g. 'Gb') and a scale (e.g. 'blues'), this function spits out an array 'newScale' of objects, with each note in the scale.
function getNotesInScale(key,scale) {
  if (!noteExists(key)) {
    return;
  }

  if (typeof scales[scale] === 'undefined') {
    return;
  }

  const newNotes = (notes[1].indexOf(key) === -1) ? notes[0] : notes[1]
  const stepsFromA = newNotes.indexOf(key);
  const intervals = scales[scale];
  const newScale = [];

  for (i = 0; i < intervals.length; i++) {
    const notesFromA = (intervals[i] + stepsFromA) % 12;
    newScale.push({
      notesFromA: notesFromA,
      note: newNotes[notesFromA],
    });
  }
  return newScale;

}

// Test - getNotesInScale function
console.log(getNotesInScale('F','blues'));
console.log(getNotesInScale('A','blues'));

// Test case error check - getNotesInScale function
assert.deepStrictEqual (getNotesInScale('F','blues'), [ { notesFromA: 8, note: 'F' },
                                                        { notesFromA: 11, note: 'Ab' },
                                                        { notesFromA: 1, note: 'Bb' },
                                                        { notesFromA: 2, note: 'B' },
                                                        { notesFromA: 3, note: 'C' },
                                                        { notesFromA: 6, note: 'Eb' } ]
                       ,'You fucked up');


function createString(startNote,boardLength,startFret) {
  if (!noteExists(startNote) || isNaN(boardLength)) {
    return;
  }
  if (isNaN(startFret)) {
    startFret = 0
  }
  const newNotes = (notes[1].indexOf(startNote) === -1) ? notes[0] : notes[1]
  const stepsFromA = newNotes.indexOf(startNote);
  const newString = [];

  for (i = startFret; i <= boardLength; i++) {
    const FretNum = i;
    const notesFromA = (i - startFret + stepsFromA) % 12;
    newString.push({
      FretNum: FretNum,
      note: newNotes[notesFromA],
    });
  }
  return newString;
}

// Test - createString function
console.log(createString('A',21,5));

// Test case error check - getNotesInScale function
assert.deepStrictEqual (createString('A',21,5), [ { FretNum: 5, note: 'A' },
                                                  { FretNum: 6, note: 'Bb' },
                                                  { FretNum: 7, note: 'B' },
                                                  { FretNum: 8, note: 'C' },
                                                  { FretNum: 9, note: 'Db' },
                                                  { FretNum: 10, note: 'D' },
                                                  { FretNum: 11, note: 'Eb' },
                                                  { FretNum: 12, note: 'E' },
                                                  { FretNum: 13, note: 'F' },
                                                  { FretNum: 14, note: 'Gb' },
                                                  { FretNum: 15, note: 'G' },
                                                  { FretNum: 16, note: 'Ab' },
                                                  { FretNum: 17, note: 'A' },
                                                  { FretNum: 18, note: 'Bb' },
                                                  { FretNum: 19, note: 'B' },
                                                  { FretNum: 20, note: 'C' },
                                                  { FretNum: 21, note: 'Db' } ]
                       ,'You fucked up');


const guitar = {
  strings: [
    createString('E',21,0),
    createString('B',21,0),
    createString('G',21,0),
    createString('D',21,0),
    createString('A',21,0),
    createString('E',21,0)
  ]
}
