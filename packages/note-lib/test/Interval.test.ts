import test from "node:test";
import assert from "node:assert/strict";

import * as lib from "../src";
import { Interval } from "../src/Interval";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
test("class Interval", function (_t) {
  const interval = new Interval(0, [
    {
      name: lib.Constants.PERFECT,
      long: lib.Constants.PERFECT_UNISON,
      short: lib.Constants.PERFECT_UNISON_SHORT,
    },
    {
      name: lib.Constants.DIMINISHED,
      long: lib.Constants.DIMINISHED_SECOND,
      short: lib.Constants.DIMINISHED_SECOND_SHORT,
    },
    { name: lib.Constants.ROOT, short: lib.Constants.ROOT_SHORT },
  ]);

  assert.deepEqual(
    interval.toJSON(),
    {
      semitones: 0,
      aliases: [
        {
          name: lib.Constants.PERFECT,
          long: lib.Constants.PERFECT_UNISON,
          short: lib.Constants.PERFECT_UNISON_SHORT,
        },
        {
          name: lib.Constants.DIMINISHED,
          long: lib.Constants.DIMINISHED_SECOND,
          short: lib.Constants.DIMINISHED_SECOND_SHORT,
        },
        { name: lib.Constants.ROOT, short: lib.Constants.ROOT_SHORT },
      ],
      isPerfect: true,
      isDiminished: true,
      isAugmented: false,
      isMajor: false,
      isMinor: false,
      isRoot: true,
    },
    "JSON should be correct",
  );

  assert.equal(interval.valueOf(), JSON.stringify(interval));
  assert.equal(interval.toString(), JSON.stringify(interval));

  assert.equal(interval.isPerfect, true);
  assert.equal(interval.isDiminished, true);
  assert.equal(interval.isAugmented, false);
  assert.equal(interval.isMajor, false);
  assert.equal(interval.isMinor, false);
});
