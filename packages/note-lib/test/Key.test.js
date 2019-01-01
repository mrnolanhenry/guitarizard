const tap = require('tap');
const Note = require('../src/Note');
const Scale = require('../src/Scale');
const diatonic = require('../src/data/scaleSystem/diatonic');
const Key = require('../scratchpad/Key');

// WIP - will finish test file once Key.js is finalized
tap.test('class Key', function (t) {
    const bLydian = new Key('B', new Scale('lydian', diatonic, [0, 2, 4, 6, 7, 9, 11, 12]));

    t.equal(bLydian.note, 'B');
    t.same(bLydian.scale, new Scale('lydian', diatonic, [0, 2, 4, 6, 7, 9, 11, 12]));

    t.same(bLydian.getEquivKeys(), [
        new Key('Bb', new Scale('neapolitan minor', diatonic, [0, 1, 3, 5, 7, 8, 10, 12])),
        new Key('B', new Scale('lydian', diatonic, [0, 2, 4, 6, 7, 9, 11, 12])),
        new Key('Db', new Scale('mixolydian', diatonic, [0, 2, 4, 5, 7, 9, 10, 12])),
        new Key('Eb', new Scale('aeolian', diatonic, [0, 2, 3, 5, 7, 8, 10, 12])),
        new Key('F', new Scale('locrian', diatonic, [0, 1, 3, 5, 6, 8, 10, 12])),
        new Key('Gb', new Scale('ionian', diatonic, [0, 2, 4, 5, 7, 9, 11, 12])),
        new Key('Gb', new Scale('major', diatonic, [0, 2, 4, 5, 7, 9, 11, 12])),
        new Key('Ab', new Scale('dorian', diatonic, [0, 2, 3, 5, 7, 9, 10, 12]))
    ]);

    // t.same(bLydian.getNotesInKey(diatonic.Fs), [
    //   diatonic.Fs,
    //   diatonic.A,
    //   diatonic.B,
    //   diatonic.C,
    //   diatonic.Cs,
    //   diatonic.E
    // ]);

    // t.equal(bLydian.valueOf(), JSON.stringify(bLydian));
    // t.equal(bLydian.toString(), JSON.stringify(bLydian));

    t.end();
});