import { describe, it } from "node:test";
import assert from "node:assert/strict";
import * as lib from "../src";
import { Interval } from "../src/Interval";
import { IntervalQuality } from "../src/IntervalQuality";
import { IntervalQualityName, IntervalQualityShortHand } from "../src/enums/IntervalQualityEnums";
import { IntervalScaleDegree } from "../src/IntervalScaleDegree";
import { IntervalScaleDegreeNumeric, IntervalScaleDegreeOrdinal, IntervalScaleDegreeSpelledOut } from "../src/enums/IntervalScaleDegreeEnums";
import { twelveTET } from "../src/data/temperaments";

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
  
  const twelveTETP1 = new Interval(0, perfectQuality, unisonScaleDegree);
  const twelveTETd2 = new Interval(0, diminishedQuality, secondScaleDegree);
  
  const twelveTETm2 = new Interval(1, minorQuality, secondScaleDegree);
  const twelveTETA1 = new Interval(1, augmentedQuality, unisonScaleDegree);
  
  const twelveTETM2 = new Interval(2, majorQuality, secondScaleDegree);
  const twelveTETd3 = new Interval(2, diminishedQuality, thirdScaleDegree);
  
  const twelveTETm3 = new Interval(3, minorQuality, thirdScaleDegree);
  const twelveTETA2 = new Interval(3, augmentedQuality, secondScaleDegree);
  
  const twelveTETM3 = new Interval(4, majorQuality, thirdScaleDegree);
  const twelveTETd4 = new Interval(4, diminishedQuality, fourthScaleDegree);
  
  const twelveTETP4 = new Interval(5, perfectQuality, fourthScaleDegree);
  const twelveTETA3 = new Interval(5, augmentedQuality, thirdScaleDegree);
  
  const twelveTETd5 = new Interval(6, diminishedQuality, fifthScaleDegree);
  const twelveTETA4 = new Interval(6, augmentedQuality, fourthScaleDegree);
  
  const twelveTETP5 = new Interval(7, perfectQuality, fifthScaleDegree);
  const twelveTETd6 = new Interval(7, diminishedQuality, sixthScaleDegree);
  
  const twelveTETm6 = new Interval(8, minorQuality, sixthScaleDegree);
  const twelveTETA5 = new Interval(8, augmentedQuality, fifthScaleDegree);
  
  const twelveTETM6 = new Interval(9, majorQuality, sixthScaleDegree);
  const twelveTETd7 = new Interval(9, diminishedQuality, seventhScaleDegree);
  
  const twelveTETm7 = new Interval(10, minorQuality, seventhScaleDegree);
  const twelveTETA6 = new Interval(10, augmentedQuality, sixthScaleDegree);
  
  const twelveTETM7 = new Interval(11, majorQuality, seventhScaleDegree);
  const twelveTETd8 = new Interval(11, diminishedQuality, octaveScaleDegree);
  
  const twelveTETP8 = new Interval(12, perfectQuality, octaveScaleDegree);
  const twelveTETA7 = new Interval(12, augmentedQuality, seventhScaleDegree);
  
  // Compound intervals (intervals greater than an octave)
  // For simplicity and speed, we will not create aliases for these intervals, 
  // as these compound intervals are commonly only used in chords, 
  // which tend to only make use of the 9th, 11th, and 13th.
  const twelveTETm9 = new Interval(13, minorQuality, ninthScaleDegree);
  const twelveTETM9 = new Interval(14, majorQuality, ninthScaleDegree);
  const twelveTETA9 = new Interval(15, augmentedQuality, ninthScaleDegree);
  const twelveTETd11 = new Interval(16, diminishedQuality, eleventhScaleDegree);
  const twelveTETP11 = new Interval(17, perfectQuality, eleventhScaleDegree);
  const twelveTETA11 = new Interval(18, augmentedQuality, eleventhScaleDegree);
  const twelveTETd13 = new Interval(19, diminishedQuality, thirteenthScaleDegree);
  const twelveTETm13 = new Interval(20, minorQuality, thirteenthScaleDegree);
  const twelveTETM13 = new Interval(21, majorQuality, thirteenthScaleDegree);
  const twelveTETA13 = new Interval(22, augmentedQuality, thirteenthScaleDegree);

  const twelveTETP1Priority2 = new Interval(0, perfectQuality, unisonScaleDegree, [], 2);

  it('toJSON, valueOf, toString', () => {
    assert.deepEqual(
      twelveTETP1.toJSON(),
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
  
    assert.equal(twelveTETP1.valueOf(), JSON.stringify(twelveTETP1));
    assert.equal(twelveTETP1.toString(), JSON.stringify(twelveTETP1));
  });

  it('isIdenticalInName', () => {
    assert.deepEqual(
      twelveTETP1.isIdenticalInName(twelveTETP1Priority2),
      true
    );
    assert.deepEqual(
      twelveTETP1.isIdenticalInName(twelveTETd2),
      false
    ), "should return false despite sharing same number of semitones";
  });

  it('isIdenticalInSemitones', () => {
    assert.deepEqual(
      twelveTETP1.isIdenticalInSemitones(twelveTETP1Priority2),
      true
    );
    assert.deepEqual(
      twelveTETP1.isIdenticalInSemitones(twelveTETd2),
      true
    ), "should return true despite having different interval names";
    assert.deepEqual(
      twelveTETM6.isIdenticalInSemitones(twelveTETM13),
      false
    ), "should return false despite being equivalent semitones";
  });

  it('isEquivalentInSemitones', () => {
    assert.deepEqual(
      twelveTETM6.isEquivalentInSemitones(twelveTETM13, twelveTET.notes.length),
      true
    ), "should return true despite being not exact same number of semitones";
    assert.deepEqual(
      twelveTETP1.isEquivalentInSemitones(twelveTETP5, twelveTET.notes.length),
      false
    );
  });

  it('isRoot, isHalfStep, isHalfTone, isTritone, isWholeStep, isWholeTone', () => {
    assert.equal(twelveTETP1.isRoot(), true);
    assert.equal(twelveTETP1.isHalfStep(), false);
    assert.equal(twelveTETP1.isHalfTone(), false);
    assert.equal(twelveTETP1.isTritone(), false);
    assert.equal(twelveTETP1.isWholeStep(), false);
    assert.equal(twelveTETP1.isWholeTone(), false);
  });

  it('should default to priority 1', () => {
    assert.equal(twelveTETP1Priority2.priority, 2);
    assert.equal(twelveTETP1.priority, 1);
  });
});
