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

const _7 = [0,4,7,10];
const chords = {
  _7
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


 // Given a note and a chord (e.g. '_7 this function spits out an array 'newChord' of objects, with each note in the Chord.
 function getNotesInChord(note,chord) {
   if (!noteExists(note)) {
     return;
   }

   if (typeof chords[chord] === 'undefined') {
     return;
   }

   const newNotes = (notes[1].indexOf(note) === -1) ? notes[0] : notes[1]
   const stepsFromA = newNotes.indexOf(note);
   const intervals = chords[chord];
   const newChord = [];

   for (i = 0; i < intervals.length; i++) {
     const notesFromA = (intervals[i] + stepsFromA) % 12;
     newChord.push({
       notesFromA: notesFromA,
       note: newNotes[notesFromA],
     });
   }
   return newChord;

 }
 // Test - getNotesInChord function
 console.log(getNotesInChord('B','_7'));

 // Test case error check - getNotesInScale function
 assert.deepStrictEqual (getNotesInChord('B','_7'), [
  { notesFromA: 2, note: 'B' },
  { notesFromA: 6, note: 'Eb' },
  { notesFromA: 9, note: 'Gb' },
  { notesFromA: 0, note: 'A' } ]

                        ,'You fucked up');



// Given a starting Note, starting fret, end fret, and order of String within instrument,
// create a string: array of objects that have note and fret Number properties.
function createString(startNote,startFret, endFret, stringOrder) {
  if (!noteExists(startNote) || isNaN(endFret)) {
    return;
  }
  if (isNaN(startFret)) {
    startFret = 0
  }
  const newNotes = (notes[1].indexOf(startNote) === -1) ? notes[0] : notes[1]
  const stepsFromA = newNotes.indexOf(startNote);
  const newStringNotes = [];

  for (i = startFret; i <= endFret; i++) {
    const fretNum = i;
    const notesFromA = (i - startFret + stepsFromA) % 12;
    newStringNotes.push({
      fretNum: fretNum,
      note: newNotes[notesFromA],
    });
  }
  const newString = {
    stringOrder: stringOrder,
    notes: newStringNotes
  }

  return newString;
}

// Test - createString function
console.log(createString('A',5,21,1));

// Test case error check - getNotesInScale function
assert.deepStrictEqual (createString('A',5,21,1), { stringOrder: 1,
  notes:
   [ { fretNum: 5, note: 'A' },
     { fretNum: 6, note: 'Bb' },
     { fretNum: 7, note: 'B' },
     { fretNum: 8, note: 'C' },
     { fretNum: 9, note: 'Db' },
     { fretNum: 10, note: 'D' },
     { fretNum: 11, note: 'Eb' },
     { fretNum: 12, note: 'E' },
     { fretNum: 13, note: 'F' },
     { fretNum: 14, note: 'Gb' },
     { fretNum: 15, note: 'G' },
     { fretNum: 16, note: 'Ab' },
     { fretNum: 17, note: 'A' },
     { fretNum: 18, note: 'Bb' },
     { fretNum: 19, note: 'B' },
     { fretNum: 20, note: 'C' },
     { fretNum: 21, note: 'Db' } ] }
                       ,'You fucked up');


//Example - create a guitar out using createString function
const guitar = {
  strings: [
    createString('E',0,21,6),
    createString('B',0,21,5),
    createString('G',0,21,4),
    createString('D',0,21,3),
    createString('A',0,21,2),
    createString('E',0,21,1)
  ]
};


function createRootChord(note,chord,instrument) {
  newChord = getNotesInChord(note,chord)

  // currentString is a counter for the string we are looking for (based on stringOrder)
  let currentString = 1;
  const newChordNotes = [];

// chordNote is a counter for which note within the Chord we are looking for.
for (chordNote = 0; chordNote < newChord.length; chordNote++) {
// Loop through to find starting string (i.e. string with StringOrder 1)
  loopThruStrings:
  for (i = instrument.strings.length -1; i >= 0; i--) {
    if (instrument.strings[i].stringOrder === currentString) {
      loopThruFrets:
      for (j = 0; j < instrument.strings[i].notes.length; j++) {
        console.log(newChord, chordNote)
          if (instrument.strings[i].notes[j].note === newChord[chordNote].note) {
            newChordNotes.push({
              chordNote: chordNote,
              fretNum: instrument.strings[i].notes[j].fretNum,
              note: instrument.strings[i].notes[j].note
            })
            currentString +=1;
            break loopThruStrings;
          }
      }
    }
  }
}
  return newChordNotes;
}

let chordNote = 0;
let newChord = getNotesInChord('B','_7')
console.log(newChord[chordNote].note);

 console.log(createRootChord('B','_7',guitar))

// console.log(JSON.stringify(guitar,null,4));
