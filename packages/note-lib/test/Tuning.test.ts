import tap from "tap";
import { Tuning } from "../src/Tuning";
import { notes } from "../src/data/temperaments";

void tap.test("class Tuning", function (t) {
	const { A, B, D, G, E } = notes;

	const standardGuitarTuning = new Tuning("guitar", "standard", [E, A, D, G, B, E]);

	t.equal(standardGuitarTuning.valueOf(), JSON.stringify(standardGuitarTuning));
	t.equal(standardGuitarTuning.toString(), JSON.stringify(standardGuitarTuning));

	t.end();
});
