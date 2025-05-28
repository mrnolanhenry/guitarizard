import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { TunedString } from "../src/TunedString";
import { Course } from "../src/Course";
import * as Constants from "../src/constants/Constants";
import { twelveTETNotes } from "../src/data/temperaments";

describe("class Course", () => {
  const { A, Bb } = twelveTETNotes;

  const AString = new TunedString(Constants.A, A, "catgut", 0.2);
  const BFlatString = new TunedString(Constants.B_FLAT, Bb, "catgut", 0.4);

  const course = new Course("test-course", [AString, BFlatString]);

  it('toJSON, valueOf, toString', () => {
    assert.deepEqual(course.toJSON(), {
      id: "test-course",
      tunedStrings: [AString, BFlatString],
    });
    assert.equal(course.valueOf(), JSON.stringify(course));
    assert.equal(course.toString(), JSON.stringify(course));
  });
});
