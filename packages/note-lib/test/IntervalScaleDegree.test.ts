import test from "node:test";
import assert from "node:assert/strict";

import * as lib from "../src";
import { IntervalScaleDegree } from "../src/IntervalScaleDegree";
import { IntervalScaleDegreeNumeric, IntervalScaleDegreeOrdinal, IntervalScaleDegreeSpelledOut } from "../src/enums/IntervalScaleDegreeEnums";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
test("class IntervalScaleDegree", function (_t) {
const unisonScaleDegree = new IntervalScaleDegree(IntervalScaleDegreeSpelledOut.Unison,IntervalScaleDegreeOrdinal.Unison, IntervalScaleDegreeNumeric.Unison);

  assert.deepEqual(
    unisonScaleDegree.toJSON(),
    {
      name: IntervalScaleDegreeSpelledOut.Unison,
      ordinal: IntervalScaleDegreeOrdinal.Unison,
      numeric: IntervalScaleDegreeNumeric.Unison,
    },
    "JSON should be correct",
  );

  assert.equal(unisonScaleDegree.valueOf(), JSON.stringify(unisonScaleDegree));
  assert.equal(unisonScaleDegree.toString(), JSON.stringify(unisonScaleDegree));
  assert.equal(unisonScaleDegree.isRoot(), true);
});
