import tap from "tap";
import { Note } from "../../src";
import {
  twelveTET,
} from "../../src/data/temperaments/twelveTET";
import { Mandolin } from "../../src/instruments/Mandolin";
import { Tuning } from "../../src/Tuning";

const A: Note = twelveTET.getNoteFromID("A");
const B: Note = twelveTET.getNoteFromID("B");
const C: Note = twelveTET.getNoteFromID("C");
const Cs: Note = twelveTET.getNoteFromID("C#");
const D: Note = twelveTET.getNoteFromID("D");
const E: Note = twelveTET.getNoteFromID("E");
const F: Note = twelveTET.getNoteFromID("F");
const G: Note = twelveTET.getNoteFromID("G");

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
