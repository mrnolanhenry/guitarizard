const tap = require('tap');
const API = require('../src/index');

tap.test('exposed API', function (t) {
  t.ok(API.Note)
  t.ok(API.ScaleSystem)
  t.ok(API.Scale)
  t.ok(API.FrettedString)
  t.ok(API.instruments.Guitar)
  t.equal(API.scaleSystems.length, 1);
  t.equal(API.scales.length, 110)
  t.end()
});
