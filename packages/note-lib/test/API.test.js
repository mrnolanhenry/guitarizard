const tap = require("tap");
const API = require("../src/index");

tap.test("exposed API", function (t) {
  t.ok(API.Note, "expect Note");
  t.ok(API.ScaleSystem, "expect ScaleSystem");
  t.ok(API.Scale, "expect Scale");
  t.ok(API.Key, "expect Key");
  t.ok(API.instrument.Tuning, "expect instrument.Tuning");

  t.ok(API.instrument.TunedString, "expect instrument.TunedString");
  t.ok(API.instrument.FretBoard, "expect instrument.FretBoard");
  t.ok(API.instrument.Guitar, "expect instrument.Guitar");
  t.ok(API.instrument.Banjo, "expect instrument.Banjo");

  t.ok(API.data.scaleSystem.diatonic, "expect diatonic scale system");

  t.equal(API.data.scales.length, 130, "expect correct scale length");

  t.equal(
    API.data.intervals.mainIntervals.length,
    13,
    "correct main intervals"
  );

  t.ok(API.data.intervals.P1, "expect main intervals to be exposed");

  t.end();
});
