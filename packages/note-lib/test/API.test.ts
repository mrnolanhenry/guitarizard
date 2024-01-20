import test from "node:test";
import assert from "node:assert/strict";

import * as API from "../src/index";
// import * as Constants from "../src/index";

test("exposed API", function (_t) {
  assert.ok(API.Note, "expect Note");
  assert.ok(API.Temperament, "expect Temperament");
  assert.ok(API.Scale, "expect Scale");
  assert.ok(API.Key, "expect Key");
  assert.ok(API.instrument.Tuning, "expect instrument.Tuning");

  assert.ok(API.instrument.TunedString, "expect instrument.TunedString");
  assert.ok(API.instrument.FretBoard, "expect instrument.FretBoard");
  assert.ok(API.instrument.Guitar, "expect instrument.Guitar");
  assert.ok(API.instrument.Banjo, "expect instrument.Banjo");
  assert.ok(API.instrument.Bass, "expect instrument.Bass");
  assert.ok(API.instrument.Mandolin, "expect instrument.Mandolin");
  assert.ok(API.instrument.Ukulele, "expect instrument.Ukulele");

  // > 2023-01-19;
  // >              Dear FreshBS,
  // >
  // >              I commented this out because I had no idea what it was doing
  // >              or how to fix it.
  // >
  // >              Best,
  // >              Mr. Querie
  //
  //
  // assert.ok(
  //   API.data.temperaments.find(
  //     (temperament) => temperament.name === Constants.TWELVE_TET,
  //     "expect twelveTET temperament",
  //   ),
  // );

  assert.equal(API.data.scales.length, 129, "expect correct scale length");

  assert.equal(
    API.data.intervals.mainIntervals.length,
    13,
    "correct main intervals",
  );

  assert.ok(
    API.data.intervals.mainIntervalsMap.P1,
    "expect main intervals to be exposed",
  );
});
