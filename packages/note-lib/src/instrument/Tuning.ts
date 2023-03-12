import { Note } from "../Note";

export class Tuning {
  instrument: string;
  id: string;
  notes: Note[];

  constructor(instrument: string, id: string, notes: Note[]) {
    this.instrument = instrument;
    this.id = id;
    this.notes = notes;
  }
}
