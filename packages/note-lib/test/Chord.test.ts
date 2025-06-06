import { describe, it } from "node:test";
import assert from "node:assert";
import { twelveTET } from "../src/data/temperaments/twelveTET";
import { twelveTETIntervals, twelveTETNotes } from "../src/data/temperaments";
import { Chord, ChordType, Constants, Interval, Key, Scale } from "../src";
import scales from "../src/data/scales";

describe("class Chord", () => {
  // ---- Arrange Notes and Intervals ----
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

  // ---- Arrange Chords and ChordTypes ----
  const majorChordType = new ChordType("maj", twelveTET, [twelveTETP1, twelveTETM3, twelveTETP5], [Constants.MAJOR.toLocaleLowerCase()]);
  const minorChordType = new ChordType("m", twelveTET, [twelveTETP1, twelveTETm3, twelveTETP5], [Constants.MINOR.toLocaleLowerCase()]);
  const major6ChordType= new ChordType("6", twelveTET, [twelveTETP1, twelveTETM3, twelveTETP5Priority2, twelveTETM6], ["major 6th"]);
  const minor6ChordType = new ChordType("m6", twelveTET, [twelveTETP1, twelveTETm3, twelveTETP5Priority2, twelveTETM6], ["minor 6th"]);
  const _7b5ChordType = new ChordType("7b5", twelveTET, [twelveTETP1, twelveTETM3, twelveTETd5, twelveTETm7],["dominant 7th, flat 5th"]);
  const halfDim7ChordType = new ChordType("ø7", twelveTET, [twelveTETP1, twelveTETm3, twelveTETd5, twelveTETm7], ["half diminished 7th"]);
  const m7b5ChordType = new ChordType("m7b5", twelveTET, [twelveTETP1, twelveTETm3, twelveTETd5, twelveTETm7], ["minor 7th, flat 5th"]);
  const dimChordType = new ChordType("dim", twelveTET, [twelveTETP1, twelveTETm3, twelveTETd5], ["diminished"]);
  const dim7ChordType = new ChordType("dim7", twelveTET, [twelveTETP1, twelveTETm3, twelveTETd5, twelveTETd7], ["diminished 7th"]);
  const _11ChordType = new ChordType("11", twelveTET, [twelveTETP1, twelveTETM3, twelveTETP5, twelveTETm7, twelveTETM9, twelveTETP11],["dominant 11th"]);
  const major11ChordType = new ChordType("maj11", twelveTET, [twelveTETP1, twelveTETM3, twelveTETP5Priority2, twelveTETM7, twelveTETM9Priority2, twelveTETP11], ["major 11th"]);
  const minor11ChordType = new ChordType("m11", twelveTET, [twelveTETP1, twelveTETm3, twelveTETP5Priority2, twelveTETm7, twelveTETM9Priority2, twelveTETP11], ["minor 11th"]);
  const _13ChordType = new ChordType("13", twelveTET, [twelveTETP1, twelveTETM3, twelveTETP5Priority2, twelveTETm7, twelveTETM9Priority2, twelveTETP11Priority3, twelveTETM13], ["dominant 13th"]);
  const minor13ChordType = new ChordType("m13", twelveTET, [twelveTETP1, twelveTETm3, twelveTETP5Priority2, twelveTETm7, twelveTETM9Priority2, twelveTETP11Priority3, twelveTETM13], ["minor 13th"]);
  const major13ChordType = new ChordType("maj13", twelveTET, [twelveTETP1, twelveTETM3, twelveTETP5Priority2, twelveTETM7, twelveTETM9Priority2, twelveTETP11Priority3, twelveTETM13], ["major 13th"]);
  const major9s11ChordType = new ChordType("maj9#11", twelveTET, [twelveTETP1, twelveTETM3, twelveTETP5, twelveTETM7, twelveTETM9, twelveTETA11], ["major 9th, sharp 11th", "maj9(#11)"]);
  const major7add9s11ChordType = new ChordType("maj7add9#11", twelveTET, [twelveTETP1, twelveTETM3, twelveTETP5, twelveTETM7, twelveTETM9, twelveTETA11], ["major 7th, added 9th, sharp 11th"]);
  const major13s11ChordType = new ChordType("maj13#11", twelveTET, [twelveTETP1, twelveTETM3, twelveTETP5, twelveTETM7, twelveTETM9, twelveTETA11, twelveTETM13], ["major 13th, sharp 11th"]);
  const majorDim5ChordType = new ChordType("-5", twelveTET, [twelveTETP1, twelveTETM3, twelveTETd5], ["major, diminished 5th"]);

  const AMajorDim5Chord = new Chord(A, majorDim5ChordType);

  const AsMinor11Chord = new Chord(As, minor11ChordType);
  const AsMinor13Chord = new Chord(As, minor13ChordType);
  const BbMinor11Chord = new Chord(Bb, minor11ChordType);
  const BbMinor13Chord = new Chord(Bb, minor13ChordType);

  const CsMajor9s11Chord = new Chord(Cs, major9s11ChordType);
  const CsMajor7add9s11Chord = new Chord(Cs, major7add9s11ChordType);
  const CsMajor13s11Chord = new Chord(Cs, major13s11ChordType);
  const DbMajor9s11Chord = new Chord(Db, major9s11ChordType);
  const DbMajor7add9s11Chord = new Chord(Db, major7add9s11ChordType);
  const DbMajor13s11Chord = new Chord(Db, major13s11ChordType);

  const DsMajorChord = new Chord(Ds,majorChordType);
  const DsMinorChord = new Chord(Ds, minorChordType);
  const DsMajor6Chord = new Chord(Ds,major6ChordType);
  const DshalfDim7Chord = new Chord(Ds, halfDim7ChordType);
  const Dsm7b5Chord = new Chord(Ds, m7b5ChordType);
  const DsDimChord = new Chord(Ds, dimChordType);
  const Dsdim7Chord = new Chord(Ds, dim7ChordType);
  const Ds11Chord = new Chord(Ds, _11ChordType);
  const Ds13Chord = new Chord(Ds, _13ChordType);

  const EbMajorChord = new Chord(Eb,majorChordType);
  const EbMinorChord = new Chord(Eb, minorChordType);
  const EbMajor6Chord = new Chord(Eb,major6ChordType);
  const Eb7b5Chord = new Chord(Eb, _7b5ChordType);
  const EbhalfDim7Chord = new Chord(Eb, halfDim7ChordType);
  const Ebm7b5Chord = new Chord(Eb, m7b5ChordType);
  const EbDimChord = new Chord(Eb, dimChordType);
  const Ebdim7Chord = new Chord(Eb, dim7ChordType);
  const Eb11Chord = new Chord(Eb, _11ChordType);
  const Eb13Chord = new Chord(Eb, _13ChordType);

  const Em7b5Chord = new Chord(E, m7b5ChordType);

  const FMinor11Chord = new Chord(F, minor11ChordType);

  const FsMinorChord = new Chord(Fs, minorChordType);
  const FsMinor6Chord = new Chord(Fs, minor6ChordType);
  const GbMinorChord = new Chord(Gb, minorChordType);
  const GbMinor6Chord = new Chord(Gb, minor6ChordType);

  const GsMajor13Chord = new Chord(Gs, major13ChordType);
  const AbMajor13Chord = new Chord(Ab, major13ChordType);

  // Slash Chords
  const AMajorDim5SlashFsChord = AMajorDim5Chord.getSlashChord(Fs);
  const AMajorDim5SlashGbChord = AMajorDim5Chord.getSlashChord(Gb);

  const AsMinor11SlashGChord = AsMinor11Chord.getSlashChord(G);
  const BbMinor11SlashGChord = BbMinor11Chord.getSlashChord(G);

  const CsMajor7add9s11SlashBbChord = CsMajor7add9s11Chord.getSlashChord(Bb);
  const CsMajor7add9s11SlashAsChord = CsMajor7add9s11Chord.getSlashChord(As);
  const CsMajor9s11SlashBbChord = CsMajor9s11Chord.getSlashChord(Bb);
  const CsMajor9s11SlashAsChord = CsMajor9s11Chord.getSlashChord(As);
  const DbMajor7add9s11SlashBbChord = DbMajor7add9s11Chord.getSlashChord(Bb);
  const DbMajor7add9s11SlashAsChord = DbMajor7add9s11Chord.getSlashChord(As);
  const DbMajor9s11SlashBbChord = DbMajor9s11Chord.getSlashChord(Bb);
  const DbMajor9s11SlashAsChord = DbMajor9s11Chord.getSlashChord(As);

  const DsDimSlashCsChord = DsDimChord.getSlashChord(Cs);
  const DsDimSlashDbChord = DsDimChord.getSlashChord(Db);
  const Ds11SlashCChord = Ds11Chord.getSlashChord(C);
  const EbDimSlashCsChord = EbDimChord.getSlashChord(Cs);
  const EbDimSlashDbChord = EbDimChord.getSlashChord(Db);
  const Eb11SlashCChord = Eb11Chord.getSlashChord(C);

  const FMinor11SlashDbChord = FMinor11Chord.getSlashChord(Db);
  const FMinor11SlashCsChord = FMinor11Chord.getSlashChord(Cs);

  const FsMinorSlashEbChord = FsMinorChord.getSlashChord(Eb);
  const FsMinorSlashDsChord = FsMinorChord.getSlashChord(Ds);
  const GbMinorSlashEbChord = GbMinorChord.getSlashChord(Eb);
  const GbMinorSlashDsChord = GbMinorChord.getSlashChord(Ds);

  const GsMajor11SlashFChord = new Chord(Gs, major11ChordType).getSlashChord(F);
  const AbMajor11SlashFChord = new Chord(Ab, major11ChordType).getSlashChord(F);

  // ---- Arrange Keys and Scales ----
  const aeolianScale = scales.find((scale: Scale) => scale.name === Constants.AEOLIAN);
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


  const AChromatic = new Key(A, chromaticScale);
  const ANeapolitanMinor = new Key(A, neapolitanMinorScale);
  const APhrygian = new Key(A, phrygianScale);

  const AsBebopDorian = new Key(As, bebopDorianScale);
  const AsBebopDorianTwo = new Key(As, bebopDorian2Scale);
  const AsBebopMinor = new Key(As, bebopMinorScale);
  const AsBebopMinorTwo = new Key(As, bebopMinor2Scale);
  const AsChromatic = new Key(As, chromaticScale);
  const AsDorian = new Key(As, dorianScale);
  const AsJewishAdonaiMalakh = new Key(As, jewishAdonaiMalakhScale);
  const AsLydian = new Key(As, lydianScale);
  const AsMixoBlues = new Key(As, mixoBluesScale);
  const AsMixoDorianBlues = new Key(As, mixoDorianBluesScale);
  const AsMixolydianBlues = new Key(As, mixolydianBluesScale);

  const BbBebopDorian = new Key(Bb, bebopDorianScale);
  const BbBebopDorianTwo = new Key(Bb, bebopDorian2Scale);
  const BbBebopMinor = new Key(Bb, bebopMinorScale);
  const BbBebopMinorTwo = new Key(Bb, bebopMinor2Scale);
  const BbChromatic = new Key(Bb, chromaticScale);
  const BbDorian = new Key(Bb, dorianScale);
  const BbJewishAdonaiMalakh = new Key(Bb, jewishAdonaiMalakhScale);
  const BbLydian = new Key(Bb, lydianScale);
  const BbMixoBlues = new Key(Bb, mixoBluesScale);
  const BbMixoDorianBlues = new Key(Bb, mixoDorianBluesScale);
  const BbMixolydianBlues = new Key(Bb, mixolydianBluesScale);

  const BChromatic = new Key(B, chromaticScale);

  const CChromatic = new Key(C, chromaticScale);
  const CMixolydian = new Key(C, mixolydianScale);
  const CMoorishPhrygian = new Key(C, moorishPhrygianScale);
  const CNeapolitanMinor = new Key(C, neapolitanMinorScale);
  const CPhrygian = new Key(C, phrygianScale);

  const CsChromatic = new Key(Cs, chromaticScale);
  const CsJapaneseIchikosucho = new Key(Cs, japaneseIchikosuchoScale);
  const CsJapaneseTaishikicho = new Key(Cs, japaneseTaishikichoScale);
  const CsLydian = new Key(Cs, lydianScale);
  const CsNineTone = new Key(Cs, nineToneScale);

  const DbChromatic = new Key(Db, chromaticScale);
  const DbJapaneseIchikosucho = new Key(Db, japaneseIchikosuchoScale);
  const DbJapaneseTaishikicho = new Key(Db, japaneseTaishikichoScale);
  const DbLydian = new Key(Db, lydianScale);
  const DbNineTone = new Key(Db, nineToneScale);

  const DAeolian = new Key(D, aeolianScale);
  const DChromatic = new Key(D, chromaticScale);
  const DEthiopianEzel = new Key(D, ethiopianEzelScale);
  const DEthiopianGeez = new Key(D, ethiopianGeezScale);
  const DMelodicMinorDesc = new Key(D, melodicMinorDescScale);
  const DNaturalMinor = new Key(D, naturalMinorScale);

  const DsBebopDominant = new Key(Ds, bebopDominantScale);
  const DsBebopDorian = new Key(Ds, bebopDorianScale);
  const DsBebopMinor = new Key(Ds, bebopMinorScale);
  const DsChromatic = new Key(Ds, chromaticScale);
  const DsJapaneseTaishikicho = new Key(Ds, japaneseTaishikichoScale);
  const DsMixoBlues = new Key(Ds, mixoBluesScale);
  const DsMixoDorianBlues = new Key(Ds, mixoDorianBluesScale);
  const DsMixolydian = new Key(Ds, mixolydianScale);
  const DsMixolydianBlues = new Key(Ds, mixolydianBluesScale);

  const EbBebopDominant = new Key(Eb, bebopDominantScale);
  const EbBebopDorian = new Key(Eb, bebopDorianScale);
  const EbBebopMinor = new Key(Eb, bebopMinorScale);
  const EbChromatic = new Key(Eb, chromaticScale);
  const EbJapaneseTaishikicho = new Key(Eb, japaneseTaishikichoScale);
  const EbMixoBlues = new Key(Eb, mixoBluesScale);
  const EbMixoDorianBlues = new Key(Eb, mixoDorianBluesScale);
  const EbMixolydian = new Key(Eb, mixolydianScale);
  const EbMixolydianBlues = new Key(Eb, mixolydianBluesScale);

  const EChromatic = new Key(E, chromaticScale);
  const ELocrian = new Key(E, locrianScale);

  const FAeolian = new Key(F, aeolianScale);
  const FChromatic = new Key(F, chromaticScale);
  const FEthiopianAraray = new Key(F, ethiopianArarayScale);
  const FEthiopianEzel = new Key(F, ethiopianEzelScale);
  const FEthiopianGeez = new Key(F, ethiopianGeezScale);
  const FIonian = new Key(F, ionianScale);
  const FMajor = new Key(F, majorScale);
  const FMelodicMinorDesc = new Key(F, melodicMinorDescScale);
  const FNaturalMinor = new Key(F, naturalMinorScale);

  const FsBlues = new Key(Fs, bluesScale);
  const FsChromatic = new Key(Fs, chromaticScale);

  const GbBlues = new Key(Gb, bluesScale);
  const GbChromatic = new Key(Gb, chromaticScale);

  const GChromatic = new Key(G, chromaticScale);
  const GDorian = new Key(G, dorianScale);
  const GEightToneSpanish = new Key(G, eightToneSpanishScale);
  const GLocrian = new Key(G, locrianScale);
 
  const GsBebopDominant = new Key(Gs, bebopDominantScale);
  const GsBebopMajor = new Key(Gs, bebopMajorScale);
  const GsChromatic = new Key(Gs, chromaticScale);
  const GsEthiopianAraray = new Key(Gs, ethiopianArarayScale);
  const GsIonian = new Key(Gs, ionianScale);
  const GsJapaneseIchikosucho = new Key(Gs, japaneseIchikosuchoScale);
  const GsJapaneseTaishikicho = new Key(Gs, japaneseTaishikichoScale);
  const GsMajorKey = new Key(Gs, majorScale);

  const AbBebopDominant = new Key(Ab, bebopDominantScale);
  const AbBebopMajor = new Key(Ab, bebopMajorScale);
  const AbChromatic = new Key(Ab, chromaticScale);
  const AbEthiopianAraray = new Key(Ab, ethiopianArarayScale);
  const AbIonian = new Key(Ab, ionianScale);
  const AbJapaneseIchikosucho = new Key(Ab, japaneseIchikosuchoScale);
  const AbJapaneseTaishikicho = new Key(Ab, japaneseTaishikichoScale);
  const AbMajorKey = new Key(Ab, majorScale);

  const DbMajor13s11InclusiveKeys = [
    AChromatic,
    AsBebopDorian,
    AsBebopDorianTwo,
    AsBebopMinor,
    AsBebopMinorTwo,
    AsChromatic,
    AsDorian,
    AsJewishAdonaiMalakh,
    AsMixoBlues,
    AsMixoDorianBlues,
    AsMixolydianBlues,
    BbBebopDorian,
    BbBebopDorianTwo,
    BbBebopMinor,
    BbBebopMinorTwo,
    BbChromatic,
    BbDorian,
    BbJewishAdonaiMalakh,
    BbMixoBlues,
    BbMixoDorianBlues,
    BbMixolydianBlues,
    BChromatic,
    CChromatic,
    CMoorishPhrygian,
    CNeapolitanMinor,
    CPhrygian,
    CsChromatic,
    CsJapaneseIchikosucho,
    CsJapaneseTaishikicho,
    CsLydian,
    CsNineTone,
    DbChromatic,
    DbJapaneseIchikosucho,
    DbJapaneseTaishikicho,
    DbLydian,
    DbNineTone,
    DChromatic,
    DsBebopDominant,
    DsBebopDorian,
    DsBebopMinor,
    DsChromatic,
    DsJapaneseTaishikicho,
    DsMixoBlues,
    DsMixoDorianBlues,
    DsMixolydian,
    DsMixolydianBlues,
    EbBebopDominant,
    EbBebopDorian,
    EbBebopMinor,
    EbChromatic,
    EbJapaneseTaishikicho,
    EbMixoBlues,
    EbMixoDorianBlues,
    EbMixolydian,
    EbMixolydianBlues,
    EChromatic,
    FAeolian,
    FChromatic,
    FEthiopianEzel,
    FEthiopianGeez,
    FMelodicMinorDesc,
    FNaturalMinor,
    FsChromatic,
    GbChromatic,
    GChromatic,
    GEightToneSpanish,
    GLocrian,
    GsBebopDominant,
    GsBebopMajor,
    GsChromatic,
    GsEthiopianAraray,
    GsIonian,
    GsJapaneseIchikosucho,
    GsJapaneseTaishikicho,
    GsMajorKey,
    AbBebopDominant,
    AbBebopMajor,
    AbChromatic,
    AbEthiopianAraray,
    AbIonian,
    AbJapaneseIchikosucho,
    AbJapaneseTaishikicho,
    AbMajorKey
  ];
  
  const lotsOfKeys = DbMajor13s11InclusiveKeys.concat([
    DAeolian,
    DEthiopianEzel,
    DEthiopianGeez,
    DMelodicMinorDesc,
    DNaturalMinor,
    GbBlues,
    GDorian,
  ])

  // ---- Assert ---- 
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
      Ebm7b5Chord.getEquivChords(),
      [
        AMajorDim5SlashGbChord,
        AMajorDim5SlashFsChord,
        DsDimSlashDbChord,
        DsDimSlashCsChord,
        DshalfDim7Chord, 
        Dsm7b5Chord, 
        EbDimSlashDbChord,
        EbDimSlashCsChord,
        EbhalfDim7Chord, 
        Ebm7b5Chord, 
        FsMinorSlashEbChord,
        FsMinorSlashDsChord,
        FsMinor6Chord,
        GbMinorSlashEbChord,
        GbMinorSlashDsChord,
        GbMinor6Chord,
      ],
      "equivalent chords identified given flat note",
    );
    assert.deepEqual(
      Dsm7b5Chord.getEquivChords(),
      [
        AMajorDim5SlashGbChord,
        AMajorDim5SlashFsChord,
        DsDimSlashDbChord,
        DsDimSlashCsChord,
        DshalfDim7Chord, 
        Dsm7b5Chord, 
        EbDimSlashDbChord,
        EbDimSlashCsChord,
        EbhalfDim7Chord, 
        Ebm7b5Chord, 
        FsMinorSlashEbChord,
        FsMinorSlashDsChord,
        FsMinor6Chord,
        GbMinorSlashEbChord,
        GbMinorSlashDsChord,
        GbMinor6Chord,
      ],
      "equivalent chords identified given sharp note",
    );
    assert.deepEqual(
      Eb13Chord.getEquivChords(),
      [
        AsMinor11SlashGChord,
        AsMinor13Chord,
        BbMinor11SlashGChord,
        BbMinor13Chord,
        CsMajor9s11SlashBbChord,
        CsMajor9s11SlashAsChord,
        CsMajor7add9s11SlashBbChord,
        CsMajor7add9s11SlashAsChord,
        CsMajor13s11Chord,
        DbMajor9s11SlashBbChord,
        DbMajor9s11SlashAsChord,
        DbMajor7add9s11SlashBbChord,
        DbMajor7add9s11SlashAsChord,
        DbMajor13s11Chord,
        Ds11SlashCChord,
        Ds13Chord,
        Eb11SlashCChord,
        Eb13Chord,
        FMinor11SlashDbChord,
        FMinor11SlashCsChord,
        GsMajor11SlashFChord,
        GsMajor13Chord,
        AbMajor11SlashFChord,
        AbMajor13Chord,
      ],
      "equivalent chords found for chord with compound intervals",
    );
  });

  it('getEquivChordsFromArray', () => {
    assert.deepEqual(
      Ebm7b5Chord.getEquivChordsFromArray([
        AMajorDim5SlashGbChord,
        AMajorDim5SlashFsChord,
        DsDimSlashDbChord,
        DsDimSlashCsChord,
        DsMajorChord,
        DsMinorChord,
        DsMajor6Chord,
        DshalfDim7Chord,
        Dsm7b5Chord,
        Dsdim7Chord,
        EbDimSlashDbChord,
        EbDimSlashCsChord,
        EbMajorChord,
        EbMinorChord,
        EbMajor6Chord,
        Eb7b5Chord,
        EbhalfDim7Chord,
        Ebm7b5Chord,
        Ebdim7Chord,
        Em7b5Chord,
        FsMinorSlashEbChord,
        FsMinorSlashDsChord,
        FsMinor6Chord,
        GbMinorSlashEbChord,
        GbMinorSlashDsChord,
        GbMinor6Chord,
      ]),
      [
        AMajorDim5SlashGbChord,
        AMajorDim5SlashFsChord,
        DsDimSlashDbChord,
        DsDimSlashCsChord,
        DshalfDim7Chord, 
        Dsm7b5Chord, 
        EbDimSlashDbChord,
        EbDimSlashCsChord,
        EbhalfDim7Chord, 
        Ebm7b5Chord, 
        FsMinorSlashEbChord,
        FsMinorSlashDsChord,
        FsMinor6Chord,
        GbMinorSlashEbChord,
        GbMinorSlashDsChord,
        GbMinor6Chord,
      ],
      "equivalent chords identified given flat note",
    );
    assert.deepEqual(
      Dsm7b5Chord.getEquivChordsFromArray([
        AMajorDim5SlashGbChord,
        AMajorDim5SlashFsChord,
        DsDimSlashDbChord,
        DsDimSlashCsChord,
        DsMajorChord,
        DsMinorChord,
        DsMajor6Chord,
        DshalfDim7Chord,
        Dsm7b5Chord,
        Dsdim7Chord,
        EbDimSlashDbChord,
        EbDimSlashCsChord,
        EbMajorChord,
        EbMinorChord,
        EbMajor6Chord,
        Eb7b5Chord,
        EbhalfDim7Chord,
        Ebm7b5Chord,
        Ebdim7Chord,
        Em7b5Chord,
        FsMinorSlashEbChord,
        FsMinorSlashDsChord,
        FsMinor6Chord,
        GbMinorSlashEbChord,
        GbMinorSlashDsChord,
        GbMinor6Chord,
      ]),
      [
        AMajorDim5SlashGbChord,
        AMajorDim5SlashFsChord,
        DsDimSlashDbChord,
        DsDimSlashCsChord,
        DshalfDim7Chord, 
        Dsm7b5Chord, 
        EbDimSlashDbChord,
        EbDimSlashCsChord,
        EbhalfDim7Chord, 
        Ebm7b5Chord, 
        FsMinorSlashEbChord,
        FsMinorSlashDsChord,
        FsMinor6Chord,
        GbMinorSlashEbChord,
        GbMinorSlashDsChord,
        GbMinor6Chord,
      ],
      "equivalent chords identified given sharp note",
    );
  });

  it('getInclusiveKeys', () => {
    assert.deepEqual(
      DbMajor13s11Chord.getInclusiveKeys(),
      DbMajor13s11InclusiveKeys,
      "inclusive Keys found for Chord with compound intervals and flat note as root",
    );
    assert.deepEqual(
      CsMajor13s11Chord.getInclusiveKeys(),
      DbMajor13s11InclusiveKeys,
      "inclusive Keys found for Chord with compound intervals and sharp note as root",
    );
  });

  it('getInclusiveKeysFromArray', () => {
    assert.deepEqual(
      DbMajor13s11Chord.getInclusiveKeysFromArray(lotsOfKeys),
      DbMajor13s11InclusiveKeys,
      "inclusive Keys from array found for Chord with compound intervals and flat note as root",
    );
    assert.deepEqual(
      CsMajor13s11Chord.getInclusiveKeysFromArray(lotsOfKeys),
      DbMajor13s11InclusiveKeys,
      "inclusive Keys from array found for Chord with compound intervals and sharp note as root",
    );
  });

  it('isInKey', () => {
    assert.deepEqual(
      DbMajor13s11Chord.isInKey(FAeolian),
      true,
      "Chord is correctly in Key",
    );
    assert.deepEqual(
      CsMajor13s11Chord.isInKey(GDorian),
      false,
      "Chord is correctly NOT in Key",
    );
  });
});
