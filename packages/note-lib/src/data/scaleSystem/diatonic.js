const Note = require('../../Note');
const ScaleSystem = require('../../ScaleSystem');

const A = new Note('A', { isNatural: true});

const As = new Note('A#', { isSharp: true });
const Bb = new Note('Bb', { isFlat: true }, [ As ]);
As.addAliasNote(Bb);

const B = new Note('B', { isNatural: true});

const C = new Note('C', { isNatural: true});

const Cs = new Note ('C#', { isSharp: true })
const Db = new Note('Db', { isFlat: true }, [ Cs ]);
Cs.addAliasNote(Db)

const D = new Note('D', { isNatural: true});

const Ds = new Note('D#', { isSharp: true });
const Eb = new Note('Eb', { isFlat: true }, [ Ds ]);
Ds.addAliasNote(Eb);

const E = new Note('E', { isNatural: true});

const F = new Note('F', { isNatural: true});

const Fs = new Note('F#', { isSharp: true });
const Gb = new Note('Gb', { isFlat: true }, [ Fs ]);
Fs.addAliasNote(Gb);

const G = new Note('G', { isNatural: true});

const Gs = new Note('G#', { isSharp: true });
const Ab = new Note('Ab', { isFlat: true }, [ Gs ]);
Gs.addAliasNote(Ab);

const diatonic = new ScaleSystem(
  'diatonic',
  [ A, Bb, B, C, Db, D, Eb, E, F, Gb, G, Ab ]);

module.exports = diatonic;

module.exports.A = A;
module.exports.As = As;
module.exports.Bb = Bb;
module.exports.B = B;
module.exports.C = C;
module.exports.Cs = Cs;
module.exports.Db = Db;
module.exports.D = D;
module.exports.Ds = Ds;
module.exports.Eb = Eb;
module.exports.E = E;
module.exports.F = F;
module.exports.Fs = Fs;
module.exports.Gb = Gb;
module.exports.G = G;
module.exports.Gs = Gs;
module.exports.Ab = Ab;
