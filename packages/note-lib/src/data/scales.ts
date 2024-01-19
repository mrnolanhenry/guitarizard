import * as Constants from "../constants/Constants";
import { Scale } from "../Scale";
import { twelveTET } from "./temperaments/twelveTET";

const scales = [
	new Scale(Constants.AEOLIAN, twelveTET, [0, 2, 3, 5, 7, 8, 10, 12]),
	// aeolian AKA natural minor AKA ethiopian Geez AKA ethiopian Ezel AKA melodic minor descending AKA natural (pure) minor

	new Scale(Constants.AEOLIAN_DOMINANT, twelveTET, [0, 2, 4, 5, 7, 8, 10, 12]),
	// hindu scale AKA Aeolian Dominant AKA Mixolydian b6 (or b13)

	new Scale(Constants.ALGERIAN_FIRST_OCTAVE, twelveTET, [0, 2, 3, 6, 7, 8, 11, 12]),
	// Hungarian gypsy AKA Hungarian minor AKA double harmonic minor scale AKA Gypsy minor AKA algerian (1st octave)

	new Scale(Constants.ALGERIAN_SECOND_OCTAVE, twelveTET, [0, 2, 3, 5, 7, 8, 11, 12]),
	// mohammedan AKA harmonic minor AKA algerian (2nd octave)
	// algerian scale is super funky - changes based on octave, maybe not technically twelveTET

	new Scale(Constants.ALTERED, twelveTET, [0, 1, 3, 4, 6, 8, 10, 12]),
	// altered scale AKA super Locrian AKA Locrian b4

	new Scale(Constants.ALTERED_DORIAN, twelveTET, [0, 2, 3, 6, 7, 9, 10, 12]),
	// ukranian dorian AKA ukranian minor AKA dorian #4 AKA Romanian minor AKA altered Dorian

	new Scale(Constants.ALTERED_PHRYGIAN, twelveTET, [0, 1, 4, 5, 7, 8, 10, 12]),
	// phrygian dominant AKA phrygian major AKA jewish (ahava rabba) AKA Freygish AKA altered Phrygian AKA dominant b2 b6 AKA Spanish Phrygian AKA Spanish Gypsy AKA Hijaz-Nahawand AKA Bayati maqam AKA Dastgāh-e Homāyoun

	// new Scale('arabian (a)', twelveTET, [0,2,3,5,6,8,9,11,12]),
	// arabian (a) wasn't found

	new Scale(Constants.ARABIAN, twelveTET, [0, 2, 4, 5, 6, 8, 10, 12]),
	// arabian AKA arabian (b) AKA major locrian

	new Scale(Constants.AUGMENTED, twelveTET, [0, 3, 4, 7, 8, 11, 12]),

	new Scale(Constants.AUXILIARY_AUGMENTED, twelveTET, [0, 2, 4, 6, 8, 10, 12]),
	// auxiliary augmented AKA Lydian auxiliary augmented AKA whole tone

	new Scale(Constants.AUXILIARY_DIMINISHED, twelveTET, [0, 2, 3, 5, 6, 8, 9, 11, 12]),
	// auxiliary diminished AKA diminished AKA diminished minor AKA diminished (whole/half) AKA octatonic (whole/half)

	new Scale(Constants.AUXILIARY_DIMINISHED_BLUES, twelveTET, [0, 1, 3, 4, 6, 7, 9, 10, 12]),

	new Scale(Constants.BALINESE, twelveTET, [0, 1, 3, 7, 8, 12]),

	new Scale(Constants.BAYATI_MAQAM, twelveTET, [0, 1, 4, 5, 7, 8, 10, 12]),
	// phrygian dominant AKA phrygian major AKA jewish (ahava rabba) AKA Freygish AKA altered Phrygian AKA dominant b2 b6 AKA Spanish Phrygian AKA Spanish Gypsy AKA Hijaz-Nahawand AKA Bayati maqam AKA Dastgāh-e Homāyoun

	new Scale(Constants.BEBOP_DOMINANT, twelveTET, [0, 2, 4, 5, 7, 9, 10, 11, 12]),

	new Scale(Constants.BEBOP_DORIAN, twelveTET, [0, 2, 3, 4, 5, 7, 9, 10, 12]),
	// bebop Dorian AKA bebop minor

	new Scale(Constants.BEBOP_DORIAN_TWO, twelveTET, [0, 2, 3, 5, 7, 9, 10, 11, 12]),
	// bebop Dorian second or alternate form AKA bebop minor 2

	new Scale(Constants.BEBOP_HALF_DIMINISHED, twelveTET, [0, 1, 3, 5, 6, 7, 8, 11, 12]),
	// bebop half diminished AKA Phrygiolocrian MAYBE??

	new Scale(Constants.BEBOP_MAJOR, twelveTET, [0, 2, 4, 5, 7, 8, 9, 11, 12]),

	new Scale(Constants.BEBOP_MINOR, twelveTET, [0, 2, 3, 4, 5, 7, 9, 10, 12]),
	// bebop minor AKA bebop Dorian

	new Scale(Constants.BEBOP_MINOR_TWO, twelveTET, [0, 2, 3, 5, 7, 9, 10, 11, 12]),
	// bebop minor 2 AKA bebop Dorian second or alternate form

	new Scale(Constants.BHAIRAV_RAGA, twelveTET, [0, 1, 4, 5, 7, 8, 11, 12]),
	// Bhairav raga AKA byzantine AKA double harmonic major AKA double harmonic

	new Scale(Constants.BLUES, twelveTET, [0, 3, 5, 6, 7, 10, 12]),
	// blues AKA pentatonic blues

	new Scale(Constants.BLUES_VARIATION_ONE, twelveTET, [0, 3, 5, 6, 7, 10, 11, 12]),
	new Scale(Constants.BLUES_VARIATION_TWO, twelveTET, [0, 3, 4, 5, 6, 7, 10, 11, 12]),
	new Scale(Constants.BLUES_VARIATION_THREE, twelveTET, [0, 3, 4, 5, 6, 7, 9, 10, 11, 12]),

	new Scale(Constants.BYZANTINE, twelveTET, [0, 1, 4, 5, 7, 8, 11, 12]),
	// byzantine AKA double harmonic major AKA Bhairav raga AKA double harmonic

	new Scale(Constants.CHINESE, twelveTET, [0, 4, 6, 7, 11, 12]),
	new Scale(Constants.CHINESE_TWO, twelveTET, [0, 2, 5, 7, 9, 12]),

	new Scale(Constants.CHINESE_MONGOLIAN, twelveTET, [0, 2, 4, 7, 9, 12]),
	// chinese mongolian AKA mongolian AKA pentatonic major

	new Scale(Constants.CHROMATIC, twelveTET, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),

	new Scale(Constants.DASTGAH_E_HOMAYOUN, twelveTET, [0, 1, 4, 5, 7, 8, 10, 12]),
	// phrygian dominant AKA phrygian major AKA jewish (ahava rabba) AKA Freygish AKA altered Phrygian AKA dominant b2 b6 AKA Spanish Phrygian AKA Spanish Gypsy AKA Hijaz-Nahawand AKA Bayati maqam AKA Dastgāh-e Homāyoun

	new Scale(Constants.DIMINISHED, twelveTET, [0, 2, 3, 5, 6, 8, 9, 11, 12]),
	// auxiliary diminished AKA diminished AKA diminished minor AKA diminished (whole/half) AKA octatonic (whole/half)

	new Scale(Constants.DIMINISHED_MINOR, twelveTET, [0, 2, 3, 5, 6, 8, 9, 11, 12]),
	// auxiliary diminished AKA diminished AKA diminished minor AKA diminished (whole/half) AKA octatonic (whole/half)

	// new Scale('diminished sevenths', twelveTET, [0,3,6,9,12]),
	// diminished sevenths scale not found

	new Scale(Constants.DIMINISHED_HALF_WHOLE, twelveTET, [0, 1, 3, 4, 6, 7, 9, 10, 12]),
	// diminished half/whole AKA diminished half AKA octatonic (half/whole)

	new Scale(Constants.DIMINISHED_WHOLE_HALF, twelveTET, [0, 2, 3, 5, 6, 8, 9, 11, 12]),
	// auxiliary diminished AKA diminished AKA diminished minor AKA diminished (whole/half) AKA octatonic (whole/half)

	new Scale(Constants.DOMINANT_FLAT_SECOND_FLAT_SIXTH, twelveTET, [0, 1, 4, 5, 7, 8, 10, 12]),
	// phrygian dominant AKA phrygian major AKA jewish (ahava rabba) AKA Freygish AKA altered Phrygian AKA dominant b2 b6 AKA Spanish Phrygian AKA Spanish Gypsy AKA Hijaz-Nahawand AKA Bayati maqam AKA Dastgāh-e Homāyoun

	new Scale(Constants.DOMINANT_PENTATONIC, twelveTET, [0, 2, 4, 7, 10, 12]),

	new Scale(Constants.DORIAN, twelveTET, [0, 2, 3, 5, 7, 9, 10, 12]),

	new Scale(Constants.DORIAN_SHARP_FOURTH, twelveTET, [0, 2, 3, 6, 7, 9, 10, 12]),
	// ukranian dorian AKA ukranian minor AKA dorian #4 AKA Romanian minor AKA altered Dorian

	new Scale(Constants.DOUBLE_HARMONIC_MAJOR, twelveTET, [0, 1, 4, 5, 7, 8, 11, 12]),
	// double Harmonic AKA byzantine AKA Bhairav raga AKA double harmonic

	new Scale(Constants.DOUBLE_HARMONIC_MINOR, twelveTET, [0, 2, 3, 6, 7, 8, 11, 12]),
	// Hungarian gypsy AKA Hungarian minor AKA double harmonic minor scale AKA Gypsy minor AKA algerian (1st octave)

	new Scale(Constants.EGYPTIAN, twelveTET, [0, 2, 5, 7, 10, 12]),
	new Scale(Constants.EIGHT_TONE_SPANISH, twelveTET, [0, 1, 3, 4, 5, 6, 8, 10, 12]),
	new Scale(Constants.ENIGMATIC, twelveTET, [0, 1, 4, 6, 8, 10, 11, 12]),

	new Scale(Constants.ETHIOPIAN_A_RARAY, twelveTET, [0, 2, 4, 5, 7, 9, 11, 12]),
	// ethiopian (a raray) AKA ethiopian araray AKA major scale AKA ionian

	new Scale(Constants.ETHIOPIAN_EZEL, twelveTET, [0, 2, 3, 5, 7, 8, 10, 12]),
	// natural minor AKA aeolian AKA ethiopian Geez AKA ethiopian Ezel AKA melodic minor descending AKA natural (pure) minor

	new Scale(Constants.ETHIOPIAN_GEEZ, twelveTET, [0, 2, 3, 5, 7, 8, 10, 12]),
	// natural minor AKA aeolian AKA ethiopian Geez AKA ethiopian Ezel AKA melodic minor descending AKA natural (pure) minor

	new Scale(Constants.FREYGISH, twelveTET, [0, 1, 4, 5, 7, 8, 10, 12]),
	// phrygian dominant AKA phrygian major AKA jewish (ahava rabba) AKA Freygish AKA altered Phrygian AKA dominant b2 b6 AKA Spanish Phrygian AKA Spanish Gypsy AKA Hijaz-Nahawand AKA Bayati maqam AKA Dastgāh-e Homāyoun

	new Scale(Constants.GYPSY_MINOR, twelveTET, [0, 2, 3, 6, 7, 8, 11, 12]),
	// Hungarian gypsy AKA Hungarian minor AKA double harmonic minor scale AKA Gypsy minor AKA algerian (1st octave)

	new Scale(Constants.HALF_DIMINISHED, twelveTET, [0, 2, 3, 5, 6, 8, 10, 12]),
	// half diminished AKA locrian #2 AKA maybe half diminished #2

	new Scale(Constants.HARMONIC_MINOR, twelveTET, [0, 2, 3, 5, 7, 8, 11, 12]),
	// harmonic minor AKA mohammedan AKA algerian (2nd octave)

	new Scale(Constants.HAWAIIAN, twelveTET, [0, 2, 3, 5, 7, 9, 11, 12]),

	new Scale(Constants.HIJAZ_NAHAWAND, twelveTET, [0, 1, 4, 5, 7, 8, 10, 12]),
	// phrygian dominant AKA phrygian major AKA jewish (ahava rabba) AKA Freygish AKA altered Phrygian AKA dominant b2 b6 AKA Spanish Phrygian AKA Spanish Gypsy AKA Hijaz-Nahawand AKA Bayati maqam AKA Dastgāh-e Homāyoun

	new Scale(Constants.HINDU, twelveTET, [0, 2, 4, 5, 7, 8, 10, 12]),
	// hindu scale AKA Aeolian Dominant AKA Mixolydian b6 (or b13)

	new Scale(Constants.HIRAJOSHI, twelveTET, [0, 4, 5, 9, 11, 12]),
	// hirajōshi AKA hira-choshi

	new Scale(Constants.HIRAJOSHI_TWO, twelveTET, [0, 2, 3, 7, 8, 12]),
	// hirajōshi AKA hira-choshi

	new Scale(Constants.HUNGARIAN_GYPSY, twelveTET, [0, 2, 3, 6, 7, 8, 11, 12]),
	// Hungarian gypsy AKA Hungarian minor AKA double harmonic minor scale AKA Gypsy minor AKA algerian (1st octave)

	// new Scale('hungarian gypsy persian', twelveTET, [0,1,4,5,7,8,11,12]),
	// hungarian gypsy persian scale not found

	new Scale(Constants.HUNGARIAN_MAJOR, twelveTET, [0, 3, 4, 6, 7, 9, 10, 12]),

	new Scale(Constants.HUNGARIAN_MINOR, twelveTET, [0, 2, 3, 6, 7, 8, 11, 12]),
	// Hungarian gypsy AKA Hungarian minor AKA double harmonic minor scale AKA Gypsy minor AKA algerian (1st octave)

	new Scale(Constants.IONIAN, twelveTET, [0, 2, 4, 5, 7, 9, 11, 12]),
	// ethiopian (a raray) AKA ethiopian araray AKA major scale AKA ionian

	new Scale(Constants.IONIAN_SHARP_FIFTH, twelveTET, [0, 2, 4, 5, 8, 9, 11, 12]),
	new Scale(Constants.IWATO, twelveTET, [0, 1, 5, 6, 10, 12]),

	new Scale(Constants.JAPANESE, twelveTET, [0, 1, 5, 7, 8, 12]),
	// japanese (a) AKA maybe kumoi 2

	new Scale(Constants.JAPANESE_TWO, twelveTET, [0, 2, 5, 7, 8, 12]),
	// japanese 2 AKA maybe japanese (b)

	new Scale(Constants.JAPANESE_ICHIKOSUCHO, twelveTET, [0, 2, 4, 5, 6, 7, 9, 11, 12]),
	new Scale(Constants.JAPANESE_INSEN, twelveTET, [0, 1, 5, 7, 10, 12]),
	new Scale(Constants.JAPANESE_TAISHIKICHO, twelveTET, [0, 2, 4, 5, 6, 7, 9, 10, 11, 12]),
	new Scale(Constants.JAVANESE, twelveTET, [0, 1, 3, 5, 7, 9, 10, 12]),
	new Scale(Constants.JEWISH_ADONAI_MALAKH, twelveTET, [0, 1, 2, 3, 5, 7, 9, 10, 12]),

	new Scale(Constants.JEWISH_AHAVA_RABBA, twelveTET, [0, 1, 4, 5, 7, 8, 10, 12]),
	// phrygian dominant AKA phrygian major AKA jewish (ahava rabba) AKA Freygish AKA altered Phrygian AKA dominant b2 b6 AKA Spanish Phrygian AKA Spanish Gypsy AKA Hijaz-Nahawand AKA Bayati maqam AKA Dastgāh-e Homāyoun

	// new Scale('jewish (magen abot)', twelveTET, [0,1,3,4,6,8,10,11,12]),
	// jewish magen avot not found consistently

	new Scale(Constants.KUMOI, twelveTET, [0, 2, 3, 7, 9, 12]),

	new Scale(Constants.KUMOI_TWO, twelveTET, [0, 1, 5, 7, 8, 12]),
	// japanese (a) AKA maybe kumoi 2

	new Scale(Constants.LEADING_WHOLE_TONE, twelveTET, [0, 2, 4, 6, 8, 10, 11, 12]),
	new Scale(Constants.LOCRIAN, twelveTET, [0, 1, 3, 5, 6, 8, 10, 12]),
	new Scale(Constants.LOCRIAN_FLAT_FOURTH, twelveTET, [0, 1, 3, 4, 6, 8, 10, 12]),
	// altered scale AKA super Locrian AKA Locrian b4

	new Scale(Constants.LOCRIAN_NATURAL_SIXTH, twelveTET, [0, 1, 3, 5, 6, 9, 10, 12]),

	new Scale(Constants.LOCRIAN_SHARP_SECOND, twelveTET, [0, 2, 3, 5, 6, 8, 10, 12]),
	// half diminished AKA locrian #2 AKA maybe half diminished #2

	new Scale(Constants.LYDIAN, twelveTET, [0, 2, 4, 6, 7, 9, 11, 12]),
	new Scale(Constants.LYDIAN_SHARP_SECOND, twelveTET, [0, 3, 4, 6, 7, 9, 11, 12]),
	new Scale(Constants.LYDIAN_AUGMENTED, twelveTET, [0, 2, 4, 6, 8, 9, 11, 12]),

	new Scale(Constants.LYDIAN_AUXILIARY_AUGMENTED, twelveTET, [0, 2, 4, 6, 8, 10, 12]),
	// auxiliary augmented AKA Lydian auxiliary augmented AKA whole tone

	new Scale(Constants.LYDIAN_FLAT_THIRD, twelveTET, [0, 2, 3, 6, 7, 9, 11, 12]),
	// lydian diminshed AKA lydian b3

	new Scale(Constants.LYDIAN_DIMINISHED, twelveTET, [0, 2, 3, 6, 7, 9, 11, 12]),
	// lydian diminshed AKA lydian b3

	new Scale(Constants.LYDIAN_MINOR, twelveTET, [0, 2, 4, 6, 7, 8, 10, 12]),

	new Scale(Constants.MAJOR, twelveTET, [0, 2, 4, 5, 7, 9, 11, 12]),
	// ethiopian (a raray) AKA ethiopian araray AKA major scale AKA ionian

	new Scale(Constants.MAJOR_ARPEGGIO, twelveTET, [0, 4, 7, 12]),
	new Scale(Constants.MAJOR_BLUES, twelveTET, [0, 2, 3, 4, 7, 9, 12]),
	new Scale(Constants.MAJOR_LOCRIAN, twelveTET, [0, 2, 4, 5, 6, 8, 10, 12]),
	// major locrian AKA arabian (b)?

	// new Scale('melodic minor', twelveTET, [0,2,3,5,7,9,11,12]),
	// melodic minor AKA melodic minor (ascending)

	new Scale(Constants.MELODIC_MINOR_ASCENDING, twelveTET, [0, 2, 3, 5, 7, 9, 11, 12]),
	// melodic minor AKA melodic minor (ascending)

	new Scale(Constants.MELODIC_MINOR_DESCENDING, twelveTET, [0, 2, 3, 5, 7, 8, 10, 12]),
	// melodic minor descending AKA natural minor AKA natural (pure) minor AKA aeolian AKA ethiopian Geez AKA ethiopian Ezel

	new Scale(Constants.MINOR_ARPEGGIO, twelveTET, [0, 3, 7, 12]),

	new Scale(Constants.MIXO_BLUES, twelveTET, [0, 2, 3, 4, 5, 6, 7, 9, 10, 12]),
	// mixo-blues AKA mixolydian blues AKA  mixo-Dorian blues scale AKA mixolydian/blues hybrid

	new Scale(Constants.MIXO_DORIAN_BLUES, twelveTET, [0, 2, 3, 4, 5, 6, 7, 9, 10, 12]),
	// mixo-blues AKA mixolydian blues AKA  mixo-Dorian blues scale AKA mixolydian/blues hybrid

	new Scale(Constants.MIXOLYDIAN, twelveTET, [0, 2, 4, 5, 7, 9, 10, 12]),

	new Scale(Constants.MIXOLYDIAN_BLUES, twelveTET, [0, 2, 3, 4, 5, 6, 7, 9, 10, 12]),
	// mixo-blues AKA mixolydian blues AKA  mixo-Dorian blues scale AKA mixolydian/blues hybrid

	new Scale(Constants.MIXOLYDIAN_FLAT_SIXTH, twelveTET, [0, 2, 4, 5, 7, 8, 10, 12]),
	// hindu scale AKA Aeolian Dominant AKA Mixolydian b6 (or b13)

	new Scale(Constants.MOHAMMEDAN, twelveTET, [0, 2, 3, 5, 7, 8, 11, 12]),
	// mohammedan AKA harmonic minor AKA algerian (2nd octave)

	new Scale(Constants.MONGOLIAN, twelveTET, [0, 2, 4, 7, 9, 12]),
	// chinese mongolian AKA mongolian AKA pentatonic major

	new Scale(Constants.MOORISH_PHRYGIAN, twelveTET, [0, 1, 3, 4, 5, 7, 8, 10, 11, 12]),
	// moorish phrygian AKA phrygian/double harmonic major mixed

	new Scale(Constants.NATURAL_MINOR, twelveTET, [0, 2, 3, 5, 7, 8, 10, 12]),
	// natural minor AKA melodic minor descending AKA natural (pure) minor AKA aeolian AKA ethiopian Geez AKA ethiopian Ezel

	// new Scale('neapolitan', twelveTET, [0,1,3,5,7,8,11,12]),
	// neapolitan scale in this form not found - only the major and minor versions

	new Scale(Constants.NEAPOLITAN_MAJOR, twelveTET, [0, 1, 3, 5, 7, 9, 11, 12]),
	new Scale(Constants.NEAPOLITAN_MINOR, twelveTET, [0, 1, 3, 5, 7, 8, 10, 12]),
	// neapolitan minor AKA phrygian

	new Scale(Constants.NINE_TONE_SCALE, twelveTET, [0, 2, 3, 4, 6, 7, 8, 9, 11, 12]),

	new Scale(Constants.OCTATONIC_HALF_WHOLE, twelveTET, [0, 1, 3, 4, 6, 7, 9, 10, 12]),
	// octatonic (half/whole) AKA diminished half/whole AKA diminished half

	new Scale(Constants.OCTATONIC_WHOLE_HALF, twelveTET, [0, 2, 3, 5, 6, 8, 9, 11, 12]),
	// auxiliary diminished AKA diminished AKA diminished minor AKA diminished (whole/half) AKA octatonic (whole/half)

	// new Scale('oriental (a)', twelveTET, [0,1,4,5,6,8,10,12]),
	// oriental (a) scale not found

	new Scale(Constants.ORIENTAL, twelveTET, [0, 1, 4, 5, 6, 9, 10, 12]),
	// oriental AKA maybe oriental (b)

	new Scale(Constants.OVERTONE, twelveTET, [0, 2, 4, 6, 7, 9, 10, 12]),
	new Scale(Constants.PELOG, twelveTET, [0, 1, 3, 7, 8, 12]),
	new Scale(Constants.PELOG_TWO, twelveTET, [0, 1, 3, 7, 10, 12]),
	new Scale(Constants.PENTATONIC_BLUES, twelveTET, [0, 3, 5, 6, 7, 10, 12]),

	new Scale(Constants.PENTATONIC_MAJOR, twelveTET, [0, 2, 4, 7, 9, 12]),
	// chinese mongolian AKA mongolian AKA pentatonic major

	new Scale(Constants.PENTATONIC_MINOR, twelveTET, [0, 3, 5, 7, 10, 12]),
	new Scale(Constants.PENTATONIC_NEUTRAL, twelveTET, [0, 2, 5, 7, 10, 12]),
	new Scale(Constants.PERSIAN, twelveTET, [0, 1, 4, 5, 6, 8, 11, 12]),

	new Scale(Constants.PHRYGIAN, twelveTET, [0, 1, 3, 5, 7, 8, 10, 12]),
	// phrygian AKA neapolitan minor

	new Scale(Constants.PHRYGIAN_DOMINANT, twelveTET, [0, 1, 4, 5, 7, 8, 10, 12]),
	// phrygian dominant AKA phrygian major AKA jewish (ahava rabba) AKA Freygish AKA altered Phrygian AKA dominant b2 b6 AKA Spanish Phrygian AKA Spanish Gypsy AKA Hijaz-Nahawand AKA Bayati maqam AKA Dastgāh-e Homāyoun

	new Scale(Constants.PHRYGIAN_MAJOR, twelveTET, [0, 1, 4, 5, 7, 8, 10, 12]),
	// phrygian major AKA phrygian dominant AKA jewish (ahava rabba) AKA Freygish AKA altered Phrygian AKA dominant b2 b6 AKA Spanish Phrygian AKA Spanish Gypsy AKA Hijaz-Nahawand AKA Bayati maqam AKA Dastgāh-e Homāyoun

	new Scale(Constants.PROMETHEUS, twelveTET, [0, 2, 4, 6, 9, 10, 12]),
	new Scale(Constants.PROMETHEUS_NEAPOLITAN, twelveTET, [0, 1, 4, 6, 9, 10, 12]),

	new Scale(Constants.ROMANIAN_MINOR, twelveTET, [0, 2, 3, 6, 7, 9, 10, 12]),
	// ukranian dorian AKA ukranian minor AKA dorian #4 AKA Romanian minor AKA altered Dorian

	new Scale(Constants.SIX_TONE_SYMMETRICAL, twelveTET, [0, 1, 4, 5, 8, 9, 12]),

	new Scale(Constants.SPANISH_GYPSY, twelveTET, [0, 1, 4, 5, 7, 8, 10, 12]),
	// Spanish Gypsy AKA phrygian major AKA phrygian dominant AKA jewish (ahava rabba) AKA Freygish AKA altered Phrygian AKA dominant b2 b6 AKA Spanish Phrygian AKA Hijaz-Nahawand AKA Bayati maqam AKA Dastgāh-e Homāyoun

	new Scale(Constants.SPANISH_PHRYGIAN, twelveTET, [0, 1, 4, 5, 7, 8, 10, 12]),
	// phrygian dominant AKA phrygian major AKA jewish (ahava rabba) AKA Freygish AKA altered Phrygian AKA dominant b2 b6 AKA Spanish Phrygian AKA Spanish Gypsy AKA Hijaz-Nahawand AKA Bayati maqam AKA Dastgāh-e Homāyoun

	new Scale(Constants.SUPER_LOCRIAN, twelveTET, [0, 1, 3, 4, 6, 8, 10, 12]),
	// super Locrian AKA altered scale AKA Locrian b4

	new Scale(Constants.UKRAINIAN_DORIAN, twelveTET, [0, 2, 3, 6, 7, 9, 10, 12]),
	// ukranian dorian AKA ukranian minor AKA dorian #4 AKA Romanian minor AKA altered Dorian

	new Scale(Constants.UKRAINIAN_MINOR, twelveTET, [0, 2, 3, 6, 7, 9, 10, 12]),
	// ukranian dorian AKA ukranian minor AKA dorian #4 AKA Romanian minor AKA altered Dorian

	new Scale(Constants.ULTRA_LOCRIAN, twelveTET, [0, 1, 3, 4, 6, 8, 9, 12]),

	new Scale(Constants.WHOLE_TONE, twelveTET, [0, 2, 4, 6, 8, 10, 12])
	// auxiliary augmented AKA Lydian auxiliary augmented AKA whole tone
];

export default scales;
