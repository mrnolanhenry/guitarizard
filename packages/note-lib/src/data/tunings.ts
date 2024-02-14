import { Tuning } from "../Tuning";
import { twelveTET } from "./temperaments/twelveTET";
import { Note } from "../Note";
import * as Constants from "../constants/Constants";

const A0 = twelveTET.getNoteFromID(Constants.A)!.withOctave(0);
const B0 = twelveTET.getNoteFromID(Constants.B)!.withOctave(0);
const C0 = twelveTET.getNoteFromID(Constants.C)!.withOctave(0);
const Cs0 = twelveTET.getNoteFromID(Constants.C_SHARP)!.withOctave(0);
const D0 = twelveTET.getNoteFromID(Constants.D)!.withOctave(0);
const E0 = twelveTET.getNoteFromID(Constants.E)!.withOctave(0);
const F0 = twelveTET.getNoteFromID(Constants.F)!.withOctave(0);
const Fs0 = twelveTET.getNoteFromID(Constants.F_SHARP)!.withOctave(0);
const G0 = twelveTET.getNoteFromID(Constants.G)!.withOctave(0);
const Gs0 = twelveTET.getNoteFromID(Constants.G_SHARP)!.withOctave(0);

const A1 = twelveTET.getNoteFromID(Constants.A)!.withOctave(1);
const B1 = twelveTET.getNoteFromID(Constants.B)!.withOctave(1);
const C1 = twelveTET.getNoteFromID(Constants.C)!.withOctave(1);
const Cs1 = twelveTET.getNoteFromID(Constants.C_SHARP)!.withOctave(1);
const D1 = twelveTET.getNoteFromID(Constants.D)!.withOctave(1);
const E1 = twelveTET.getNoteFromID(Constants.E)!.withOctave(1);
const F1 = twelveTET.getNoteFromID(Constants.F)!.withOctave(1);
const Fs1 = twelveTET.getNoteFromID(Constants.F_SHARP)!.withOctave(1);
const G1 = twelveTET.getNoteFromID(Constants.G)!.withOctave(1);
const Gs1 = twelveTET.getNoteFromID(Constants.G_SHARP)!.withOctave(1);

const A2 = twelveTET.getNoteFromID(Constants.A)!.withOctave(2);
const B2 = twelveTET.getNoteFromID(Constants.B)!.withOctave(2);
const C2 = twelveTET.getNoteFromID(Constants.C)!.withOctave(2);
const Cs2 = twelveTET.getNoteFromID(Constants.C_SHARP)!.withOctave(2);
const D2 = twelveTET.getNoteFromID(Constants.D)!.withOctave(2);
const E2 = twelveTET.getNoteFromID(Constants.E)!.withOctave(2);
const F2 = twelveTET.getNoteFromID(Constants.F)!.withOctave(2);
const Fs2 = twelveTET.getNoteFromID(Constants.F_SHARP)!.withOctave(2);
const G2 = twelveTET.getNoteFromID(Constants.G)!.withOctave(2);
const Gs2 = twelveTET.getNoteFromID(Constants.G_SHARP)!.withOctave(2);

const A3 = twelveTET.getNoteFromID(Constants.A)!.withOctave(3);
const B3 = twelveTET.getNoteFromID(Constants.B)!.withOctave(3);
const C3 = twelveTET.getNoteFromID(Constants.C)!.withOctave(3);
const Cs3 = twelveTET.getNoteFromID(Constants.C_SHARP)!.withOctave(3);
const D3 = twelveTET.getNoteFromID(Constants.D)!.withOctave(3);
const E3 = twelveTET.getNoteFromID(Constants.E)!.withOctave(3);
const F3 = twelveTET.getNoteFromID(Constants.F)!.withOctave(3);
const Fs3 = twelveTET.getNoteFromID(Constants.F_SHARP)!.withOctave(3);
const G3 = twelveTET.getNoteFromID(Constants.G)!.withOctave(3);
const Gs3 = twelveTET.getNoteFromID(Constants.G_SHARP)!.withOctave(3);

const A4 = twelveTET.getNoteFromID(Constants.A)!.withOctave(4);
const B4 = twelveTET.getNoteFromID(Constants.B)!.withOctave(4);
const C4 = twelveTET.getNoteFromID(Constants.C)!.withOctave(4);
const Cs4 = twelveTET.getNoteFromID(Constants.C_SHARP)!.withOctave(4);
const D4 = twelveTET.getNoteFromID(Constants.D)!.withOctave(4);
const E4 = twelveTET.getNoteFromID(Constants.E)!.withOctave(4);
const F4 = twelveTET.getNoteFromID(Constants.F)!.withOctave(4);
const Fs4 = twelveTET.getNoteFromID(Constants.F_SHARP)!.withOctave(4);
const G4 = twelveTET.getNoteFromID(Constants.G)!.withOctave(4);
const Gs4 = twelveTET.getNoteFromID(Constants.G_SHARP)!.withOctave(4);


// Common tunings for various instruments so that these can be used as presets and selected by name from a dropdown
export const Tunings = [
  // NOLAN TODO: Reorg this data structure into objects per each instrument & re-write getCommonTunings and getStandardTuning methods

  // GUITAR
  // 6-string
  new Tuning("guitar", "standard", [E2, A2, D3, G3, B3, E4]),
  new Tuning("guitar", "drop D", [D2, A2, D3, G3, B3, E4]),
  new Tuning("guitar", "open D", [D2, A2, D3, Fs3, A3, D4]),
  new Tuning("guitar", "DADGAD", [D2, A2, D3, G3, A3, D4]),
  new Tuning("guitar", "open G", [D2, G2, D3, G3, B3, D4]),
  new Tuning("guitar", "open E", [E2, B2, E3, Gs3, B3, E4]),
  new Tuning("guitar", "open A", [E2, A2, E3, A3, Cs3, E4]),
  new Tuning("guitar", "drop C", [C2, G2, C3, F3, A3, D4]),

  // 7-string
  new Tuning("guitar (7 string)", "standard", [B2, E2, A3, D3, G3, B4, E4]),

  // 8-string
  new Tuning("guitar (8 string)", "standard", [Fs2, B2, E2, A3, D3, G3, B4, E4]),

  // 12-string
  new Tuning("guitar (12 string)", "standard", [E2, A2, D3, G3, B4, E4]),
  new Tuning("guitar (12 string)", "drop D",   [D2, A2, D3, G3, B4, E4]),
  new Tuning("guitar (12 string)", "open D",   [D2, A2, D3, Fs3, A4, D4]),
  new Tuning("guitar (12 string)", "DADGAD",   [D2, A2, D3, G3, A4, D4]),
  new Tuning("guitar (12 string)", "open G",   [D2, G2, D3, G3, B4, D4]),
  new Tuning("guitar (12 string)", "open E",   [E2, B2, E3, Gs3, B4, E4]),
  new Tuning("guitar (12 string)", "open A",   [E2, A2, E3, A3, Cs4, E4]),
  new Tuning("guitar (12 string)", "drop C",   [C2, G2, C3, F3, A4, D4]),

  // BASS
  // 4-string
  new Tuning("bass", "standard", [E1, A1, D2, G2]),
  new Tuning("bass", "drop D", [D1, A1, D2, G2]),
  new Tuning("bass", "D-standard", [D1, G1, C2, F2]),
  new Tuning("bass", "drop C", [C1, G1, C2, F2]),
  new Tuning("bass", "tenor", [A1, D1, G2, C2]),

  // 5-string
  new Tuning("bass (5 string)", "standard", [B0, E1, A1, D2, G2]),
  new Tuning("bass (5 string)", "tenor", [E0, A1, D1, G2, C2]),

  // 6-string
  new Tuning("bass (6 string)", "standard", [B0, E1, A1, D2, G2, C3]),

  // BANJO
  // currently just 5-string
  new Tuning("banjo", "standard", [G4, D3, G3, B3, D4]),
  new Tuning("banjo", "double C", [G4, C3, G3, C3, D4]),
  new Tuning("banjo", "drop C", [G4, C3, G3, B3, D4]),
  new Tuning("banjo", "D", [Fs4, D3, Fs3, A3, D4]),
  new Tuning("banjo", "G modal", [G4, D3, G3, C3, D4]),
  new Tuning("banjo", "guitar", [G4, D3, G3, B3, E4]),

  // MANDOLIN
  new Tuning("mandolin", "standard",  [G2, D3, A3, E4]),
  new Tuning("mandolin", "Cajun",     [F2, C3, G3, D4]),
  new Tuning("mandolin", "open G",    [G2, D3, G3, B4]),
  new Tuning("mandolin", "cross G",   [G2, D3, G3, D4]),
  new Tuning("mandolin", "Gee-Dad",   [G2, D3, A3, D4]),
  new Tuning("mandolin", "open D",    [D2, D3, A3, D4]),
  new Tuning("mandolin", "high bass", [A2, D3, A3, E4]),
  new Tuning("mandolin", "cross A",   [A2, E3, A3, E4]),
  new Tuning("mandolin", "open A",    [A2, E3, A3, Cs4]),

  // PIANO
  new Tuning("piano", "standard", [C0]),

  // UKULELE
  new Tuning("ukulele", "standard", [G4, C4, E4, A4]),
  new Tuning("ukulele", "D",        [A4, D4, Fs4, B4]),
  new Tuning("ukulele", "baritone", [D4, G4, B4, E4]),
];
