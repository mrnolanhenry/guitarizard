import tap from "tap";
import { Note } from "../src/Note";
import { NotePitch } from "../src/enums/NotePitch";
import { NoteFretNumberPair } from "../src/NoteFretNumberPair";

tap.test("class NoteFretNumberPair", function (t) {
  const A = new Note("A", NotePitch.Neither);

  const noteFretNumberPair = new NoteFretNumberPair(A,1);

  t.equal(noteFretNumberPair.valueOf(), JSON.stringify(noteFretNumberPair));
  t.equal(noteFretNumberPair.toString(), JSON.stringify(noteFretNumberPair));

  t.end();
});
