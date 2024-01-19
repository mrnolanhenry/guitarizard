import tap from "tap";
import { TunedString } from "../src/TunedString";
import { Course } from "../src/Course";
import * as Constants from "../src/constants/Constants";
import { notes } from "../src/data/temperaments";

void tap.test("class Course", function (t) {
  const { A, Bb } = notes;

  const AString = new TunedString(Constants.A, A, "catgut", 0.2);
  const BFlatString = new TunedString(Constants.B_FLAT, Bb, "catgut", 0.4);

  const course = new Course("test-course", [AString, BFlatString]);

  t.equal(course.valueOf(), JSON.stringify(course));
  t.equal(course.toString(), JSON.stringify(course));

  t.end();
});
