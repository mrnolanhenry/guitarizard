const tap = require('tap');
const diatonic = require('../../src/data/scaleSystem/diatonic');
const Note = require('../../src/Note');
const Guitar = require('../../src/instrument/Guitar');
const Tuning = require('../../src/instrument/Tuning');


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

  // t.same(defaultGuitar.getCommonTunings(), [
  //   new Tuning('guitar', 'standard', ['E', 'A', 'D', 'G', 'B', 'E']),
  //   new Tuning('guitar', 'drop D', ['D', 'A', 'D', 'G', 'B', 'E']),
  //   new Tuning('guitar', 'open D', ['D', 'A', 'D', 'Fs', 'A', 'D']),
  //   new Tuning('guitar', 'DADGAD', ['D', 'A', 'D', 'G', 'A', 'D']),
  //   new Tuning('guitar', 'open G', ['D', 'G', 'D', 'G', 'B', 'D']),
  //   new Tuning('guitar', 'open E', ['E', 'B', 'E', 'Gs', 'B', 'E']),
  //   new Tuning('guitar', 'open A', ['E', 'A', 'E', 'A', 'Cs', 'E']),
  //   new Tuning('guitar', 'drop C', ['C', 'G', 'C', 'F', 'A', 'D'])
  // ], 'common tunings found');

  // t.same(defaultGuitar.getStandardTuning(), new Tuning('guitar', 'standard', ['E', 'A', 'D', 'G', 'B', 'E'])
  //   , 'standard tuning found');

  t.end();
})
