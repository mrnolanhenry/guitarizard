import { NoteFretNumberPair } from "./NoteFretNumberPair";
import { IFretSpan } from "./interfaces/IFretSpan";
import { Course } from "./Course";
import { Note } from "./Note";

export class NotesOnCourse {
  config: IFretSpan;
  course: Course;
  notes: NoteFretNumberPair[];

  constructor(course: Course, config: IFretSpan, notes: NoteFretNumberPair[]) {
    this.course = course;
    this.config = config;
    this.notes = notes;
  }

  getNoteFromFretNumber(fretNumber: number): Note | undefined {
    const noteFretNumberPair: NoteFretNumberPair| undefined =  this.notes.find((note) => note.fretNumber === fretNumber);
    return noteFretNumberPair ? noteFretNumberPair.value : undefined;
  };

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
