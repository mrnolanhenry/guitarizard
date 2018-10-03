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

  for (let i = 0; i < intervals.length; i++) {
    const notesFromA = (intervals[i] + stepsFromA) % 12;
    newScale.push({
      notesFromA: notesFromA,
      note: newNotes[notesFromA],
    });
  }
  return newScale;

}

// Test - getNotesInScale function
// console.log(getNotesInScale('F','blues'));
// console.log(getNotesInScale('A','blues'));

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

   for (let i = 0; i < intervals.length; i++) {
     const notesFromA = (intervals[i] + stepsFromA) % 12;
     newChord.push({
       notesFromA: notesFromA,
       note: newNotes[notesFromA],
     });
   }
   return newChord;

 }
 // Test - getNotesInChord function
 // console.log(getNotesInChord('B','_7'));

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

  for (let i = startFret; i <= endFret; i++) {
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
// console.log(createString('A',5,21,1));

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


// Example - create a guitar using createString function
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

// Example - create a banjo using createString function
const banjo = {
  strings: [
    createString('D',0,21,4),
    createString('B',0,21,3),
    createString('G',0,21,2),
    createString('D',0,21,1),
    createString('G',5,21,5)
  ]
};

// Example - create a made up instrument using createString function
const stubby = {
  strings: [
    createString('E',0,5,6),
    createString('B',0,5,5),
    createString('G',0,5,4),
    createString('D',0,5,3),
    createString('A',0,5,2),
    createString('E',0,5,1)
  ]
};

function sortByStringOrder(instrument) {
  const   clonedInstrument = JSON.parse(JSON.stringify(instrument));
  clonedInstrument.strings.sort(function(a, b){return a.stringOrder - b.stringOrder})
  return clonedInstrument;
}

// console.log(JSON.stringify(sortByStringOrder(banjo),null,4));
// console.log(JSON.stringify(banjo,null,4));

// given a Note, Instrument, and String index number, returns Note object on given String with fretNum and other helpful info.
function findNoteOnString(note,instrument,string) {
  for (let j = 0; j < instrument.strings[string].notes.length; j++) {
      if (instrument.strings[string].notes[j].note === note) {
        return {
          stringTuning: instrument.strings[string].notes[0].note,
          stringOrder: instrument.strings[string].stringOrder,
          fretNum: instrument.strings[string].notes[j].fretNum,
          note: instrument.strings[string].notes[j].note
        }
      }
  }
}

// console.log(findNoteOnString('B',guitar,guitar.strings.length-1));
// console.log(findNoteOnString('E',stubby,stubby.strings.length-1));

// given a Note, Instrument, and starting stringOrder, finds Note object based on StringOrder with fretNum and other helpful info.
function findNoteOnInstrument(note,instrument,startStringOrder) {
  const clonedInstrument = sortByStringOrder(instrument)
  for (let i = startStringOrder - 1; i < clonedInstrument.strings.length; i++) {
    if (typeof (findNoteOnString(note,clonedInstrument,i)) !== 'undefined') {
    return findNoteOnString(note,clonedInstrument,i);
    }
  }
}

// console.log(findNoteOnInstrument('B',stubby,1));
// console.log(findNoteOnInstrument('Db',guitar,1));


function findRootChord(note,chord,instrument) {
  newChordNotes = getNotesInChord(note,chord)
  const newChord = [];
  let startStringOrder = 1;
  for (let i = 0; i < newChordNotes.length; i++) {
    newChord.push(findNoteOnInstrument(newChordNotes[i].note,instrument,startStringOrder));
    startStringOrder = newChord[i].stringOrder + 1;
  }
  return newChord;
}

// console.log(findRootChord('B','_7',guitar));
// console.log(findRootChord('B','_7',stubby));

// Given an instrument, get a list of valid strings to loop through when finding chords
function getValidStrings(instrument) {
  let validStrings = [];
  for (let i = 1; i <= instrument.strings.length; i++) {
    validStrings.push(i)
    }
  return validStrings;
}

// console.log(getValidStrings(guitar));

// Given an array of valid strings, set one as invalid (based on stringOrder) to no longer loop through
function removeInvalidString(validStrings, invalidString){
    if (validStrings.indexOf(invalidString) === -1) {
      return;
    }
    validStrings.splice(validStrings.indexOf(invalidString),1);
    return validStrings;
}

// console.log(removeInvalidString(getValidStrings(guitar),4));

// given a Note, Instrument, and valid strings, finds Note object based on StringOrder with fretNum and other helpful info.
function findNoteOnInstrumentTake2(note,instrument,validStrings) {
  const clonedInstrument = sortByStringOrder(instrument)
  for (let i = Math.min.apply(null, validStrings) - 1; i < clonedInstrument.strings.length; i++) {
    if (validStrings.indexOf(i+1) !== -1 && typeof (findNoteOnString(note,clonedInstrument,i)) !== 'undefined') {
    return findNoteOnString(note,clonedInstrument,i);
    }
  }
}

console.log(findNoteOnInstrument('Db',guitar,1));
console.log(findNoteOnInstrumentTake2('Db',guitar,getValidStrings(guitar)));


// function createAllRootChords(note,chord,instrument) {
//   newChordNotes = getNotesInChord(note,chord)
//
//   // currentString is a counter for the string we are looking for (based on stringOrder)
//   let currentString = 1;
//   const newChord = [];
//   const rootChords = [];
//
//   for (h=0; h < 4; h++) {
//     // chordNote is a counter for which note within the Chord we are looking for.
//     for (chordNote = 0; chordNote < newChordNotes.length; chordNote++) {
//     // Loop through to find starting string (i.e. string with StringOrder 1)
//       loopThruStrings:
//       for (i = instrument.strings.length -1; i >= 0; i--) {
//         if (instrument.strings[i].stringOrder === currentString) {
//           loopThruFrets:
//           for (j = 0; j < instrument.strings[i].notes.length; j++) {
//               if (instrument.strings[i].notes[j].note === newChordNotes[chordNote].note) {
//                 let lastChordNote = newChordNotes.length - chordNote
//                 // if (typeof rootChords[h-1] === 'undefined' || rootChords[h-1][lastChordNote].fretNum !== instrument.strings[i].notes[j].fretNum){
//                 if (typeof rootChords[h-1] === 'undefined'){
//                     newChord.push({
//                       stringTuning: instrument.strings[i].notes[0].note,
//                       stringOrder: currentString,
//                       chordNote: chordNote,
//                       fretNum: instrument.strings[i].notes[j].fretNum,
//                       note: instrument.strings[i].notes[j].note
//                     })
//                     currentString +=1;
//                     break loopThruStrings;
//                   }
//                 }
//               }
//           }
//         }
//       }
//     console.log(h-1,rootChords[h-1][lastChordNote])
//     rootChords.push(newChord)
//   }
//   return rootChords;
// }

// console.log(createAllRootChords('B','_7',guitar),'positions: ',createAllRootChords('B','_7',guitar).length)

console.log('guitarcheatcodes.com','guitarmack','guitarizard.com','chordfix.com')
