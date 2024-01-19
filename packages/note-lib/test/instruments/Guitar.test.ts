import tap from "tap";
import { Note } from "../../src";
import { twelveTET } from "../../src/data/temperaments/twelveTET";
import { Guitar } from "../../src/instruments/Guitar";
import { Tuning } from "../../src/Tuning";

const A: Note = twelveTET.getNoteFromID("A");
const B: Note = twelveTET.getNoteFromID("B");
const C: Note = twelveTET.getNoteFromID("C");
const Cs: Note = twelveTET.getNoteFromID("C#");
const D: Note = twelveTET.getNoteFromID("D");
const E: Note = twelveTET.getNoteFromID("E");
const F: Note = twelveTET.getNoteFromID("F");
const Fs: Note = twelveTET.getNoteFromID("F#");
const G: Note = twelveTET.getNoteFromID("G");
const Gs: Note = twelveTET.getNoteFromID("G#");

void tap.test("class Guitar -- init", function (t) {
  const defaultGuitar = new Guitar(21, [E, A, D, G, B, E]);
  const sevenStringGuitar = new Guitar(21, [B, E, A, D, G, B, E]);
  const eightStringGuitar = new Guitar(21, [Fs, B, E, A, D, G, B, E]);
  const twelveStringGuitar = new Guitar(21, [E, A, D, G, B, E], true);

  t.ok(defaultGuitar);
  t.ok(sevenStringGuitar);
  t.ok(eightStringGuitar);
  t.ok(twelveStringGuitar);

  t.same(
    defaultGuitar.getCommonTunings(),
    [
      new Tuning("guitar", "standard", [E, A, D, G, B, E]),
      new Tuning("guitar", "drop D", [D, A, D, G, B, E]),
      new Tuning("guitar", "open D", [D, A, D, Fs, A, D]),
      new Tuning("guitar", "DADGAD", [D, A, D, G, A, D]),
      new Tuning("guitar", "open G", [D, G, D, G, B, D]),
      new Tuning("guitar", "open E", [E, B, E, Gs, B, E]),
      new Tuning("guitar", "open A", [E, A, E, A, Cs, E]),
      new Tuning("guitar", "drop C", [C, G, C, F, A, D]),
    ],
    "common tunings found",
  );

  t.same(
    sevenStringGuitar.getCommonTunings(),
    [new Tuning("guitar (7 string)", "standard", [B, E, A, D, G, B, E])],
    "common tunings found - 7 string",
  );

  t.same(
    eightStringGuitar.getCommonTunings(),
    [new Tuning("guitar (8 string)", "standard", [Fs, B, E, A, D, G, B, E])],
    "common tunings found - 8 string",
  );

  t.same(
    twelveStringGuitar.getCommonTunings(),
    [
      new Tuning("guitar (12 string)", "standard", [E, A, D, G, B, E]),
      new Tuning("guitar (12 string)", "drop D", [D, A, D, G, B, E]),
      new Tuning("guitar (12 string)", "open D", [D, A, D, Fs, A, D]),
      new Tuning("guitar (12 string)", "DADGAD", [D, A, D, G, A, D]),
      new Tuning("guitar (12 string)", "open G", [D, G, D, G, B, D]),
      new Tuning("guitar (12 string)", "open E", [E, B, E, Gs, B, E]),
      new Tuning("guitar (12 string)", "open A", [E, A, E, A, Cs, E]),
      new Tuning("guitar (12 string)", "drop C", [C, G, C, F, A, D]),
    ],
    "common tunings found - 12 string",
  );

  t.same(
    defaultGuitar.getStandardTuning(),
    new Tuning("guitar", "standard", [E, A, D, G, B, E]),
    "standard tuning found",
  );

  t.same(
    sevenStringGuitar.getStandardTuning(),
    new Tuning("guitar (7 string)", "standard", [B, E, A, D, G, B, E]),
    "standard tuning found - 7 string",
  );

  t.same(
    eightStringGuitar.getStandardTuning(),
    new Tuning("guitar (8 string)", "standard", [Fs, B, E, A, D, G, B, E]),
    "standard tuning found - 8 string",
  );

  t.same(
    twelveStringGuitar.getStandardTuning(),
    new Tuning("guitar (12 string)", "standard", [E, A, D, G, B, E]),
    "standard tuning found - 12 string",
  );

  t.equal(defaultGuitar.fretBoard.courses.length, 6, "6 string has 6 courses");
  t.equal(
    sevenStringGuitar.fretBoard.courses.length,
    7,
    "7 string has 7 courses",
  );
  t.equal(
    eightStringGuitar.fretBoard.courses.length,
    8,
    "8 string has 8 courses",
  );
  t.equal(
    twelveStringGuitar.fretBoard.courses.length,
    6,
    "12 string has 6 courses",
  );
  t.equal(
    defaultGuitar.fretBoard.courses.every(
      (course) => course.tunedStrings.length === 1,
    ),
    true,
    "6 string has all single strings",
  );
  t.equal(
    sevenStringGuitar.fretBoard.courses.every(
      (course) => course.tunedStrings.length === 1,
    ),
    true,
    "7 string has all single strings",
  );
  t.equal(
    eightStringGuitar.fretBoard.courses.every(
      (course) => course.tunedStrings.length === 1,
    ),
    true,
    "8 string has all single strings",
  );
  t.equal(
    twelveStringGuitar.fretBoard.courses.every(
      (course) => course.tunedStrings.length === 2,
    ),
    true,
    "12 string has all doubled strings",
  );

  t.end();
});
