export { Note } from "./Note";
export { Temperament } from "./Temperament";
export { Scale } from "./Scale";
export { Key } from "./Key";
export { Interval } from "./Interval";
export { Constants } from "./constants/Constants";

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
import { Mandolin } from "./instruments/Mandolin";
import { FrettedInstrument } from "./instruments/FrettedInstrument";

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
  Banjo,
  Bass,
  FretBoard,
  FrettedInstrument,
  Guitar,
  Mandolin,
  Ukulele,
};
