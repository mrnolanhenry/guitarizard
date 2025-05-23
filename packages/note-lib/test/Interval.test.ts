import { describe, it } from "node:test";
import assert from "node:assert/strict";
import * as lib from "../src";
import { Interval } from "../src/Interval";
import { IntervalQuality } from "../src/IntervalQuality";
import { IntervalQualityName, IntervalQualityShortHand } from "../src/enums/IntervalQualityEnums";
import { IntervalScaleDegree } from "../src/IntervalScaleDegree";
import { IntervalScaleDegreeNumeric, IntervalScaleDegreeOrdinal, IntervalScaleDegreeSpelledOut } from "../src/enums/IntervalScaleDegreeEnums";

describe("class Interval", () => {
  const perfectQuality = new IntervalQuality(IntervalQualityName.Perfect, [IntervalQualityShortHand.Perfect]);
  const diminishedQuality = new IntervalQuality(IntervalQualityName.Diminished, [IntervalQualityShortHand.Diminished]);
  const augmentedQuality = new IntervalQuality(IntervalQualityName.Augmented, [IntervalQualityShortHand.Augmented]);
  const majorQuality = new IntervalQuality(IntervalQualityName.Major, [IntervalQualityShortHand.Major]);
  const minorQuality = new IntervalQuality(IntervalQualityName.Minor, [IntervalQualityShortHand.Minor]);
  
  const unisonScaleDegree = new IntervalScaleDegree(IntervalScaleDegreeSpelledOut.Unison,IntervalScaleDegreeOrdinal.Unison, IntervalScaleDegreeNumeric.Unison);
  const secondScaleDegree = new IntervalScaleDegree(IntervalScaleDegreeSpelledOut.Second, IntervalScaleDegreeOrdinal.Second, IntervalScaleDegreeNumeric.Second);
  const thirdScaleDegree = new IntervalScaleDegree(IntervalScaleDegreeSpelledOut.Third, IntervalScaleDegreeOrdinal.Third, IntervalScaleDegreeNumeric.Third);
  const fourthScaleDegree = new IntervalScaleDegree(IntervalScaleDegreeSpelledOut.Fourth, IntervalScaleDegreeOrdinal.Fourth, IntervalScaleDegreeNumeric.Fourth);
  const fifthScaleDegree = new IntervalScaleDegree(IntervalScaleDegreeSpelledOut.Fifth, IntervalScaleDegreeOrdinal.Fifth, IntervalScaleDegreeNumeric.Fifth);
  const sixthScaleDegree = new IntervalScaleDegree(IntervalScaleDegreeSpelledOut.Sixth, IntervalScaleDegreeOrdinal.Sixth, IntervalScaleDegreeNumeric.Sixth);
  const seventhScaleDegree = new IntervalScaleDegree(IntervalScaleDegreeSpelledOut.Seventh, IntervalScaleDegreeOrdinal.Seventh, IntervalScaleDegreeNumeric.Seventh);
  const octaveScaleDegree = new IntervalScaleDegree(IntervalScaleDegreeSpelledOut.Octave, IntervalScaleDegreeOrdinal.Octave, IntervalScaleDegreeNumeric.Octave);
  const ninthScaleDegree = new IntervalScaleDegree(IntervalScaleDegreeSpelledOut.Ninth, IntervalScaleDegreeOrdinal.Ninth, IntervalScaleDegreeNumeric.Ninth);
  const eleventhScaleDegree = new IntervalScaleDegree(IntervalScaleDegreeSpelledOut.Eleventh, IntervalScaleDegreeOrdinal.Eleventh, IntervalScaleDegreeNumeric.Eleventh);
  const thirteenthScaleDegree = new IntervalScaleDegree(IntervalScaleDegreeSpelledOut.Thirteenth, IntervalScaleDegreeOrdinal.Thirteenth, IntervalScaleDegreeNumeric.Thirteenth);
  
  const interval = new Interval(0, perfectQuality, unisonScaleDegree);
  const intervalPriority2 = new Interval(0, perfectQuality, unisonScaleDegree, [], 2);

  it('toJSON, valueOf, toString', () => {
    assert.deepEqual(
      interval.toJSON(),
      {
        semitones: 0,
        aliases: [],
        priority: 1,
        name: IntervalQualityName.Perfect + " " + IntervalScaleDegreeSpelledOut.Unison,
        nameOrdinal: IntervalQualityName.Perfect + " " + IntervalScaleDegreeOrdinal.Unison,
        shortHand: IntervalQualityShortHand.Perfect + IntervalScaleDegreeNumeric.Unison,
        quality: perfectQuality,
        scaleDegree: unisonScaleDegree,
      },
      "JSON should be correct",
    );
  
    assert.equal(interval.valueOf(), JSON.stringify(interval));
    assert.equal(interval.toString(), JSON.stringify(interval));
  });

  it('isRoot, isHalfStep, isHalfTone, isTritone, isWholeStep, isWholeTone', () => {
    assert.equal(interval.isRoot(), true);
    assert.equal(interval.isHalfStep(), false);
    assert.equal(interval.isHalfTone(), false);
    assert.equal(interval.isTritone(), false);
    assert.equal(interval.isWholeStep(), false);
    assert.equal(interval.isWholeTone(), false);
  });

  it('should default to priority 1', () => {
    assert.equal(intervalPriority2.priority, 2);
    assert.equal(interval.priority, 1);
  });
});
