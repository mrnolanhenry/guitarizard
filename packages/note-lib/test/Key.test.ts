import test from "node:test";
import assert from "node:assert";

import { Scale } from "../src/Scale";
import { twelveTET } from "../src/data/temperaments/twelveTET";
import { Key } from "../src/Key";
import { notes } from "../src/data/temperaments";

// WIP - will finish test file once Key.ts is finalized
// eslint-disable-next-line @typescript-eslint/no-unused-vars
test("class Key", function (_t) {
  const { A, As, Bb, C, D, E, F, G } = notes;

  const lydianScale = new Scale(
    "lydian",
    twelveTET,
    [0, 2, 4, 6, 7, 9, 11, 12],
  );
  const neapolitanMinorScale = new Scale(
    "neapolitan minor",
    twelveTET,
    [0, 1, 3, 5, 7, 8, 10, 12],
  );
  const phrygianScale = new Scale(
    "phrygian",
    twelveTET,
    [0, 1, 3, 5, 7, 8, 10, 12],
  );
  const mixolydianScale = new Scale(
    "mixolydian",
    twelveTET,
    [0, 2, 4, 5, 7, 9, 10, 12],
  );
  const aeolianScale = new Scale(
    "aeolian",
    twelveTET,
    [0, 2, 3, 5, 7, 8, 10, 12],
  );
  const ethiopianEzelScale = new Scale(
    "ethiopian (ezel)",
    twelveTET,
    [0, 2, 3, 5, 7, 8, 10, 12],
  );
  const ethiopianGeezScale = new Scale(
    "ethiopian (geez)",
    twelveTET,
    [0, 2, 3, 5, 7, 8, 10, 12],
  );
  const melodicMinorDescScale = new Scale(
    "melodic minor (descending)",
    twelveTET,
    [0, 2, 3, 5, 7, 8, 10, 12],
  );
  const naturalMinorScale = new Scale(
    "natural minor",
    twelveTET,
    [0, 2, 3, 5, 7, 8, 10, 12],
  );
  const locrianScale = new Scale(
    "locrian",
    twelveTET,
    [0, 1, 3, 5, 6, 8, 10, 12],
  );
  const ethiopianArarayScale = new Scale(
    "ethiopian (a raray)",
    twelveTET,
    [0, 2, 4, 5, 7, 9, 11, 12],
  );
  const ionianScale = new Scale(
    "ionian",
    twelveTET,
    [0, 2, 4, 5, 7, 9, 11, 12],
  );
  const majorScale = new Scale("major", twelveTET, [0, 2, 4, 5, 7, 9, 11, 12]);
  const dorianScale = new Scale(
    "dorian",
    twelveTET,
    [0, 2, 3, 5, 7, 9, 10, 12],
  );

  const BbLydian = new Key(Bb, lydianScale);
  const AsLydian = new Key(As, lydianScale);
  const ANeapolitanMinor = new Key(A, neapolitanMinorScale);
  const APhrygian = new Key(A, phrygianScale);
  const CMixolydian = new Key(C, mixolydianScale);
  const DAeolian = new Key(D, aeolianScale);
  const DEthiopianEzel = new Key(D, ethiopianEzelScale);
  const DEthiopianGeez = new Key(D, ethiopianGeezScale);
  const DMelodicMinorDesc = new Key(D, melodicMinorDescScale);
  const DNaturalMinor = new Key(D, naturalMinorScale);
  const ELocrian = new Key(E, locrianScale);
  const FEthiopianAraray = new Key(F, ethiopianArarayScale);
  const FIonian = new Key(F, ionianScale);
  const FMajor = new Key(F, majorScale);
  const GDorian = new Key(G, dorianScale);

  const BbLydianEquivKeys: Key[] = BbLydian.getEquivKeys();
  const AsLydianEquivKeys: Key[] = AsLydian.getEquivKeys();

  assert.deepEqual(BbLydian.scale, lydianScale, "scale identified");

  assert.deepEqual(BbLydian.note, Bb, "flat note identified");
  assert.deepEqual(AsLydian.note, As, "sharp note identified");

  assert.deepEqual(
    BbLydianEquivKeys[0],
    ANeapolitanMinor,
    "equivalent key 0 identified given flat note",
  );
  assert.deepEqual(
    AsLydianEquivKeys[0],
    ANeapolitanMinor,
    "equivalent key 0 identified given sharp note",
  );

  assert.deepEqual(
    BbLydian.getEquivKeys(),
    [
      ANeapolitanMinor,
      APhrygian,
      AsLydian,
      BbLydian,
      CMixolydian,
      DAeolian,
      DEthiopianEzel,
      DEthiopianGeez,
      DMelodicMinorDesc,
      DNaturalMinor,
      ELocrian,
      FEthiopianAraray,
      FIonian,
      FMajor,
      GDorian,
    ],
    "equivalent keys identified given flat note",
  );

  assert.deepEqual(
    AsLydian.getEquivKeys(),
    [
      ANeapolitanMinor,
      APhrygian,
      AsLydian,
      BbLydian,
      CMixolydian,
      DAeolian,
      DEthiopianEzel,
      DEthiopianGeez,
      DMelodicMinorDesc,
      DNaturalMinor,
      ELocrian,
      FEthiopianAraray,
      FIonian,
      FMajor,
      GDorian,
    ],
    "equivalent keys identified given sharp note",
  );

  assert.equal(BbLydian.valueOf(), JSON.stringify(BbLydian), "valueOf works");
  assert.equal(BbLydian.toString(), JSON.stringify(BbLydian), "toString works");
});
