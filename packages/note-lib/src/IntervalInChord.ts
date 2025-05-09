import { IIntervalAlias } from "./interfaces/IIntervalAlias";
import { Interval } from "./Interval";

// NOLAN TODO:
// Consider just adding an optional priority property to the Interval class itself, and removing this class entirely.
// This would make the code cleaner, and would allow for a more consistent interface for all Intervals, regardless of their use case.

// IntervalInChord used to represent both an Interval, and its priority/importance within a chord
// This way many more chords can be represented on instruments with fewer strings
// e.g. the maj13#11 chord cannot be played on a six-string guitar, but it could be approximated using most of the notes.
// Priority defaults to 1, but can be set to higher numbers for intervals that are less important to the particular chord
export class IntervalInChord extends Interval {
  priority: number;

  static fromInterval(interval: Interval, priority: number = 1): IntervalInChord {
    return new IntervalInChord(interval.semitones, interval.aliases, priority);
  }

  constructor(semitones: number, aliases: IIntervalAlias[], priority: number = 1) {
    super(semitones, aliases );
    this.priority = priority;
  }

  toJSON() {
    return {
      semitones: this.semitones,
      aliases: this.aliases,
      isMajor: this.isMajor,
      isMinor: this.isMinor,
      isAugmented: this.isAugmented,
      isDiminished: this.isDiminished,
      isPerfect: this.isPerfect,
      isRoot: this.isRoot,
      priority: this.priority,
    };
  }

  valueOf() {
    return JSON.stringify(this);
  }

  toString() {
    return JSON.stringify(this);
  }
}
