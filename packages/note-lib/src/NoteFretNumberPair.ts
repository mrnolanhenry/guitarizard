import type { Note } from "./Note";

export class NoteFretNumberPair {
  value: Note;
  fretNumber: number;

  constructor(value: Note, fretNumber: number) {
    this.value = value;
    this.fretNumber = fretNumber;
  }
}
