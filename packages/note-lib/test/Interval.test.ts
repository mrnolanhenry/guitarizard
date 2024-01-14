import tap from "tap";
import { Constants } from "../src";
import { Interval } from "../src/Interval";

tap.test("class Interval", function (t) {
  const interval = new Interval(0, [
    { name: Constants.PERFECT, long: Constants.PERFECT_UNISON, short: Constants.PERFECT_UNISON_SHORT },
    { name: Constants.DIMINISHED, long: Constants.DIMINISHED_SECOND, short: Constants.DIMINISHED_SECOND_SHORT },
    { name: Constants.ROOT, short: Constants.ROOT_SHORT },
  ]);

  t.same(
    interval.toJSON(),
    {
      semitones: 0,
      aliases: [
        { name: Constants.PERFECT, long: Constants.PERFECT_UNISON, short: Constants.PERFECT_UNISON_SHORT },
        { name: Constants.DIMINISHED, long: Constants.DIMINISHED_SECOND, short: Constants.DIMINISHED_SECOND_SHORT },
        { name: Constants.ROOT, short: Constants.ROOT_SHORT },
      ],
      isPerfect: true,
      isDiminished: true,
      isAugmented: false,
      isMajor: false,
      isMinor: false,
      isRoot: true,
    },
    "JSON should be correct"
  );

  t.equal(interval.valueOf(), JSON.stringify(interval));
  t.equal(interval.toString(), JSON.stringify(interval));

  t.equal(interval.isPerfect, true);
  t.equal(interval.isDiminished, true);
  t.equal(interval.isAugmented, false);
  t.equal(interval.isMajor, false);
  t.equal(interval.isMinor, false);

  t.end();
});
