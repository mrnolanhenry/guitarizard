import tap from "tap";
import {
  twelveTET,
} from "../../src/data/temperaments/twelveTET";
import { Note } from "../../src/Note";
import { Banjo } from "../../src/instruments/Banjo";
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
const Ab = twelveTET.getNoteFromID("Ab");

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
