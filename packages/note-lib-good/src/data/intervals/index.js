const Interval = require('../../Interval');

const mainIntervals = [
  {
    semitones: 0, 
    aliases: {
      perfect: { name: 'Perfect unison', short: 'P1' },
      diminished: { name: 'Diminished second', short: 'd2' },
      alt1: { name: 'root', short: 'R' }
    }
  },
  {
    semitones: 1, 
    aliases: { 
      minor: { name: 'Minor second', short: 'm2' },
      augmented: { name: 'Augmented unison', short: 'A1' },
      alt1: { name: 'Semitone', short: 'S' },
      alt2: { name: 'half tone' },
      alt3: { name: 'half step' } 
    }
  },
  {
    semitones: 2, 
    aliases: { 
      major: { name: 'Major second', short: 'M2' },
      diminished: { name: 'Diminished third', short: 'd3' },
      alt1: { name: 'Tone', short: 'T' },
      alt2: { name: 'whole tone' },
      alt3: { name: 'whole step' }
    }
  },
  {
    semitones: 3, 
    aliases: { 
      minor: { name: 'Minor third', short: 'm3' },
      augmented: { name: 'Augmented second', short: 'A2'}
    }
  },
  {
    semitones: 4, 
    aliases: { 
      major: { name: 'Major third', short: 'M3' },
      diminished: { name: 'Diminished fourth', short: 'd4' }
    }
  },
  {
    semitones: 5, 
    aliases: { 
      perfect: { name: 'Perfect fourth', short: 'P4' },
      augmented: { name: 'Augmented third', short: 'A3' }
    }
  },
  {
    semitones: 6, 
    aliases: { 
      diminished: { name: 'Diminished fifth', short: 'd5' },
      augmented: { name: 'Augmented fourth', short: 'A4' },
      alt1: { name: 'Tritone', short: 'TT' }
    }
  },
  {
    semitones: 7, 
    aliases: { 
      perfect: { name: 'Perfect fifth', short: 'P5' },
      diminished: { name: 'Diminished sixth', short: 'd6'}
    }
  },
  {
    semitones: 8, 
    aliases: { 
      minor: { name: 'Minor sixth', short: 'm6' },
      augmented: { name: 'Augmented fifth', short: 'A5'}
    }
  },
  {
    semitones: 9, 
    aliases: { 
      major: { name: 'Major sixth', short: 'M6' },
      diminished: { name: 'Diminished seventh', short: 'd7'}
    }
  },
  {
    semitones: 10,
    aliases: { 
      minor: { name: 'Minor seventh', short: 'm7' }, 
      augmented: { name: 'Augmented sixth', short: 'A6' }
    }
  },
  {
    semitones: 11,
    aliases: { 
      major: { name: 'Major seventh', short: 'M7' }, 
      diminished: { name: 'Diminished octave', short: 'd8' }
    }
  },
  {
    semitones: 12,
    aliases: { 
      perfect: { name: 'Perfect octave', short: 'P8' }, 
      augmented: { name: 'Augmented seventh', short: 'A7' }
    }
  }
];

exports.mainIntervals = mainIntervals.map(interval =>
  new Interval(interval.semitones, interval.aliases))

// expose `exports.[alias] = <interval>`
// for easy access, e.g. "intervals.P1"
mainIntervals.forEach(interval => {
  const aliases = interval.aliases;
  Object.keys(aliases).forEach(key => {
    const shortCode = aliases[key].short;
    if (shortCode) {
      exports[shortCode] = interval;
    }
  })
})
