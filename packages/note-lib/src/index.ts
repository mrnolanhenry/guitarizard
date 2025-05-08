import chordTypes from "./data/chordTypes";
import * as intervals from "./data/intervals";
import scales from "./data/scales";
import { temperaments } from "./data/temperaments/index";
import * as utilFunctions from "./util";

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
export { Chord } from "./Chord";
export { ChordType } from "./ChordType";
export { Scale } from "./Scale";
export { Key } from "./Key";
export { Interval } from "./Interval";
export * as Constants from "./constants/Constants";

export const data = {
  chordTypes,
  intervals,
  scales,
  temperaments,
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

export const util = {
  ...utilFunctions,
};