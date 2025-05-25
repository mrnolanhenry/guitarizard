import { describe, it } from "node:test";
import assert from "node:assert";
import { twelveTET } from "../src/data/temperaments/twelveTET";
import { twelveTETIntervals, twelveTETNotes } from "../src/data/temperaments";
import { Chord, ChordType, Constants, Interval } from "../src";

describe("class Chord", () => {
  const { Ab, A, As, Bb, B, C, Cs, D, Ds, Eb, E, F, Fs, Gb, G } = twelveTETNotes;

  const {   
    twelveTETP1,
    twelveTETm2,
    twelveTETM2,
    twelveTETm3,
    twelveTETM3,
    twelveTETP4,
    twelveTETd5,
    twelveTETP5,
    twelveTETm6,
    twelveTETM6,
    twelveTETd7,
    twelveTETm7,
    twelveTETM7,
    twelveTETP8,  
  } = twelveTETIntervals;

  const twelveTETP5Priority2 = {...twelveTETP5, priority: 2} as Interval;

  const majorChordType = new ChordType("maj", twelveTET, [twelveTETP1, twelveTETM3, twelveTETP5], [Constants.MAJOR.toLocaleLowerCase()]);
  const minorChordType = new ChordType("m", twelveTET, [twelveTETP1, twelveTETm3, twelveTETP5], [Constants.MINOR.toLocaleLowerCase()]);
  const major6ChordType= new ChordType("6", twelveTET, [twelveTETP1, twelveTETM3, twelveTETP5Priority2, twelveTETM6], ["major 6th"]);
  const minor6ChordType = new ChordType("m6", twelveTET, [twelveTETP1, twelveTETm3, twelveTETP5Priority2, twelveTETM6], ["minor 6th"]);
  const _7b5ChordType = new ChordType("7b5", twelveTET, [twelveTETP1, twelveTETM3, twelveTETd5, twelveTETm7],["dominant 7th, flat 5th"]);
  const m7b5ChordType = new ChordType("m7b5", twelveTET, [twelveTETP1, twelveTETm3, twelveTETd5, twelveTETm7], ["minor 7th, flat 5th"]);
  const dim7ChordType = new ChordType("dim7", twelveTET, [twelveTETP1, twelveTETm3, twelveTETd5, twelveTETd7], ["diminished 7th"]);
  const halfDim7ChordType = new ChordType("ø7", twelveTET, [twelveTETP1, twelveTETm3, twelveTETd5, twelveTETm7], ["half diminished 7th"]);

  const DsMajorChord = new Chord(Ds,majorChordType);
  const DsMinorChord = new Chord(Ds, minorChordType);
  const DsMajor6Chord = new Chord(Ds,major6ChordType);
  const Dsm7b5Chord = new Chord(Ds, m7b5ChordType);
  const Dsdim7Chord = new Chord(Ds, dim7ChordType);
  const DshalfDim7Chord = new Chord(Ds, halfDim7ChordType);

  const EbMajorChord = new Chord(Eb,majorChordType);
  const EbMinorChord = new Chord(Eb, minorChordType);
  const EbMajor6Chord = new Chord(Eb,major6ChordType);
  const Eb7b5Chord = new Chord(Eb, _7b5ChordType);
  const Ebm7b5Chord = new Chord(Eb, m7b5ChordType);
  const Ebdim7Chord = new Chord(Eb, dim7ChordType);
  const EbhalfDim7Chord = new Chord(Eb, halfDim7ChordType);

  const Em7b5Chord = new Chord(E, m7b5ChordType);

  const FsMinor6Chord = new Chord(Fs, minor6ChordType);
  const GbMinor6Chord = new Chord(Gb, minor6ChordType);

  const DsMajorEquivChords: Chord[] = DsMajorChord.getEquivChords();
  const DsMinorEquivChords: Chord[] = DsMinorChord.getEquivChords();
  const DsMajor6EquivChords: Chord[] = DsMajor6Chord.getEquivChords();
  const Dsm7b5EquivChords: Chord[] = Dsm7b5Chord.getEquivChords();

  const EbMajorEquivChords: Chord[] = EbMajorChord.getEquivChords();
  const EbMinorEquivChords: Chord[] = EbMinorChord.getEquivChords();
  const EbMajor6EquivChords: Chord[] = EbMajor6Chord.getEquivChords();
  const Eb7b5EquivChords: Chord[] = Eb7b5Chord.getEquivChords();
  const Ebm7b5EquivChords: Chord[] = Ebm7b5Chord.getEquivChords();

  const GbMinor6EquivChords: Chord[] = GbMinor6Chord.getEquivChords();


  it('toJSON, valueOf, toString', () => {
    assert.deepEqual(EbMinorChord.toJSON(), {
      name: `${Constants.E_FLAT} m`,
      root: Eb,
      chordType: minorChordType,
      notesInChord: [Eb, Gb, Bb]
    },"toJSON works and notes in Chord are flat if root is flat");
    assert.deepEqual(DsMinorChord.toJSON(), {
      name: `${Constants.D_SHARP} m`,
      root: Ds,
      chordType: minorChordType,
      notesInChord: [Ds, Fs, As]
    }, "toJSON works and notes in Chord are sharp if root is sharp");
    assert.deepEqual(Em7b5Chord.toJSON(), {
      name: `${Constants.E} m7b5`,
      root: E,
      chordType: m7b5ChordType,
      notesInChord: [E, G, Bb, D]
    }, "toJSON works and notes in Chord are flat if root is natural");
    assert.equal(EbMinorChord.valueOf(), JSON.stringify(EbMinorChord), "valueOf works");
    assert.equal(EbMinorChord.toString(), JSON.stringify(EbMinorChord), "toString works");
  });

  it('getEquivChords', () => {
    assert.deepEqual(
      Ebm7b5EquivChords,
      [
        DshalfDim7Chord, 
        Dsm7b5Chord, 
        EbhalfDim7Chord, 
        Ebm7b5Chord, 
        FsMinor6Chord,
        GbMinor6Chord
      ],
      "equivalent chords identified given flat note",
    );
    assert.deepEqual(
      Dsm7b5EquivChords,
      [
        DshalfDim7Chord, 
        Dsm7b5Chord, 
        EbhalfDim7Chord, 
        Ebm7b5Chord, 
        FsMinor6Chord,
        GbMinor6Chord
      ],
      "equivalent chords identified given sharp note",
    );
  });
});
