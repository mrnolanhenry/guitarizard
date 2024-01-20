import test from "node:test";
import assert from "node:assert/strict";

import { Scale } from "../src/Scale";
import { twelveTET } from "../src/data/temperaments/twelveTET";
import scales from "../src/data/scales";
import { notes } from "../src/data/temperaments";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
test("class Scale", function (_t) {
  const blues = new Scale("Blues", twelveTET, [0, 3, 5, 6, 7, 10]);
  const { Ab, A, Bb, B, C, Cs, Eb, E, F, Fs } = notes;

  const ethiopianAraray = new Scale(
    "ethiopian (a raray)",
    twelveTET,
    [0, 2, 4, 5, 7, 9, 11, 12],
  );
  const ionian = new Scale("ionian", twelveTET, [0, 2, 4, 5, 7, 9, 11, 12]);
  const major = new Scale("major", twelveTET, [0, 2, 4, 5, 7, 9, 11, 12]);

  assert.equal(blues.name, "Blues");

  assert.deepEqual(blues.getNotesInKey(F), [F, Ab, Bb, B, C, Eb]);

  assert.deepEqual(blues.getNotesInKey(Fs), [Fs, A, B, C, Cs, E]);

  assert.deepEqual(
    ionian.getEquivScales(scales),
    [ethiopianAraray, ionian, major],
    "equivalent Scales found",
  );

  assert.equal(blues.valueOf(), JSON.stringify(blues));
  assert.equal(blues.toString(), JSON.stringify(blues));
});
