import tap from "tap";
import {
  twelveTET,
  notes as twelveTET_notes,
} from "../../src/data/temperaments/twelveTET";
import { Note } from "../../src/Note";
import { Guitar } from "../../src/instruments/Guitar";
import { Tuning } from "../../src/Tuning";

tap.test("class Guitar -- init", function (t) {
  const defaultGuitar = new Guitar(21, [
    twelveTET_notes.E,
    twelveTET_notes.A,
    twelveTET_notes.D,
    twelveTET_notes.G,
    twelveTET_notes.B,
    twelveTET_notes.E,
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
