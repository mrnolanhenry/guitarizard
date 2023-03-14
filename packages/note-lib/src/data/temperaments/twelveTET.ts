import { NotePitch } from "../../enums/NotePitch";
import { Note } from "../../Note";
import { Temperament } from "../../Temperament";

// Represents the twelve-tone equal temperament (12TET, or twelveTET, in our codebase)
// https://en.wikipedia.org/wiki/12_equal_temperament

const A = new Note("A", NotePitch.Neither);

const As = new Note("A#", NotePitch.Sharp);
const Bb = new Note("Bb", NotePitch.Flat, [As]);
As.addAliasNote(Bb);

const B = new Note("B", NotePitch.Neither);

const C = new Note("C", NotePitch.Neither);

const Cs = new Note("C#", NotePitch.Sharp);
const Db = new Note("Db", NotePitch.Flat, [Cs]);
Cs.addAliasNote(Db);

const D = new Note("D", NotePitch.Neither);

const Ds = new Note("D#", NotePitch.Sharp);
const Eb = new Note("Eb", NotePitch.Flat, [Ds]);
Ds.addAliasNote(Eb);

const E = new Note("E", NotePitch.Neither);

const F = new Note("F", NotePitch.Neither);

const Fs = new Note("F#", NotePitch.Sharp);
const Gb = new Note("Gb", NotePitch.Flat, [Fs]);
Fs.addAliasNote(Gb);

const G = new Note("G", NotePitch.Neither);

const Gs = new Note("G#", NotePitch.Sharp);
const Ab = new Note("Ab", NotePitch.Flat, [Gs]);
Gs.addAliasNote(Ab);

export const twelveTET = new Temperament("twelveTET", [
  A,
  Bb,
  B,
  C,
  Db,
  D,
  Eb,
  E,
  F,
  Gb,
  G,
  Ab,
]);
