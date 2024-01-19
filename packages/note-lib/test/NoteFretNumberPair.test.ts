import tap from "tap";
import { NoteFretNumberPair } from "../src/NoteFretNumberPair";
import { notes } from "../src/data/temperaments";

void tap.test("class NoteFretNumberPair", function (t) {
	const { A } = notes;
	const noteFretNumberPair = new NoteFretNumberPair(A, 1);

	t.equal(noteFretNumberPair.valueOf(), JSON.stringify(noteFretNumberPair));
	t.equal(noteFretNumberPair.toString(), JSON.stringify(noteFretNumberPair));

	t.end();
});
