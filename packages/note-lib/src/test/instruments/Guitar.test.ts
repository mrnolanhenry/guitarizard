import tap from "tap";
import {
  diatonic,
  notes as diatonic_notes,
} from "../../data/scaleSystem/diatonic";
import { Note } from "../../Note";
import { Guitar } from "../../instrument/Guitar";
import { Tuning } from "../../instrument/Tuning";

tap.test("class Guitar -- init", function (t) {
  const defaultGuitar = new Guitar(21, [
    diatonic_notes.E,
    diatonic_notes.A,
    diatonic_notes.D,
    diatonic_notes.G,
    diatonic_notes.B,
    diatonic_notes.E,
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
});
