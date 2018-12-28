const tap = require('tap');
const diatonic = require('../../src/data/scaleSystem/diatonic');
const Note = require('../../src/Note');
const Guitar = require('../../src/instrument/Guitar');

tap.test('class Guitar -- init', function (t) {
  const defaultGuitar = new Guitar(21, [
    diatonic.E,
    diatonic.A,
    diatonic.D,
    diatonic.G,
    diatonic.B,
    diatonic.E
  ]);

  t.ok(defaultGuitar);

  t.end();
})
