import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Scale } from "../src/Scale";
import { twelveTET } from "../src/data/temperaments/twelveTET";
import scales from "../src/data/scales";
import { twelveTETIntervals } from "../src/data/temperaments";

describe("class Scale", () => {
  const {   
    twelveTETP1,
    twelveTETm2,
    twelveTETM2,
    twelveTETm3,
    twelveTETM3,
    twelveTETP4,
    twelveTETd5,
    twelveTETP5,
    twelveTETm6,
    twelveTETM6,
    twelveTETm7,
    twelveTETM7,
    twelveTETP8,  
  } = twelveTETIntervals;

  const blues = new Scale("Blues", twelveTET, [twelveTETP1, twelveTETm3, twelveTETP4, twelveTETd5, twelveTETP5, twelveTETm7]);

  const ethiopianAraray = new Scale(
    "ethiopian (a raray)",
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETM6, twelveTETM7, twelveTETP8],
  );
  const ionian = new Scale("ionian", twelveTET, [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETM6, twelveTETM7, twelveTETP8]);
  const major = new Scale("major", twelveTET, [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETM6, twelveTETM7, twelveTETP8]);

  it('toJSON, valueOf, toString', () => {
    assert.deepEqual(blues.toJSON(),
      {
        name: "Blues",
        temperament: twelveTET,
        intervals: [twelveTETP1, twelveTETm3, twelveTETP4, twelveTETd5, twelveTETP5, twelveTETm7],
      }
    );
    assert.equal(blues.valueOf(), JSON.stringify(blues));
    assert.equal(blues.toString(), JSON.stringify(blues));
  });

  it('getEquivScales', () => {
    assert.deepEqual(
      ionian.getEquivScales(scales),
      [ethiopianAraray, ionian, major],
      "equivalent Scales found",
    );
  });
});
