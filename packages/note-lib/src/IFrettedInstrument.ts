import { FretBoard } from "./FretBoard";
import { Tuning } from "./Tuning";

export interface IFrettedInstrument {
  name: string;
  fretBoard: FretBoard;
  getCommonTunings(): Tuning[];
  getStandardTuning(): Tuning;
}
