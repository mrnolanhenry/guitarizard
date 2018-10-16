const tap = require('tap');
const Note = require('../src/Note');

tap.test('class Note', function (t) {
  const Xs = new Note('X#', { isSharp: true });
  const Yb = new Note('Yb', { isFlat: true });

  const note = new Note('FOO-BAR', {}, [ Xs, Yb ]);

  t.equal(note.id, 'FOO-BAR', 'note id should match');

  t.same(note.aliasNotes, [ Xs, Yb ], 'aliases should match');

  t.same(note.toJSON(), {
    id: 'FOO-BAR',
    aliasNotes: [
      { id: 'X#', attributes: { isSharp: true } },
      { id: 'Yb', attributes: { isFlat: true } }
    ],
    attributes: {}
  }, 'JSON should be correct');

  t.equal(note.valueOf(), JSON.stringify(note));
  t.equal(note.toString(), JSON.stringify(note));

  t.end();
})
