import test from "node:test";
import assert from "node:assert/strict";

import * as lib from "../src";
import { Interval } from "../src/Interval";
import { IntervalInChord } from "../src/IntervalInChord";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
test("class IntervalInChord", function (_t) {
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

  const intervalInChordDefaultPriority = new IntervalInChord(0, [
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

  const intervalInChordLowerPriority = new IntervalInChord(0, [
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
  ], 2 );

  const intervalInChordFromInterval = IntervalInChord.fromInterval(interval, 2);

  assert.deepEqual(
    intervalInChordDefaultPriority.toJSON(),
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
      priority: 1,
    },
    "intervalInChordDefaultPriority JSON should be correct",
  );

  assert.deepEqual(
    intervalInChordLowerPriority.toJSON(),
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
      priority: 2,
    },
    "intervalInChordLowerPriority JSON should be correct",
  );

  assert.deepEqual(
    intervalInChordFromInterval.toJSON(),
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
      priority: 2,
    },
    "intervalInChordFromInterval JSON should be correct",
  );

  assert.equal(intervalInChordDefaultPriority.valueOf(), JSON.stringify(intervalInChordDefaultPriority));
  assert.equal(intervalInChordDefaultPriority.toString(), JSON.stringify(intervalInChordDefaultPriority));

  assert.equal(intervalInChordLowerPriority.valueOf(), JSON.stringify(intervalInChordLowerPriority));
  assert.equal(intervalInChordLowerPriority.toString(), JSON.stringify(intervalInChordLowerPriority));
  
  assert.equal(intervalInChordFromInterval.valueOf(), JSON.stringify(intervalInChordFromInterval));
  assert.equal(intervalInChordFromInterval.toString(), JSON.stringify(intervalInChordFromInterval));
});
