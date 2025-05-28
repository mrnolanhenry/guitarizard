import { Interval } from "./Interval";

export abstract class IntervalCollection {
  abstract intervals: Interval[];
  // Given an Interval,
  // return true if Interval matches any Intervals in this IntervalCollection by Interval name
  hasIntervalWithIdenticalName(intervalToFind: Interval): boolean {
    return !!this.intervals.find((interval: Interval) => interval.isIdenticalInName(intervalToFind));
  }

  // Given an Interval and a number of Intervals in a given Temperament,
  // return true if Interval matches any Intervals in this IntervalCollection by exact same number of semitones
  hasIntervalWithIdenticalSemitones(intervalToFind: Interval): boolean {
    return !!this.intervals.find((interval: Interval) => interval.isIdenticalInSemitones(intervalToFind));
  }

  // Given an Interval and a number of Intervals in a given Temperament,
  // return true if Interval matches any Intervals in this IntervalCollection by same or equivalent number of semitones
  // e.g. in 12TET, a minor 13th and a minor 6th will be treated as having the equivalent number of semitones,
  // since in practice they lead to the same note
  hasIntervalWithEquivalentSemitones(intervalToFind: Interval, numberOfTonesInThisTemperament: number): boolean {
    return !!this.intervals.find((interval: Interval) => interval.isEquivalentInSemitones(intervalToFind, numberOfTonesInThisTemperament));
  }

  // Given another IntervalCollection,
  // return true if the amount of Intervals in the other IntervalCollection are the same as the amount in this IntervalCollection
  // AND all the Interval names in the other IntervalCollection match the Interval names in this IntervalCollection
  // In other words, this IntervalCollection "shares" all the same intervals as otherCollection
  sharesIdenticalIntervalNames(otherCollection: IntervalCollection): boolean {
    return this.intervals.length === otherCollection.intervals.length && this.includesIdenticalIntervalNames(otherCollection);
  };

  // Given another IntervalCollection,
  // return true if the amount of Intervals in the other IntervalCollection are the same as the amount in this IntervalCollection
  // AND all the Interval semitones in the other IntervalCollection match the Interval semitones in this IntervalCollection
  // In other words, this IntervalCollection "shares" all the same intervals as otherCollection
  sharesIdenticalSemitones(otherCollection: IntervalCollection): boolean {
    return this.intervals.length === otherCollection.intervals.length && this.includesIdenticalSemitones(otherCollection);
  };

  // Given another IntervalCollection,
  // return true if the amount of Intervals in the other IntervalCollection are the same as the amount in this IntervalCollection
  // AND all the Interval semitones in the other IntervalCollection match the Interval semitones in this IntervalCollection
  // OR their enharmonic equivalent Intervals (e.g. a minor 13rd and a minor 6th are equivalent in 12TET)
  // In other words, this IntervalCollection "shares" all the same intervals as otherCollection, or equivalent intervals
  sharesEquivalentSemitones(otherCollection: IntervalCollection, numberOfTonesInThisTemperament: number): boolean {
    return this.intervals.length === otherCollection.intervals.length && this.includesEquivalentSemitones(otherCollection, numberOfTonesInThisTemperament);
  };

  // Given another IntervalCollection,
  // return true if all the Interval names in the other IntervalCollection match the Interval names in this IntervalCollection
  // In other words, this IntervalCollection "includes" the intervals of otherCollection
  includesIdenticalIntervalNames(otherCollection: IntervalCollection): boolean {
    return this.compareIntervalCollectionByNames(otherCollection);
  };

  // Given another IntervalCollection,
  // return true if all the Interval semitones in the other IntervalCollection match the Interval semitones in this IntervalCollection
  // In other words, this IntervalCollection "includes" the intervals of otherCollection
  includesIdenticalSemitones(otherCollection: IntervalCollection): boolean {
    return this.compareIntervalCollectionBySemitones(otherCollection);
  };

  // Given another IntervalCollection,
  // return true if all the Interval semitones in the other IntervalCollection match the Interval semitones in this IntervalCollection
  // OR their enharmonic equivalent Intervals (e.g. a minor 13rd and a minor 6th are equivalent in 12TET)
  // In other words, this IntervalCollection "includes" the intervals of otherCollection, or equivalent intervals
  includesEquivalentSemitones(otherCollection: IntervalCollection, numberOfTonesInThisTemperament: number): boolean {
    return this.compareIntervalCollectionBySemitones(otherCollection, numberOfTonesInThisTemperament, true);
  };

  // Given another IntervalCollection,
  // return true if every Interval in the other IntervalCollection is found by Interval id in this IntervalCollection
  protected compareIntervalCollectionByNames(otherCollection: IntervalCollection): boolean {
    return otherCollection.intervals.every((currentInterval: Interval) => {
      return this.hasIntervalWithIdenticalName(currentInterval);
    });
  }

  // Given another IntervalCollection,
  // return true if every Interval in the other IntervalCollection is found by the number of semitones in this IntervalCollection
  // Optionally pass true to also look for the equivalent number of semitones instead of the exact
  // e.g. in 12TET, a minor 13th and a minor 6th will be treated as having the equivalent number of semitones,
  // since in practice they lead to the same note
  protected compareIntervalCollectionBySemitones(otherCollection: IntervalCollection, numberOfTonesInThisTemperament?: number, allowEquivalents: boolean = false): boolean {
    return otherCollection.intervals.every((currentInterval: Interval) => {
      return allowEquivalents ? this.hasIntervalWithEquivalentSemitones(currentInterval, numberOfTonesInThisTemperament as number) : this.hasIntervalWithIdenticalSemitones(currentInterval);
    });
  }
}
