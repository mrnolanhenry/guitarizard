const Scale = require('../Scale')
const diatonic = require('./scaleSystem/diatonic');

module.exports = [
  new Scale('aeolian', diatonic, [0,2,3,5,7,8,10,12]),
  // aeolian AKA natural minor AKA ethiopian Geez AKA ethiopian Ezel AKA melodic minor descending AKA natural (pure) minor

  new Scale('algerian (1st octave)', diatonic, [0,2,3,6,7,8,11,12]),
  new Scale('algerian (2nd octave)', diatonic, [0,2,3,5,7,8,11,12]),
  // algerian scale is super funky - changes based on octave

  new Scale('altered', diatonic, [0,1,3,4,6,8,10,12]),
  // altered scale AKA super Locrian AKA Locrian b4

  // new Scale('arabian (a)', diatonic, [0,2,3,5,6,8,9,11,12]),
  // arabian (a) wasn't found

  // new Scale('arabian (b)', diatonic, [0,2,4,5,6,8,10,12]),
  // arabian (b) is the same as major locrian

  new Scale('augmented', diatonic, [0,3,4,7,8,11,12]),

  // new Scale('auxiliary augmented', diatonic, [0,2,4,6,8,10,12]),
  // auxiliary augment AKA Lydian auxiliary augmented AKA whole tone

  new Scale('auxiliary diminished', diatonic, [0,2,3,5,6,8,9,11,12]),
  new Scale('auxiliary diminished blues', diatonic, [0,1,3,4,6,7,9,10,12]),

  new Scale('balinese', diatonic, [0,1,3,7,8,12]),
  new Scale('bebop dominant', diatonic, [0,2,4,5,7,9,10,11,12]),

  new Scale('bebop half diminished', diatonic, [0,1,3,5,6,7,8,11,12]),
  // bebop half diminished AKA Phrygiolocrian MAYBE??

  new Scale('bebop major', diatonic, [0,2,4,5,7,8,9,11,12]),

  new Scale('bebop minor', diatonic, [0,2,3,4,5,7,9,10,12]),
  // bebop minor AKA bebop Dorian

  new Scale('bebop minor 2', diatonic, [0,2,3,5,7,9,10,11,12]),
  // bebop minor 2 AKA bebop Dorian second or alternate form

  new Scale('blues', diatonic, [0,3,5,6,7,10,12]),
  // AKA pentatonic blues

  new Scale('blues variation 1', diatonic, [0,3,5,6,7,10,11,12]),
  new Scale('blues variation 2', diatonic, [0,3,4,5,6,7,10,11,12]),
  new Scale('blues variation 3', diatonic, [0,3,4,5,6,7,9,10,11,12]),

  new Scale('byzantine', diatonic, [0,1,4,5,7,8,11,12]),
  // byzantine AKA double harmonic major

  new Scale('chinese', diatonic, [0,4,6,7,11,12]),
  new Scale('chinese 2', diatonic, [0,2,5,7,9,12]),

  // new Scale('chinese mongolian', diatonic, [0,2,4,7,9,12]),
  // chinese mongolian AKA mongolian AKA diatonic

  new Scale('chromatic', diatonic, [0,1,2,3,4,5,6,7,8,9,10,11,12]),

  new Scale('diatonic', diatonic, [0,2,4,7,9,12]),
  // diatonic AKA chinese mongolian AKA mongolian

  new Scale('diminished', diatonic, [0,2,3,5,6,8,9,11,12]),
  // diminished AKA diminished minor

  // new Scale('diminished sevenths', diatonic, [0,3,6,9,12]),
  // diminished sevenths scale not found

  new Scale('diminished (half/whole)', diatonic, [0,1,3,4,6,7,9,10,12]),
  // diminished half/whole AKA diminished half AKA octatonic (half/whole)

  new Scale('diminished (whole/half)', diatonic, [0,2,3,5,6,8,9,11,12]),
  // diminished whole/half AKA octatonic (whole/half)

  new Scale('dominant pentatonic', diatonic, [0,2,4,7,10,12]),

  new Scale('dorian', diatonic, [0,2,3,5,7,9,10,12]),

  new Scale('double harmonic', diatonic, [0,1,4,5,7,8,11,12]),
  // double Harmonic AKA byzantine

  new Scale('egyptian', diatonic, [0,2,5,7,10,12]),
  new Scale('8 tone spanish', diatonic, [0,1,3,4,5,6,8,10,12]),
  new Scale('enigmatic', diatonic, [0,1,4,6,8,10,11,12]),

  // new Scale('ethiopian (a raray)', diatonic, [0,2,4,5,7,9,11,12]),
  // ethiopian (a raray) AKA ethiopian araray AKA major scale

  // new Scale('ethiopian (Geez)', diatonic, [0,2,3,5,7,8,10,12]),
  // natural minor AKA aeolian AKA ethiopian Geez AKA ethiopian Ezel AKA melodic minor descending AKA natural (pure) minor

  new Scale('half diminished', diatonic, [0,2,3,5,6,8,10,12]),
  // half diminished AKA locrian #2 AKA maybe half diminished #2

  new Scale('harmonic minor', diatonic, [0,2,3,5,7,8,11,12]),
  // harmonic minor AKA mohammedan

  new Scale('hawaiian', diatonic, [0,2,3,5,7,9,11,12]),

  new Scale('hindu', diatonic, [0,2,4,5,7,8,10,12]),
  // hindu scale AKA Aeolian Dominant AKA Mixolydian b6 (or b13)

  new Scale('hirajōshi', diatonic,[0,4,5,9,11,12]),
  // hirajōshi AKA hira-choshi
  new Scale('hirajōshi 2', diatonic,[0,2,3,7,8,12]),
  // hirajōshi AKA hira-choshi

  new Scale('hungarian gypsy', diatonic, [0,2,3,6,7,8,11,12]),
  // Hungarian gypsy AKA Hungarian minor AKA double harmonic minor scale AKA Gypsy minor

  // new Scale('hungarian gypsy persian', diatonic, [0,1,4,5,7,8,11,12]),
  // hungarian gypsy persian scale not found

  new Scale('hungarian major', diatonic, [0,3,4,6,7,9,10,12]),

  // new Scale('hungarian minor', diatonic, [0,2,3,6,7,8,11,12]),
  // Hungarian gypsy AKA Hungarian minor AKA double harmonic minor scale AKA Gypsy minor

  new Scale('ionian', diatonic, [0,2,4,5,7,9,11,12]),
  new Scale('ionian #5', diatonic, [0,2,4,5,8,9,11,12]),
  new Scale('iwato', diatonic, [0,1,5,6,10,12]),

  new Scale('japanese 2', diatonic, [0,2,5,7,8,12]),
  // japanese 2 AKA maybe japanese (b)

  new Scale('japanese (ichikosucho)', diatonic, [0,2,4,5,6,7,9,11,12]),
  new Scale('japanese (insen)', diatonic, [0,1,5,7,10,12]),
  new Scale('japanese (taishikicho)', diatonic, [0,2,4,5,6,7,9,10,11,12]),
  new Scale('javanese', diatonic, [0,1,3,5,7,9,10,12]),
  new Scale('jewish (adonai malakh)', diatonic, [0,1,2,3,5,7,9,10,12]),

  new Scale('phrygian dominant', diatonic, [0,1,4,5,7,8,10,12]),
  // phrygian dominant AKA phrygian major AKA jewish (ahava rabba) AKA Freygish AKA altered Phrygian AKA dominant b2 b6 AKA Spanish Phrygian AKA Spanish Gypsy AKA Hijaz-Nahawand AKA Bayati maqam AKA Dastgāh-e Homāyoun

  // new Scale('jewish (magen abot)', diatonic, [0,1,3,4,6,8,10,11,12]),
  // jewish magen avot not found consistently

  new Scale('kumoi', diatonic, [0,2,3,7,9,12]),

  new Scale('kumoi 2', diatonic, [0,1,5,7,8,12]),
  // japanese (a) AKA maybe kumoi 2

  new Scale('leading whole tone', diatonic, [0,2,4,6,8,10,11,12]),
  new Scale('locrian', diatonic, [0,1,3,5,6,8,10,12]),
  new Scale('locrian 6', diatonic, [0,1,3,5,6,9,10,12]),
  new Scale('lydian', diatonic, [0,2,4,6,7,9,11,12]),
  new Scale('lydian #2', diatonic, [0,3,4,6,7,9,11,12]),
  new Scale('lydian augmented', diatonic, [0,2,4,6,8,9,11,12]),
  new Scale('lydian diminished', diatonic, [0,2,3,6,7,9,11,12]),
  // lydian diminshed AKA lydian b3

  new Scale('lydian minor', diatonic, [0,2,4,6,7,8,10,12]),

  new Scale('major', diatonic, [0,2,4,5,7,9,11,12]),
  // ethiopian (a raray) AKA ethiopian araray AKA major scale

  new Scale('major arpeggio', diatonic, [0,4,7,12]),
  new Scale('major blues', diatonic, [0,2,3,4,7,9,12]),
  new Scale('major locrian', diatonic, [0,2,4,5,6,8,10,12]),
  // major locrian AKA arabian (b)?

  new Scale('melodic minor', diatonic, [0,2,3,5,7,9,11,12]),
  // melodic minor AKA melodic minor (ascending)

  // new Scale('melodic minor (descending)', diatonic, [0,2,3,5,7,8,10,12]),
  // melodic minor descending AKA natural minor AKA natural (pure) minor

  new Scale('minor arpeggio', diatonic, [0,3,7,12]),

  new Scale('mixo-blues', diatonic, [0,2,3,4,5,6,7,9,10,12]),
  // mixo-blues AKA mixolydian blues AKA  mixo-Dorian blues scale AKA mixolydian/blues hybrid

  new Scale('mixolydian', diatonic, [0,2,4,5,7,9,10,12]),

  // new Scale('mohammedan', diatonic, [0,2,3,5,7,8,11,12]),
  // mohammedan AKA harmonic minor

  new Scale('moorish phrygian', diatonic, [0,1,3,4,5,7,8,10,11,12]),
  // moorish phrygian AKA phrygian/double harmonic major mixed

  // new Scale('natural minor', diatonic, [0,2,3,5,7,8,10,12]),
  // natural minor AKA melodic minor descending AKA natural (pure) minor AKA aeolian AKA ethiopian Geez AKA ethiopian Ezel

  // new Scale('neapolitan', diatonic, [0,1,3,5,7,8,11,12]),
  // neapolitan scale in this form not found - only the major and minor versions

  new Scale('neapolitan major', diatonic, [0,1,3,5,7,9,11,12]),
  new Scale('neapolitan minor', diatonic, [0,1,3,5,7,8,10,12]),
  // neapolitan minor AKA phrygian

  new Scale('nine tone scale', diatonic, [0,2,3,4,6,7,8,9,11,12]),

  // new Scale('octatonic (H-W)', diatonic, [0,1,3,4,6,7,9,10,12]),
  // octatonic (half/whole) AKA diminished half/whole AKA diminished half

  // new Scale('octatonic (W-H)', diatonic, [0,2,3,5,6,8,9,11,12]),
  // octatonic (whole/half) AKA diminished whole/half

  // new Scale('oriental (a)', diatonic, [0,1,4,5,6,8,10,12]),
  // oriental (a) scale not found

  new Scale('oriental', diatonic, [0,1,4,5,6,9,10,12]),
  // oriental AKA maybe oriental (b)

  new Scale('overtone', diatonic, [0,2,4,6,7,9,10,12]),
  new Scale('pelog', diatonic, [0,1,3,7,8,12]),
  new Scale('pelog 2', diatonic, [0,1,3,7,10,12]),
  new Scale('pentatonic blues', diatonic, [0,3,5,6,7,10,12]),
  new Scale('pentatonic major', diatonic, [0,2,4,7,9,12]),
  new Scale('pentatonic minor', diatonic, [0,3,5,7,10,12]),
  new Scale('pentatonic neutral', diatonic, [0,2,5,7,10,12]),
  new Scale('persian', diatonic, [0,1,4,5,6,8,11,12]),

  // new Scale('phrygian', diatonic, [0,1,3,5,7,8,10,12]),
  // phrygian AKA neapolitan minor

  // new Scale('phrygian major', diatonic, [0,1,4,5,7,8,10,12]),
  // phrygian major AKA phrygian dominant AKA jewish (ahava rabba) AKA Freygish AKA altered Phrygian AKA dominant b2 b6 AKA Spanish Phrygian AKA Spanish Gypsy AKA Hijaz-Nahawand AKA Bayati maqam AKA Dastgāh-e Homāyoun

  new Scale('prometheus', diatonic, [0,2,4,6,9,10,12]),
  new Scale('prometheus neopolitan', diatonic, [0,1,4,6,9,10,12]),

  new Scale('romanian minor', diatonic, [0,2,3,6,7,9,10,12]),
  // ukranian dorian AKA ukranian minor AKA dorian #4 AKA Romanian minor AKA altered Dorian

  new Scale('6 tone symmetrical', diatonic, [0,1,4,5,8,9,12]),

  // new Scale('spanish gypsy', diatonic, [0,1,4,5,7,8,10,12]),
  // Spanish Gypsy AKA phrygian major AKA phrygian dominant AKA jewish (ahava rabba) AKA Freygish AKA altered Phrygian AKA dominant b2 b6 AKA Spanish Phrygian AKA Hijaz-Nahawand AKA Bayati maqam AKA Dastgāh-e Homāyoun

  // new Scale('super locrian', diatonic, [0,1,3,4,6,8,10,12]),
  // super Locrian AKA altered scale AKA Locrian b4

  // new Scale('ukranian dorian', diatonic, [0,2,3,6,7,9,10,12]),
  // ukranian dorian AKA ukranian minor AKA dorian #4 AKA Romanian minor AKA altered Dorian

  new Scale('ultra locrian', diatonic, [0,1,3,4,6,8,9,12]),

  new Scale('whole tone', diatonic, [0,2,4,6,8,10,12])
  // auxiliary augment AKA Lydian auxiliary augmented AKA whole tone
];