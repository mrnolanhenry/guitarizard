export { Note } from "./Note";
export { Temperament } from "./Temperament";
export { Scale } from "./Scale";
export { Key } from "./Key";
export { Interval } from "./Interval";

import { twelveTET } from "./data/temperaments/twelveTET";
import * as intervals from "./data/intervals";
import scales from "./data/scales";

import { TunedString } from "./TunedString";
import { Tuning } from "./Tuning";
import { FretBoard } from "./FretBoard";
import { Guitar } from "./instruments/Guitar";
import { Banjo } from "./instruments/Banjo";
import { Bass } from "./instruments/Bass";
import { Ukulele } from "./instruments/Ukulele";
import { IFrettedInstrument } from "./IFrettedInstrument";

export const data = {
  temperament: {
    twelveTET,
  },
  intervals,
  scales,
};

export const instrument = {
  TunedString,
  Tuning,
  FretBoard,
  Guitar,
  Banjo,
  Bass,
  Ukulele,
};
