import { describe, it } from "node:test";
import assert from "node:assert";
import { Scale } from "../src/Scale";
import { twelveTET } from "../src/data/temperaments/twelveTET";
import { Key } from "../src/Key";
import { twelveTETIntervals, twelveTETNotes } from "../src/data/temperaments";
import { Chord, ChordType, Constants, Interval } from "../src";
import scales from "../src/data/scales";
import chordTypes from "../src/data/chordTypes";

describe("class Key", () => {
    // ---- Arrange Notes and Intervals ----
  const { Ab, A, As, Bb, B, C, Cs, Db, D, Ds, Eb, E, F, Fs, Gb, G, Gs, } = twelveTETNotes;

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


  // ---- Arrange Keys and Scales ----
  const aeolianScale = scales.find((scale: Scale) => scale.name === Constants.AEOLIAN);
  const balineseScale = scales.find((scale: Scale) => scale.name === Constants.BALINESE);
  const bebopDominantScale = scales.find((scale: Scale) => scale.name === Constants.BEBOP_DOMINANT);
  const bebopDorianScale = scales.find((scale: Scale) => scale.name === Constants.BEBOP_DORIAN);
  const bebopDorian2Scale = scales.find((scale: Scale) => scale.name === Constants.BEBOP_DORIAN_TWO);
  const bebopMajorScale = scales.find((scale: Scale) => scale.name === Constants.BEBOP_MAJOR);
  const bebopMinorScale = scales.find((scale: Scale) => scale.name === Constants.BEBOP_MINOR);
  const bebopMinor2Scale = scales.find((scale: Scale) => scale.name === Constants.BEBOP_MINOR_TWO);
  const bluesScale = scales.find((scale: Scale) => scale.name === Constants.BLUES);
  const chromaticScale = scales.find((scale: Scale) => scale.name === Constants.CHROMATIC);
  const dorianScale = scales.find((scale: Scale) => scale.name === Constants.DORIAN);
  const eightToneSpanishScale = scales.find((scale: Scale) => scale.name === Constants.EIGHT_TONE_SPANISH);
  const ethiopianArarayScale = scales.find((scale: Scale) => scale.name === Constants.ETHIOPIAN_A_RARAY);
  const ethiopianEzelScale = scales.find((scale: Scale) => scale.name === Constants.ETHIOPIAN_EZEL);
  const ethiopianGeezScale = scales.find((scale: Scale) => scale.name === Constants.ETHIOPIAN_GEEZ);
  const ionianScale = scales.find((scale: Scale) => scale.name === Constants.IONIAN);
  const japaneseIchikosuchoScale = scales.find((scale: Scale) => scale.name === Constants.JAPANESE_ICHIKOSUCHO);
  const japaneseTaishikichoScale = scales.find((scale: Scale) => scale.name === Constants.JAPANESE_TAISHIKICHO);
  const jewishAdonaiMalakhScale = scales.find((scale: Scale) => scale.name === Constants.JEWISH_ADONAI_MALAKH);
  const locrianScale = scales.find((scale: Scale) => scale.name === Constants.LOCRIAN);
  const lydianScale = scales.find((scale: Scale) => scale.name === Constants.LYDIAN);
  const majorScale = scales.find((scale: Scale) => scale.name === Constants.MAJOR.toLocaleLowerCase());
  const melodicMinorDescScale = scales.find((scale: Scale) => scale.name === Constants.MELODIC_MINOR_DESCENDING);
  const mixoBluesScale = scales.find((scale: Scale) => scale.name === Constants.MIXO_BLUES);
  const mixoDorianBluesScale = scales.find((scale: Scale) => scale.name === Constants.MIXO_DORIAN_BLUES);
  const mixolydianScale = scales.find((scale: Scale) => scale.name === Constants.MIXOLYDIAN);
  const mixolydianBluesScale = scales.find((scale: Scale) => scale.name === Constants.MIXOLYDIAN_BLUES);
  const moorishPhrygianScale = scales.find((scale: Scale) => scale.name === Constants.MOORISH_PHRYGIAN);
  const naturalMinorScale = scales.find((scale: Scale) => scale.name === Constants.NATURAL_MINOR);
  const neapolitanMinorScale = scales.find((scale: Scale) => scale.name === Constants.NEAPOLITAN_MINOR);
  const nineToneScale = scales.find((scale: Scale) => scale.name === Constants.NINE_TONE_SCALE);
  const phrygianScale = scales.find((scale: Scale) => scale.name === Constants.PHRYGIAN);
  
  const ANeapolitanMinor = new Key(A, neapolitanMinorScale);
  const APhrygian = new Key(A, phrygianScale);

  const AsLydian = new Key(As, lydianScale);
  const BbLydian = new Key(Bb, lydianScale);

  const CMixolydian = new Key(C, mixolydianScale);

  const CsBalinese = new Key(Cs, balineseScale);
  const DbBalinese = new Key(Db, balineseScale);

  const DAeolian = new Key(D, aeolianScale);
  const DEthiopianEzel = new Key(D, ethiopianEzelScale);
  const DEthiopianGeez = new Key(D, ethiopianGeezScale);
  const DMelodicMinorDesc = new Key(D, melodicMinorDescScale);
  const DNaturalMinor = new Key(D, naturalMinorScale);

  const ELocrian = new Key(E, locrianScale);

  const FEthiopianAraray = new Key(F, ethiopianArarayScale);
  const FIonian = new Key(F, ionianScale);
  const FMajor = new Key(F, majorScale);

  const FsBlues = new Key(Fs, bluesScale);

  const GbBlues = new Key(Gb, bluesScale);

  const GDorian = new Key(G, dorianScale);

  // ---- Arrange Chords and ChordTypes ----
  const majorChordType = chordTypes.find((chordType: ChordType) => chordType.shortHand === "maj");
  const minorChordType = chordTypes.find((chordType: ChordType) => chordType.shortHand === "m");
  const _5ChordType = chordTypes.find((chordType: ChordType) => chordType.shortHand === "5");
  const major6ChordType = chordTypes.find((chordType: ChordType) => chordType.shortHand === "6");
  const minor6ChordType = chordTypes.find((chordType: ChordType) => chordType.shortHand === "m6");
  const major7ChordType = chordTypes.find((chordType: ChordType) => chordType.shortHand === "maj7");
  const _7b5ChordType = chordTypes.find((chordType: ChordType) => chordType.shortHand === "7b5");
  const halfDim7ChordType = chordTypes.find((chordType: ChordType) => chordType.shortHand === "ø7");
  const m7b5ChordType = chordTypes.find((chordType: ChordType) => chordType.shortHand === "m7b5");
  const dim7ChordType = chordTypes.find((chordType: ChordType) => chordType.shortHand === "dim7");
  const sus2ChordType = chordTypes.find((chordType: ChordType) => chordType.shortHand === "sus2");
  const sus4ChordType = chordTypes.find((chordType: ChordType) => chordType.shortHand === "sus4");
  const add4ChordType = chordTypes.find((chordType: ChordType) => chordType.shortHand === "add4");
  const add11ChordType = chordTypes.find((chordType: ChordType) => chordType.shortHand === "add11");
  const _13ChordType = chordTypes.find((chordType: ChordType) => chordType.shortHand === "13");
  const minor13ChordType = chordTypes.find((chordType: ChordType) => chordType.shortHand === "m13");
  const major13ChordType = chordTypes.find((chordType: ChordType) => chordType.shortHand === "maj13");
  const major13s11ChordType = chordTypes.find((chordType: ChordType) => chordType.shortHand === "maj13#11");
  
  const AMajorChord = new Chord(A, majorChordType);
  const A5Chord = new Chord(A, _5ChordType);
  const AMajor7Chord = new Chord(A, major7ChordType);
  const ASus4Chord = new Chord(A, sus4ChordType);
  const AAdd4Chord = new Chord(A, add4ChordType);
  const AAdd11Chord = new Chord(A, add11ChordType);

  const AsMinor13Chord = new Chord(As, minor13ChordType);

  const BbMinor13Chord = new Chord(Bb, minor13ChordType);

  const CsMinorChord = new Chord(Cs, minorChordType);
  const Cs5Chord = new Chord(Cs, _5ChordType);
  const CsMajor13s11Chord = new Chord(Cs, major13s11ChordType);

  const DbMinorChord = new Chord(Db, minorChordType);
  const Db5Chord = new Chord(Db, _5ChordType);
  const DbMajor13s11Chord = new Chord(Db, major13s11ChordType);

  const D5Chord = new Chord(D, _5ChordType);
  const DSus2Chord = new Chord(D, sus2ChordType);

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

  const GsMajor13Chord = new Chord(Gs, major13ChordType);

  const AbMajor13Chord = new Chord(Ab, major13ChordType);

  const DbBalineseIncludedChords = [ 
    AMajorChord,
    A5Chord,
    AMajor7Chord,
    ASus4Chord,
    AAdd4Chord,
    AAdd11Chord,
    CsMinorChord,
    Cs5Chord,
    DbMinorChord,
    Db5Chord,
    D5Chord,
    DSus2Chord,
  ];

  const lotsOfChords = DbBalineseIncludedChords.concat([
    EbMajorChord,
    EbMinorChord,
    EbMajor6Chord,
    Eb7b5Chord,
    EbhalfDim7Chord,
    Ebm7b5Chord,
    Ebdim7Chord,
    Eb13Chord,
    Em7b5Chord,
    FsMinor6Chord,
    GbMinor6Chord,
    GsMajor13Chord,
  ])

  // ---- Assert ---- 
  it('toJSON, valueOf, toString', () => {
    assert.deepEqual(FsBlues.toJSON(), {
      name: `${Constants.F_SHARP} blues`,
      tonic: Fs,
      scale: bluesScale,
      notes: [Fs, A, B, C, Cs, E, Fs]
    });
    assert.deepEqual(GbBlues.toJSON(), {
      name: `${Constants.G_FLAT} blues`,
      tonic: Gb,
      scale: bluesScale,
      notes: [Gb, A, B, C, Db, E, Gb]
    });
    assert.equal(BbLydian.valueOf(), JSON.stringify(BbLydian), "valueOf works");
    assert.equal(BbLydian.toString(), JSON.stringify(BbLydian), "toString works");
  });

  it('getEquivKeys', () => {
    assert.deepEqual(
      BbLydian.getEquivKeys()[0],
      ANeapolitanMinor,
      "equivalent key 0 identified given flat note",
    );
    assert.deepEqual(
      AsLydian.getEquivKeys()[0],
      ANeapolitanMinor,
      "equivalent key 0 identified given sharp note",
    );
  
    assert.deepEqual(
      BbLydian.getEquivKeys(),
      [
        ANeapolitanMinor,
        APhrygian,
        AsLydian,
        BbLydian,
        CMixolydian,
        DAeolian,
        DEthiopianEzel,
        DEthiopianGeez,
        DMelodicMinorDesc,
        DNaturalMinor,
        ELocrian,
        FEthiopianAraray,
        FIonian,
        FMajor,
        GDorian,
      ],
      "equivalent keys identified given flat note",
    );
  
    assert.deepEqual(
      AsLydian.getEquivKeys(),
      [
        ANeapolitanMinor,
        APhrygian,
        AsLydian,
        BbLydian,
        CMixolydian,
        DAeolian,
        DEthiopianEzel,
        DEthiopianGeez,
        DMelodicMinorDesc,
        DNaturalMinor,
        ELocrian,
        FEthiopianAraray,
        FIonian,
        FMajor,
        GDorian,
      ],
      "equivalent keys identified given sharp note",
    );
  });

  it('getEquivKeysFromArray', () => {
    assert.deepEqual(
      BbLydian.getEquivKeysFromArray([
        ANeapolitanMinor,
        APhrygian,
        AsLydian,
        BbLydian,
        CMixolydian,
        DAeolian,
        DEthiopianEzel,
        DEthiopianGeez,
        DMelodicMinorDesc,
        DNaturalMinor,
        ELocrian,
        FEthiopianAraray,
        FIonian,
        FMajor,
        FsBlues,
        GbBlues,
        GDorian,
      ]),
      [
        ANeapolitanMinor,
        APhrygian,
        AsLydian,
        BbLydian,
        CMixolydian,
        DAeolian,
        DEthiopianEzel,
        DEthiopianGeez,
        DMelodicMinorDesc,
        DNaturalMinor,
        ELocrian,
        FEthiopianAraray,
        FIonian,
        FMajor,
        GDorian,
      ],
      "equivalent keys identified given flat note",
    );
  
    assert.deepEqual(
      AsLydian.getEquivKeysFromArray([
        ANeapolitanMinor,
        APhrygian,
        AsLydian,
        BbLydian,
        CMixolydian,
        DAeolian,
        DEthiopianEzel,
        DEthiopianGeez,
        DMelodicMinorDesc,
        DNaturalMinor,
        ELocrian,
        FEthiopianAraray,
        FIonian,
        FMajor,
        FsBlues,
        GbBlues,
        GDorian,
      ]),
      [
        ANeapolitanMinor,
        APhrygian,
        AsLydian,
        BbLydian,
        CMixolydian,
        DAeolian,
        DEthiopianEzel,
        DEthiopianGeez,
        DMelodicMinorDesc,
        DNaturalMinor,
        ELocrian,
        FEthiopianAraray,
        FIonian,
        FMajor,
        GDorian,
      ],
      "equivalent keys identified given sharp note",
    );
  });

  it('getIncludedChords', () => {
    assert.deepEqual(
      DbBalinese.getIncludedChords(),
      DbBalineseIncludedChords,
      "included Chords found for Key with compound intervals and flat note as tonic",
    );
    assert.deepEqual(
      CsBalinese.getIncludedChords(),
      DbBalineseIncludedChords,
      "included Chords found for Key with compound intervals and sharp note as tonic",
    );
  });

  it('getIncludedChordsFromArray', () => {
    assert.deepEqual(
      DbBalinese.getIncludedChordsFromArray(lotsOfChords),
      DbBalineseIncludedChords,
      "included Chords from array found for Key with compound intervals and flat note as tonic",
    );
    assert.deepEqual(
      CsBalinese.getIncludedChordsFromArray(lotsOfChords),
      DbBalineseIncludedChords,
      "included Chords from array found for Key with compound intervals and sharp note as tonic",
    );
  });

  it('includesChord', () => {
    assert.deepEqual(
      DbBalinese.includesChord(DSus2Chord),
      true,
      "Key correctly includes Chord",
    );
    assert.deepEqual(
      CsBalinese.includesChord(FsMinor6Chord),
      false,
      "Key correct does NOT include Chord",
    );
  });
});
