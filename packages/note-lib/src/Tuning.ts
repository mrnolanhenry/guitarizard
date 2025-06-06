import { Note } from "./Note";

export class Tuning {
  id: string; // e.g. "standard" or "drop D"
  notes: Note[];

  constructor(id: string, notes: Note[]) {
    this.id = id;
    this.notes = notes;
  }

  toJSON() {
    return {
      id: this.id,
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
