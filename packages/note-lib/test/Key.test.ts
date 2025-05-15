import test from "node:test";
import assert from "node:assert";

import { Scale } from "../src/Scale";
import { twelveTET } from "../src/data/temperaments/twelveTET";
import { Key } from "../src/Key";
import { twelveTETIntervals, twelveTETNotes } from "../src/data/temperaments";

// WIP - will finish test file once Key.ts is finalized
// eslint-disable-next-line @typescript-eslint/no-unused-vars
test("class Key", function (_t) {
  const { Ab, A, As, Bb, B, C, Cs, D, Eb, E, F, Fs, G } = twelveTETNotes;

  const {   
    twelveTETP1,
    twelveTETm2,
    twelveTETM2,
    twelveTETm3,
    twelveTETM3,
    twelveTETP4,
    twelveTETd5,
    twelveTETP5,
    twelveTETm6,
    twelveTETM6,
    twelveTETm7,
    twelveTETM7,
    twelveTETP8,  
  } = twelveTETIntervals;

  const lydianScale = new Scale(
    "lydian",
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETd5, twelveTETP5, twelveTETM6, twelveTETM7, twelveTETP8],
  );
  const neapolitanMinorScale = new Scale(
    "neapolitan minor",
    twelveTET,
    [twelveTETP1, twelveTETm2, twelveTETm3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETm7, twelveTETP8],
  );
  const phrygianScale = new Scale(
    "phrygian",
    twelveTET,
    [twelveTETP1, twelveTETm2, twelveTETm3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETm7, twelveTETP8],
  );
  const mixolydianScale = new Scale(
    "mixolydian",
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETM6, twelveTETm7, twelveTETP8],
  );
  const aeolianScale = new Scale(
    "aeolian",
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETm7, twelveTETP8],
  );
  const ethiopianEzelScale = new Scale(
    "ethiopian (ezel)",
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETm7, twelveTETP8],
  );
  const ethiopianGeezScale = new Scale(
    "ethiopian (geez)",
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETm7, twelveTETP8],
  );
  const melodicMinorDescScale = new Scale(
    "melodic minor (descending)",
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETm7, twelveTETP8],
  );
  const naturalMinorScale = new Scale(
    "natural minor",
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETm7, twelveTETP8],
  );
  const locrianScale = new Scale(
    "locrian",
    twelveTET,
    [twelveTETP1, twelveTETm2, twelveTETm3, twelveTETP4, twelveTETd5, twelveTETm6, twelveTETm7, twelveTETP8],
  );
  const ethiopianArarayScale = new Scale(
    "ethiopian (a raray)",
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETM6, twelveTETM7, twelveTETP8],
  );
  const ionianScale = new Scale(
    "ionian",
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETM6, twelveTETM7, twelveTETP8],
  );
  const majorScale = new Scale("major", twelveTET, [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETM6, twelveTETM7, twelveTETP8]);
  const dorianScale = new Scale(
    "dorian",
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETP4, twelveTETP5, twelveTETM6, twelveTETm7, twelveTETP8],
  );

  const bluesScale = new Scale("Blues", twelveTET, [twelveTETP1, twelveTETm3, twelveTETP4, twelveTETd5, twelveTETP5, twelveTETm7]);

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

  const FBlues = new Key(F, bluesScale);
  const FsBlues = new Key(Fs, bluesScale);

  const BbLydianEquivKeys: Key[] = BbLydian.getEquivKeys();
  const AsLydianEquivKeys: Key[] = AsLydian.getEquivKeys();

  assert.deepEqual(BbLydian.scale, lydianScale, "scale identified");

  assert.deepEqual(BbLydian.tonic, Bb, "flat note identified");
  assert.deepEqual(AsLydian.tonic, As, "sharp note identified");

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

  assert.deepEqual(FBlues.notesInKey, [F, Ab, Bb, B, C, Eb]);

  assert.deepEqual(FsBlues.notesInKey, [Fs, A, B, C, Cs, E]);

  assert.equal(BbLydian.valueOf(), JSON.stringify(BbLydian), "valueOf works");
  assert.equal(BbLydian.toString(), JSON.stringify(BbLydian), "toString works");
});
