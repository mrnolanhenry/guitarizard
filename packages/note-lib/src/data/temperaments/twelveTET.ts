import * as Constants from "../../constants/Constants";
import { NotePitch } from "../../enums/NotePitch";
import { Note } from "../../Note";
import { Temperament } from "../../Temperament";
import { Interval } from "../../Interval";
import { IntervalQuality } from "../../IntervalQuality";
import { IntervalQualityName, IntervalQualityShortHand } from "../../enums/IntervalQualityEnums";
import { IntervalScaleDegree } from "../../IntervalScaleDegree";
import { IntervalScaleDegreeNumeric, IntervalScaleDegreeOrdinal, IntervalScaleDegreeSpelledOut } from "../../enums/IntervalScaleDegreeEnums";

// Represents the twelve-tone equal temperament (12TET, or twelveTET, in our codebase)
// https://en.wikipedia.org/wiki/12_equal_temperament

const A = new Note(Constants.A, NotePitch.Natural);

const As = new Note(Constants.A_SHARP, NotePitch.Sharp);
const Bb = new Note(Constants.B_FLAT, NotePitch.Flat, [As]);
As.addAliasNote(Bb);

const B = new Note(Constants.B, NotePitch.Natural);

const C = new Note(Constants.C, NotePitch.Natural);

const Cs = new Note(Constants.C_SHARP, NotePitch.Sharp);
const Db = new Note(Constants.D_FLAT, NotePitch.Flat, [Cs]);
Cs.addAliasNote(Db);

const D = new Note(Constants.D, NotePitch.Natural);

const Ds = new Note(Constants.D_SHARP, NotePitch.Sharp);
const Eb = new Note(Constants.E_FLAT, NotePitch.Flat, [Ds]);
Ds.addAliasNote(Eb);

const E = new Note(Constants.E, NotePitch.Natural);

const F = new Note(Constants.F, NotePitch.Natural);

const Fs = new Note(Constants.F_SHARP, NotePitch.Sharp);
const Gb = new Note(Constants.G_FLAT, NotePitch.Flat, [Fs]);
Fs.addAliasNote(Gb);

const G = new Note(Constants.G, NotePitch.Natural);

const Gs = new Note(Constants.G_SHARP, NotePitch.Sharp);
const Ab = new Note(Constants.A_FLAT, NotePitch.Flat, [Gs]);
Gs.addAliasNote(Ab);

export const twelveTETNotes = {
  Ab,
  A,
  As,
  Bb,
  B,
  C,
  Cs,
  Db,
  D,
  Ds,
  Eb,
  E,
  F,
  Fs,
  Gb,
  G,
  Gs,
};

const perfectQuality = new IntervalQuality(IntervalQualityName.Perfect, [IntervalQualityShortHand.Perfect]);
const diminishedQuality = new IntervalQuality(IntervalQualityName.Diminished, [IntervalQualityShortHand.Diminished]);
const augmentedQuality = new IntervalQuality(IntervalQualityName.Augmented, [IntervalQualityShortHand.Augmented]);
const majorQuality = new IntervalQuality(IntervalQualityName.Major, [IntervalQualityShortHand.Major]);
const minorQuality = new IntervalQuality(IntervalQualityName.Minor, [IntervalQualityShortHand.Minor]);

export const twelveTETIntervalQualities = {
  perfectQuality,
  diminishedQuality,
  augmentedQuality,
  majorQuality,
  minorQuality,
};

const unisonScaleDegree = new IntervalScaleDegree(IntervalScaleDegreeSpelledOut.Unison,IntervalScaleDegreeOrdinal.Unison, IntervalScaleDegreeNumeric.Unison);
const secondScaleDegree = new IntervalScaleDegree(IntervalScaleDegreeSpelledOut.Second, IntervalScaleDegreeOrdinal.Second, IntervalScaleDegreeNumeric.Second);
const thirdScaleDegree = new IntervalScaleDegree(IntervalScaleDegreeSpelledOut.Third, IntervalScaleDegreeOrdinal.Third, IntervalScaleDegreeNumeric.Third);
const fourthScaleDegree = new IntervalScaleDegree(IntervalScaleDegreeSpelledOut.Fourth, IntervalScaleDegreeOrdinal.Fourth, IntervalScaleDegreeNumeric.Fourth);
const fifthScaleDegree = new IntervalScaleDegree(IntervalScaleDegreeSpelledOut.Fifth, IntervalScaleDegreeOrdinal.Fifth, IntervalScaleDegreeNumeric.Fifth);
const sixthScaleDegree = new IntervalScaleDegree(IntervalScaleDegreeSpelledOut.Sixth, IntervalScaleDegreeOrdinal.Sixth, IntervalScaleDegreeNumeric.Sixth);
const seventhScaleDegree = new IntervalScaleDegree(IntervalScaleDegreeSpelledOut.Seventh, IntervalScaleDegreeOrdinal.Seventh, IntervalScaleDegreeNumeric.Seventh);
const octaveScaleDegree = new IntervalScaleDegree(IntervalScaleDegreeSpelledOut.Octave, IntervalScaleDegreeOrdinal.Octave, IntervalScaleDegreeNumeric.Octave);
const ninthScaleDegree = new IntervalScaleDegree(IntervalScaleDegreeSpelledOut.Ninth, IntervalScaleDegreeOrdinal.Ninth, IntervalScaleDegreeNumeric.Ninth);
// const tenthScaleDegree = new IntervalScaleDegree(IntervalScaleDegreeSpelledOut.Tenth, IntervalScaleDegreeOrdinal.Tenth, IntervalScaleDegreeNumeric.Tenth);
const eleventhScaleDegree = new IntervalScaleDegree(IntervalScaleDegreeSpelledOut.Eleventh, IntervalScaleDegreeOrdinal.Eleventh, IntervalScaleDegreeNumeric.Eleventh);
// const twelfthScaleDegree = new IntervalScaleDegree(IntervalScaleDegreeSpelledOut.Twelfth, IntervalScaleDegreeOrdinal.Twelfth, IntervalScaleDegreeNumeric.Twelfth);
const thirteenthScaleDegree = new IntervalScaleDegree(IntervalScaleDegreeSpelledOut.Thirteenth, IntervalScaleDegreeOrdinal.Thirteenth, IntervalScaleDegreeNumeric.Thirteenth);

export const twelveTETScaleDegrees = {
  unisonScaleDegree,
  secondScaleDegree,
  thirdScaleDegree,
  fourthScaleDegree,
  fifthScaleDegree,
  sixthScaleDegree,
  seventhScaleDegree,
  octaveScaleDegree,
  ninthScaleDegree,
  eleventhScaleDegree,
  thirteenthScaleDegree,
};

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

const twelveTETIntervalsArray = [
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
];

export const twelveTETIntervals = {
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
};

export const twelveTET = new Temperament(Constants.TWELVE_TET, 
  twelveTETIntervalsArray, 
  [
    A,
    Bb,
    B,
    C,
    Db,
    D,
    Eb,
    E,
    F,
    Gb,
    G,
    Ab,
  ]
);
