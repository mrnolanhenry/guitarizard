const Note = require('../../Note');
const ScaleSystem = require('../../ScaleSystem');

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

const diatonic = new ScaleSystem(
  'diatonic',
  [ A, Bb, B, C, Db, D, Eb, E, F, Gb, G, Ab ]);

module.exports = diatonic;