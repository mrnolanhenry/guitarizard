import { Tuning } from "../Tuning";
import { twelveTET } from "./temperaments/twelveTET";
import { Note } from "../Note";

const A: Note = twelveTET.getNoteFromID("A") as Note;
const B: Note = twelveTET.getNoteFromID("B") as Note;
const C: Note = twelveTET.getNoteFromID("C") as Note;
const Cs: Note = twelveTET.getNoteFromID("C#") as Note;
const D: Note = twelveTET.getNoteFromID("D") as Note;
const E: Note = twelveTET.getNoteFromID("E") as Note;
const F: Note = twelveTET.getNoteFromID("F") as Note;
const Fs: Note = twelveTET.getNoteFromID("F#") as Note;
const G: Note = twelveTET.getNoteFromID("G") as Note;
const Gs: Note = twelveTET.getNoteFromID("G#") as Note;

// Common tunings for various instruments so that these can be used as presets and selected by name from a dropdown
export const Tunings = [
  // TODO: Reorg this data structure into objects per each instrument & re-write getCommonTunings and getStandardTuning methods
  // -- Nolan

  // GUITAR
  // 6-string
  new Tuning("guitar", "standard", [E, A, D, G, B, E]),
  new Tuning("guitar", "drop D", [D, A, D, G, B, E]),
  new Tuning("guitar", "open D", [D, A, D, Fs, A, D]),
  new Tuning("guitar", "DADGAD", [D, A, D, G, A, D]),
  new Tuning("guitar", "open G", [D, G, D, G, B, D]),
  new Tuning("guitar", "open E", [E, B, E, Gs, B, E]),
  new Tuning("guitar", "open A", [E, A, E, A, Cs, E]),
  new Tuning("guitar", "drop C", [C, G, C, F, A, D]),

  // 7-string
  new Tuning("guitar (7 string)", "standard", [B, E, A, D, G, B, E]),

  // 8-string
  new Tuning("guitar (8 string)", "standard", [Fs, B, E, A, D, G, B, E]),

  // 12-string
  new Tuning("guitar (12 string)", "standard", [E, A, D, G, B, E]),
  new Tuning("guitar (12 string)", "drop D", [D, A, D, G, B, E]),
  new Tuning("guitar (12 string)", "open D", [D, A, D, Fs, A, D]),
  new Tuning("guitar (12 string)", "DADGAD", [D, A, D, G, A, D]),
  new Tuning("guitar (12 string)", "open G", [D, G, D, G, B, D]),
  new Tuning("guitar (12 string)", "open E", [E, B, E, Gs, B, E]),
  new Tuning("guitar (12 string)", "open A", [E, A, E, A, Cs, E]),
  new Tuning("guitar (12 string)", "drop C", [C, G, C, F, A, D]),

  // BASS
  // 4-string
  new Tuning("bass", "standard", [E, A, D, G]),
  new Tuning("bass", "drop D", [D, A, D, G]),
  new Tuning("bass", "D-standard", [D, G, C, F]),
  new Tuning("bass", "drop C", [C, G, C, F]),
  new Tuning("bass", "tenor", [A, D, G, C]),

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

  // MANDOLIN
  new Tuning("mandolin", "standard", [G, D, A, E]),
  new Tuning("mandolin", "Cajun", [F, C, G, D]),
  new Tuning("mandolin", "open G", [G, D, G, B]),
  new Tuning("mandolin", "cross G", [G, D, G, D]),
  new Tuning("mandolin", "Gee-Dad", [G, D, A, D]),
  new Tuning("mandolin", "open D", [D, D, A, D]),
  new Tuning("mandolin", "high bass", [A, D, A, E]),
  new Tuning("mandolin", "cross A", [A, E, A, E]),
  new Tuning("mandolin", "open A", [A, E, A, Cs]),

  // UKULELE
  new Tuning("ukulele", "standard", [G, C, E, A]),
  new Tuning("ukulele", "D", [A, D, Fs, B]),
  new Tuning("ukulele", "baritone", [D, G, B, E]),
];
