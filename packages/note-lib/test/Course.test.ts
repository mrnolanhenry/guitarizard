import tap from "tap";
import { Note } from "../src/Note";
import { TunedString } from "../src/TunedString";
import { NotePitch } from "../src/enums/NotePitch";
import { Course } from "../src/Course";

tap.test("class Course", function (t) {
  const A = new Note("A", NotePitch.Neither);
  const As = new Note("A#", NotePitch.Sharp);
  const Bb = new Note("Bb", NotePitch.Flat, [As]);
  As.addAliasNote(Bb);

  const AString = new TunedString("A", A, "catgut", 0.2);
  const BFlatString = new TunedString("Bb", Bb, "catgut", 0.4);

  const course = new Course("test-course", [AString, BFlatString]);

  t.equal(course.valueOf(), JSON.stringify(course));
  t.equal(course.toString(), JSON.stringify(course));

  t.end();
});
