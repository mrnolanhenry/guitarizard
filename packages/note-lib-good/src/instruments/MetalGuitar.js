const diatonic = require('../data/scaleSystems/diatonic');
const FretBoard = require('./FretBoard');
const TunedString = require('./TunedString');

module.exports = class MetalGuitar {
  constructor(fretCount) {
    const tunedStrings = [
      new TunedString(diatonic.E, 'metal', 0.2540),
      new TunedString(diatonic.A, 'metal', 0.3302),
      new TunedString(diatonic.D, 'metal', 0.4318),
      new TunedString(diatonic.G, 'metal', 0.6604),
      new TunedString(diatonic.B, 'metal', 0.9144),
      new TunedString(diatonic.E, 'metal', 1.1684)      
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