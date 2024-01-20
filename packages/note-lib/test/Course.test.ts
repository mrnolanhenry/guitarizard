import test from "node:test";
import assert from "node:assert/strict";

import { TunedString } from "../src/TunedString";
import { Course } from "../src/Course";
import * as Constants from "../src/constants/Constants";
import { notes } from "../src/data/temperaments";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
test("class Course", function (_t) {
  const { A, Bb } = notes;

  const AString = new TunedString(Constants.A, A, "catgut", 0.2);
  const BFlatString = new TunedString(Constants.B_FLAT, Bb, "catgut", 0.4);

  const course = new Course("test-course", [AString, BFlatString]);

  assert.equal(course.valueOf(), JSON.stringify(course));
  assert.equal(course.toString(), JSON.stringify(course));
});
