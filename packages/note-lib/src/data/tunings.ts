import { Tuning } from "../Tuning";
import { twelveTETNotes } from "./temperaments/twelveTET";
import { Note } from "../Note";

const { A, As, Bb, B, C, Cs, Db, D, Ds, Eb, E, F, Fs, Gb, G, Gs, Ab } = twelveTETNotes;

// Common tunings for various instruments so that these can be used as presets and selected by name from a dropdown
export const Tunings = [
  // NOLAN TODO: Reorg this data structure into objects per each instrument & re-write getCommonTunings and getStandardTuning methods

  // GUITAR
  // 6-string
  new Tuning("guitar", "standard", [E, A, D, G, B, E]),
  new Tuning("guitar", "drop D", [D, A, D, G, B, E]),
  new Tuning("guitar", "half step down", [Eb, Ab, Db, Gb, Bb, Eb]),
  new Tuning("guitar", "whole step down", [D, G, C, F, A, D]),
  new Tuning("guitar", "open D", [D, A, D, Fs, A, D]),
  new Tuning("guitar", "DADGAD", [D, A, D, G, A, D]),
  new Tuning("guitar", "open G", [D, G, D, G, B, D]),
  new Tuning("guitar", "open E", [E, B, E, Gs, B, E]),
  new Tuning("guitar", "open A", [E, A, E, A, Cs, E]),
  new Tuning("guitar", "new standard", [C, G, D, A, E, G]),
  new Tuning("guitar", "all fifths", [C, G, D, A, E, B]),
  new Tuning("guitar", "open C", [C, G, C, G, C, E]),
  new Tuning("guitar", "open C (C5)", [C, G, C, G, G, E]),
  new Tuning("guitar", "open C (repetitive)", [C, E, G, C, E, G]),
  new Tuning("guitar", "drop C", [C, G, C, F, A, D]),
  new Tuning("guitar", "open B", [B, Fs, B, Fs, B, Ds]),
  new Tuning("guitar", "open F", [F, A, C, F, C, F]),

  // 7-string
  new Tuning("guitar (7 string)", "standard", [B, E, A, D, G, B, E]),
  new Tuning("guitar (7 string)", "half step down", [Bb, Eb, Ab, Db, Gb, Bb, Eb]),
  new Tuning("guitar (7 string)", "whole step down", [A, D, G, C, F, A, D]),

  // 8-string
  new Tuning("guitar (8 string)", "standard", [Fs, B, E, A, D, G, B, E]),
  new Tuning("guitar (8 string)", "half step down", [F, Bb, Eb, Ab, Db, Gb, Bb, Eb]),
  new Tuning("guitar (8 string)", "whole step down", [E, A, D, G, C, F, A, D]),

  // 12-string
  new Tuning("guitar (12 string)", "standard", [E, A, D, G, B, E]),
  new Tuning("guitar (12 string)", "drop D", [D, A, D, G, B, E]),
  new Tuning("guitar (12 string)", "half step down", [Eb, Ab, Db, Gb, Bb, Eb]),
  new Tuning("guitar (12 string)", "whole step down", [D, G, C, F, A, D]),
  new Tuning("guitar (12 string)", "open D", [D, A, D, Fs, A, D]),
  new Tuning("guitar (12 string)", "DADGAD", [D, A, D, G, A, D]),
  new Tuning("guitar (12 string)", "open G", [D, G, D, G, B, D]),
  new Tuning("guitar (12 string)", "open E", [E, B, E, Gs, B, E]),
  new Tuning("guitar (12 string)", "open A", [E, A, E, A, Cs, E]),
  new Tuning("guitar (12 string)", "new standard", [C, G, D, A, E, G]),
  new Tuning("guitar (12 string)", "all fifths", [C, G, D, A, E, B]),
  new Tuning("guitar (12 string)", "open C", [C, G, C, G, C, E]),
  new Tuning("guitar (12 string)", "open C (C5)", [C, G, C, G, G, E]),
  new Tuning("guitar (12 string)", "open C (repetitive)", [C, E, G, C, E, G]),
  new Tuning("guitar (12 string)", "drop C", [C, G, C, F, A, D]),
  new Tuning("guitar (12 string)", "open B", [B, Fs, B, Fs, B, Ds]),
  new Tuning("guitar (12 string)", "open F", [F, A, C, F, C, F]),

  // BASS
  // 4-string
  new Tuning("bass", "standard", [E, A, D, G]),
  new Tuning("bass", "drop D", [D, A, D, G]),
  new Tuning("bass", "D-standard", [D, G, C, F]),
  new Tuning("bass", "drop C", [C, G, C, F]),
  new Tuning("bass", "tenor", [A, D, G, C]),
  new Tuning("bass", "half step down", [Eb, Ab, Db, Gb]),
  new Tuning("bass", "whole step down", [D, G, C, F]),

  // 5-string
  new Tuning("bass (5 string)", "standard", [B, E, A, D, G]),
  new Tuning("bass (5 string)", "tenor", [E, A, D, G, C]),
  new Tuning("bass (5 string)", "half step down", [Bb, Eb, Ab, Db, Gb]),
  new Tuning("bass (5 string)", "whole step down", [A, D, G, C, F]),

  // 6-string
  new Tuning("bass (6 string)", "standard", [B, E, A, D, G, C]),
  new Tuning("bass (6 string)", "half step down", [Bb, Eb, Ab, Db, Gb, B]),
  new Tuning("bass (6 string)", "whole step down", [A, D, G, C, F, Bb]),

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

  // PIANO
  new Tuning("piano", "standard", [C]),

  // UKULELE
  new Tuning("ukulele", "standard", [G, C, E, A]),
  new Tuning("ukulele", "D", [A, D, Fs, B]),
  new Tuning("ukulele", "baritone", [D, G, B, E]),
];
