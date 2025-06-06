import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Note } from "../../src";
import { twelveTET, twelveTETNotes } from "../../src/data/temperaments/twelveTET";
import { Bass, BassType } from "../../src/instruments/Bass";
import { Tuning } from "../../src/Tuning";

describe("class Bass", () => {
  const { A, Bb, B, C, Cs, Db, D, Ds, Eb, E, F, Fs, Gb, G, Gs, Ab } = twelveTETNotes;
  const defaultBass = new Bass(21, [E, A, D, G], BassType.FOUR_STRING);
  const fiveStringBass = new Bass(21, [B, E, A, D, G], BassType.FIVE_STRING);
  const sixStringBass = new Bass(21, [B, E, A, D, G, C], BassType.SIX_STRING);

    it('init', () => {
      assert.ok(defaultBass);
      assert.ok(fiveStringBass);
      assert.ok(sixStringBass);

      assert.equal(
        defaultBass.fretBoard.courses.length,
        4,
        "4 string has 4 courses",
      );
      assert.equal(
        fiveStringBass.fretBoard.courses.length,
        5,
        "5 string has 5 courses",
      );
      assert.equal(
        sixStringBass.fretBoard.courses.length,
        6,
        "6 string has 6 courses",
      );
      assert.equal(
        defaultBass.fretBoard.courses.every(
          (course) => course.tunedStrings.length === 1,
        ),
        true,
        "4 string has all single strings",
      );
      assert.equal(
        fiveStringBass.fretBoard.courses.every(
          (course) => course.tunedStrings.length === 1,
        ),
        true,
        "5 string has all single strings",
      );
      assert.equal(
        sixStringBass.fretBoard.courses.every(
          (course) => course.tunedStrings.length === 1,
        ),
        true,
        "6 string has all single strings",
      );
    });
  
    it('commonTunings', () => {
      assert.deepEqual(
        defaultBass.commonTunings,
        [
          new Tuning("standard", [E, A, D, G]),
          new Tuning("drop D", [D, A, D, G]),
          new Tuning("D-standard", [D, G, C, F]),
          new Tuning("drop C", [C, G, C, F]),
          new Tuning("tenor", [A, D, G, C]),
          new Tuning("half step down", [Eb, Ab, Db, Gb]),
          new Tuning("whole step down", [D, G, C, F]),
        ],
        "common tunings found",
      );
    
      assert.deepEqual(
        fiveStringBass.commonTunings,
        [
          new Tuning("standard", [B, E, A, D, G]),
          new Tuning("tenor", [E, A, D, G, C]),
          new Tuning("half step down", [Bb, Eb, Ab, Db, Gb]),
          new Tuning("whole step down", [A, D, G, C, F]),
        ],
        "common tunings found - 5 string",
      );
    
      assert.deepEqual(
        sixStringBass.commonTunings,
        [
          new Tuning("standard", [B, E, A, D, G, C]),
          new Tuning("half step down", [Bb, Eb, Ab, Db, Gb, B]),
          new Tuning("whole step down", [A, D, G, C, F, Bb]),
        ],
        "common tunings found - 6 string",
      );
    });
  
    it('standardTuning', () => {
      assert.deepEqual(
        defaultBass.standardTuning,
        new Tuning("standard", [E, A, D, G]),
        "standard tuning found",
      );
    
      assert.deepEqual(
        fiveStringBass.standardTuning,
        new Tuning("standard", [B, E, A, D, G]),
        "standard tuning found - 5 string",
      );
    
      assert.deepEqual(
        sixStringBass.standardTuning,
        new Tuning("standard", [B, E, A, D, G, C]),
        "standard tuning found - 6 string",
      );
    });
});
