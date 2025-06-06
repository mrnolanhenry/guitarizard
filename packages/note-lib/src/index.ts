import chordTypes from "./data/chordTypes";
import scales from "./data/scales";
import { temperaments } from "./data/temperaments/index";
import * as utilFunctions from "./util";

import { TunedString } from "./TunedString";
import { Tuning } from "./Tuning";
import { FretBoard } from "./FretBoard";
import { Guitar, GuitarType } from "./instruments/Guitar";
import { Banjo } from "./instruments/Banjo";
import { Bass, BassType } from "./instruments/Bass";
import { Mandola } from "./instruments/Mandola";
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
export { IntervalQuality } from "./IntervalQuality";
export { IntervalScaleDegree } from "./IntervalScaleDegree";
export * as Constants from "./constants/Constants";

export const data = {
  chordTypes,
  scales,
  temperaments,
};

export const instrument = {
  TunedString,
  Tuning,
  Banjo,
  Bass,
  BassType,
  FretBoard,
  FrettedInstrument,
  Guitar,
  GuitarType,
  Mandola,
  Mandolin,
  Piano,
  Ukulele,
};

export const util = {
  ...utilFunctions,
};