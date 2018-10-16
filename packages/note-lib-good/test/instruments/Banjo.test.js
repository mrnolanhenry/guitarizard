const tap = require('tap');
const diatonic = require('../../src/data/scaleSystem/diatonic');
const Note = require('../../src/Note');
const Banjo = require('../../src/instrument/Banjo');

tap.test('class Banjo -- init', function (t) {
  const defaultBanjo = new Banjo(21, [
    diatonic.G,
    diatonic.D,
    diatonic.G,
    diatonic.B,
    diatonic.D
  ]);

  t.ok(defaultBanjo);

  t.end();
})
