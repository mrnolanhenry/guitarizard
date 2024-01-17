import { TunedString } from "./TunedString";

/**
 *  A string or set of strings tuned to the same note (sometimes octaves above/below each other)
 *  e.g. a Mandolin has 4 "courses" (a 12-string guitar has 6 courses)
 *  Technically, a single string is also a course, so a 6-string guitar also has 6 courses.
 *  Some instruments have some courses that are pairs or triplets of strings AND some courses that are single strings.
 *  More info:
 * 
 *  https://en.wikipedia.org/wiki/Course_(music)
 *
 * @param 'tunedStrings' - string or set of strings that makes up the course

 */

export class Course {
  id: string;
  tunedStrings: TunedString[];

  constructor(id: string, tunedStrings: TunedString[]) {
    this.id = id;
    this.tunedStrings = tunedStrings;
  }

  toJSON() {
    return {
      tunedStrings: this.tunedStrings,
    };
  }

  valueOf() {
    return JSON.stringify(this);
  }

  toString() {
    return JSON.stringify(this);
  }
}
