import tap from "tap";
import {
  diatonic,
  notes as diatonic_notes,
} from "../../data/scaleSystem/diatonic";
import { Note } from "../../Note";
import { Banjo } from "../../instrument/Banjo";
import { Tuning } from "../../instrument/Tuning";

tap.test("class Banjo -- init", function (t) {
  const defaultBanjo = new Banjo(21, [
    diatonic_notes.G,
    diatonic_notes.D,
    diatonic_notes.G,
    diatonic_notes.B,
    diatonic_notes.D,
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
});
