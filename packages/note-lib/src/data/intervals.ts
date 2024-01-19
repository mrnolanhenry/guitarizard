import * as Constants from "../constants/Constants";
import { Interval } from "../Interval";

interface RawInterval {
  semitones: number;
  aliases: Array<{
    name: string;
    long?: string;
    short?: string;
  }>;
}

export const mainIntervalsList: RawInterval[] = [
  {
    semitones: 0,
    aliases: [
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
  },
  {
    semitones: 1,
    aliases: [
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
  },
  {
    semitones: 2,
    aliases: [
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
  },
  {
    semitones: 3,
    aliases: [
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
  },
  {
    semitones: 4,
    aliases: [
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
  },
  {
    semitones: 5,
    aliases: [
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
  },
  {
    semitones: 6,
    aliases: [
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
  },
  {
    semitones: 7,
    aliases: [
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
  },
  {
    semitones: 8,
    aliases: [
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
  },
  {
    semitones: 9,
    aliases: [
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
  },
  {
    semitones: 10,
    aliases: [
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
  },
  {
    semitones: 11,
    aliases: [
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
  },
  {
    semitones: 12,
    aliases: [
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
  },
];

export const mainIntervals = mainIntervalsList.map(
  (interval) => new Interval(interval.semitones, interval.aliases),
);

// for easy direct access, e.g. "mainIntervalsMap.P1"
export const mainIntervalsMap: Record<string, RawInterval> = {};
mainIntervals.forEach((interval) => {
  const aliases = interval.aliases;
  aliases.forEach((alias) => {
    if (alias.short) {
      mainIntervalsMap[alias.short] = interval;
    }
  });
});
