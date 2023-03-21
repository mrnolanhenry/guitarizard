import { NoteFretNumberPair } from "./NoteFretNumberPair";
import { IStringConfig } from "./IStringConfig";
import { Course } from "./Course";

export class ScaleOnCourse {
  course: Course;
  config: IStringConfig;
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
}
