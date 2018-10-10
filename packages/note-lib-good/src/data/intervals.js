const Interval = require('../Interval');

const mainIntervals = [
  {
    semitones: 0,
    aliases: [
      { name: 'perfect', long: 'Perfect unison', short: 'P1' },
      { name: 'diminished', long: 'Diminished second', short: 'd2' },
      { name: 'root', short: 'R' }
    ]
  },
  {
    semitones: 1,
    aliases: [
      { name: 'minor', long: 'Minor second', short: 'm2' },
      { name: 'augmented', long: 'Augmented unison', short: 'A1' },
      { name: 'semitone', short: 'S' },
      { name: 'half tone' },
      { name: 'half tone' }
    ]
  },
  {
    semitones: 2,
    aliases: [
      { name: "major", long: 'Major second', short: 'M2' },
      { name: "diminished", long: 'Diminished third', short: 'd3' },
      { name: "tone", short: 'T' },
      { name: 'whole tone' },
      { name: 'whole step' }
    ]
  },
  {
    semitones: 3,
    aliases: [
      { name: "minor", long: 'Minor third', short: 'm3' },
      { name: "augmented", long: 'Augmented second', short: 'A2'}
    ]
  },
  {
    semitones: 4,
    aliases: [
      { name: "major", long: 'Major third', short: 'M3' },
      { name: "diminished", long: 'Diminished fourth', short: 'd4' }
    ]
  },
  {
    semitones: 5,
    aliases: [
      { name: 'perfect', long: 'Perfect fourth', short: 'P4' },
      { name: 'augmented', long: 'Augmented third', short: 'A3' }
    ]
  },
  {
    semitones: 6,
    aliases: [
      { name: 'diminished', long: 'Diminished fifth', short: 'd5' },
      { name: 'augmented', long: 'Augmented fourth', short: 'A4' },
      { name: 'tritone', short: 'TT' }
    ]
  },
  {
    semitones: 7,
    aliases: [
      { name: 'perfect', long: 'Perfect fifth', short: 'P5' },
      { name: 'diminished', long: 'Diminished sixth', short: 'd6'}
    ]
  },
  {
    semitones: 8,
    aliases: [
      { name: 'minor', long: 'Minor sixth', short: 'm6' },
      { name: 'augmented', long: 'Augmented fifth', short: 'A5'}
    ]
  },
  {
    semitones: 9,
    aliases: [
      { name: 'major', long: 'Major sixth', short: 'M6' },
      { name: 'diminished', long: 'Diminished seventh', short: 'd7'}
    ]
  },
  {
    semitones: 10,
    aliases: [
      { name: 'minor', long: 'Minor seventh', short: 'm7' },
      { name: 'augmented', long: 'Augmented sixth', short: 'A6' }
    ]
  },
  {
    semitones: 11,
    aliases: [
      { name: 'major', long: 'Major seventh', short: 'M7' },
      { name: 'diminished', long: 'Diminished octave', short: 'd8' }
    ]
  },
  {
    semitones: 12,
    aliases: [
      { name: 'perfect', long: 'Perfect octave', short: 'P8' },
      { name: 'augmented', long: 'Augmented seventh', short: 'A7' }
    ]
  }
];

exports.mainIntervals = mainIntervals.map(interval =>
  new Interval(interval.semitones, interval.aliases))

// expose `exports.[alias.short] = <interval>`
// for easy access, e.g. "intervals.P1"
mainIntervals.forEach(interval => {
  const aliases = interval.aliases;
  aliases.forEach(alias => {
    if (alias.short) {
      exports[alias.short] = alias;
    }
  });
})
