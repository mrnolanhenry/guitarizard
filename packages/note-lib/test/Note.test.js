const tap = require('tap');
const Note = require('../src/Note');

tap.test('class Note', function (t) {
  const Xs = new Note('X#', { isSharp: true });
  const Yb = new Note('Yb', { isFlat: true });

  const note = new Note('FOO-BAR', {}, [ Xs, Yb ]);

  const X = new Note('X', { isNatural: true });

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

  t.equal(note.isSimilar(Xs), true, 'detect similar notes');
  t.equal(note.isSimilar(note), true, 'detect similar (self)');
  t.equal(note.isSimilar(new Note('Z')), false, 'dismiss non-similar notes');

  t.equal(note.findSharp(), Xs, 'find sharp note in aliases')
  t.equal(Xs.findSharp(), Xs, 'return self if sharp')
  t.equal(Yb.findSharp(), (void 0), 'return undefined if no sharp exists')

  t.equal(note.findFlat(), Yb, 'find flat note in aliases')
  t.equal(Yb.findFlat(), Yb, 'return self if flat')
  t.equal(Xs.findFlat(), (void 0), 'return undefined if no flat exists')

  t.equal(note.findSharpOrNatural(), Xs, 'find sharp or natural note in aliases')
  t.equal(note.findFlatOrNatural(), Yb, 'find flat or natural note in aliases')
  t.equal(X.findSharpOrNatural(), X, 'return natural note if no flat exists')
  t.equal(X.findFlatOrNatural(), X, 'return natural note if no flat exists')

  t.equal(note.findByAttribute('isSharp', true), Xs, 'find by attribute, success');
  t.equal(note.findByAttribute('isPoo', true), (void 0), 'find by attribute, failure');
  t.equal(Xs.findByAttribute('isSharp', true), Xs, 'find by attribute, success (self)');

  t.end();
})
