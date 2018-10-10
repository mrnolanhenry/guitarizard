const tap = require('tap');
const Note = require('../../src/Note');
const ScaleSystem = require('../../src/ScaleSystem');
const TunedString = require('../../src/instrument/TunedString');

tap.test('class TunedString', function (t) {

  const smallDiatonic = new ScaleSystem('small', [
    new Note('A', ['A']),
    new Note('Bb', ['A#', 'Bb']),
    new Note('B', ['B'])
  ]);

  const AString = new TunedString(new Note('A', ['A']));

  t.same(
    AString.getFrettedNotes(smallDiatonic, 0),
    [ new Note('A', ['A']) ],
    'single fret');

  t.same(
    AString.getFrettedNotes(smallDiatonic, 1),
    [ new Note('A', ['A']), new Note('Bb', ['A#', 'Bb']) ],
    'two frets');

  t.same(
    AString.getFrettedNotes(smallDiatonic, 2),
    [ new Note('A', ['A']),
      new Note('Bb', ['A#', 'Bb']),
      new Note('B', ['B']) ],
    'three frets');

  t.same(
    AString.getFrettedNotes(smallDiatonic, 3),
    [ new Note('A', ['A']),
      new Note('Bb', ['A#', 'Bb']),
      new Note('B', ['B']),
      new Note('A', ['A']) ],
    'looping scale system');


  const BFlatString = new TunedString(new Note('Bb', ['A#', 'Bb']));

  t.same(
    BFlatString.getFrettedNotes(smallDiatonic, 0),
    [ new Note('Bb', ['A#', 'Bb']) ],
    'offset single fret');

  t.equal(AString.valueOf(), JSON.stringify(AString));
  t.equal(AString.toString(), JSON.stringify(AString));

  t.end();
});
