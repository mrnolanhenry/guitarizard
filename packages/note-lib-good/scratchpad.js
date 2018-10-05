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

// console.log(getNotesInScale('F','blues'));
// console.log(getNotesInScale('A','blues'));

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
    stringTuning: startNote,
    stringOrder: stringOrder,
    notes: newStringNotes
  }

  return newString;
}

// Test - createString function
// console.log(createString('A',5,21,1));

// Test case error check - getNotesInScale function
assert.deepStrictEqual (createString('A',5,16,1), { stringTuning: 'A',
  stringOrder: 1,
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
     { fretNum: 16, note: 'Ab' } ] }
                       ,'You fucked up');


// Example - create a guitar using createString function
const guitar = {
  strings: [
    createString('E',0,21,5),
    createString('B',0,21,4),
    createString('G',0,21,3),
    createString('D',0,21,2),
    createString('A',0,21,1),
    createString('E',0,21,0)
  ]
};

// Example - create a banjo using createString function
const banjo = {
  strings: [
    createString('D',0,21,3),
    createString('B',0,21,2),
    createString('G',0,21,1),
    createString('D',0,21,0),
    createString('G',5,21,4)
  ]
};

// Example - create a made up instrument using createString function
const stubby = {
  strings: [
    createString('E',0,5,5),
    createString('B',0,5,4),
    createString('G',0,5,3),
    createString('D',0,5,2),
    createString('A',0,5,1),
    createString('E',0,5,0)
  ]
};

// Given an instrument, sort it by string Order and return a new instrument
function sortByStringOrder(instrument) {
  const   clonedInstrument = JSON.parse(JSON.stringify(instrument));
  clonedInstrument.strings.sort(function(a, b){return a.stringOrder - b.stringOrder})
  return clonedInstrument;
}

// console.log(JSON.stringify(sortByStringOrder(banjo),null,4));
// console.log(JSON.stringify(banjo,null,4));


// Given an instrument, get a list of valid strings to loop through when finding chords
function getValidStrings(instrument) {
  let validStrings = [];
  for (let i = 0; i < instrument.strings.length; i++) {
    validStrings.push(i)
    }
  return validStrings;
}

// console.log(getValidStrings(guitar));

// Given an array of valid strings, set one as invalid (based on stringOrder) to no longer loop through
function removeInvalidString(validStrings, invalidString){
    if (validStrings.indexOf(invalidString) === -1) {
      return validStrings;
    }
    validStrings.splice(validStrings.indexOf(invalidString),1);
    return validStrings;
}

// console.log(removeInvalidString(getValidStrings(guitar),7));

// Given an array of valid strings, set all before first valid string as invalid (based on stringOrder) to no longer loop through
function removeInvalidStringsBelow(validStrings, firstValidString){
    if (validStrings.indexOf(firstValidString) === -1) {
      return validStrings;
    }
    validStrings.splice(0,validStrings.indexOf(firstValidString));
    return validStrings;
}

// console.log(removeInvalidStringsBelow(getValidStrings(guitar),7));

// Given a Note, Instrument, and String index number, returns Note object on given String with fretNum and other helpful info.
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


// Given a Note, Instrument, and valid strings, finds Note object based on StringOrder with fretNum and other helpful info.
function findNoteOnInstrument(note,instrument,validStrings) {
  const clonedInstrument = sortByStringOrder(instrument)
  for (let i = validStrings[0]; i < clonedInstrument.strings.length; i++) {
    if (validStrings.indexOf(i) !== -1 && typeof (findNoteOnString(note,clonedInstrument,i)) !== 'undefined') {
    return findNoteOnString(note,clonedInstrument,i);
    }
  }
}

// console.log(findNoteOnInstrument('Db',guitar,getValidStrings(guitar)));
// console.log(findNoteOnInstrument('Db',guitar,removeInvalidString(getValidStrings(guitar),0)));


// Given a key, scale, instrument, and string returns an object with each Note in the scale found on the string
function findScaleOnString(key,scale,instrument,string) {
  const newScale = getNotesInScale(key,scale);
  let newScaleNotes = [];
  for (let j = 0; j < instrument.strings[string].notes.length; j++) {
    for (let i = 0; i < newScale.length; i++) {
      if (instrument.strings[string].notes[j].note === newScale[i].note) {
         newScaleNotes.push({
          fretNum: instrument.strings[string].notes[j].fretNum,
          note: instrument.strings[string].notes[j].note
        })
      }
    }
  }
  const scaleOnString = {
    stringTuning: instrument.strings[string].notes[0].note,
    stringOrder: instrument.strings[string].stringOrder,
    notes: newScaleNotes
  }
  return scaleOnString
}

// console.log(getNotesInScale('B','blues'));
// console.log(findScaleOnString('B','blues',guitar,guitar.strings.length-1));

// Given a key, scale, and instrument, returns an object with each Note in the scale found on the instrument
function findScaleOnInstrument(key,scale,instrument) {
  const newScale = {notes:[]};
  const clonedInstrument = sortByStringOrder(instrument)
  const validStrings = getValidStrings(clonedInstrument);
  for (let i = validStrings[0]; i < clonedInstrument.strings.length; i++) {

    if (validStrings.indexOf(i) !== -1 && typeof (findScaleOnString(key,scale,clonedInstrument,i)) !== 'undefined') {
    newScale.notes.push(findScaleOnString(key,scale,clonedInstrument,i))
    }
  }
  return newScale;
}

// console.log(findScaleOnInstrument('B','blues',guitar));

// Given a note, type of chord (e.g. '_7' for 7th chord), and instrument, returns a Root Chord object with each string/note/fret number
function findRootChord(note,chord,instrument) {
  newChordNotes = getNotesInChord(note,chord);
  const newChord = {strings:[]};
  let validStrings = getValidStrings(instrument);
  for (let i = 0; i < newChordNotes.length; i++) {
    newChord.strings.push(findNoteOnInstrument(newChordNotes[i].note,instrument,validStrings));
    let stringFound = newChord.strings[i].stringOrder;
    // ONLY for ROOT chords
    //-----------------------------------------------------
    if (i === 0) {
      removeInvalidStringsBelow(validStrings, stringFound)
    }
    // ----------------------------------------------------
    removeInvalidString(validStrings, stringFound)
  }
  return sortByStringOrder(newChord);
}

// console.log(findRootChord('B','_7',guitar));
// console.log(findRootChord('B','_7',stubby));


console.log('guitarcheatcodes.com','guitarizard.com','chordfix.com')
