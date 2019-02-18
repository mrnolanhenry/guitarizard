const tap = require('tap');
const diatonic = require('../../src/data/scaleSystem/diatonic');
const Note = require('../../src/Note');
const Banjo = require('../../src/instrument/Banjo');
const Tuning = require('../../src/instrument/Tuning');

tap.test('class Banjo -- init', function (t) {
  const defaultBanjo = new Banjo(21, [
    diatonic.G,
    diatonic.D,
    diatonic.G,
    diatonic.B,
    diatonic.D
  ]);

  t.ok(defaultBanjo);

  // t.same(defaultBanjo.getCommonTunings(), [
  //   new Tuning('banjo', 'standard', ['G', 'D', 'G', 'B', 'D']),
  //   new Tuning('banjo', 'double C', ['G', 'C', 'G', 'C', 'D']),
  //   new Tuning('banjo', 'drop C', ['G', 'C', 'G', 'B', 'D']),
  //   new Tuning('banjo', 'D', ['Fs', 'D', 'Fs', 'A', 'D']),
  //   new Tuning('banjo', 'G modal', ['G', 'D', 'G', 'C', 'D']),
  //   new Tuning('banjo', 'guitar', ['G', 'D', 'G', 'B', 'E']),
  // ], 'common tunings found');

  // t.same(defaultBanjo.getStandardTuning(), new Tuning('banjo', 'standard', ['G', 'D', 'G', 'B', 'D'])
  //   , 'standard tuning found');

  t.end();
})
