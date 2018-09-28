const assert = require('assert');

//     _   _  ___  _        _    _   _
//    | \ | |/ _ \| |      / \  | \ | |
//   |  \| | | | | |     / _ \ |  \| |
//  | |\  | |_| | |___ / ___ \| |\  |
// |_| \_|\___/|_____/_/   \_\_| \_|



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


















// --- don't touch the below lol, or: be careful!!
//
//       _  ____ ___  _
//      / |/  _ \\  \//
//      | || / \| \  /
//   /\_| || |-|| / /
//   \____/\_/ \|/_/
//

/**
 * A single note --- nothing more. ;)
 */
class Note {
  // TODO: Don't use array of keys & enforce with type
  constructor(id, aliases) {
    this.id = id;
    this.aliases = aliases;
  }

  isSharp() {
    return false; // TODO: this.aliases.indexOf('#') !== -1;
  }

  isFlat() {
    return false; // TODO: this.aliases.indexOf('b') !== -1;
  }

  toJSON(key) {
    return { id: this.id, aliases: this.aliases };
  }

  valueOf() {
    return JSON.stringify(this, null, 4);
  }

  toString() {
    return JSON.stringify(this, null, 4);
  }
}

/**
 * A scale system defines the scale universe.
 *
 * e.g. diatonic
 *
 * If you were a formal person, you'd call this a "scale".
 */
class ScaleSystem {
  constructor(notes) {
    this.notes = notes;
  }

  // Given an alias, e.g. "A#", return the
  // "Note" instance, e.g. `new Note('Bb', ['A#', 'Bb'])`
  getNoteFromAlias(alias) {
    return this.notes.find((note) => {
      return note.aliases.indexOf(alias) !== -1;
    });
  }

  // TODO: bad name
  // TODO: docs:
  //
  // basically "shifts" the scale system to start at a new note
  getShiftedNotes(alias) {
    let notes = [];
    let currentNote = this.getNoteFromAlias(alias);

    for (let i = 0; i < this.notes.length; i++) {
      notes.push(currentNote);
      currentNote = this.getNextNote(currentNote);
    }

    return notes;
  }

  /**
   * Given a Note (object), it will return the
   * offset in the context of this Scale System.
   */
  getRelativeNoteOffset(fromNote) {
    // We have a list of notes in this "scale system" (this.notes)
    // and we want the offset that `fromNote` exists in it.
    //
    // `findIndex` loops over `this.notes`.
    //
    // If we return `true` from any iterations, then we have
    // found the note we were looking for!
    const offset = this.notes.findIndex((note) => {
      return note.id === fromNote.id;
    });

    return offset;
  }

  getNoteOffset(fromNote, toNote) {
    const fromNoteOffset = this.getRelativeNoteOffset(fromNote);
    const toNoteOffset = this.getRelativeNoteOffset(toNote);
    if (toNoteOffset > fromNoteOffset) {
      return toNoteOffset - fromNoteOffset;
    } else {
      return toNoteOffset - fromNoteOffset + this.notes.length;
    }
  }

  /**
   * Note -> Note       -- @TODO write test cases
   *
   * Returns the next note in the scale system
   * given a starting note.
   *
   * e.g.
   *
   *  > if our system is 12EDO, then
   *  >
   *  > Given Note('B'), this will return Note('C')
   *
   * It will also properly "loop" around if
   * necessary,
   *
   * e.g.
   *
   *  > if our system is 12EDO, then
   *  >
   *  > Given Note('Ab'), this will return Note('A')
   *
   */
  getNextNote(currentNote) {
    const offset = this.getRelativeNoteOffset(currentNote);

    return this.notes[(offset + 1) % this.notes.length];
  }

  toJSON(key) {
    return { notes: this.notes };
  }

  valueOf() {
    return JSON.stringify(this, null, 4);
  }

  toString() {
    return JSON.stringify(this, null, 4);
  }
}

/**
 * A single scale.
 *
 * e.g. "play me the Blues scale, bro"
 *
 * If you were a formal person, you'd call this a "mode".
 */
class Scale {
  constructor(name, scaleSystem, intervals) {
    this.name = name;
    this.scaleSystem = scaleSystem;
    this.intervals = intervals;
  }

  getNotesInKey(key) {
    const notes = this.scaleSystem.getShiftedNotes(key);
    return this.intervals.map((interval) => {
      return notes[interval];
    });
  }

  toJSON(key) {
    return {
      name: this.name,
      scaleSystem: this.scaleSystem,
      intervals: this.intervals
    };
  }

  valueOf() {
    return JSON.stringify(this, null, 4);
  }

  toString() {
    return JSON.stringify(this, null, 4);
  }
}


/**
 *  A single fretted string that exists in
 *  the given `scaleSystem`
 */
class FrettedString {
  constructor(scaleSystem, startNote, startFret, endFret) {
    this.scaleSystem = scaleSystem;
    this.startNote = startNote;
    this.startFret = startFret;
    this.endFret = endFret;
  }

  getFrettedNotes() {
    const frettedNotes = [
      { fret: this.startFret, note: this.startNote }
    ];

    let currentNote = this.scaleSystem.getNextNote(this.startNote);
    let i = this.startFret;

    while (i < this.endFret) {
      i++;
      frettedNotes.push({ fret: i, note: currentNote });
      currentNote = this.scaleSystem.getNextNote(currentNote)
    }

    return frettedNotes;
  }

  toJSON(key) {
    return {
      scaleSystem: this.scaleSystem,
      startNote: this.startNote,
      startFret: this.startFret,
      endFret: this.endFret
    };
  }

  valueOf() {
    return JSON.stringify(this, null, 4);
  }

  toString() {
    return JSON.stringify(this, null, 4);
  }
}

// ------- test lib code: "fkin"  ----------
//
// TODO: * move to '/lib/fkin.js'
//       * open source for luls
//
async function fkinTest(tests) {
  const pending = [],
        results = [];

  let i = 0;
  while (i < tests.length) {

    const tags = []; while (typeof tests[i] == 'string')
      tags.push(tests[i++]);

    const fn = tests[i];

    pending.push(fn()
      .then((data) => results.push({ tags, data }))
      .catch((error) => results.push({ tags, error })));

    i++;
  }

  await Promise.all(pending);
  return results;
}
//
// -------- end test lib code ---------





/**
 *  Welcome to the entry point of this program!
 *
 */
const main = async function () {

  // -------------- Tests ---------------------
  // confirm your shit works for the most part
  // and confirm easily that the whole code base
  // is working when you make changes!
  //
  const tests = [];

  // Docs: This is a temporary test framework I
  //       wrote up. We can use it for now, but
  //       will be replaced soon.

  tests.push('Note', 'init', async function() {
    const note = new Note('A', ['A']);
    assert.deepStrictEqual(note.aliases, ['A']);
  });

  tests.push('Note', 'JSON', async function() {
    const note = new Note('FOO-BAR', ['X', 'Y']);
    assert.deepStrictEqual(note.toJSON(), {
      id: 'FOO-BAR',
      aliases: ['X', 'Y']
    });
  });

  tests.push('ScaleSystem', 'init', async function () {
    const simpleSystem = new ScaleSystem([
      new Note('A', ['A']),
      new Note('Bb', ['A#', 'Bb']),
    ]);

    assert.deepStrictEqual(simpleSystem.notes.length, 2);
  });

  tests.push('ScaleSystem', 'getNoteFromKey', async function() {
    const simpleSystem = new ScaleSystem([
      new Note('A', ['A']),
      new Note('Bb', ['A#', 'Bb']),
    ]);

    assert.deepStrictEqual(
      simpleSystem.getNoteFromAlias('A#'),
      new Note('Bb', ['A#', 'Bb']));
  });

  tests.push('ScaleSystem', 'getNoteOffset', async function () {
    const diatonic = new ScaleSystem([
      new Note('A', ['A']),
      new Note('Bb', ['A#', 'Bb']),
      new Note('B', ['B']),
      new Note('C', ['C']),
      new Note('Db', ['C#', 'Db']),
      new Note('D', ['D']),
      new Note('Eb', ['D#', 'Eb']),
      new Note('E', ['E']),
      new Note('F', ['F']),
      new Note('Gb', ['F#', 'Gb']),
      new Note('G', ['G']),
      new Note('Ab', ['G#', 'Ab'])
    ]);

    assert.deepStrictEqual(
      diatonic.getNoteOffset(new Note('A', ['A']), new Note('C', ['C'])),
      3
    )

    assert.deepStrictEqual(
      diatonic.getNoteOffset(new Note('Bb', ['A#']), new Note('C', ['C'])),
      2
    )

    assert.deepStrictEqual(
      diatonic.getNoteOffset(new Note('G', ['G']), new Note('A', ['A'])),
      2
    )

    // const table = [
    //   [ new Note('A', ['A']), 0 ],
    //   [ new Note('A', ['A#']), 1 ],
    //   [ new Note('B', ['Bb']), 1 ]
    // ];
    //
    // table.forEach((row, i) => {
    //   const note = row[0];
    //   const expected = row[1];
    //
    //   assert.deepStrictEqual(
    //     simpleSystem.getNoteOffset(note),
    //     expected);
    // })
  });

  tests.push('ScaleSystem', 'getNextNote', async function () {
    const simpleSystem = new ScaleSystem([
      new Note('A', ['A']),
      new Note('Bb', ['A#', 'Bb']),
      new Note('B', ['B']),
      new Note('Ab', ['G#', 'Ab'])
    ]);

    assert.deepStrictEqual(
      simpleSystem.getNextNote(new Note('A', ['A'])),
      new Note('Bb', ['A#', 'Bb']))

    assert.deepStrictEqual(
      simpleSystem.getNextNote(new Note('G', ['G#', 'Ab'])),
      new Note('A', ['A']))

    assert.deepStrictEqual(
      simpleSystem.getNextNote(new Note('Ab', ['Ab'])),
      new Note('A', ['A']))
  });

  tests.push('ScaleSystem', 'getNoteOffset', async function () {
      const diatonic = new ScaleSystem([
        new Note('A', ['A']),
        new Note('Bb', ['A#', 'Bb']),
        new Note('B', ['B']),
        new Note('C', ['C']),
        new Note('Db', ['C#', 'Db']),
        new Note('D', ['D']),
        new Note('Eb', ['D#', 'Eb']),
        new Note('E', ['E']),
        new Note('F', ['F']),
        new Note('Gb', ['F#', 'Gb']),
        new Note('G', ['G']),
        new Note('Ab', ['G#', 'Ab'])
      ]);

      const a = new Note('A', ['A']);
      const c = new Note('C', ['C']);

      // assert.deepStrictEqual(
      //   diatonic.getNoteOffset(a, c),
      //   3
      // )
      //
      // assert.deepStrictEqual(
      //   diatonic.getNoteOffset(c, a),
      //   9
      // )
  })

  tests.push('Scale', 'init', async function () {
    const scaleSystems = {
      // diatonic scale with equal temperament
      '12EDO': new ScaleSystem([
        new Note('A', ['A']),
        new Note('Bb', ['A#', 'Bb']),
        new Note('B', ['B']),
        new Note('C', ['C']),
        new Note('Db', ['C#', 'Db']),
        new Note('D', ['D']),
        new Note('Eb', ['D#', 'Eb']),
        new Note('E', ['E']),
        new Note('F', ['F']),
        new Note('Gb', ['F#', 'Gb']),
        new Note('G', ['G']),
        new Note('Ab', ['G#', 'Ab'])
      ])
    };

    const scales = [
      new Scale('Pentatonic Minor',
                scaleSystems['12EDO'],
                [0, 3, 5, 7, 10]),
      new Scale('Blues',
                scaleSystems['12EDO'],
                [0, 3, 5, 6, 7, 10]),
      new Scale('Chromatic',
                scaleSystems['12EDO'],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    ]

    const expectedNames = [
      'Pentatonic Minor',
      'Blues',
      'Chromatic'
    ];

    scales.forEach((scale, i) => {
      assert.deepStrictEqual(scale.name, expectedNames[i]);
    });
  });

  tests.push('Scale', 'getNotesInKey', async function() {
    const diatonic = new ScaleSystem([
      new Note('A', ['A']),
      new Note('Bb', ['A#', 'Bb']),
      new Note('B', ['B']),
      new Note('C', ['C']),
      new Note('Db', ['C#', 'Db']),
      new Note('D', ['D']),
      new Note('Eb', ['D#', 'Eb']),
      new Note('E', ['E']),
      new Note('F', ['F']),
      new Note('Gb', ['F#', 'Gb']),
      new Note('G', ['G']),
      new Note('Ab', ['G#', 'Ab'])
    ]);

    const blues = new Scale('Blues',
                            diatonic,
                            [0, 3, 5, 6, 7, 10]);

    const notes = blues.getNotesInKey('F');

    assert.deepStrictEqual(notes, [
      new Note('F', ['F']),
      new Note('Ab', ['G#', 'Ab']),
      new Note('Bb', ['A#', 'Bb']),
      new Note('B', ['B']),
      new Note('C', ['C']),
      new Note('Eb', ['D#', 'Eb'])
    ]);

  });


  tests.push('FrettedString', 'getFrettedNotes', async function() {
    const diatonic = new ScaleSystem([
      new Note('A', ['A']),
      new Note('Bb', ['A#', 'Bb']),
      new Note('B', ['B'])
    ]);

    const string = new FrettedString(diatonic,
                                     new Note('A', ['A']),
                                     5,
                                     9);

    assert.deepStrictEqual(
      JSON.stringify(string.getFrettedNotes()),
      JSON.stringify([
        { fret: 5, note: { id: 'A', aliases: ['A']} },
        { fret: 6, note: { id: 'Bb', aliases: ['A#', 'Bb']} },
        { fret: 7, note: { id: 'B', aliases: ['B']} },
        { fret: 8, note: { id: 'A', aliases: ['A'] } },
        { fret: 9, note: { id: 'Bb', aliases: ['A#', 'Bb']} }
      ]));
  });

  //
  // ------------- end tests ---------------

  const results = await fkinTest(tests);

  let hasFailed = false;

  results.forEach((result) => {
    const tagMsg = result.tags.join(' -> ');

    if (result.error) {
      hasFailed = true;
      console.error(`(FAILURE ((${tagMsg}) (${result.error.stack})))`);
    } else {
      console.log(`(SUCCESS (${tagMsg}))`);
    }
  });

  if (hasFailed) {
    console.error('\n\nsome tests have failed! check the output above :)');
    process.exit(1);
  }

}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});



// --- don't touch the above lol.
// =================================
