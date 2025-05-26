import { Interval } from "./Interval";
import { Temperament } from "./Temperament";
import { Note } from "./Note";
import { NotePitch } from "./enums/NotePitch";
import { IntervalCollection } from "./IntervalCollection";

/**
 * A single scale.
 *
 * e.g. "play me the Blues scale, bro"
 *
 * If you were a formal person, you'd call this a "mode".
 */
export class Scale extends IntervalCollection {
  name: string;
  temperament: Temperament;
  intervals: Interval[];

  constructor(
    name: string,
    temperament: Temperament,
    intervals: Interval[],
  ) {
    super();
    this.name = name;
    this.temperament = temperament;
    this.intervals = intervals;
  }

  // Return Scales that have equivalent Intervals as this Scale's in terms of semitones
  // e.g. the Ionian scale is exactly the same series of notes as the Major scale and Ethiopian (a raray) scale.
  getEquivScales(scales: Scale[]): Scale[] {
    const equivScales: Scale[] = [];
    const scaleLength: number = this.intervals.length;

    // Loop through each scale
    for (let i = 0; i < scales.length; i++) {
      // Loop through each scale's intervals
      // eslint-disable-next-line no-labels
      loopThruIntervals: {
        // This if check is only here to speed up function
        if (scaleLength === scales[i].intervals.length) {
          for (let j = 0; j < scales[i].intervals.length; j++) {
            if (
              this.intervals[j].semitones !== scales[i].intervals[j].semitones
            ) {
              // eslint-disable-next-line no-labels
              break loopThruIntervals;
            }
          }
          equivScales.push(scales[i]);
        }
      }
    }
    return equivScales;
  }

  // NOLAN TODO:
  // This method is slightly less performant, but cleaner and doesn't depend on intervals being in a particular order. 
  // Consider using in the future if performance isn't a concern.
  // Return Scales that have equivalent Intervals as this Scale's in terms of semitones
  // e.g. the Ionian scale is exactly the same series of notes as the Major scale and Ethiopian (a raray) scale.
  // getEquivScales(scales: Scale[]): Scale[] {
  //   return scales.filter((scale: Scale) => {
  //     return this.sharesEquivalentSemitones(scale, this.temperament.notes.length);
  //   });
  // }

  // Return Scales that have identical Intervals as this Scale's in terms of semitones
  // and possibly more intervals, i.e. what other Scales does this Scale fit into?
  getScalesWithSameOrMoreSemitones(scales: Scale[]): Scale[] {
    return scales.filter((scale: Scale) => {
      return scale.includesIdenticalSemitones(this);
    });
  }

  toJSON() {
    return {
      name: this.name,
      temperament: this.temperament,
      intervals: this.intervals,
    };
  }

  valueOf() {
    return JSON.stringify(this);
  }

  toString() {
    return JSON.stringify(this);
  }
}
