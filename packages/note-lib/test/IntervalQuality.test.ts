import test from "node:test";
import assert from "node:assert/strict";

import * as lib from "../src";
import { IntervalQuality } from "../src/IntervalQuality";
import { IntervalQualityName, IntervalQualityShortHand } from "../src/enums/IntervalQualityEnums";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
test("class IntervalQuality", function (_t) {
  const perfectShortHand = IntervalQualityShortHand.Perfect;
  const perfectQuality = new IntervalQuality(IntervalQualityName.Perfect, [perfectShortHand]);
  const perfectQualityDefaultShortHand = new IntervalQuality(IntervalQualityName.Perfect);
  

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

  assert.equal(perfectQuality.isPerfect(), true);
  assert.equal(perfectQuality.isAugmented(), false);
  assert.equal(perfectQuality.isDiminished(), false);
  assert.equal(perfectQuality.isMajor(), false);
  assert.equal(perfectQuality.isMinor(), false);
  assert.deepEqual(perfectQualityDefaultShortHand.getDefaultShortHand(), [perfectShortHand]);
});
