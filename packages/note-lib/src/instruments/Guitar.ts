import { FretBoard } from "../FretBoard";
import { twelveTET } from "../data/temperaments/twelveTET";
import { TunedString } from "../TunedString";
import type { Note } from "../Note";
import { FrettedInstrument } from "./FrettedInstrument";
import { Course } from "../Course";

const getCourses = (tuning: Note[], isDoubledStrings: boolean): Course[] => {
  const courseCount: number = tuning.length;
  if (courseCount === 6) {
    if(!isDoubledStrings) {
      return [
        new Course("E-string", [new TunedString("E-string", tuning[0], "metal", 6)]),
        new Course("A-string", [new TunedString("A-string", tuning[1], "metal", 5)]),
        new Course("D-string", [new TunedString("D-string", tuning[2], "metal", 4)]),
        new Course("G-string", [new TunedString("G-string", tuning[3], "metal", 3)]),
        new Course("B-string", [new TunedString("B-string", tuning[4], "metal", 2)]),
        new Course("high-e-string", [new TunedString("high-e-string", tuning[5], "metal", 1)]),
      ];
    } else {
      const course1 = new Course("E-strings", [
          new TunedString("E-string", tuning[0], "metal", 6),
          new TunedString("E-string", tuning[0], "metal", 6)
      ]);
      const course2 = new Course("A-strings", [
          new TunedString("A-string", tuning[1], "metal", 5),
          new TunedString("A-string", tuning[1], "metal", 5)
      ]);
      const course3 = new Course("D-strings", [
          new TunedString("D-string", tuning[2], "metal", 4),
          new TunedString("D-string", tuning[2], "metal", 4)
      ]);
      const course4 = new Course("G-strings", [
          new TunedString("G-string", tuning[3], "metal", 3),
          new TunedString("G-string", tuning[3], "metal", 3)
      ]);
      const course5 = new Course("B-strings", [
          new TunedString("B-string", tuning[4], "metal", 2),
          new TunedString("B-string", tuning[4], "metal", 2)
      ]);
      const course6 = new Course("high-E-strings", [
          new TunedString("high-E-string", tuning[5], "metal", 1),
          new TunedString("high-E-string", tuning[5], "metal", 1)
      ]);
      return [
        course1,
        course2,
        course3,
        course4,
        course5,
        course6
        ];
    }
  } else if (courseCount === 7) {
    return [
      new Course("low-B-string", [new TunedString("low-B-string ", tuning[0], "metal", 7)]),
      new Course("E-string", [new TunedString("E-string", tuning[1], "metal", 6)]),
      new Course("A-string", [new TunedString("A-string", tuning[2], "metal", 5)]),
      new Course("D-string", [new TunedString("D-string", tuning[3], "metal", 4)]),
      new Course("G-string", [new TunedString("G-string", tuning[4], "metal", 3)]),
      new Course("B-string", [new TunedString("B-string", tuning[5], "metal", 2)]),
      new Course("high-e-string", [new TunedString("high-e-string", tuning[6], "metal", 1)]),
    ];
  } else if (courseCount === 8) {
    return [
      new Course("E-string", [new TunedString("F-sharp-string", tuning[0], "metal", 8)]),
      new Course("E-string", [new TunedString("low-B-string", tuning[1], "metal", 7)]),
      new Course("E-string", [new TunedString("E-string", tuning[2], "metal", 6)]),
      new Course("E-string", [new TunedString("A-string", tuning[3], "metal", 5)]),
      new Course("E-string", [new TunedString("D-string", tuning[4], "metal", 4)]),
      new Course("E-string", [new TunedString("G-string", tuning[5], "metal", 3)]),
      new Course("E-string", [new TunedString("B-string", tuning[6], "metal", 2)]),
      new Course("E-string", [new TunedString("high-e-string", tuning[7], "metal", 1)]),
    ];
  }
   else {
    throw `Invalid String length of ${courseCount}!`;
  }

}

const getInstrumentName = (tuning: Note[], isDoubledStrings: boolean): string => {
  const courseCount: number = tuning.length;
  if (courseCount === 6) {
    if (!isDoubledStrings){ 
      return "guitar";
    } else {
      return `guitar (${courseCount * 2} string)`
    }
  } else {
    return `guitar (${courseCount} string)`
  }
}

export class Guitar extends FrettedInstrument{
  name: string;
  fretBoard: FretBoard;
  constructor(fretCount: number, tuning: Note[], isDoubledStrings: boolean = false) {
    super();
    const instrumentName = getInstrumentName(tuning, isDoubledStrings);
    const courses = getCourses(tuning, isDoubledStrings);
    const stringConfig = this.getDefaultStringConfig(fretCount, tuning);
    
    this.name = instrumentName;
    this.fretBoard = new FretBoard(twelveTET, courses, stringConfig);
  }
}
