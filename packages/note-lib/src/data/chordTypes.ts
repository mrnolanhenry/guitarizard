import * as Constants from "../constants/Constants";
import { ChordType } from "../ChordType";
import { twelveTET } from "./temperaments/twelveTET";

// NOLAN TODO - Re-write ChordTypes to have intervals property be an Interval[] vs. number[]
// or even an "IntervalInChord[]" that extends/implements Interval, but adds field like "priority/importance to chord"
// this way many more chords can be represented on instruments with less strings
// e.g. the maj13#11 chord cannot be played on a six-string guitar, but it could be approximated using most of the notes.
// If this is done, Scales should also similarly be refactored to have Interval[] vs. number[]
const chordTypes = [
  new ChordType("maj", twelveTET, [0, 4, 7], [Constants.MAJOR, "M"]),
  new ChordType("m", twelveTET, [0, 3, 7], [Constants.MINOR, "min"]),
  new ChordType("5", twelveTET, [0, 7], ["5th", "power chord"]),
  new ChordType("6", twelveTET, [0, 4, 7, 9], ),
  new ChordType("7", twelveTET, [0, 4, 7, 10], ["dominant 7th"]),
  new ChordType("maj7", twelveTET, [0, 4, 7, 11], ["major 7th", "M7"]),
  new ChordType("9", twelveTET, [0, 2, 4, 7, 10], ),
  new ChordType("maj9", twelveTET, [0, 2, 4, 7, 11], ["major 9th", "M9", "maj7(9)"]),
  new ChordType("11", twelveTET, [0, 2, 4, 5, 7, 10], ),
  new ChordType("maj11", twelveTET, [0, 2, 4, 5, 7, 11], ["major 11th", "M11"]),
  new ChordType("13", twelveTET, [0, 2, 4, 7, 9, 10], ),
  new ChordType("maj13", twelveTET, [0, 2, 4, 7, 9, 11], ["major 13th", "M13", "maj7(9,13)", "maj7(6/9)", "maj7(6add9)"]),
  new ChordType("m6", twelveTET, [0, 3, 7, 9], ),
  new ChordType("m7", twelveTET, [0, 3, 7, 10], ["minor 7th", "min7"]),
  new ChordType("m9", twelveTET, [0, 2, 3, 7, 10], ),
  new ChordType("m11", twelveTET, [0, 2, 3, 5, 7, 10], ),
  new ChordType("m13", twelveTET, [0, 2, 3, 5, 7, 9, 10], ),
  new ChordType("m(maj7)", twelveTET, [0, 3, 7, 11], ["m (maj7)", "mmaj7", "m maj7"]),
  new ChordType("sus2", twelveTET, [0, 2, 7], ["suspended 2nd"]),
  new ChordType("sus4", twelveTET, [0, 5, 7], ["suspended 4th"]),
  new ChordType("dim", twelveTET, [0, 3, 6], ["diminished"]),
  new ChordType("aug", twelveTET, [0, 4, 8], ["augmented"]),
  new ChordType("6add9", twelveTET, [0, 2, 4, 7, 9], ["6/9"]),
  new ChordType("7sus4", twelveTET, [0, 5, 7, 10], ["dominant 7th suspended 4th"]),
  new ChordType("7b5", twelveTET, [0, 4, 6, 10], ),
  new ChordType("7b9", twelveTET, [0, 1, 4, 7, 10], ),
  new ChordType("9sus4", twelveTET, [0, 2, 5, 10], ),
  new ChordType("add9", twelveTET, [0, 2, 4, 7], ),
  new ChordType("aug9", twelveTET, [0, 2, 4, 8, 10], ),
  new ChordType("dim7", twelveTET, [0, 3, 6, 9], ["diminished 7th", "7dim"]),
  new ChordType("maj9#11", twelveTET, [0, 2, 4, 6, 7, 11], ["major 9th, sharp 11th", "maj9(#11)", "maj7(9,#11)"]),
  new ChordType("maj13#11", twelveTET, [0, 2, 4, 6, 7, 9, 11], ["major 13th, sharp 11th", "maj13(#11)", "maj7(13,#11)", "maj9(#11,13)"]),
  new ChordType("maj7b5", twelveTET, [0, 4, 6, 11], ),
  new ChordType("maj7#5", twelveTET, [0, 4, 8, 11], ),
  new ChordType("m(add9)", twelveTET, [0, 2, 3, 7],["minor, added 9th"] ),
  new ChordType("m6add9", twelveTET, [0, 2, 3, 7, 9], ),
  new ChordType("m(maj9)", twelveTET, [0, 2, 3, 7, 11], ),
  new ChordType("m7b5", twelveTET, [0, 3, 6, 10], ),
  new ChordType("m7#5", twelveTET, [0, 3, 8, 10], ),
  new ChordType("7#5", twelveTET, [0, 4, 8, 10], ),
  new ChordType("7#9", twelveTET, [0, 3, 4, 7, 10], ),
  new ChordType("7(b5,b9)", twelveTET, [0, 1, 4, 6, 10], ["dominant 7th, flat 5th, flat 9th", "7(b5,b9)","7(-5,-9)"] ),
  new ChordType("7(b5,#9)", twelveTET, [0, 3, 4, 6, 10], ["dominant 7th, flat 5th, sharp 9th", "7(b5,#9)","7(-5,+9)"] ),
  new ChordType("7(#5,b9)", twelveTET, [0, 1, 4, 8, 10], ["dominant 7th, sharp 5th, flat 9th", "7(#5,b9)","7(+5,-9), +7b9"]),
  new ChordType("7(#5,#9)", twelveTET, [0, 3, 4, 8, 10], ["dominant 7th, sharp 5th, sharp 9th", "7(#5,#9)","7(+5,+9), +7#9"]),
  new ChordType("9b5", twelveTET, [0, 2, 4, 6, 10], ["dominant 9th, flat 5th", "7(b5,9)", "9-5"]),
  new ChordType("9#5", twelveTET, [0, 2, 4, 8, 10], ["dominant 9th, sharp 5th", "7(#5,9)", "9+5"]),
  new ChordType("13#11", twelveTET, [0, 2, 4, 6, 7, 9, 10], ["dominant 13th, added sharp 11th", "13+11", "7(9,#11,13)"]),
  new ChordType("13b9", twelveTET, [0, 1, 4, 7, 9, 10], ["dominant 13th, flat 9th", "13-9", "7(b9,13)"]),
  new ChordType("11b9", twelveTET, [0, 1, 5, 7, 10], ["dominant 11th, flat 9th", "7sus4(b9)"]),
  new ChordType("sus2sus4", twelveTET, [0, 2, 5, 7], ["suspended 2nd, suspended 4th"]),
  new ChordType("-5", twelveTET, [0, 4, 6], ["major diminished 5th"]),
  new ChordType("", twelveTET, [], ),
  new ChordType("", twelveTET, [], ),
  new ChordType("", twelveTET, [], ),



  

  new ChordType("", twelveTET, [], ),
];

export default chordTypes;
