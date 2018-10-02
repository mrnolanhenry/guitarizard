const tap = require('tap');
const API = require('../src/index');

tap.test('exposed API', function (t) {
  t.ok(API.Note)
  t.ok(API.ScaleSystem)
  t.ok(API.Scale)
  t.ok(API.instruments.FrettedString)
  t.ok(API.instruments.Guitar)
  
  t.equal(API.data.scaleSystems.length, 1)
  t.ok(API.data.scaleSystems[0].name === 'diatonic')
  
  t.equal(API.data.scales.length, 110)

  t.equal(API.data.intervals.mainIntervals.length, 13);
  t.ok(API.data.intervals.P1)
  
  t.end()
});
