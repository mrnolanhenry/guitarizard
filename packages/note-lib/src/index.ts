import { temperaments } from "./data/temperaments/index";
import * as intervals from "./data/intervals";
import scales from "./data/scales";

import { TunedString } from "./TunedString";
import { Tuning } from "./Tuning";
import { FretBoard } from "./FretBoard";
import { Guitar } from "./instruments/Guitar";
import { Banjo } from "./instruments/Banjo";
import { Bass } from "./instruments/Bass";
import { Mandolin } from "./instruments/Mandolin";
import { Piano } from "./instruments/Piano";
import { Ukulele } from "./instruments/Ukulele";
import { FrettedInstrument } from "./instruments/FrettedInstrument";

export { Note } from "./Note";
export { Temperament } from "./Temperament";
export { Scale } from "./Scale";
export { Key } from "./Key";
export { Interval } from "./Interval";
export * as Constants from "./constants/Constants";

export const data = {
  temperaments,
  intervals,
  scales,
};

export const instrument = {
  TunedString,
  Tuning,
  Banjo,
  Bass,
  FretBoard,
  FrettedInstrument,
  Guitar,
  Mandolin,
  Piano,
  Ukulele,
};
