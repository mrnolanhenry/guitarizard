import { NoteFretNumberPair } from "./NoteFretNumberPair";
import { IFretSpan } from "./interfaces/IFretSpan";
import { Course } from "./Course";

export class ScaleOnCourse {
  config: IFretSpan;
  course: Course;
  notes: NoteFretNumberPair[];

  constructor(course: Course, config: IFretSpan, notes: NoteFretNumberPair[]) {
    this.course = course;
    this.config = config;
    this.notes = notes;
  }

  toJSON() {
    return {
      config: this.config,
      course: this.course,
      notes: this.notes,
    };
  }

  valueOf() {
    return JSON.stringify(this);
  }

  toString() {
    return JSON.stringify(this);
  }
}
