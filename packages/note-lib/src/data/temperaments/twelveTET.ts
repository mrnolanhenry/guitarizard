import * as Constants from "../../constants/Constants";
import { NotePitch } from "../../enums/NotePitch";
import { Note } from "../../Note";
import { Temperament } from "../../Temperament";

// Represents the twelve-tone equal temperament (12TET, or twelveTET, in our codebase)
// https://en.wikipedia.org/wiki/12_equal_temperament

const A = new Note(Constants.A, NotePitch.Neither);

const As = new Note(Constants.A_SHARP, NotePitch.Sharp);
const Bb = new Note(Constants.B_FLAT, NotePitch.Flat, [As]);
As.addAliasNote(Bb);

const B = new Note(Constants.B, NotePitch.Neither);

const C = new Note(Constants.C, NotePitch.Neither);

const Cs = new Note(Constants.C_SHARP, NotePitch.Sharp);
const Db = new Note(Constants.D_FLAT, NotePitch.Flat, [Cs]);
Cs.addAliasNote(Db);

const D = new Note(Constants.D, NotePitch.Neither);

const Ds = new Note(Constants.D_SHARP, NotePitch.Sharp);
const Eb = new Note(Constants.E_FLAT, NotePitch.Flat, [Ds]);
Ds.addAliasNote(Eb);

const E = new Note(Constants.E, NotePitch.Neither);

const F = new Note(Constants.F, NotePitch.Neither);

const Fs = new Note(Constants.F_SHARP, NotePitch.Sharp);
const Gb = new Note(Constants.G_FLAT, NotePitch.Flat, [Fs]);
Fs.addAliasNote(Gb);

const G = new Note(Constants.G, NotePitch.Neither);

const Gs = new Note(Constants.G_SHARP, NotePitch.Sharp);
const Ab = new Note(Constants.A_FLAT, NotePitch.Flat, [Gs]);
Gs.addAliasNote(Ab);

export const twelveTETNotes = { Ab, A, As, Bb, B, C, Cs, Db, D, Ds, Eb, E, F, Fs, Gb, G, Gs };

export const twelveTET = new Temperament(Constants.TWELVE_TET, [A, Bb, B, C, Db, D, Eb, E, F, Gb, G, Ab]);
