const tap = require('tap');
const Note = require('../src/Note');
const Scale = require('../src/Scale');
const diatonic = require('../src/data/scaleSystem/diatonic');
const Scales = require('../src/data/scales');

tap.test('class Scale', function (t) {
  const blues = new Scale('Blues',
                          diatonic,
                          [0, 3, 5, 6, 7, 10]);

  const ethiopianAraray = new Scale('ethiopian (a raray)', diatonic, [0, 2, 4, 5, 7, 9, 11, 12]);
  const ionian = new Scale('ionian', diatonic, [0, 2, 4, 5, 7, 9, 11, 12]);
  const major = new Scale('major', diatonic, [0, 2, 4, 5, 7, 9, 11, 12]);

  t.equal(blues.name, 'Blues');

  t.same(blues.getNotesInKey(new Note('F')), [
    diatonic.F,
    diatonic.Ab,
    diatonic.Bb,
    diatonic.B,
    diatonic.C,
    diatonic.Eb
  ]);

  t.same(blues.getNotesInKey(diatonic.Fs), [
    diatonic.Fs,
    diatonic.A,
    diatonic.B,
    diatonic.C,
    diatonic.Cs,
    diatonic.E
  ]);

  t.same(ionian.getEquivScales(Scales),[
    ethiopianAraray,
    ionian,
    major
  ],"equivalent Scales found");

  console.log(blues.intervals);

  t.equal(blues.valueOf(), JSON.stringify(blues));
  t.equal(blues.toString(), JSON.stringify(blues));

  t.end();
});
