const diatonic = require('../data/scaleSystems/diatonic');
const FretBoard = require('./FretBoard');
const TunedString = require('./TunedString');

module.exports = class Guitar {
  constructor(fretCount, tuning) {

    if (typeof tuning === 'undefined') {
      tuning = [
        diatonic.E,
        diatonic.A,
        diatonic.D,
        diatonic.G,
        diatonic.B,
        diatonic.E        
      ]
    }

    const tunedStrings = [
      new TunedString(tuning[0], 'metal', 0.2540),
      new TunedString(tuning[1], 'metal', 0.3302),
      new TunedString(tuning[2], 'metal', 0.4318),
      new TunedString(tuning[3], 'metal', 0.6604),
      new TunedString(tuning[4], 'metal', 0.9144),
      new TunedString(tuning[5], 'metal', 1.1684)      
    ];

    const stringConfig = [
      { fret: { start: 0, end: fretCount } },
      { fret: { start: 0, end: fretCount } },
      { fret: { start: 0, end: fretCount } },
      { fret: { start: 0, end: fretCount } },
      { fret: { start: 0, end: fretCount } },
      { fret: { start: 0, end: fretCount } }
    ];
    
    this.fretBoard = new FretBoard(diatonic, tunedStrings, stringConfig)
  }
}