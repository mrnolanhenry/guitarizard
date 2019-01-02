const tap = require('tap');
const Note = require('../src/Note');
const ScaleSystem = require('../src/ScaleSystem');

tap.test('class ScaleSystem', function (t) {
  const A = new Note('A');

  const As = new Note('A#', { isSharp: true })
  const Bb = new Note('Bb', { isFlat: true }, [As]);
  As.addAliasNote(Bb);

  const B = new Note('B');

  const C = new Note('C');

  const Cs = new Note('C#', { isSharp: true })
  const Db = new Note('Db', { isFlat: true }, [Cs]);
  Cs.addAliasNote(Db)

  const D = new Note('D');

  const Ds = new Note('D#', { isSharp: true });
  const Eb = new Note('Eb', { isFlat: true }, [Ds]);
  Ds.addAliasNote(Eb);

  const E = new Note('E');

  const F = new Note('F');

  const Fs = new Note('F#', { isSharp: true });
  const Gb = new Note('Gb', { isFlat: true }, [Fs]);
  Fs.addAliasNote(Gb);

  const G = new Note('G');

  const Gs = new Note('G#', { isSharp: true });
  const Ab = new Note('Ab', { isFlat: true }, [Gs]);
  Gs.addAliasNote(Ab);

  const diatonic = new ScaleSystem('diatonic', [
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

  t.equal(diatonic.notes.length, 12, 'should have 12 notes');

  t.same(diatonic.getNoteFromID('A#'),
    Bb,
    'pluck note given an id');


  t.equal(diatonic.getNoteInterval(A, C),
    3,
    'correct offset (basic)');

  t.equal(diatonic.getNoteInterval(G, A),
    2,
    'correct offset ("loop")');

  t.equal(diatonic.getNoteInterval(As, A),
    11,
    'correct offset ("loop starting from sharp note")');

  t.equal(diatonic.getNoteInterval(Bb, A),
    11,
    'correct offset ("loop starting from flat note")');

  t.same(diatonic.getNextNote(A), Bb, 'next note simple step')

  t.same(diatonic.getNextNote(Gs), A, 'next note loop');

  t.same(diatonic.getNextNote(Ab),
    A,
    'next note loop (different note, matching alias)');

  t.same(
    diatonic.getNextNote(A, 2),
    B,
    'two steps away')

  t.same(
    diatonic.getNextNote(A, -1),
    Ab,
    'backward steps!')

  t.same(
    diatonic.getNextNote(A, -12),
    A,
    'backward steps!')


  t.equal(diatonic.valueOf(), JSON.stringify(diatonic));
  t.equal(diatonic.toString(), JSON.stringify(diatonic));

  t.same(diatonic.getKeyNotes(), [
    A,
    As,
    Bb,
    B,
    C,
    Cs,
    Db,
    D,
    Ds,
    Eb,
    E,
    F,
    Fs,
    Gb,
    G,
    Gs,
    Ab
  ], 'should list all key notes')

  t.equal((() => {
    try {
      diatonic.getShiftedNotes(new Note('invalid-note'))
    } catch (error) {
      return `${error}` === "fromNote 'invalid-note' does not exist in scale system";
    }

    return false;
  })(), true, 'should throw with correct message');

  t.end();
})
