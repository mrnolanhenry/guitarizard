const tap = require('tap');
const Note = require('../src/Note');
const Scale = require('../src/Scale');
const diatonic = require('../src/data/scaleSystem/diatonic');

tap.test('class Scale', function (t) {
  const blues = new Scale('Blues',
                          diatonic,
                          [0, 3, 5, 6, 7, 10]);

  t.equal(blues.name, 'Blues');

  t.same(blues.getNotesInKey(new Note('F')), [
    diatonic.F,
    diatonic.Ab,
    diatonic.Bb,
    diatonic.B,
    diatonic.C,
    diatonic.Eb
  ]);

  t.equal(blues.valueOf(), JSON.stringify(blues));
  t.equal(blues.toString(), JSON.stringify(blues));

  t.end();
});
