const tap = require('tap');
const Note = require('../src/Note');
const Scale = require('../src/Scale');
const diatonic = require('../src/data/scaleSystem/diatonic');
const Key = require('../src/Key');

// WIP - will finish test file once Key.js is finalized
tap.test('class Key', function (t) {

  const lydianScale = new Scale(
    'lydian', diatonic,
    [0, 2, 4, 6, 7, 9, 11, 12]);
  const neapolitanMinorScale = new Scale(
    'neapolitan minor', diatonic,
    [0, 1, 3, 5, 7, 8, 10, 12]);
  const mixolydianScale = new Scale(
    'mixolydian', diatonic,
    [0, 2, 4, 5, 7, 9, 10, 12]);
  const aeolianScale = new Scale(
    'aeolian', diatonic,
    [0, 2, 3, 5, 7, 8, 10, 12]);
  const locrianScale = new Scale(
    'locrian', diatonic,
    [0, 1, 3, 5, 6, 8, 10, 12]);
  const ionianScale = new Scale(
    'ionian', diatonic,
    [0, 2, 4, 5, 7, 9, 11, 12]);
  const majorScale = new Scale(
    'major', diatonic,
    [0, 2, 4, 5, 7, 9, 11, 12]);
  const dorianScale = new Scale(
    'dorian', diatonic,
    [0, 2, 3, 5, 7, 9, 10, 12]);

  const BbLydian         = new Key(diatonic.Bb, lydianScale);
  const AsLydian         = new Key(diatonic.As, lydianScale);
  const ANeapolitanMinor = new Key(diatonic.A, neapolitanMinorScale);
  const CMixolydian      = new Key(diatonic.C, mixolydianScale);
  const DAeolian         = new Key(diatonic.D, aeolianScale);
  const ELocrian         = new Key(diatonic.E, locrianScale);
  const FIonian          = new Key(diatonic.F, ionianScale);
  const FMajor           = new Key(diatonic.F, majorScale);
  const GDorian          = new Key(diatonic.G, dorianScale);

  const BbLydianequivKeys = BbLydian.getEquivKeys();
  const AsLydianequivKeys = AsLydian.getEquivKeys();

  t.same(BbLydian.scale, lydianScale, 'scale identified');

  t.same(BbLydian.note, diatonic.Bb, 'flat note identified');
  t.same(AsLydian.note, diatonic.As, 'sharp note identified');

  t.same(BbLydianequivKeys[0], ANeapolitanMinor, 'equivalent key 0 identified given flat note');
  t.same(AsLydianequivKeys[0], ANeapolitanMinor, 'equivalent key 0 identified given sharp note');

  t.same(BbLydian.getEquivKeys(), [
    ANeapolitanMinor,
    BbLydian,
    CMixolydian,
    DAeolian,
    ELocrian,
    FIonian,
    FMajor,
    GDorian
  ], 'equivalent keys identified given flat note');

  t.same(AsLydian.getEquivKeys(), [
    ANeapolitanMinor,
    BbLydian,
    CMixolydian,
    DAeolian,
    ELocrian,
    FIonian,
    FMajor,
    GDorian
  ], 'equivalent keys identified given sharp note');

  t.equal(BbLydian.valueOf(), JSON.stringify(BbLydian), 'valueOf works');
  t.equal(BbLydian.toString(), JSON.stringify(BbLydian), 'toString works');

  t.end();
});
