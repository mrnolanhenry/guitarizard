import { FretBoard } from "../FretBoard";
import { Note } from "../Note";
import { Tuning } from "../Tuning";
import { IFretSpan } from "../interfaces/IFretSpan";

export abstract class FrettedInstrument {
  abstract name: string;
  abstract fretBoard: FretBoard;
  abstract commonTunings: Tuning[];
  abstract standardTuning: Tuning;
  getDefaultFretSpan = (fretCount: number, tuning: Note[]): IFretSpan[] =>
    tuning.map(() => {
      return { fret: { start: 0, end: fretCount - 1 } };
    });
}
