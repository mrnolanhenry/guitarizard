import * as Constants from "../../constants/Constants";
import { NotePitch } from "../../enums/NotePitch";
import { Note } from "../../Note";
import { Temperament } from "../../Temperament";
import { Interval } from "../../Interval";

// Represents the twelve-tone equal temperament (12TET, or twelveTET, in our codebase)
// https://en.wikipedia.org/wiki/12_equal_temperament

const A = new Note(Constants.A, NotePitch.Neither);

const As = new Note(Constants.A_SHARP, NotePitch.Sharp);
const Bb = new Note(Constants.B_FLAT, NotePitch.Flat, [As]);
As.addAliasNote(Bb);

const B = new Note(Constants.B, NotePitch.Neither);

const C = new Note(Constants.C, NotePitch.Neither);

const Cs = new Note(Constants.C_SHARP, NotePitch.Sharp);
const Db = new Note(Constants.D_FLAT, NotePitch.Flat, [Cs]);
Cs.addAliasNote(Db);

const D = new Note(Constants.D, NotePitch.Neither);

const Ds = new Note(Constants.D_SHARP, NotePitch.Sharp);
const Eb = new Note(Constants.E_FLAT, NotePitch.Flat, [Ds]);
Ds.addAliasNote(Eb);

const E = new Note(Constants.E, NotePitch.Neither);

const F = new Note(Constants.F, NotePitch.Neither);

const Fs = new Note(Constants.F_SHARP, NotePitch.Sharp);
const Gb = new Note(Constants.G_FLAT, NotePitch.Flat, [Fs]);
Fs.addAliasNote(Gb);

const G = new Note(Constants.G, NotePitch.Neither);

const Gs = new Note(Constants.G_SHARP, NotePitch.Sharp);
const Ab = new Note(Constants.A_FLAT, NotePitch.Flat, [Gs]);
Gs.addAliasNote(Ab);

export const twelveTETNotesAll = {
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

export const twelveTETIntervals: Interval[] = [ 
  new Interval(0, [
      {
        name: Constants.PERFECT,
        long: Constants.PERFECT_UNISON,
        short: Constants.PERFECT_UNISON_SHORT,
      },
      {
        name: Constants.DIMINISHED,
        long: Constants.DIMINISHED_SECOND,
        short: Constants.DIMINISHED_SECOND_SHORT,
      },
      { name: Constants.ROOT, short: Constants.ROOT_SHORT },
    ],
  ),
  new Interval(1, [
      {
        name: Constants.MINOR,
        long: Constants.MINOR_SECOND,
        short: Constants.MINOR_SECOND_SHORT,
      },
      {
        name: Constants.AUGMENTED,
        long: Constants.AUGMENTED_UNISON,
        short: Constants.AUGMENTED_UNISON_SHORT,
      },
      { name: Constants.SEMITONE, short: Constants.SEMITONE_SHORT },
      { name: Constants.HALF_STEP },
      { name: Constants.HALF_TONE },
    ],
  ),
  new Interval(2, [
      {
        name: Constants.MAJOR,
        long: Constants.MAJOR_SECOND,
        short: Constants.MAJOR_SECOND_SHORT,
      },
      {
        name: Constants.DIMINISHED,
        long: Constants.DIMINISHED_THIRD,
        short: Constants.DIMINISHED_THIRD_SHORT,
      },
      { name: Constants.TONE, short: Constants.TONE_SHORT },
      { name: Constants.WHOLE_STEP },
      { name: Constants.WHOLE_TONE },
    ],
  ),
  new Interval(3, [
      {
        name: Constants.MINOR,
        long: Constants.MINOR_THIRD,
        short: Constants.MINOR_THIRD_SHORT,
      },
      {
        name: Constants.AUGMENTED,
        long: Constants.AUGMENTED_SECOND,
        short: Constants.AUGMENTED_SECOND_SHORT,
      },
    ],
  ),
  new Interval(4, [
      {
        name: Constants.MAJOR,
        long: Constants.MAJOR_THIRD,
        short: Constants.MAJOR_THIRD_SHORT,
      },
      {
        name: Constants.DIMINISHED,
        long: Constants.DIMINISHED_FOURTH,
        short: Constants.DIMINISHED_FOURTH_SHORT,
      },
    ],
  ),
  new Interval(5, [
      {
        name: Constants.PERFECT,
        long: Constants.PERFECT_FOURTH,
        short: Constants.PERFECT_FOURTH_SHORT,
      },
      {
        name: Constants.AUGMENTED,
        long: Constants.AUGMENTED_THIRD,
        short: Constants.AUGMENTED_THIRD_SHORT,
      },
    ],
  ),
  new Interval(6, [
      {
        name: Constants.DIMINISHED,
        long: Constants.DIMINISHED_FIFTH,
        short: Constants.DIMINISHED_FIFTH_SHORT,
      },
      {
        name: Constants.AUGMENTED,
        long: Constants.AUGMENTED_FOURTH,
        short: Constants.AUGMENTED_FOURTH_SHORT,
      },
      { name: Constants.TRITONE, short: Constants.TRITONE_SHORT },
    ],
  ),
  new Interval(7, [
      {
        name: Constants.PERFECT,
        long: Constants.PERFECT_FIFTH,
        short: Constants.PERFECT_FIFTH_SHORT,
      },
      {
        name: Constants.DIMINISHED,
        long: Constants.DIMINISHED_SIXTH,
        short: Constants.DIMINISHED_SIXTH_SHORT,
      },
    ],
  ),
  new Interval(8, [
      {
        name: Constants.MINOR,
        long: Constants.MINOR_SIXTH,
        short: Constants.MINOR_SIXTH_SHORT,
      },
      {
        name: Constants.AUGMENTED,
        long: Constants.AUGMENTED_FIFTH,
        short: Constants.AUGMENTED_FIFTH_SHORT,
      },
    ],
  ),
  new Interval(9, [
      {
        name: Constants.MAJOR,
        long: Constants.MAJOR_SIXTH,
        short: Constants.MAJOR_SIXTH_SHORT,
      },
      {
        name: Constants.DIMINISHED,
        long: Constants.DIMINISHED_SEVENTH,
        short: Constants.DIMINISHED_SEVENTH_SHORT,
      },
    ],
  ),
  new Interval(10, [
      {
        name: Constants.MINOR,
        long: Constants.MINOR_SEVENTH,
        short: Constants.MINOR_SEVENTH_SHORT,
      },
      {
        name: Constants.AUGMENTED,
        long: Constants.AUGMENTED_SIXTH,
        short: Constants.AUGMENTED_SIXTH_SHORT,
      },
    ],
  ),
  new Interval(11, [
      {
        name: Constants.MAJOR,
        long: Constants.MAJOR_SEVENTH,
        short: Constants.MAJOR_SEVENTH_SHORT,
      },
      {
        name: Constants.DIMINISHED,
        long: Constants.DIMINISHED_OCTAVE,
        short: Constants.DIMINISHED_OCTAVE_SHORT,
      },
    ],
  ),
  new Interval(12, [
      {
        name: Constants.PERFECT,
        long: Constants.PERFECT_OCTAVE,
        short: Constants.PERFECT_OCTAVE_SHORT,
      },
      {
        name: Constants.AUGMENTED,
        long: Constants.AUGMENTED_SEVENTH,
        short: Constants.AUGMENTED_SEVENTH_SHORT,
      },
    ],
  ),
];


export const twelveTET = new Temperament(Constants.TWELVE_TET, twelveTETIntervals, [
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
]);
