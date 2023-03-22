import { NoteFretNumberPair } from "./NoteFretNumberPair";
import { IStringConfig } from "./IStringConfig";
import { Course } from "./Course";

export class ScaleOnCourse {
  config: IStringConfig;
  course: Course;
  notes: NoteFretNumberPair[];

  constructor(
    course: Course,
    config: IStringConfig,
    notes: NoteFretNumberPair[]
  ) {
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
