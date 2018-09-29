const tap = require('tap');
const Note = require('../src/Note');
const ScaleSystem = require('../src/ScaleSystem');

tap.test('class ScaleSystem', function (t) {
  const A = new Note('A', ['A']);
  const Bb = new Note('Bb', ['A#', 'Bb']);
  const B = new Note('B', ['B']);
  const C = new Note('C', ['C']);
  const Db = new Note('Db', ['C#', 'Db']);
  const D = new Note('D', ['D']);
  const Eb = new Note('Eb', ['D#', 'Eb']);
  const E = new Note('E', ['E']);
  const F = new Note('F', ['F']);
  const Gb = new Note('Gb', ['F#', 'Gb']);
  const G = new Note('G', ['G']);
  const Ab = new Note('Ab', ['G#', 'Ab']);
  
  const diatonic = new ScaleSystem([
    A,
    Bb,
    B,
    C,
    Db,
    D, 
    Eb, 
    E, 
    F, 
    Gb, 
    G, 
    Ab, 
  ]);
  
  t.equal(diatonic.notes.length, 12, 'should have 12 notes');

  t.same(diatonic.getNoteFromAlias('A#'),
          new Note('Bb', ['A#', 'Bb']),
          'pluck note given an alias');


  t.equal(diatonic.getNoteInterval(new Note('A', ['A']), new Note('C', ['C'])),
          3,
          'correct offset (basic)');

  t.equal(diatonic.getNoteInterval(new Note('G', ['G']), new Note('A', ['A'])),
          2,
          'correct offset ("loop")');

  t.same(
    diatonic.getNextNote(new Note('A', ['A'])),
    new Note('Bb', ['A#', 'Bb']),
    'next note simple step')

  t.same(
    diatonic.getNextNote(new Note('G#', ['G#', 'Ab'])),
    new Note('A', ['A']),
    'next note loop');

  t.same(
    diatonic.getNextNote(new Note('Ab', ['Ab'])),
    new Note('A', ['A']),
    'next note loop (different note, matching alias)');

  t.same(
    diatonic.getNextNote(new Note('A', ['A']), 2),
    new Note('B', ['B']),
    'two steps away')

  t.same(
    diatonic.getNextNote(new Note('A', ['A']), -1),
    new Note('Ab', ['G#', 'Ab']),
    'backward steps!')

  t.same(
    diatonic.getNextNote(new Note('A', ['A']), -12),
    new Note('A', ['A']),
    'backward steps!')


  t.equal(diatonic.valueOf(), JSON.stringify(diatonic));
  t.equal(diatonic.toString(), JSON.stringify(diatonic));
  
  t.end();
})
