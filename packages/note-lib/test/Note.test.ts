import test from "node:test";
import assert from "node:assert/strict";

import { NotePitch } from "../src/enums/NotePitch";
import { Note } from "../src/Note";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
test("class Note", function (_t) {
  const Xs = new Note("X#", NotePitch.Sharp);
  const Yb = new Note("Yb", NotePitch.Flat);

  const naturalNote = new Note("FOO-BAR", NotePitch.Neither);
  const flatNote = new Note("FOO-BAR-FLAT", NotePitch.Flat, [Xs]);
  const sharpNote = new Note("FOO-BAR-SHARP", NotePitch.Sharp, [Yb]);

  const X = new Note("X", NotePitch.Neither);

  assert.equal(naturalNote.id, "FOO-BAR", "note id should match");

  assert.deepEqual(flatNote.aliasNotes, [Xs], "aliases should match");

  assert.deepEqual(
    naturalNote.toJSON(),
    {
      id: "FOO-BAR",
      pitch: NotePitch.Neither,
      aliasNotes: [],
    },
    "JSON should be correct -- natural note",
  );

  assert.deepEqual(
    flatNote.toJSON(),
    {
      id: "FOO-BAR-FLAT",
      aliasNotes: [{ id: "X#", pitch: NotePitch.Sharp }],
      pitch: NotePitch.Flat,
    },
    "JSON should be correct -- flat note",
  );

  assert.equal(naturalNote.valueOf(), JSON.stringify(naturalNote));
  assert.equal(naturalNote.toString(), JSON.stringify(naturalNote));
  assert.equal(flatNote.valueOf(), JSON.stringify(flatNote));
  assert.equal(flatNote.toString(), JSON.stringify(flatNote));

  assert.equal(flatNote.isSimilar(Xs), true, "detect similar notes");
  assert.equal(
    flatNote.isSimilar(flatNote),
    true,
    "detect similar (self) - flat",
  );
  assert.equal(
    naturalNote.isSimilar(naturalNote),
    true,
    "detect similar (self) - natural",
  );
  assert.equal(
    naturalNote.isSimilar(new Note("Z", NotePitch.Neither)),
    false,
    "dismiss non-similar notes",
  );

  assert.equal(flatNote.findSharp(), Xs, "find sharp note in aliases");
  assert.equal(Xs.findSharp(), Xs, "return self if sharp");
  assert.equal(Yb.findSharp(), null, "return null if no sharp exists");

  assert.equal(sharpNote.findFlat(), Yb, "find flat note in aliases");
  assert.equal(Yb.findFlat(), Yb, "return self if flat");
  assert.equal(Xs.findFlat(), null, "return null if no flat exists");

  assert.equal(
    flatNote.findSharpOrNatural(),
    Xs,
    "find sharp or natural note in aliases",
  );
  assert.equal(
    sharpNote.findFlatOrNatural(),
    Yb,
    "find flat or natural note in aliases",
  );
  assert.equal(
    X.findSharpOrNatural(),
    X,
    "return natural note if no flat exists",
  );
  assert.equal(
    X.findFlatOrNatural(),
    X,
    "return natural note if no flat exists",
  );

  assert.equal(
    flatNote.findByPitch(NotePitch.Sharp),
    Xs,
    "find by pitch, success",
  );

  assert.equal(
    Xs.findByPitch(NotePitch.Sharp),
    Xs,
    "find by pitch, success (self)",
  );
});
