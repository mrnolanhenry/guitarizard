import tap from "tap";
import { Note } from "../../Note";
import { ScaleSystem } from "../../ScaleSystem";
import { TunedString } from "../../instrument/TunedString";

tap.test("class TunedString", function (t) {
  const A = new Note("A", { isNatural: true });

  const As = new Note("A#", { isSharp: true });
  const Bb = new Note("Bb", { isFlat: true }, [As]);
  As.addAliasNote(Bb);

  const B = new Note("B", { isNatural: true });

  const smallDiatonic = new ScaleSystem("small", [A, As, B]);

  const AString = new TunedString("A", A, "catgut", 0.2);

  t.same(AString.getFrettedNotes(smallDiatonic, 0), [A], "single fret");
  t.same(AString.getFrettedNotes(smallDiatonic, 1), [A, Bb], "two frets");
  t.same(AString.getFrettedNotes(smallDiatonic, 2), [A, Bb, B], "three frets");
  t.same(
    AString.getFrettedNotes(smallDiatonic, 3),
    [A, Bb, B, A],
    "looping scale system"
  );

  const BFlatString = new TunedString("Bb", Bb, "catgut", 0.4);

  t.same(
    BFlatString.getFrettedNotes(smallDiatonic, 0),
    [Bb],
    "offset single fret"
  );

  t.equal(AString.valueOf(), JSON.stringify(AString));
  t.equal(AString.toString(), JSON.stringify(AString));

  t.test("setTuningNote", (t) => {
    const testString = new TunedString("x", new Note("x"), "catgut", 0.2);

    t.equal(testString.tuningNote.id, "x");

    testString.setTuningNote(new Note("y"));

    t.equal(testString.tuningNote.id, "y");

    t.end();
  });

  t.end();
});
