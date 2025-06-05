import * as Constants from "../constants/Constants";
import { Scale } from "../Scale";
import { twelveTET, twelveTETIntervals } from "./temperaments/twelveTET";

const {   
  twelveTETP1,
  twelveTETm2,
  twelveTETM2,
  twelveTETA2,
  twelveTETm3,
  twelveTETM3,
  twelveTETd4,
  twelveTETP4,
  twelveTETd5,
  twelveTETA4,
  twelveTETP5,
  twelveTETm6,
  twelveTETM6,
  twelveTETd7,
  twelveTETm7,
  twelveTETM7,
  twelveTETP8,  
} = twelveTETIntervals;


// Without knowing more about each scale, it is difficult to know exactly which intervals to include 
// (e.g. whether an Interval was a 6th or actually a 13th in a particular scale, 
// or whether an Interval was a Major 3rd vs. Diminished 4th).
// For now, I have assumed minor, major, or perfect intervals, where possible.
// This nuance is more applicable/important for ChordTypes, but it would be nice to have it for Scales as well.
// Melodic minor (ascending) vs. melodic minor (descending) is a good example of where this nuance MIGHT apply though.
const scales = [
  new Scale(Constants.AEOLIAN, twelveTET, [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETm7, twelveTETP8]),
  // aeolian AKA natural minor AKA ethiopian Geez AKA ethiopian Ezel AKA melodic minor descending AKA natural (pure) minor

  new Scale(Constants.AEOLIAN_DOMINANT, twelveTET, [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETm7, twelveTETP8]),
  // hindu scale AKA Aeolian Dominant AKA Mixolydian b6 (or b13)

  new Scale(
    Constants.ALGERIAN_FIRST_OCTAVE,
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETd5, twelveTETP5, twelveTETm6, twelveTETM7, twelveTETP8],
  ),
  // Hungarian gypsy AKA Hungarian minor AKA double harmonic minor scale AKA Gypsy minor AKA algerian (1st octave)

  new Scale(
    Constants.ALGERIAN_SECOND_OCTAVE,
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETM7, twelveTETP8],
  ),
  // mohammedan AKA harmonic minor AKA algerian (2nd octave)
  // algerian scale is super funky - changes based on octave, maybe not technically twelveTET

  new Scale(Constants.ALTERED, twelveTET, [twelveTETP1, twelveTETm2, twelveTETm3, twelveTETM3, twelveTETd5, twelveTETm6, twelveTETm7, twelveTETP8]),
  // altered scale AKA super Locrian AKA Locrian b4

  new Scale(Constants.ALTERED_DOUBLE_FLAT_SEVENTH, twelveTET, [twelveTETP1, twelveTETm2, twelveTETm3, twelveTETd4, twelveTETd5, twelveTETm6, twelveTETd7, twelveTETP8]),

  new Scale(Constants.ALTERED_DORIAN, twelveTET, [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETd5, twelveTETP5, twelveTETM6, twelveTETm7, twelveTETP8]),
  // ukranian dorian AKA ukranian minor AKA dorian #4 AKA Romanian minor AKA altered Dorian

  new Scale(Constants.ALTERED_PHRYGIAN, twelveTET, [twelveTETP1, twelveTETm2, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETm7, twelveTETP8]),
  // phrygian dominant AKA phrygian major AKA jewish (ahava rabba) AKA Freygish AKA altered Phrygian AKA dominant b2 b6 AKA Spanish Phrygian AKA Spanish Gypsy AKA Hijaz-Nahawand AKA Bayati maqam AKA Dastgāh-e Homāyoun

  // new Scale('arabian (a)', twelveTET, [twelveTETP1,twelveTETM2,twelveTETm3,twelveTETP4,twelveTETd5,twelveTETm6,twelveTETM6,twelveTETM7,twelveTETP8]),
  // arabian (a) wasn't found

  new Scale(Constants.ARABIAN, twelveTET, [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETP4, twelveTETd5, twelveTETm6, twelveTETm7, twelveTETP8]),
  // arabian AKA arabian (b) AKA major locrian

  new Scale(Constants.AUGMENTED.toLocaleLowerCase(), twelveTET, [twelveTETP1, twelveTETm3, twelveTETM3, twelveTETP5, twelveTETm6, twelveTETM7, twelveTETP8]),

  new Scale(Constants.AUXILIARY_AUGMENTED, twelveTET, [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETd5, twelveTETm6, twelveTETm7, twelveTETP8]),
  // auxiliary augmented AKA Lydian auxiliary augmented AKA whole tone

  new Scale(
    Constants.AUXILIARY_DIMINISHED,
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETP4, twelveTETd5, twelveTETm6, twelveTETM6, twelveTETM7, twelveTETP8],
  ),
  // auxiliary diminished AKA diminished AKA diminished minor AKA diminished (whole/half) AKA octatonic (whole/half)

  new Scale(
    Constants.AUXILIARY_DIMINISHED_BLUES,
    twelveTET,
    [twelveTETP1, twelveTETm2, twelveTETm3, twelveTETM3, twelveTETd5, twelveTETP5, twelveTETM6, twelveTETm7, twelveTETP8],
  ),

  new Scale(Constants.BALINESE, twelveTET, [twelveTETP1, twelveTETm2, twelveTETm3, twelveTETP5, twelveTETm6, twelveTETP8]),

  new Scale(Constants.BAYATI_MAQAM, twelveTET, [twelveTETP1, twelveTETm2, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETm7, twelveTETP8]),
  // phrygian dominant AKA phrygian major AKA jewish (ahava rabba) AKA Freygish AKA altered Phrygian AKA dominant b2 b6 AKA Spanish Phrygian AKA Spanish Gypsy AKA Hijaz-Nahawand AKA Bayati maqam AKA Dastgāh-e Homāyoun

  new Scale(
    Constants.BEBOP_DOMINANT,
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETM6, twelveTETm7, twelveTETM7, twelveTETP8],
  ),

  new Scale(Constants.BEBOP_DORIAN, twelveTET, [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETM6, twelveTETm7, twelveTETP8]),
  // bebop Dorian AKA bebop minor

  new Scale(
    Constants.BEBOP_DORIAN_TWO,
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETP4, twelveTETP5, twelveTETM6, twelveTETm7, twelveTETM7, twelveTETP8],
  ),
  // bebop Dorian second or alternate form AKA bebop minor 2

  new Scale(
    Constants.BEBOP_HALF_DIMINISHED,
    twelveTET,
    [twelveTETP1, twelveTETm2, twelveTETm3, twelveTETP4, twelveTETd5, twelveTETP5, twelveTETm6, twelveTETM7, twelveTETP8],
  ),
  // bebop half diminished AKA Phrygiolocrian MAYBE??

  new Scale(Constants.BEBOP_MAJOR, twelveTET, [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETM6, twelveTETM7, twelveTETP8]),

  new Scale(Constants.BEBOP_MINOR, twelveTET, [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETM6, twelveTETm7, twelveTETP8]),
  // bebop minor AKA bebop Dorian

  new Scale(
    Constants.BEBOP_MINOR_TWO,
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETP4, twelveTETP5, twelveTETM6, twelveTETm7, twelveTETM7, twelveTETP8],
  ),
  // bebop minor 2 AKA bebop Dorian second or alternate form

  new Scale(Constants.BHAIRAV_RAGA, twelveTET, [twelveTETP1, twelveTETm2, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETM7, twelveTETP8]),
  // Bhairav raga AKA byzantine AKA double harmonic major AKA double harmonic

  new Scale(Constants.BLUES, twelveTET, [twelveTETP1, twelveTETm3, twelveTETP4, twelveTETd5, twelveTETP5, twelveTETm7, twelveTETP8]),
  // blues AKA pentatonic blues

  new Scale(
    Constants.BLUES_VARIATION_ONE,
    twelveTET,
    [twelveTETP1, twelveTETm3, twelveTETP4, twelveTETd5, twelveTETP5, twelveTETm7, twelveTETM7, twelveTETP8],
  ),
  new Scale(
    Constants.BLUES_VARIATION_TWO,
    twelveTET,
    [twelveTETP1, twelveTETm3, twelveTETM3, twelveTETP4, twelveTETd5, twelveTETP5, twelveTETm7, twelveTETM7, twelveTETP8],
  ),
  new Scale(
    Constants.BLUES_VARIATION_THREE,
    twelveTET,
    [twelveTETP1, twelveTETm3, twelveTETM3, twelveTETP4, twelveTETd5, twelveTETP5, twelveTETM6, twelveTETm7, twelveTETM7, twelveTETP8],
  ),

  new Scale(Constants.BYZANTINE, twelveTET, [twelveTETP1, twelveTETm2, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETM7, twelveTETP8]),
  // byzantine AKA double harmonic major AKA Bhairav raga AKA double harmonic

  new Scale(Constants.CHINESE, twelveTET, [twelveTETP1, twelveTETM3, twelveTETd5, twelveTETP5, twelveTETM7, twelveTETP8]),
  new Scale(Constants.CHINESE_TWO, twelveTET, [twelveTETP1, twelveTETM2, twelveTETP4, twelveTETP5, twelveTETM6, twelveTETP8]),

  new Scale(Constants.CHINESE_MONGOLIAN, twelveTET, [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETP5, twelveTETM6, twelveTETP8]),
  // chinese mongolian AKA mongolian AKA pentatonic major

  new Scale(
    Constants.CHROMATIC,
    twelveTET,
    [twelveTETP1, twelveTETm2, twelveTETM2, twelveTETm3, twelveTETM3, twelveTETP4, twelveTETd5, twelveTETP5, twelveTETm6, twelveTETM6, twelveTETm7, twelveTETM7, twelveTETP8],
  ),

  new Scale(
    Constants.DASTGAH_E_HOMAYOUN,
    twelveTET,
    [twelveTETP1, twelveTETm2, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETm7, twelveTETP8],
  ),
  // phrygian dominant AKA phrygian major AKA jewish (ahava rabba) AKA Freygish AKA altered Phrygian AKA dominant b2 b6 AKA Spanish Phrygian AKA Spanish Gypsy AKA Hijaz-Nahawand AKA Bayati maqam AKA Dastgāh-e Homāyoun

  new Scale(Constants.DIMINISHED.toLocaleLowerCase(), twelveTET, [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETP4, twelveTETd5, twelveTETm6, twelveTETM6, twelveTETM7, twelveTETP8]),
  // auxiliary diminished AKA diminished AKA diminished minor AKA diminished (whole/half) AKA octatonic (whole/half)

  new Scale(
    Constants.DIMINISHED_MINOR,
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETP4, twelveTETd5, twelveTETm6, twelveTETM6, twelveTETM7, twelveTETP8],
  ),
  // auxiliary diminished AKA diminished AKA diminished minor AKA diminished (whole/half) AKA octatonic (whole/half)

  // new Scale('diminished sevenths', twelveTET, [twelveTETP1,twelveTETm3,twelveTETd5,twelveTETM6,twelveTETP8]),
  // diminished sevenths scale not found

  new Scale(
    Constants.DIMINISHED_HALF_WHOLE,
    twelveTET,
    [twelveTETP1, twelveTETm2, twelveTETm3, twelveTETM3, twelveTETd5, twelveTETP5, twelveTETM6, twelveTETm7, twelveTETP8],
  ),
  // diminished half/whole AKA diminished half AKA octatonic (half/whole)

  new Scale(
    Constants.DIMINISHED_WHOLE_HALF,
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETP4, twelveTETd5, twelveTETm6, twelveTETM6, twelveTETM7, twelveTETP8],
  ),
  // auxiliary diminished AKA diminished AKA diminished minor AKA diminished (whole/half) AKA octatonic (whole/half)

  new Scale(
    Constants.DOMINANT_FLAT_SECOND_FLAT_SIXTH,
    twelveTET,
    [twelveTETP1, twelveTETm2, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETm7, twelveTETP8],
  ),
  // phrygian dominant AKA phrygian major AKA jewish (ahava rabba) AKA Freygish AKA altered Phrygian AKA dominant b2 b6 AKA Spanish Phrygian AKA Spanish Gypsy AKA Hijaz-Nahawand AKA Bayati maqam AKA Dastgāh-e Homāyoun

  new Scale(Constants.DOMINANT_PENTATONIC, twelveTET, [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETP5, twelveTETm7, twelveTETP8]),

  new Scale(Constants.DORIAN, twelveTET, [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETP4, twelveTETP5, twelveTETM6, twelveTETm7, twelveTETP8]),

  new Scale(
    Constants.DORIAN_SHARP_FOURTH,
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETd5, twelveTETP5, twelveTETM6, twelveTETm7, twelveTETP8],
  ),
  // ukranian dorian AKA ukranian minor AKA dorian #4 AKA Romanian minor AKA altered Dorian

  new Scale(Constants.DORIAN_FLAT_SECOND, twelveTET, [twelveTETP1, twelveTETm2, twelveTETm3, twelveTETP4, twelveTETP5, twelveTETM6, twelveTETm7, twelveTETP8]),

  new Scale(
    Constants.DOUBLE_HARMONIC_MAJOR,
    twelveTET,
    [twelveTETP1, twelveTETm2, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETM7, twelveTETP8],
  ),
  // double Harmonic AKA byzantine AKA Bhairav raga AKA double harmonic

  new Scale(
    Constants.DOUBLE_HARMONIC_MINOR,
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETd5, twelveTETP5, twelveTETm6, twelveTETM7, twelveTETP8],
  ),
  // Hungarian gypsy AKA Hungarian minor AKA double harmonic minor scale AKA Gypsy minor AKA algerian (1st octave)

  new Scale(Constants.EGYPTIAN, twelveTET, [twelveTETP1, twelveTETM2, twelveTETP4, twelveTETP5, twelveTETm7, twelveTETP8]),
  new Scale(
    Constants.EIGHT_TONE_SPANISH,
    twelveTET,
    [twelveTETP1, twelveTETm2, twelveTETm3, twelveTETM3, twelveTETP4, twelveTETd5, twelveTETm6, twelveTETm7, twelveTETP8],
  ),
  new Scale(Constants.ENIGMATIC, twelveTET, [twelveTETP1, twelveTETm2, twelveTETM3, twelveTETd5, twelveTETm6, twelveTETm7, twelveTETM7, twelveTETP8]),

  new Scale(Constants.ETHIOPIAN_A_RARAY, twelveTET, [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETM6, twelveTETM7, twelveTETP8]),
  // ethiopian (a raray) AKA ethiopian araray AKA major scale AKA ionian

  new Scale(Constants.ETHIOPIAN_EZEL, twelveTET, [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETm7, twelveTETP8]),
  // natural minor AKA aeolian AKA ethiopian Geez AKA ethiopian Ezel AKA melodic minor descending AKA natural (pure) minor

  new Scale(Constants.ETHIOPIAN_GEEZ, twelveTET, [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETm7, twelveTETP8]),
  // natural minor AKA aeolian AKA ethiopian Geez AKA ethiopian Ezel AKA melodic minor descending AKA natural (pure) minor

  new Scale(Constants.FREYGISH, twelveTET, [twelveTETP1, twelveTETm2, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETm7, twelveTETP8]),
  // phrygian dominant AKA phrygian major AKA jewish (ahava rabba) AKA Freygish AKA altered Phrygian AKA dominant b2 b6 AKA Spanish Phrygian AKA Spanish Gypsy AKA Hijaz-Nahawand AKA Bayati maqam AKA Dastgāh-e Homāyoun

  new Scale(Constants.GYPSY_MINOR, twelveTET, [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETd5, twelveTETP5, twelveTETm6, twelveTETM7, twelveTETP8]),
  // Hungarian gypsy AKA Hungarian minor AKA double harmonic minor scale AKA Gypsy minor AKA algerian (1st octave)

  new Scale(Constants.HALF_DIMINISHED, twelveTET, [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETP4, twelveTETd5, twelveTETm6, twelveTETm7, twelveTETP8]),
  // half diminished AKA locrian #2 AKA maybe half diminished #2

  new Scale(Constants.HARMONIC_MINOR, twelveTET, [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETM7, twelveTETP8]),
  // harmonic minor AKA mohammedan AKA algerian (2nd octave)

  new Scale(Constants.HAWAIIAN, twelveTET, [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETP4, twelveTETP5, twelveTETM6, twelveTETM7, twelveTETP8]),

  new Scale(Constants.HIJAZ_NAHAWAND, twelveTET, [twelveTETP1, twelveTETm2, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETm7, twelveTETP8]),
  // phrygian dominant AKA phrygian major AKA jewish (ahava rabba) AKA Freygish AKA altered Phrygian AKA dominant b2 b6 AKA Spanish Phrygian AKA Spanish Gypsy AKA Hijaz-Nahawand AKA Bayati maqam AKA Dastgāh-e Homāyoun

  new Scale(Constants.HINDU, twelveTET, [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETm7, twelveTETP8]),
  // hindu scale AKA Aeolian Dominant AKA Mixolydian b6 (or b13)

  new Scale(Constants.HIRAJOSHI, twelveTET, [twelveTETP1, twelveTETM3, twelveTETP4, twelveTETM6, twelveTETM7, twelveTETP8]),
  // hirajōshi AKA hira-choshi

  new Scale(Constants.HIRAJOSHI_TWO, twelveTET, [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETP5, twelveTETm6, twelveTETP8]),
  // hirajōshi AKA hira-choshi

  new Scale(Constants.HUNGARIAN_GYPSY, twelveTET, [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETd5, twelveTETP5, twelveTETm6, twelveTETM7, twelveTETP8]),
  // Hungarian gypsy AKA Hungarian minor AKA double harmonic minor scale AKA Gypsy minor AKA algerian (1st octave)

  // new Scale('hungarian gypsy persian', twelveTET, [twelveTETP1,twelveTETm2,twelveTETM3,twelveTETP4,twelveTETP5,twelveTETm6,twelveTETM7,twelveTETP8]),
  // hungarian gypsy persian scale not found

  new Scale(Constants.HUNGARIAN_MAJOR, twelveTET, [twelveTETP1, twelveTETm3, twelveTETM3, twelveTETd5, twelveTETP5, twelveTETM6, twelveTETm7, twelveTETP8]),

  new Scale(Constants.HUNGARIAN_MINOR, twelveTET, [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETd5, twelveTETP5, twelveTETm6, twelveTETM7, twelveTETP8]),
  // Hungarian gypsy AKA Hungarian minor AKA double harmonic minor scale AKA Gypsy minor AKA algerian (1st octave)

  new Scale(Constants.IONIAN, twelveTET, [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETM6, twelveTETM7, twelveTETP8]),
  // ethiopian (a raray) AKA ethiopian araray AKA major scale AKA ionian

  new Scale(
    Constants.IONIAN_SHARP_FIFTH,
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETP4, twelveTETm6, twelveTETM6, twelveTETM7, twelveTETP8],
  ),
  new Scale(Constants.IWATO, twelveTET, [twelveTETP1, twelveTETm2, twelveTETP4, twelveTETd5, twelveTETm7, twelveTETP8]),

  new Scale(Constants.JAPANESE, twelveTET, [twelveTETP1, twelveTETm2, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETP8]),
  // japanese (a) AKA maybe kumoi 2

  new Scale(Constants.JAPANESE_TWO, twelveTET, [twelveTETP1, twelveTETM2, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETP8]),
  // japanese 2 AKA maybe japanese (b)

  new Scale(
    Constants.JAPANESE_ICHIKOSUCHO,
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETP4, twelveTETd5, twelveTETP5, twelveTETM6, twelveTETM7, twelveTETP8],
  ),
  new Scale(Constants.JAPANESE_INSEN, twelveTET, [twelveTETP1, twelveTETm2, twelveTETP4, twelveTETP5, twelveTETm7, twelveTETP8]),
  new Scale(
    Constants.JAPANESE_TAISHIKICHO,
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETP4, twelveTETd5, twelveTETP5, twelveTETM6, twelveTETm7, twelveTETM7, twelveTETP8],
  ),
  new Scale(Constants.JAVANESE, twelveTET, [twelveTETP1, twelveTETm2, twelveTETm3, twelveTETP4, twelveTETP5, twelveTETM6, twelveTETm7, twelveTETP8]),
  new Scale(
    Constants.JEWISH_ADONAI_MALAKH,
    twelveTET,
    [twelveTETP1, twelveTETm2, twelveTETM2, twelveTETm3, twelveTETP4, twelveTETP5, twelveTETM6, twelveTETm7, twelveTETP8],
  ),

  new Scale(
    Constants.JEWISH_AHAVA_RABBA,
    twelveTET,
    [twelveTETP1, twelveTETm2, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETm7, twelveTETP8],
  ),
  // phrygian dominant AKA phrygian major AKA jewish (ahava rabba) AKA Freygish AKA altered Phrygian AKA dominant b2 b6 AKA Spanish Phrygian AKA Spanish Gypsy AKA Hijaz-Nahawand AKA Bayati maqam AKA Dastgāh-e Homāyoun

  // new Scale('jewish (magen abot)', twelveTET, [twelveTETP1,twelveTETm2,twelveTETm3,twelveTETM3,twelveTETd5,twelveTETm6,twelveTETm7,twelveTETM7,twelveTETP8]),
  // jewish magen avot not found consistently

  new Scale(Constants.KUMOI, twelveTET, [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETP5, twelveTETM6, twelveTETP8]),

  new Scale(Constants.KUMOI_TWO, twelveTET, [twelveTETP1, twelveTETm2, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETP8]),
  // japanese (a) AKA maybe kumoi 2

  new Scale(
    Constants.LEADING_WHOLE_TONE,
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETd5, twelveTETm6, twelveTETm7, twelveTETM7, twelveTETP8],
  ),
  new Scale(Constants.LOCRIAN, twelveTET, [twelveTETP1, twelveTETm2, twelveTETm3, twelveTETP4, twelveTETd5, twelveTETm6, twelveTETm7, twelveTETP8]),
  new Scale(
    Constants.LOCRIAN_FLAT_FOURTH,
    twelveTET,
    [twelveTETP1, twelveTETm2, twelveTETm3, twelveTETM3, twelveTETd5, twelveTETm6, twelveTETm7, twelveTETP8],
  ),
  // altered scale AKA super Locrian AKA Locrian b4

  new Scale(
    Constants.LOCRIAN_NATURAL_SIXTH,
    twelveTET,
    [twelveTETP1, twelveTETm2, twelveTETm3, twelveTETP4, twelveTETd5, twelveTETM6, twelveTETm7, twelveTETP8],
  ),

  new Scale(
    Constants.LOCRIAN_SHARP_SECOND,
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETP4, twelveTETd5, twelveTETm6, twelveTETm7, twelveTETP8],
  ),
  // half diminished AKA locrian #2 AKA maybe half diminished #2

  new Scale(Constants.LYDIAN, twelveTET, [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETd5, twelveTETP5, twelveTETM6, twelveTETM7, twelveTETP8]),
  new Scale(
    Constants.LYDIAN_SHARP_SECOND,
    twelveTET,
    [twelveTETP1, twelveTETA2, twelveTETM3, twelveTETA4, twelveTETP5, twelveTETM6, twelveTETM7, twelveTETP8],
  ),
  new Scale(Constants.LYDIAN_AUGMENTED, twelveTET, [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETd5, twelveTETm6, twelveTETM6, twelveTETM7, twelveTETP8]),

  new Scale(
    Constants.LYDIAN_AUXILIARY_AUGMENTED,
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETd5, twelveTETm6, twelveTETm7, twelveTETP8],
  ),
  // auxiliary augmented AKA Lydian auxiliary augmented AKA whole tone

  new Scale(Constants.LYDIAN_FLAT_THIRD, twelveTET, [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETd5, twelveTETP5, twelveTETM6, twelveTETM7, twelveTETP8]),
  // lydian diminshed AKA lydian b3

  new Scale(Constants.LYDIAN_FLAT_SEVENTH, twelveTET, [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETA4, twelveTETP5, twelveTETM6, twelveTETm7, twelveTETP8]),
  // lydian b7 AKA overtone

  new Scale(Constants.LYDIAN_DIMINISHED, twelveTET, [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETd5, twelveTETP5, twelveTETM6, twelveTETM7, twelveTETP8]),
  // lydian diminshed AKA lydian b3

  new Scale(Constants.LYDIAN_MINOR, twelveTET, [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETA4, twelveTETP5, twelveTETm6, twelveTETm7, twelveTETP8]),

  new Scale(Constants.MAJOR.toLocaleLowerCase(), twelveTET, [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETM6, twelveTETM7, twelveTETP8]),
  // ethiopian (a raray) AKA ethiopian araray AKA major scale AKA ionian

  new Scale(Constants.MAJOR_ARPEGGIO, twelveTET, [twelveTETP1, twelveTETM3, twelveTETP5, twelveTETP8]),
  new Scale(Constants.MAJOR_BLUES, twelveTET, [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETM3, twelveTETP5, twelveTETM6, twelveTETP8]),
  new Scale(Constants.MAJOR_LOCRIAN, twelveTET, [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETP4, twelveTETd5, twelveTETm6, twelveTETm7, twelveTETP8]),
  // major locrian AKA arabian (b)?

  // new Scale('melodic minor', twelveTET, [twelveTETP1,twelveTETM2,twelveTETm3,twelveTETP4,twelveTETP5,twelveTETM6,twelveTETM7,twelveTETP8]),
  // melodic minor AKA melodic minor (ascending)

  new Scale(
    Constants.MELODIC_MINOR_ASCENDING,
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETP4, twelveTETP5, twelveTETM6, twelveTETM7, twelveTETP8],
  ),
  // melodic minor AKA melodic minor (ascending)

  new Scale(
    Constants.MELODIC_MINOR_DESCENDING,
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETm7, twelveTETP8],
  ),
  // melodic minor descending AKA natural minor AKA natural (pure) minor AKA aeolian AKA ethiopian Geez AKA ethiopian Ezel

  new Scale(Constants.MINOR_ARPEGGIO, twelveTET, [twelveTETP1, twelveTETm3, twelveTETP5, twelveTETP8]),

  new Scale(Constants.MIXO_BLUES, twelveTET, [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETM3, twelveTETP4, twelveTETd5, twelveTETP5, twelveTETM6, twelveTETm7, twelveTETP8]),
  // mixo-blues AKA mixolydian blues AKA  mixo-Dorian blues scale AKA mixolydian/blues hybrid

  new Scale(
    Constants.MIXO_DORIAN_BLUES,
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETM3, twelveTETP4, twelveTETd5, twelveTETP5, twelveTETM6, twelveTETm7, twelveTETP8],
  ),
  // mixo-blues AKA mixolydian blues AKA  mixo-Dorian blues scale AKA mixolydian/blues hybrid

  new Scale(Constants.MIXOLYDIAN, twelveTET, [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETM6, twelveTETm7, twelveTETP8]),

  new Scale(
    Constants.MIXOLYDIAN_BLUES,
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETM3, twelveTETP4, twelveTETd5, twelveTETP5, twelveTETM6, twelveTETm7, twelveTETP8],
  ),
  // mixo-blues AKA mixolydian blues AKA  mixo-Dorian blues scale AKA mixolydian/blues hybrid

  new Scale(
    Constants.MIXOLYDIAN_FLAT_SIXTH,
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETm7, twelveTETP8],
  ),
  // hindu scale AKA Aeolian Dominant AKA Mixolydian b6 (or b13)

  new Scale(Constants.MOHAMMEDAN, twelveTET, [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETM7, twelveTETP8]),
  // mohammedan AKA harmonic minor AKA algerian (2nd octave)

  new Scale(Constants.MONGOLIAN, twelveTET, [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETP5, twelveTETM6, twelveTETP8]),
  // chinese mongolian AKA mongolian AKA pentatonic major

  new Scale(
    Constants.MOORISH_PHRYGIAN,
    twelveTET,
    [twelveTETP1, twelveTETm2, twelveTETm3, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETm7, twelveTETM7, twelveTETP8],
  ),
  // moorish phrygian AKA phrygian/double harmonic major mixed

  new Scale(Constants.NATURAL_MINOR, twelveTET, [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETm7, twelveTETP8]),
  // natural minor AKA melodic minor descending AKA natural (pure) minor AKA aeolian AKA ethiopian Geez AKA ethiopian Ezel

  // new Scale('neapolitan', twelveTET, [twelveTETP1,twelveTETm2,twelveTETm3,twelveTETP4,twelveTETP5,twelveTETm6,twelveTETM7,twelveTETP8]),
  // neapolitan scale in this form not found - only the major and minor versions

  new Scale(Constants.NEAPOLITAN_MAJOR, twelveTET, [twelveTETP1, twelveTETm2, twelveTETm3, twelveTETP4, twelveTETP5, twelveTETM6, twelveTETM7, twelveTETP8]),
  new Scale(Constants.NEAPOLITAN_MINOR, twelveTET, [twelveTETP1, twelveTETm2, twelveTETm3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETm7, twelveTETP8]),
  // neapolitan minor AKA phrygian

  new Scale(
    Constants.NINE_TONE_SCALE,
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETM3, twelveTETd5, twelveTETP5, twelveTETm6, twelveTETM6, twelveTETM7, twelveTETP8],
  ),

  new Scale(
    Constants.OCTATONIC_HALF_WHOLE,
    twelveTET,
    [twelveTETP1, twelveTETm2, twelveTETm3, twelveTETM3, twelveTETd5, twelveTETP5, twelveTETM6, twelveTETm7, twelveTETP8],
  ),
  // octatonic (half/whole) AKA diminished half/whole AKA diminished half

  new Scale(
    Constants.OCTATONIC_WHOLE_HALF,
    twelveTET,
    [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETP4, twelveTETd5, twelveTETm6, twelveTETM6, twelveTETM7, twelveTETP8],
  ),
  // auxiliary diminished AKA diminished AKA diminished minor AKA diminished (whole/half) AKA octatonic (whole/half)

  // new Scale('oriental (a)', twelveTET, [twelveTETP1,twelveTETm2,twelveTETM3,twelveTETP4,twelveTETd5,twelveTETm6,twelveTETm7,twelveTETP8]),
  // oriental (a) scale not found

  new Scale(Constants.ORIENTAL, twelveTET, [twelveTETP1, twelveTETm2, twelveTETM3, twelveTETP4, twelveTETd5, twelveTETM6, twelveTETm7, twelveTETP8]),
  // oriental AKA maybe oriental (b)

  new Scale(Constants.OVERTONE, twelveTET, [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETd5, twelveTETP5, twelveTETM6, twelveTETm7, twelveTETP8]),
  // overtone AKA lydian b7 
  
  new Scale(Constants.PELOG, twelveTET, [twelveTETP1, twelveTETm2, twelveTETm3, twelveTETP5, twelveTETm6, twelveTETP8]),
  new Scale(Constants.PELOG_TWO, twelveTET, [twelveTETP1, twelveTETm2, twelveTETm3, twelveTETP5, twelveTETm7, twelveTETP8]),
  new Scale(Constants.PENTATONIC_BLUES, twelveTET, [twelveTETP1, twelveTETm3, twelveTETP4, twelveTETd5, twelveTETP5, twelveTETm7, twelveTETP8]),

  new Scale(Constants.PENTATONIC_MAJOR, twelveTET, [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETP5, twelveTETM6, twelveTETP8]),
  // chinese mongolian AKA mongolian AKA pentatonic major

  new Scale(Constants.PENTATONIC_MINOR, twelveTET, [twelveTETP1, twelveTETm3, twelveTETP4, twelveTETP5, twelveTETm7, twelveTETP8]),
  new Scale(Constants.PENTATONIC_NEUTRAL, twelveTET, [twelveTETP1, twelveTETM2, twelveTETP4, twelveTETP5, twelveTETm7, twelveTETP8]),
  new Scale(Constants.PERSIAN, twelveTET, [twelveTETP1, twelveTETm2, twelveTETM3, twelveTETP4, twelveTETd5, twelveTETm6, twelveTETM7, twelveTETP8]),

  new Scale(Constants.PHRYGIAN, twelveTET, [twelveTETP1, twelveTETm2, twelveTETm3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETm7, twelveTETP8]),
  // phrygian AKA neapolitan minor

  new Scale(Constants.PHRYGIAN_DOMINANT, twelveTET, [twelveTETP1, twelveTETm2, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETm7, twelveTETP8]),
  // phrygian dominant AKA phrygian major AKA jewish (ahava rabba) AKA Freygish AKA altered Phrygian AKA dominant b2 b6 AKA Spanish Phrygian AKA Spanish Gypsy AKA Hijaz-Nahawand AKA Bayati maqam AKA Dastgāh-e Homāyoun

  new Scale(Constants.PHRYGIAN_MAJOR, twelveTET, [twelveTETP1, twelveTETm2, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETm7, twelveTETP8]),
  // phrygian major AKA phrygian dominant AKA jewish (ahava rabba) AKA Freygish AKA altered Phrygian AKA dominant b2 b6 AKA Spanish Phrygian AKA Spanish Gypsy AKA Hijaz-Nahawand AKA Bayati maqam AKA Dastgāh-e Homāyoun

  new Scale(Constants.PROMETHEUS, twelveTET, [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETd5, twelveTETM6, twelveTETm7, twelveTETP8]),
  new Scale(
    Constants.PROMETHEUS_NEAPOLITAN,
    twelveTET,
    [twelveTETP1, twelveTETm2, twelveTETM3, twelveTETd5, twelveTETM6, twelveTETm7, twelveTETP8],
  ),

  new Scale(Constants.PURVI_THETA, twelveTET, [twelveTETP1, twelveTETm2, twelveTETM3, twelveTETA4, twelveTETP5, twelveTETm6, twelveTETM7, twelveTETP8]),

  new Scale(Constants.ROMANIAN_MINOR, twelveTET, [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETd5, twelveTETP5, twelveTETM6, twelveTETm7, twelveTETP8]),
  // ukranian dorian AKA ukranian minor AKA dorian #4 AKA Romanian minor AKA altered Dorian

  new Scale(Constants.SIX_TONE_SYMMETRICAL, twelveTET, [twelveTETP1, twelveTETm2, twelveTETM3, twelveTETP4, twelveTETm6, twelveTETM6, twelveTETP8]),

  new Scale(Constants.SPANISH_GYPSY, twelveTET, [twelveTETP1, twelveTETm2, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETm7, twelveTETP8]),
  // Spanish Gypsy AKA phrygian major AKA phrygian dominant AKA jewish (ahava rabba) AKA Freygish AKA altered Phrygian AKA dominant b2 b6 AKA Spanish Phrygian AKA Hijaz-Nahawand AKA Bayati maqam AKA Dastgāh-e Homāyoun

  new Scale(Constants.SPANISH_PHRYGIAN, twelveTET, [twelveTETP1, twelveTETm2, twelveTETM3, twelveTETP4, twelveTETP5, twelveTETm6, twelveTETm7, twelveTETP8]),
  // phrygian dominant AKA phrygian major AKA jewish (ahava rabba) AKA Freygish AKA altered Phrygian AKA dominant b2 b6 AKA Spanish Phrygian AKA Spanish Gypsy AKA Hijaz-Nahawand AKA Bayati maqam AKA Dastgāh-e Homāyoun

  new Scale(Constants.SUPER_LOCRIAN, twelveTET, [twelveTETP1, twelveTETm2, twelveTETm3, twelveTETM3, twelveTETd5, twelveTETm6, twelveTETm7, twelveTETP8]),
  // super Locrian AKA altered scale AKA Locrian b4

  new Scale(Constants.TODI_THETA, twelveTET, [twelveTETP1, twelveTETm2, twelveTETm3, twelveTETA4, twelveTETP5, twelveTETm6, twelveTETM7, twelveTETP8]),

  new Scale(Constants.UKRAINIAN_DORIAN, twelveTET, [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETd5, twelveTETP5, twelveTETM6, twelveTETm7, twelveTETP8]),
  // ukranian dorian AKA ukranian minor AKA dorian #4 AKA Romanian minor AKA altered Dorian

  new Scale(Constants.UKRAINIAN_MINOR, twelveTET, [twelveTETP1, twelveTETM2, twelveTETm3, twelveTETd5, twelveTETP5, twelveTETM6, twelveTETm7, twelveTETP8]),
  // ukranian dorian AKA ukranian minor AKA dorian #4 AKA Romanian minor AKA altered Dorian

  new Scale(Constants.ULTRA_LOCRIAN, twelveTET, [twelveTETP1, twelveTETm2, twelveTETm3, twelveTETM3, twelveTETd5, twelveTETm6, twelveTETM6, twelveTETP8]),

  new Scale(Constants.WHOLE_TONE, twelveTET, [twelveTETP1, twelveTETM2, twelveTETM3, twelveTETd5, twelveTETm6, twelveTETm7, twelveTETP8]),
  // auxiliary augmented AKA Lydian auxiliary augmented AKA whole tone
];

export default scales;
