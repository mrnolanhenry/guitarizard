import tap from "tap";
import { NotePitch } from "../src/enums/NotePitch";
import { Note } from "../src/Note";

void tap.test("class Note", function (t) {
  const Xs = new Note("X#", NotePitch.Sharp);
  const Yb = new Note("Yb", NotePitch.Flat);

  const naturalNote = new Note("FOO-BAR", NotePitch.Neither);
  const flatNote = new Note("FOO-BAR-FLAT", NotePitch.Flat, [Xs]);
  const sharpNote = new Note("FOO-BAR-SHARP", NotePitch.Sharp, [Yb]);

  const X = new Note("X", NotePitch.Neither);

  t.equal(naturalNote.id, "FOO-BAR", "note id should match");

  t.same(flatNote.aliasNotes, [Xs], "aliases should match");

  t.same(
    naturalNote.toJSON(),
    {
      id: "FOO-BAR",
      pitch: NotePitch.Neither,
      aliasNotes: [],
    },
    "JSON should be correct -- natural note",
  );

  t.same(
    flatNote.toJSON(),
    {
      id: "FOO-BAR-FLAT",
      aliasNotes: [{ id: "X#", pitch: NotePitch.Sharp }],
      pitch: NotePitch.Flat,
    },
    "JSON should be correct -- flat note",
  );

  t.equal(naturalNote.valueOf(), JSON.stringify(naturalNote));
  t.equal(naturalNote.toString(), JSON.stringify(naturalNote));
  t.equal(flatNote.valueOf(), JSON.stringify(flatNote));
  t.equal(flatNote.toString(), JSON.stringify(flatNote));

  t.equal(flatNote.isSimilar(Xs), true, "detect similar notes");
  t.equal(flatNote.isSimilar(flatNote), true, "detect similar (self) - flat");
  t.equal(
    naturalNote.isSimilar(naturalNote),
    true,
    "detect similar (self) - natural",
  );
  t.equal(
    naturalNote.isSimilar(new Note("Z", NotePitch.Neither)),
    false,
    "dismiss non-similar notes",
  );

  t.equal(flatNote.findSharp(), Xs, "find sharp note in aliases");
  t.equal(Xs.findSharp(), Xs, "return self if sharp");
  t.equal(Yb.findSharp(), null, "return null if no sharp exists");

  t.equal(sharpNote.findFlat(), Yb, "find flat note in aliases");
  t.equal(Yb.findFlat(), Yb, "return self if flat");
  t.equal(Xs.findFlat(), null, "return null if no flat exists");

  t.equal(
    flatNote.findSharpOrNatural(),
    Xs,
    "find sharp or natural note in aliases",
  );
  t.equal(
    sharpNote.findFlatOrNatural(),
    Yb,
    "find flat or natural note in aliases",
  );
  t.equal(X.findSharpOrNatural(), X, "return natural note if no flat exists");
  t.equal(X.findFlatOrNatural(), X, "return natural note if no flat exists");

  t.equal(flatNote.findByPitch(NotePitch.Sharp), Xs, "find by pitch, success");

  t.equal(Xs.findByPitch(NotePitch.Sharp), Xs, "find by pitch, success (self)");

  t.end();
});
