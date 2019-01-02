const tap = require('tap');
const Note = require('../src/Note');
const Scale = require('../src/Scale');
const diatonic = require('../src/data/scaleSystem/diatonic');
const Key = require('../src/Key');

// WIP - will finish test file once Key.js is finalized
tap.test('class Key', function (t) {
    const BbLydian = new Key(new Note('Bb'), new Scale('lydian', diatonic, [0, 2, 4, 6, 7, 9, 11, 12]));
    const AsLydian = new Key(new Note('A#'), new Scale('lydian', diatonic, [0, 2, 4, 6, 7, 9, 11, 12]));

    t.same(BbLydian.scale, new Scale('lydian', diatonic, [0, 2, 4, 6, 7, 9, 11, 12]),'scale identified');

    t.same(BbLydian.note, new Note('Bb'),'flat note identified');
    t.same(AsLydian.note, new Note('A#'),'sharp note identified');

    t.same(BbLydian.getEquivKeys(), [
        new Key('A', new Scale('neapolitan minor', diatonic, [0, 1, 3, 5, 7, 8, 10, 12])),
        new Key('Bb', new Scale('lydian', diatonic, [0, 2, 4, 6, 7, 9, 11, 12])),
        new Key('C', new Scale('mixolydian', diatonic, [0, 2, 4, 5, 7, 9, 10, 12])),
        new Key('D', new Scale('aeolian', diatonic, [0, 2, 3, 5, 7, 8, 10, 12])),
        new Key('E', new Scale('locrian', diatonic, [0, 1, 3, 5, 6, 8, 10, 12])),
        new Key('F', new Scale('ionian', diatonic, [0, 2, 4, 5, 7, 9, 11, 12])),
        new Key('F', new Scale('major', diatonic, [0, 2, 4, 5, 7, 9, 11, 12])),
        new Key('G', new Scale('dorian', diatonic, [0, 2, 3, 5, 7, 9, 10, 12]))
    ],'equivalent keys identified given flat note');

    t.same(AsLydian.getEquivKeys(), [
        new Key('A', new Scale('neapolitan minor', diatonic, [0, 1, 3, 5, 7, 8, 10, 12])),
        new Key('Bb', new Scale('lydian', diatonic, [0, 2, 4, 6, 7, 9, 11, 12])),
        new Key('C', new Scale('mixolydian', diatonic, [0, 2, 4, 5, 7, 9, 10, 12])),
        new Key('D', new Scale('aeolian', diatonic, [0, 2, 3, 5, 7, 8, 10, 12])),
        new Key('E', new Scale('locrian', diatonic, [0, 1, 3, 5, 6, 8, 10, 12])),
        new Key('F', new Scale('ionian', diatonic, [0, 2, 4, 5, 7, 9, 11, 12])),
        new Key('F', new Scale('major', diatonic, [0, 2, 4, 5, 7, 9, 11, 12])),
        new Key('G', new Scale('dorian', diatonic, [0, 2, 3, 5, 7, 9, 10, 12]))
    ],'equivalent keys identified given sharp note');

    t.equal(BbLydian.valueOf(), JSON.stringify(BbLydian),'valueOf works');
    t.equal(BbLydian.toString(), JSON.stringify(BbLydian),'toString works');

    t.end();
});