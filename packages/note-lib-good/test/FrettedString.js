const tap = require('tap');
const Note = require('../src/Note');
const ScaleSystem = require('../src/ScaleSystem');
const FrettedString = require('../src/FrettedString');

tap.test('class FrettedString', function (t) {

  const smallDiatonic = new ScaleSystem('small', [
    new Note('A', ['A']),
    new Note('Bb', ['A#', 'Bb']),
    new Note('B', ['B'])
  ]);

  const AString = new FrettedString(smallDiatonic,
                                    new Note('A', ['A']));

  t.same(
    AString.getFrettedNotes(0, 0),
    [ new Note('A', ['A']) ],
    'single fret');
  
  t.same(
    AString.getFrettedNotes(0, 1),
    [ new Note('A', ['A']), new Note('Bb', ['A#', 'Bb']) ],
    'two frets');

  t.same(
    AString.getFrettedNotes(0, 2),
    [ new Note('A', ['A']),
      new Note('Bb', ['A#', 'Bb']),
      new Note('B', ['B']) ],
    'three frets');

  t.same(
    AString.getFrettedNotes(0, 3),
    [ new Note('A', ['A']),
      new Note('Bb', ['A#', 'Bb']),
      new Note('B', ['B']),
      new Note('A', ['A']) ],
    'looping scale system');

  
  const BFlatString = new FrettedString(smallDiatonic,
                                        new Note('Bb', ['A#', 'Bb']));

  t.same(
    BFlatString.getFrettedNotes(0, 0),
    [ new Note('Bb', ['A#', 'Bb']) ],
    'offset single fret');

  t.equal(AString.valueOf(), JSON.stringify(AString));
  t.equal(AString.toString(), JSON.stringify(AString));
  
  t.end();
});
