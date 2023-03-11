export { Note } from "./Note";
export { ScaleSystem } from "./ScaleSystem";
export { Scale } from "./Scale";
export { Key } from "./Key";
export { Interval } from "./Interval";

import { diatonic } from "./data/scaleSystem/diatonic";
import * as intervals from "./data/intervals";
import scales from "./data/scales";

import { TunedString } from "./instrument/TunedString";
import { Tuning } from "./instrument/Tuning";
import { FretBoard } from "./instrument/FretBoard";
import { Guitar } from "./instrument/Guitar";
import { Banjo } from "./instrument/Banjo";
import { Bass } from "./instrument/Bass";
import { Ukulele } from "./instrument/Ukulele";

export const data = {
  scaleSystem: {
    diatonic,
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
