import tap from "tap";
import { Note } from "../src/Note";
import { NotePitch } from "../src/enums/NotePitch";
import { Tuning } from "../src/Tuning";

tap.test("class Tuning", function (t) {
  const A = new Note("A", NotePitch.Neither);
  const B = new Note("B", NotePitch.Neither);
  const D = new Note("D", NotePitch.Neither);
  const E = new Note("E", NotePitch.Neither);
  const G = new Note("G", NotePitch.Neither);

  const standardGuitarTuning = new Tuning("guitar", "standard", [E, A, D, G, B, E]);

  t.equal(standardGuitarTuning.valueOf(), JSON.stringify(standardGuitarTuning));
  t.equal(standardGuitarTuning.toString(), JSON.stringify(standardGuitarTuning));

  t.end();
});
