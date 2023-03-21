import tap from "tap";
import {
  twelveTET,
} from "../../src/data/temperaments/twelveTET";
import { Banjo } from "../../src/instruments/Banjo";
import { Tuning } from "../../src/Tuning";

const A = twelveTET.getNoteFromID("A");
const B = twelveTET.getNoteFromID("B");
const C = twelveTET.getNoteFromID("C");
const D = twelveTET.getNoteFromID("D");
const E = twelveTET.getNoteFromID("E");
const Fs = twelveTET.getNoteFromID("F#");
const G = twelveTET.getNoteFromID("G");

tap.test("class Banjo -- init", function (t) {
  const defaultBanjo = new Banjo(21, [
    G,
    D,
    G,
    B,
    D,
  ]);

  t.ok(defaultBanjo);

  t.same(defaultBanjo.getCommonTunings(), [
    new Tuning('banjo', 'standard', [G, D, G, B, D]),
    new Tuning('banjo', 'double C', [G, C, G, C, D]),
    new Tuning('banjo', 'drop C', [G, C, G, B, D]),
    new Tuning('banjo', 'D', [Fs, D, Fs, A, D]),
    new Tuning('banjo', 'G modal', [G, D, G, C, D]),
    new Tuning('banjo', 'guitar', [G, D, G, B, E]),
  ], 'common tunings found');

  t.same(defaultBanjo.getStandardTuning(), new Tuning('banjo', 'standard', [G, D, G, B, D])
    , 'standard tuning found');

  t.end();
});
