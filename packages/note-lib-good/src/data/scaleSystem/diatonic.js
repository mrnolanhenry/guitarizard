const Note = require('../../Note');
const ScaleSystem = require('../../ScaleSystem');

const A = new Note('A');

const As = new Note('A#', { isSharp: true })
const Bb = new Note('Bb', { isFlat: true }, [ As ]);
As.addAliasNote(Bb);

const B = new Note('B');

const C = new Note('C');

const Cs = new Note ('C#', { isSharp: true })
const Db = new Note('Db', { isFlat: true }, [ Cs ]);
Cs.addAliasNote(Db)

const D = new Note('D');

const Ds = new Note('D#', { isSharp: true });
const Eb = new Note('Eb', { isFlat: true }, [ Ds ]);
Ds.addAliasNote(Eb);

const E = new Note('E');

const F = new Note('F');

const Fs = new Note('F#', { isSharp: true });
const Gb = new Note('Gb', { isFlat: true }, [ Fs ]);
Fs.addAliasNote(Gb);

const G = new Note('G');

const Gs = new Note('G#', { isSharp: true });
const Ab = new Note('Ab', { isFlat: true }, [ Gs ]);
Gs.addAliasNote(Ab);

const diatonic = new ScaleSystem(
  'diatonic',
  [ A, Bb, B, C, Db, D, Eb, E, F, Gb, G, Ab ]);

module.exports = diatonic;

module.exports.A = A;
module.exports.Bb = Bb;
module.exports.B = B;
module.exports.C = C;
module.exports.Db = Db;
module.exports.D = D;
module.exports.Eb = Eb;
module.exports.E = E;
module.exports.F = F;
module.exports.Gb = Gb;
module.exports.G = G;
module.exports.Ab = Ab;
