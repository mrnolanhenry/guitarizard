import { Tuning } from "../Tuning";
import { twelveTET } from "./temperaments/twelveTET";
import { Note } from "../Note";

const A: Note = twelveTET.getNoteFromID("A");
const B: Note = twelveTET.getNoteFromID("B");
const C: Note = twelveTET.getNoteFromID("C");
const Cs: Note = twelveTET.getNoteFromID("C#");
const D: Note = twelveTET.getNoteFromID("D");
const E: Note = twelveTET.getNoteFromID("E");
const F: Note = twelveTET.getNoteFromID("F");
const Fs: Note = twelveTET.getNoteFromID("F#");
const G: Note = twelveTET.getNoteFromID("G");
const Gs: Note = twelveTET.getNoteFromID("G#");

// Common tunings for various instruments so that these can be used as presets and selected by name from a dropdown
export const Tunings = [
  // TODO: Reorg this data structure into objects per each instrument & re-write getCommonTunings and getStandardTuning methods
  // -- Nolan

  // GUITAR
  new Tuning("guitar", "standard", [E, A, D, G, B, E]),
  new Tuning("guitar", "drop D", [D, A, D, G, B, E]),
  new Tuning("guitar", "open D", [D, A, D, Fs, A, D]),
  new Tuning("guitar", "DADGAD", [D, A, D, G, A, D]),
  new Tuning("guitar", "open G", [D, G, D, G, B, D]),
  new Tuning("guitar", "open E", [E, B, E, Gs, B, E]),
  new Tuning("guitar", "open A", [E, A, E, A, Cs, E]),
  new Tuning("guitar", "drop C", [C, G, C, F, A, D]),

  // BASS
  // 4-string
  new Tuning("bass (4 string)", "standard", [E, A, D, G]),
  new Tuning("bass (4 string)", "drop D", [D, A, D, G]),
  new Tuning("bass (4 string)", "D-standard", [D, G, C, F]),
  new Tuning("bass (4 string)", "drop C", [C, G, C, F]),
  new Tuning("bass (4 string)", "tenor", [A, D, G, C]),

  // 5-string
  new Tuning("bass (5 string)", "standard", [B, E, A, D, G]),
  new Tuning("bass (5 string)", "tenor", [E, A, D, G, C]),

  // 6-string
  new Tuning("bass (6 string)", "standard", [B, E, A, D, G, C]),

  // BANJO
  // currently just 5-string
  new Tuning("banjo", "standard", [G, D, G, B, D]),
  // standard AKA open G

  new Tuning("banjo", "double C", [G, C, G, C, D]),
  new Tuning("banjo", "drop C", [G, C, G, B, D]),
  new Tuning("banjo", "D", [Fs, D, Fs, A, D]),
  new Tuning("banjo", "G modal", [G, D, G, C, D]),
  new Tuning("banjo", "guitar", [G, D, G, B, E]),

  // UKULELE
  new Tuning("ukulele", "standard", [G, C, E, A]),
  new Tuning("ukulele", "D", [A, D, Fs, B]),
  new Tuning("ukulele", "baritone", [D, G, B, E]),
];
