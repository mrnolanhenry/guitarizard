import tap from "tap";
import {
  twelveTET,
} from "../../src/data/temperaments/twelveTET";
import { Note } from "../../src/Note";
import { Mandolin } from "../../src/instruments/Mandolin";
import { Tuning } from "../../src/Tuning";

const A = twelveTET.getNoteFromID("A");
const B = twelveTET.getNoteFromID("B");
const C = twelveTET.getNoteFromID("C");
const Cs = twelveTET.getNoteFromID("C#");
const D = twelveTET.getNoteFromID("D");
const E = twelveTET.getNoteFromID("E");
const F = twelveTET.getNoteFromID("F");
const G = twelveTET.getNoteFromID("G");

tap.test("class Mandolin -- init", function (t) {
  const defaultMandolin = new Mandolin(17, [G, D, A, E]);

  t.ok(defaultMandolin);

  t.same(defaultMandolin.getCommonTunings(), [
    new Tuning("mandolin", "standard", [G, D, A, E]),
    new Tuning("mandolin", "Cajun", [F, C, G, D]),
    new Tuning("mandolin", "open G", [G, D, G, B]),
    new Tuning("mandolin", "cross G", [G, D, G, D]),
    new Tuning("mandolin", "Gee-Dad", [G, D, A, D]),
    new Tuning("mandolin", "open D", [D, D, A, D]),
    new Tuning("mandolin", "high bass", [A, D, A, E]),
    new Tuning("mandolin", "cross A", [A, E, A, E]),
    new Tuning("mandolin", "open A", [A, E, A, Cs]),
  ], 'common tunings found');

  t.same(defaultMandolin.getStandardTuning(), new Tuning('mandolin', 'standard', [G, D, A, E])
    , 'standard tuning found');

  t.equal(defaultMandolin.fretBoard.courses.length, 4, "has 4 courses");
  t.equal(
    defaultMandolin.fretBoard.courses.every(course => course.tunedStrings.length === 2),
    true, 
    "has all doubled strings"
  );

  t.end();
});
