import tap from "tap";
import {
  twelveTET,
} from "../../src/data/temperaments/twelveTET";
import { Note } from "../../src/Note";
import { Guitar } from "../../src/instruments/Guitar";
import { Tuning } from "../../src/Tuning";

const A = twelveTET.getNoteFromID("A");
const As = twelveTET.getNoteFromID("A#");
const Bb = twelveTET.getNoteFromID("Bb");
const B = twelveTET.getNoteFromID("B");
const C = twelveTET.getNoteFromID("C");
const Cs = twelveTET.getNoteFromID("C#");
const Db = twelveTET.getNoteFromID("Db");
const D = twelveTET.getNoteFromID("D");
const Eb = twelveTET.getNoteFromID("Eb");
const E = twelveTET.getNoteFromID("E");
const F = twelveTET.getNoteFromID("F");
const Fs = twelveTET.getNoteFromID("F#");
const Gb = twelveTET.getNoteFromID("Gb");
const G = twelveTET.getNoteFromID("G");
const Gs = twelveTET.getNoteFromID("G#");
const Ab = twelveTET.getNoteFromID("Ab");

tap.test("class Guitar -- init", function (t) {
  const defaultGuitar = new Guitar(21, [
    E,
    A,
    D,
    G,
    B,
    E,
  ]);

  t.ok(defaultGuitar);

  t.same(defaultGuitar.getCommonTunings(), [
    new Tuning('guitar', 'standard', [E, A, D, G, B, E]),
    new Tuning('guitar', 'drop D', [D, A, D, G, B, E]),
    new Tuning('guitar', 'open D', [D, A, D, Fs, A, D]),
    new Tuning('guitar', 'DADGAD', [D, A, D, G, A, D]),
    new Tuning('guitar', 'open G', [D, G, D, G, B, D]),
    new Tuning('guitar', 'open E', [E, B, E, Gs, B, E]),
    new Tuning('guitar', 'open A', [E, A, E, A, Cs, E]),
    new Tuning('guitar', 'drop C', [C, G, C, F, A, D])
  ], 'common tunings found');

  t.same(defaultGuitar.getStandardTuning(), new Tuning('guitar', 'standard', [E, A, D, G, B, E])
    , 'standard tuning found');

  t.end();
});
