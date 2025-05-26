import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { NotePitch } from "../src/enums/NotePitch";
import { Note } from "../src/Note";

describe("class Note", () => {
  const Xs = new Note("X#", NotePitch.Sharp);
  const Yb = new Note("Yb", NotePitch.Flat);

  const naturalNote = new Note("FOO-BAR", NotePitch.Natural);
  const flatNote = new Note("FOO-BAR-FLAT", NotePitch.Flat, [Xs]);
  const sharpNote = new Note("FOO-BAR-SHARP", NotePitch.Sharp, [Yb]);

  const X = new Note("X", NotePitch.Natural);

  it('toJSON, valueOf, toString', () => {
    assert.deepEqual(
      naturalNote.toJSON(),
      {
        id: "FOO-BAR",
        pitch: NotePitch.Natural,
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
  });

  it('isIdentical', () => {
    assert.equal(
      flatNote.isIdentical(new Note("FOO-BAR-FLAT", NotePitch.Flat, [Xs])),
      true
    );
    assert.equal(
      naturalNote.isEquivalent(new Note("Z", NotePitch.Natural)),
      false,
      "dismiss non-equivalent notes",
    );
    assert.equal(flatNote.isIdentical(Xs), false);
  });

  it('isEquivalent', () => {
    assert.equal(flatNote.isEquivalent(Xs), true, "detect equivalent notes");
    assert.equal(
      flatNote.isEquivalent(flatNote),
      true,
      "detect equivalent (self) - flat",
    );
    assert.equal(
      naturalNote.isEquivalent(naturalNote),
      true,
      "detect equivalent (self) - natural",
    );
    assert.equal(
      naturalNote.isEquivalent(new Note("Z", NotePitch.Natural)),
      false,
      "dismiss non-equivalent notes",
    );
  });

  it('findSharp', () => {
    assert.equal(flatNote.findSharp(), Xs, "find sharp note in aliases");
    assert.equal(Xs.findSharp(), Xs, "return self if sharp");
    assert.equal(Yb.findSharp(), null, "return null if no sharp exists");
  });

  it('findFlat', () => {
    assert.equal(sharpNote.findFlat(), Yb, "find flat note in aliases");
    assert.equal(Yb.findFlat(), Yb, "return self if flat");
    assert.equal(Xs.findFlat(), null, "return null if no flat exists");
  
  });

  it('findSharpOrNatural', () => {
    assert.equal(
      flatNote.findSharpOrNatural(),
      Xs,
      "find sharp or natural note in aliases",
    );
    assert.equal(
      X.findSharpOrNatural(),
      X,
      "return natural note if no flat exists",
    );
  });

  it('findFlatOrNatural', () => {
    assert.equal(
      sharpNote.findFlatOrNatural(),
      Yb,
      "find flat or natural note in aliases",
    );
    assert.equal(
      X.findFlatOrNatural(),
      X,
      "return natural note if no flat exists",
    );
  });

  it('findByPitch', () => {
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
});
