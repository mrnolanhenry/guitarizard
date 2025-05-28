import { describe, it } from "node:test";
import assert from "node:assert/strict";
import * as lib from "../src";
import { IntervalQuality } from "../src/IntervalQuality";
import { IntervalQualityName, IntervalQualityShortHand } from "../src/enums/IntervalQualityEnums";

describe("class IntervalQuality", () => {
  const perfectShortHand = IntervalQualityShortHand.Perfect;
  const perfectQuality = new IntervalQuality(IntervalQualityName.Perfect, [perfectShortHand]);
  const perfectQualityDefaultShortHand = new IntervalQuality(IntervalQualityName.Perfect);
  
  it('toJSON, valueOf, toString', () => {
    assert.deepEqual(
      perfectQuality.toJSON(),
      {
        name: IntervalQualityName.Perfect,
        shortHands: [perfectShortHand],
        symbols: undefined
      },
      "JSON should be correct",
    );
  
    assert.equal(perfectQuality.valueOf(), JSON.stringify(perfectQuality));
    assert.equal(perfectQuality.toString(), JSON.stringify(perfectQuality));
  });

  it('isPerfect, isAugmented, isDiminished, isMajor, isMinor', () => {
    assert.equal(perfectQuality.isPerfect(), true);
    assert.equal(perfectQuality.isAugmented(), false);
    assert.equal(perfectQuality.isDiminished(), false);
    assert.equal(perfectQuality.isMajor(), false);
    assert.equal(perfectQuality.isMinor(), false);
  });

  it('getDefaultShortHand', () => {
    assert.deepEqual(perfectQualityDefaultShortHand.getDefaultShortHand(), [perfectShortHand]);
  });
});
