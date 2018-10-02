const tap = require('tap');
const Note = require('../src/Note');

tap.test('class Note', function (t) {
  const note = new Note('FOO-BAR', ['X', 'Y']);

  t.equal(note.id, 'FOO-BAR', 'note id should match');
  
  t.same(note.aliases, ['X', 'Y'], 'aliases should match');
  
  t.same(note.toJSON(), {
    id: 'FOO-BAR',
    aliases: ['X', 'Y']
  }, 'JSON should be correct');

  t.equal(note.valueOf(), JSON.stringify(note));
  t.equal(note.toString(), JSON.stringify(note));
  
  t.end();
})
