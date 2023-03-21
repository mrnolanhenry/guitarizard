import tap from "tap";
import * as API from "../src/index";

tap.test("exposed API", function (t) {
  t.ok(API.Note, "expect Note");
  t.ok(API.Temperament, "expect Temperament");
  t.ok(API.Scale, "expect Scale");
  t.ok(API.Key, "expect Key");
  t.ok(API.instrument.Tuning, "expect instrument.Tuning");

  t.ok(API.instrument.TunedString, "expect instrument.TunedString");
  t.ok(API.instrument.FretBoard, "expect instrument.FretBoard");
  t.ok(API.instrument.Guitar, "expect instrument.Guitar");
  t.ok(API.instrument.Banjo, "expect instrument.Banjo");
  t.ok(API.instrument.Bass, "expect instrument.Bass");
  t.ok(API.instrument.Mandolin, "expect instrument.Mandolin");
  t.ok(API.instrument.Ukulele, "expect instrument.Ukulele");

  t.ok(API.data.temperament.twelveTET, "expect twelveTET temperament");

  t.equal(API.data.scales.length, 130, "expect correct scale length");

  t.equal(
    API.data.intervals.mainIntervals.length,
    13,
    "correct main intervals"
  );

  t.ok(
    API.data.intervals.mainIntervalsMap.P1,
    "expect main intervals to be exposed"
  );

  t.end();
});
