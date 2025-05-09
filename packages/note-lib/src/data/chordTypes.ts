import * as Constants from "../constants/Constants";
import { ChordType } from "../ChordType";
import { twelveTET } from "./temperaments/twelveTET";
import { IntervalInChord } from "../IntervalInChord";
import { Temperament } from "../Temperament";

const getIntervalsInChord = (temperament: Temperament, priority?: number): IntervalInChord[] => {
  return temperament.intervals.map((interval) => { return IntervalInChord.fromInterval(interval, priority)});
}

const intervals = getIntervalsInChord(twelveTET);
const intervalsPriority2 = getIntervalsInChord(twelveTET, 2);
const intervalsPriority3 = getIntervalsInChord(twelveTET, 3);

const chordTypes = [
  new ChordType("maj", twelveTET, [intervals[0], intervals[4], intervals[7]], [Constants.MAJOR, "M"]),
  new ChordType("m", twelveTET, [intervals[0], intervals[3], intervals[7]], [Constants.MINOR, "min"]),
  new ChordType("5", twelveTET, [intervals[0], intervals[7]], ["5th", "power chord"]),
  new ChordType("6", twelveTET, [intervals[0], intervals[4], intervalsPriority2[7], intervals[9]], ["major 6th", "M6"]),
  new ChordType("7", twelveTET, [intervals[0], intervals[4], intervalsPriority2[7], intervals[10]], ["dominant 7th"]),
  new ChordType("maj7", twelveTET, [intervals[0], intervals[4], intervalsPriority2[7], intervals[11]], ["major 7th", "M7"]),
  new ChordType("9", twelveTET, [intervals[0], intervals[2], intervals[4], intervalsPriority2[7], intervals[10]],["dominant 9th", "dominant 7th, added 9th"]),
  new ChordType("maj9", twelveTET, [intervals[0], intervals[2], intervals[4], intervalsPriority2[7], intervals[11]], ["major 9th", "M9", "major 7th, added 9th", "maj7(9)"]),
  new ChordType("11", twelveTET, [intervals[0], intervals[2], intervals[4], intervals[5], intervals[7], intervals[10]]),
  new ChordType("maj11", twelveTET, [intervals[0], intervals[2], intervals[4], intervals[5], intervals[7], intervals[11]], ["major 11th", "M11"]),
  new ChordType("13", twelveTET, [intervals[0], intervalsPriority2[2], intervals[4], intervalsPriority3[5], intervalsPriority2[7], intervals[9], intervals[10]], ["dominant 13th"]),
  new ChordType("maj13", twelveTET, [intervals[0], intervalsPriority2[2], intervals[4], intervalsPriority3[5], intervalsPriority2[7], intervals[9], intervals[11]], ["major 13th", "M13", "maj7(9,13)", "maj7(6/9)", "maj7(6add9)"]),
  new ChordType("m6", twelveTET, [intervals[0], intervals[3], intervalsPriority2[7], intervals[9]]),
  new ChordType("m7", twelveTET, [intervals[0], intervals[3], intervalsPriority2[7], intervals[10]], ["minor 7th", "min7"]),
  new ChordType("m9", twelveTET, [intervals[0], intervals[2], intervals[3], intervalsPriority2[7], intervals[10]], ["minor 9th", "minor 7th added 9th"]),
  new ChordType("m11", twelveTET, [intervals[0], intervalsPriority2[2], intervals[3], intervals[5], intervalsPriority2[7], intervals[10]]),
  new ChordType("m13", twelveTET, [intervals[0], intervalsPriority2[2], intervals[3], intervalsPriority3[5], intervalsPriority2[7], intervals[9], intervals[10]]),
  new ChordType("m(maj7)", twelveTET, [intervals[0], intervals[3], intervalsPriority2[7], intervals[11]], ["m (maj7)", "mmaj7", "m maj7"]),
  new ChordType("sus2", twelveTET, [intervals[0], intervals[2], intervals[7]], ["suspended 2nd"]),
  new ChordType("sus4", twelveTET, [intervals[0], intervals[5], intervals[7]], ["suspended 4th"]),
  new ChordType("dim", twelveTET, [intervals[0], intervals[3], intervals[6]], ["diminished"]),
  new ChordType("aug", twelveTET, [intervals[0], intervals[4], intervals[8]], ["augmented"]),
  new ChordType("6add9", twelveTET, [intervals[0], intervals[2], intervals[4], intervalsPriority2[7], intervals[9]], ["6/9"]),
  new ChordType("7sus4", twelveTET, [intervals[0], intervals[5], intervalsPriority2[7], intervals[10]], ["dominant 7th, suspended 4th"]),
  new ChordType("7b5", twelveTET, [intervals[0], intervals[4], intervals[6], intervals[10]]),
  new ChordType("7b9", twelveTET, [intervals[0], intervals[1], intervals[4], intervals[7], intervals[10]]),
  new ChordType("9sus4", twelveTET, [intervals[0], intervals[2], intervals[5], intervalsPriority3[7], intervalsPriority2[10]], ["9th suspended 4th"]),
  new ChordType("add9", twelveTET, [intervals[0], intervals[2], intervals[4], intervals[7]]),
  new ChordType("aug9", twelveTET, [intervals[0], intervals[2], intervals[4], intervals[8], intervals[10]]),
  new ChordType("dim7", twelveTET, [intervals[0], intervals[3], intervals[6], intervals[9]], ["diminished 7th", "°7"]),
  new ChordType("maj9#11", twelveTET, [intervals[0], intervals[2], intervals[4], intervals[6], intervals[7], intervals[11]], ["major 9th, sharp 11th", "maj9(#11)", "maj7(9,#11)"]),
  new ChordType("maj13#11", twelveTET, [intervals[0], intervals[2], intervals[4], intervals[6], intervals[7], intervals[9], intervals[11]], ["major 13th, sharp 11th", "maj13(#11)", "maj7(13,#11)", "maj9(#11,13)"]),
  new ChordType("maj7b5", twelveTET, [intervals[0], intervals[4], intervals[6], intervals[11]]),
  new ChordType("maj7#5", twelveTET, [intervals[0], intervals[4], intervals[8], intervals[11]]),
  new ChordType("m(add9)", twelveTET, [intervals[0], intervals[2], intervals[3], intervals[7]], ["minor, added 9th"]),
  new ChordType("m6add9", twelveTET, [intervals[0], intervals[2], intervals[3], intervals[7], intervals[9]]),
  new ChordType("m(maj9)", twelveTET, [intervals[0], intervals[2], intervals[3], intervals[7], intervals[11]]),
  new ChordType("m7b5", twelveTET, [intervals[0], intervals[3], intervals[6], intervals[10]], ["half diminished 7th", "ø7"]),
  new ChordType("m7#5", twelveTET, [intervals[0], intervals[3], intervals[8], intervals[10]]),
  new ChordType("7#5", twelveTET, [intervals[0], intervals[4], intervals[8], intervals[10]], ["augmented 7th", "aug7"]),
  new ChordType("7#9", twelveTET, [intervals[0], intervals[3], intervals[4], intervals[7], intervals[10]]),
  new ChordType("7(b5,b9)", twelveTET, [intervals[0], intervals[1], intervals[4], intervals[6], intervals[10]], ["dominant 7th, flat 5th, flat 9th", "7(b5,b9)", "7(-5,-9)"]),
  new ChordType("7(b5,#9)", twelveTET, [intervals[0], intervals[3], intervals[4], intervals[6], intervals[10]], ["dominant 7th, flat 5th, sharp 9th", "7(b5,#9)", "7(-5,+9)"]),
  new ChordType("7(#5,b9)", twelveTET, [intervals[0], intervals[1], intervals[4], intervals[8], intervals[10]], ["dominant 7th, sharp 5th, flat 9th", "7(#5,b9)", "7(+5,-9), +7b9"]),
  new ChordType("7(#5,#9)", twelveTET, [intervals[0], intervals[3], intervals[4], intervals[8], intervals[10]], ["dominant 7th, sharp 5th, sharp 9th", "7(#5,#9)", "7(+5,+9), +7#9"]),
  new ChordType("9b5", twelveTET, [intervals[0], intervals[2], intervals[4], intervals[6], intervals[10]], ["dominant 9th, flat 5th", "7(b5,9)", "9-5"]),
  new ChordType("9#5", twelveTET, [intervals[0], intervals[2], intervals[4], intervals[8], intervals[10]], ["dominant 9th, sharp 5th", "7(#5,9)", "9+5", "augmented dominant 9th", "augmented dominant 7th, added 9th"]),
  new ChordType("13#11", twelveTET, [intervals[0], intervals[2], intervals[4], intervals[6], intervals[7], intervals[9], intervals[10]], ["dominant 13th, added sharp 11th", "13+11", "7(9,#11,13)"]),
  new ChordType("13b9", twelveTET, [intervals[0], intervals[1], intervals[4], intervals[7], intervals[9], intervals[10]], ["dominant 13th, flat 9th", "13-9", "7(b9,13)"]),
  new ChordType("11b9", twelveTET, [intervals[0], intervals[1], intervals[5], intervals[7], intervals[10]], ["dominant 11th, flat 9th", "7sus4(b9)"]),
  new ChordType("sus2sus4", twelveTET, [intervals[0], intervals[2], intervals[5], intervals[7]], ["suspended 2nd, suspended 4th"]),
  new ChordType("-5", twelveTET, [intervals[0], intervals[4], intervals[6]], ["major diminished 5th"]),
  new ChordType("7sus2", twelveTET, [intervals[0], intervals[2], intervalsPriority2[7], intervals[10]], ["dominant 7th, suspended 2nd"]),
  new ChordType("m7add11", twelveTET, [intervals[0], intervals[3], intervals[5], intervalsPriority2[7], intervals[10]], ["minor 7th, added 11th"]),
  new ChordType("7add13", twelveTET, [intervals[0], intervals[4], intervalsPriority2[7], intervals[9], intervals[10]], ["dominant 7th, added 13th", "7add6", "dominant 7th, added 6th"]),
  new ChordType("", twelveTET, [], []),



  

  new ChordType("", twelveTET, [], ),
];

export default chordTypes;
