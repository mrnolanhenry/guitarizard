import { Tuning } from "../instrument/Tuning";
import { diatonic } from "./scaleSystem/diatonic";
import { Note } from "../Note";

const A: Note = diatonic.getNoteFromID("A");
const B: Note = diatonic.getNoteFromID("B");
const C: Note = diatonic.getNoteFromID("C");
const Cs: Note = diatonic.getNoteFromID("Cs");
const D: Note = diatonic.getNoteFromID("D");
const E: Note = diatonic.getNoteFromID("E");
const F: Note = diatonic.getNoteFromID("F");
const Fs: Note = diatonic.getNoteFromID("Fs");
const G: Note = diatonic.getNoteFromID("G");
const Gs: Note = diatonic.getNoteFromID("Gs");

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
  new Tuning("bass-4", "standard", [E, A, D, G]),
  new Tuning("bass-4", "drop D", [D, A, D, G]),
  new Tuning("bass-4", "D-standard", [D, G, C, F]),
  new Tuning("bass-4", "drop C", [C, G, C, F]),
  new Tuning("bass-4", "tenor", [A, D, G, C]),

  // 5-string
  new Tuning("bass-5", "standard", [B, E, A, D, G]),
  new Tuning("bass-5", "tenor", [E, A, D, G, C]),

  // 6-string
  new Tuning("bass-6", "standard", [B, E, A, D, G, C]),

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
