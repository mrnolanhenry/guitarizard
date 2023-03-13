import tap from "tap";
import { Note } from "../Note";
import { Scale } from "../Scale";
import {
  twelveTET,
  notes as twelveTET_notes,
} from "../data/temperaments/twelveTET";
import { Key } from "../Key";

// WIP - will finish test file once Key.js is finalized
tap.test("class Key", function (t) {
  const lydianScale = new Scale("lydian", twelveTET, [0, 2, 4, 6, 7, 9, 11, 12]);
  const neapolitanMinorScale = new Scale("neapolitan minor", twelveTET, [
    0,
    1,
    3,
    5,
    7,
    8,
    10,
    12,
  ]);
  const mixolydianScale = new Scale("mixolydian", twelveTET, [
    0,
    2,
    4,
    5,
    7,
    9,
    10,
    12,
  ]);
  const aeolianScale = new Scale("aeolian", twelveTET, [
    0,
    2,
    3,
    5,
    7,
    8,
    10,
    12,
  ]);
  const locrianScale = new Scale("locrian", twelveTET, [
    0,
    1,
    3,
    5,
    6,
    8,
    10,
    12,
  ]);
  const ionianScale = new Scale("ionian", twelveTET, [0, 2, 4, 5, 7, 9, 11, 12]);
  const majorScale = new Scale("major", twelveTET, [0, 2, 4, 5, 7, 9, 11, 12]);
  const dorianScale = new Scale("dorian", twelveTET, [0, 2, 3, 5, 7, 9, 10, 12]);

  const BbLydian = new Key(twelveTET_notes.Bb, lydianScale);
  const AsLydian = new Key(twelveTET_notes.As, lydianScale);
  const ANeapolitanMinor = new Key(twelveTET_notes.A, neapolitanMinorScale);
  const CMixolydian = new Key(twelveTET_notes.C, mixolydianScale);
  const DAeolian = new Key(twelveTET_notes.D, aeolianScale);
  const ELocrian = new Key(twelveTET_notes.E, locrianScale);
  const FIonian = new Key(twelveTET_notes.F, ionianScale);
  const FMajor = new Key(twelveTET_notes.F, majorScale);
  const GDorian = new Key(twelveTET_notes.G, dorianScale);

  const BbLydianequivKeys = BbLydian.getEquivKeys();
  const AsLydianequivKeys = AsLydian.getEquivKeys();

  t.same(BbLydian.scale, lydianScale, "scale identified");

  t.same(BbLydian.note, twelveTET_notes.Bb, "flat note identified");
  t.same(AsLydian.note, twelveTET_notes.As, "sharp note identified");

  t.same(
    BbLydianequivKeys[0],
    ANeapolitanMinor,
    "equivalent key 0 identified given flat note"
  );
  t.same(
    AsLydianequivKeys[0],
    ANeapolitanMinor,
    "equivalent key 0 identified given sharp note"
  );

  t.same(
    BbLydian.getEquivKeys(),
    [
      ANeapolitanMinor,
      BbLydian,
      CMixolydian,
      DAeolian,
      ELocrian,
      FIonian,
      FMajor,
      GDorian,
    ],
    "equivalent keys identified given flat note"
  );

  t.same(
    AsLydian.getEquivKeys(),
    [
      ANeapolitanMinor,
      BbLydian,
      CMixolydian,
      DAeolian,
      ELocrian,
      FIonian,
      FMajor,
      GDorian,
    ],
    "equivalent keys identified given sharp note"
  );

  t.equal(BbLydian.valueOf(), JSON.stringify(BbLydian), "valueOf works");
  t.equal(BbLydian.toString(), JSON.stringify(BbLydian), "toString works");

  t.end();
});
