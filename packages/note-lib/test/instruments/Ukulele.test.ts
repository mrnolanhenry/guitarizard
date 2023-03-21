import tap from "tap";
import {
  twelveTET,
} from "../../src/data/temperaments/twelveTET";
import { Ukulele } from "../../src/instruments/Ukulele";
import { Tuning } from "../../src/Tuning";

const A = twelveTET.getNoteFromID("A");
const B = twelveTET.getNoteFromID("B");
const C = twelveTET.getNoteFromID("C");
const D = twelveTET.getNoteFromID("D");
const E = twelveTET.getNoteFromID("E");
const Fs = twelveTET.getNoteFromID("F#");
const G = twelveTET.getNoteFromID("G");

tap.test("class Ukulele -- init", function (t) {
  const defaultUkulele = new Ukulele(20, [G, C, E, A]);

  t.ok(defaultUkulele);

  t.same(defaultUkulele.getCommonTunings(), [
    new Tuning("ukulele", "standard", [G, C, E, A]),
    new Tuning("ukulele", "D", [A, D, Fs, B]),
    new Tuning("ukulele", "baritone", [D, G, B, E]),
  ], 'common tunings found');

  t.same(defaultUkulele.getStandardTuning(), new Tuning('ukulele', 'standard', [G, C, E, A])
    , 'standard tuning found');

  t.equal(defaultUkulele.fretBoard.courses.length, 4, "4 string has 4 courses");
  t.equal(
    defaultUkulele.fretBoard.courses.every(course => course.tunedStrings.length === 1),
    true, 
    "4 string has all single strings"
  );

  t.end();
});
