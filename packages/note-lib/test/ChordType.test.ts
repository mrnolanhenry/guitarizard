import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ChordType } from "../src/ChordType";
import { twelveTET } from "../src/data/temperaments/twelveTET";
import chordTypes from "../src/data/chordTypes";
import { twelveTETIntervals } from "../src/data/temperaments";
import { Interval } from "../src/Interval";

describe("class ChordType", () => {
  const {   
    twelveTETP1,
    twelveTETd2,
    twelveTETm2,
    twelveTETA1,
    twelveTETM2,
    twelveTETd3,
    twelveTETm3,
    twelveTETA2,
    twelveTETM3,
    twelveTETd4,
    twelveTETP4,
    twelveTETA3,
    twelveTETd5,
    twelveTETA4,
    twelveTETP5,
    twelveTETd6,
    twelveTETm6,
    twelveTETA5,
    twelveTETM6,
    twelveTETd7,
    twelveTETm7,
    twelveTETA6,
    twelveTETM7,
    twelveTETd8,
    twelveTETP8,
    twelveTETA7,
    twelveTETm9,
    twelveTETM9,
    twelveTETA9,
    twelveTETd11,
    twelveTETP11,
    twelveTETA11,
    twelveTETd13,
    twelveTETm13,
    twelveTETM13,
    twelveTETA13,  
  } = twelveTETIntervals;

  const twelveTETP5Priority2 = new Interval(twelveTETP5.semitones,twelveTETP5.quality, twelveTETP5.scaleDegree, twelveTETP5.aliases, 2);
  const twelveTETM9Priority2 = new Interval(twelveTETM9.semitones,twelveTETM9.quality, twelveTETM9.scaleDegree, twelveTETM9.aliases, 2);
  const twelveTETP11Priority3 = new Interval(twelveTETP11.semitones,twelveTETP11.quality, twelveTETP11.scaleDegree, twelveTETP11.aliases, 3);
  
  const maj9 = new ChordType("maj9", twelveTET, [twelveTETP1, twelveTETM3, twelveTETP5Priority2, twelveTETM7, twelveTETM9], ["major 9th"]);
  const maj7add9 = new ChordType("maj7add9", twelveTET, [twelveTETP1, twelveTETM3, twelveTETP5Priority2, twelveTETM7, twelveTETM9], ["major 7th, added 9th"]);

  const maj7add13 = new ChordType("maj7add13", twelveTET, [twelveTETP1, twelveTETM3, twelveTETP5Priority2, twelveTETM7, twelveTETM13], ["major 7th, added 13th"]);
  const maj7add6 = new ChordType("maj7add6", twelveTET, [twelveTETP1, twelveTETM3, twelveTETP5Priority2, twelveTETM6, twelveTETM7], ["major 7th, added 6th"]);
  const maj13 = new ChordType("maj13", twelveTET, [twelveTETP1, twelveTETM3, twelveTETP5Priority2, twelveTETM7, twelveTETM9Priority2, twelveTETP11Priority3, twelveTETM13], ["major 13th"])
  const maj13s11 = new ChordType("maj13#11", twelveTET, [twelveTETP1, twelveTETM3, twelveTETP5, twelveTETM7, twelveTETM9, twelveTETA11, twelveTETM13], ["major 13th, sharp 11th"]);

  it('toJSON, valueOf, toString', () => {
    assert.deepEqual(maj9.toJSON(), {
      shortHand: "maj9",
      temperament: twelveTET,
      intervals: [twelveTETP1, twelveTETM3, twelveTETP5Priority2, twelveTETM7, twelveTETM9],
      names: ["major 9th", "maj9"],
    });
    assert.equal(maj9.valueOf(), JSON.stringify(maj9));
    assert.equal(maj9.toString(), JSON.stringify(maj9));
  });

  it('getEquivChordTypes', () => {
    assert.deepEqual(
      maj7add13.getEquivChordTypes(chordTypes),
      [maj7add13, maj7add6],
      "maj7add13 and maj7add6 are equivalent ChordTypes - if this test fails, first check order of chordTypes in array",
    );
  });

  it('getIdenticalChordTypes', () => {
    assert.deepEqual(
      maj9.getIdenticalChordTypes(chordTypes),
      [maj9, maj7add9],
      "maj9 and maj7add9 are identical ChordTypes - if this test fails, first check order of chordTypes in array",
    );

    assert.notDeepEqual(
      maj7add13.getIdenticalChordTypes(chordTypes),
      [maj7add13, maj7add6],
      "maj7add13 and maj7add6 are NOT identical ChordTypes",
    );
  });

  it('getChordTypesWithEquivOrMoreSemitones', () => {
    assert.deepEqual(
      maj7add13.getChordTypesWithEquivOrMoreSemitones(chordTypes),
      [maj13, maj13s11, maj7add13, maj7add6],
      "maj13, maj13#11, maj7add6, have same intervals with equivalent semitones as maj7add13 AND possibly more intervals - if this test fails, first check order of chordTypes in array",
    );
  });

  it('getChordTypesWithSameOrMoreSemitones', () => {
    assert.deepEqual(
      maj7add13.getChordTypesWithSameOrMoreSemitones(chordTypes),
      [maj13, maj13s11, maj7add13],
      "maj13, maj13#11 have same intervals with identical semitones as maj7add13 AND possibly more intervals - if this test fails, first check order of chordTypes in array",
    );
  });

  it('getChordTypesWithSameOrMoreIntervalNames', () => {
    assert.deepEqual(
      maj7add13.getChordTypesWithSameOrMoreIntervalNames(chordTypes),
      [maj13, maj13s11, maj7add13],
      "maj13, maj13#11 have identical intervals as maj7add13 AND possibly more intervals - if this test fails, first check order of chordTypes in array",
    );
  });

  it('sharesEquivalentSemitones', () => {
    assert.equal(
      maj7add13.sharesEquivalentSemitones(maj7add6, twelveTET.notes.length),
      true,
      "maj7add13 and maj7add6 share equivalent semitones",
    );
  });

  it('sharesIdenticalSemitones', () => {
    assert.equal(
      maj7add13.sharesIdenticalSemitones(maj7add6),
      false,
      "maj7add13 and maj7add6 do NOT share identical semitones",
    );
  });

  it('sharesIdenticalIntervalNames', () => {
    assert.equal(
      maj9.sharesIdenticalIntervalNames(maj7add9),
      true,
      "maj9 and maj7add9 share identical Intervals",
    );
    assert.equal(
      maj7add13.sharesIdenticalIntervalNames(maj7add6),
      false,
      "maj7add13 and maj7add6 do NOT share identical Intervals",
    );
  });

  it('includesIdenticalIntervalNames', () => {
    assert.equal(
      maj13.includesIdenticalIntervalNames(maj7add9),
      true,
      "maj13 includes identical Intervals as maj7add9",
    );
    assert.equal(
      maj13.includesIdenticalIntervalNames(maj7add6),
      false,
      "maj13 does NOT include identical Intervals as maj7add6",
    );
  });

  it('includesIdenticalSemitones', () => {
    assert.equal(
      maj13.includesIdenticalSemitones(maj7add9),
      true,
      "maj13 includes identical semitones as maj7add9",
    );
    assert.equal(
      maj13.includesIdenticalSemitones(maj7add6),
      false,
      "maj13 does NOT include identical semitones as maj7add6",
    );
  });

  it('includesEquivalentSemitones', () => {
    assert.equal(
      maj13.includesEquivalentSemitones(maj7add6, twelveTET.notes.length),
      true,
      "maj13 includes equivalent Intervals as maj7add6",
    );
  });
});
