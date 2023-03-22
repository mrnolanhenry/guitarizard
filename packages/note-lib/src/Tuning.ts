import { Note } from "./Note";

export class Tuning {
  instrument: string; // instrument name that the tuning belongs to
  id: string; // e.g. "standard" or "drop D"
  notes: Note[];

  constructor(instrument: string, id: string, notes: Note[]) {
    this.id = id;
    this.instrument = instrument;
    this.notes = notes;
  }

  toJSON() {
    return {
      id: this.id,
      instrument: this.instrument,
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
