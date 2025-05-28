import { describe, it } from "node:test";
import assert from "node:assert";
import { twelveTET } from "../src/data/temperaments/twelveTET";
import { twelveTETIntervals, twelveTETNotes } from "../src/data/temperaments";
import { Chord, ChordType, Constants, Interval } from "../src";

describe("class Chord", () => {
  const { Ab, A, As, Bb, B, C, Cs, Db, D, Ds, Eb, E, F, Fs, Gb, G, Gs } = twelveTETNotes;

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
    twelveTETM9,
    twelveTETP11,
    twelveTETA11,
    twelveTETM13,
  } = twelveTETIntervals;

  const twelveTETP5Priority2 = new Interval(twelveTETP5.semitones, twelveTETP5.quality, twelveTETP5.scaleDegree, twelveTETP5.aliases, 2);
  const twelveTETm7Priority2 = new Interval(twelveTETm7.semitones, twelveTETm7.quality, twelveTETm7.scaleDegree, twelveTETm7.aliases, 2);
  const twelveTETM9Priority2 = new Interval(twelveTETM9.semitones, twelveTETM9.quality, twelveTETM9.scaleDegree, twelveTETM9.aliases, 2);
  const twelveTETP11Priority2 = new Interval(twelveTETP11.semitones, twelveTETP11.quality, twelveTETP11.scaleDegree, twelveTETP11.aliases, 2);
  
  const twelveTETP5Priority3 = new Interval(twelveTETP5.semitones, twelveTETP5.quality, twelveTETP5.scaleDegree, twelveTETP5.aliases, 3);
  const twelveTETP11Priority3 = new Interval(twelveTETP11.semitones, twelveTETP11.quality, twelveTETP11.scaleDegree, twelveTETP11.aliases, 3);

  const majorChordType = new ChordType("maj", twelveTET, [twelveTETP1, twelveTETM3, twelveTETP5], [Constants.MAJOR.toLocaleLowerCase()]);
  const minorChordType = new ChordType("m", twelveTET, [twelveTETP1, twelveTETm3, twelveTETP5], [Constants.MINOR.toLocaleLowerCase()]);
  const major6ChordType= new ChordType("6", twelveTET, [twelveTETP1, twelveTETM3, twelveTETP5Priority2, twelveTETM6], ["major 6th"]);
  const minor6ChordType = new ChordType("m6", twelveTET, [twelveTETP1, twelveTETm3, twelveTETP5Priority2, twelveTETM6], ["minor 6th"]);
  const _7b5ChordType = new ChordType("7b5", twelveTET, [twelveTETP1, twelveTETM3, twelveTETd5, twelveTETm7],["dominant 7th, flat 5th"]);
  const halfDim7ChordType = new ChordType("ø7", twelveTET, [twelveTETP1, twelveTETm3, twelveTETd5, twelveTETm7], ["half diminished 7th"]);
  const m7b5ChordType = new ChordType("m7b5", twelveTET, [twelveTETP1, twelveTETm3, twelveTETd5, twelveTETm7], ["minor 7th, flat 5th"]);
  const dim7ChordType = new ChordType("dim7", twelveTET, [twelveTETP1, twelveTETm3, twelveTETd5, twelveTETd7], ["diminished 7th"]);
  const _13ChordType = new ChordType("13", twelveTET, [twelveTETP1, twelveTETM3, twelveTETP5Priority2, twelveTETm7, twelveTETM9Priority2, twelveTETP11Priority3, twelveTETM13], ["dominant 13th"]);
  const minor13ChordType = new ChordType("m13", twelveTET, [twelveTETP1, twelveTETm3, twelveTETP5Priority2, twelveTETm7, twelveTETM9Priority2, twelveTETP11Priority3, twelveTETM13], ["minor 13th"]);
  const major13ChordType = new ChordType("maj13", twelveTET, [twelveTETP1, twelveTETM3, twelveTETP5Priority2, twelveTETM7, twelveTETM9Priority2, twelveTETP11Priority3, twelveTETM13], ["major 13th"]);
  const major13s11ChordType =   new ChordType("maj13#11", twelveTET, [twelveTETP1, twelveTETM3, twelveTETP5, twelveTETM7, twelveTETM9, twelveTETA11, twelveTETM13], ["major 13th, sharp 11th"]);

  const AsMinor13Chord = new Chord(As, minor13ChordType);
  const BbMinor13Chord = new Chord(Bb, minor13ChordType);

  const CsMajor13s11Chord = new Chord(Cs, major13s11ChordType);
  const DbMajor13s11Chord = new Chord(Db, major13s11ChordType);

  const GsMajor13Chord = new Chord(Gs, major13ChordType);
  const AbMajor13Chord = new Chord(Ab, major13ChordType);

  const DsMajorChord = new Chord(Ds,majorChordType);
  const DsMinorChord = new Chord(Ds, minorChordType);
  const DsMajor6Chord = new Chord(Ds,major6ChordType);
  const DshalfDim7Chord = new Chord(Ds, halfDim7ChordType);
  const Dsm7b5Chord = new Chord(Ds, m7b5ChordType);
  const Dsdim7Chord = new Chord(Ds, dim7ChordType);
  const Ds13Chord = new Chord(Ds, _13ChordType);

  const EbMajorChord = new Chord(Eb,majorChordType);
  const EbMinorChord = new Chord(Eb, minorChordType);
  const EbMajor6Chord = new Chord(Eb,major6ChordType);
  const Eb7b5Chord = new Chord(Eb, _7b5ChordType);
  const EbhalfDim7Chord = new Chord(Eb, halfDim7ChordType);
  const Ebm7b5Chord = new Chord(Eb, m7b5ChordType);
  const Ebdim7Chord = new Chord(Eb, dim7ChordType);
  const Eb13Chord = new Chord(Eb, _13ChordType);

  const Em7b5Chord = new Chord(E, m7b5ChordType);

  const FsMinor6Chord = new Chord(Fs, minor6ChordType);
  const GbMinor6Chord = new Chord(Gb, minor6ChordType);

  const Dsm7b5EquivChords: Chord[] = Dsm7b5Chord.getEquivChords();

  const Ebm7b5EquivChords: Chord[] = Ebm7b5Chord.getEquivChords();
  const Eb13EquivChords: Chord[] = Eb13Chord.getEquivChords();

  it('toJSON, valueOf, toString', () => {
    assert.deepEqual(EbMinorChord.toJSON(), {
      name: `${Constants.E_FLAT} m`,
      root: Eb,
      chordType: minorChordType,
      notes: [Eb, Gb, Bb]
    },"toJSON works and notes in Chord are flat if root is flat");
    assert.deepEqual(DsMinorChord.toJSON(), {
      name: `${Constants.D_SHARP} m`,
      root: Ds,
      chordType: minorChordType,
      notes: [Ds, Fs, As]
    }, "toJSON works and notes in Chord are sharp if root is sharp");
    assert.deepEqual(Em7b5Chord.toJSON(), {
      name: `${Constants.E} m7b5`,
      root: E,
      chordType: m7b5ChordType,
      notes: [E, G, Bb, D]
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
    assert.deepEqual(
      Eb13EquivChords,
      [
        AsMinor13Chord,
        BbMinor13Chord,
        CsMajor13s11Chord,
        DbMajor13s11Chord,
        Ds13Chord,
        Eb13Chord,
        GsMajor13Chord,
        AbMajor13Chord,
      ],
      "equivalent chords found for chord with compound intervals",
    );
  });

  it('getEquivChordsFromArray', () => {
    assert.deepEqual(
      Ebm7b5Chord.getEquivChordsFromArray([
        DsMajorChord,
        DsMinorChord,
        DsMajor6Chord,
        DshalfDim7Chord,
        Dsm7b5Chord,
        Dsdim7Chord,
        EbMajorChord,
        EbMinorChord,
        EbMajor6Chord,
        Eb7b5Chord,
        EbhalfDim7Chord,
        Ebm7b5Chord,
        Ebdim7Chord,
        Em7b5Chord,
        FsMinor6Chord,
        GbMinor6Chord,
      ]),
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
      Dsm7b5Chord.getEquivChordsFromArray([
        DsMajorChord,
        DsMinorChord,
        DsMajor6Chord,
        DshalfDim7Chord,
        Dsm7b5Chord,
        Dsdim7Chord,
        EbMajorChord,
        EbMinorChord,
        EbMajor6Chord,
        Eb7b5Chord,
        EbhalfDim7Chord,
        Ebm7b5Chord,
        Ebdim7Chord,
        Em7b5Chord,
        FsMinor6Chord,
        GbMinor6Chord,
      ]),
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
