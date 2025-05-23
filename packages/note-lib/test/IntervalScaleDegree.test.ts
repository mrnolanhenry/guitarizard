import { describe, it } from "node:test";
import assert from "node:assert/strict";
import * as lib from "../src";
import { IntervalScaleDegree } from "../src/IntervalScaleDegree";
import { IntervalScaleDegreeNumeric, IntervalScaleDegreeOrdinal, IntervalScaleDegreeSpelledOut } from "../src/enums/IntervalScaleDegreeEnums";

describe("class IntervalScaleDegree", () => {
  const unisonScaleDegree = new IntervalScaleDegree(IntervalScaleDegreeSpelledOut.Unison,IntervalScaleDegreeOrdinal.Unison, IntervalScaleDegreeNumeric.Unison);

  it('toJSON, valueOf, toString', () => {
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
  });

  it('isRoot', () => {
    assert.equal(unisonScaleDegree.isRoot(), true);
  });
});
