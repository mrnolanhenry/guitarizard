const diatonic = require('../data/scaleSystem/diatonic');
const FretBoard = require('./FretBoard');
const TunedString = require('./TunedString');

module.exports = class Guitar {
  constructor(fretCount, tuning) {
    this.name = 'guitar';

    // left to right on the guitar
    const tunedStrings = [
      new TunedString('E-string', tuning[0], 'metal', 1.1684),
      new TunedString('B-string', tuning[1], 'metal', 0.9144),
      new TunedString('G-string', tuning[2], 'metal', 0.6604),
      new TunedString('D-string', tuning[3], 'metal', 0.4318),
      new TunedString('A-string', tuning[4], 'metal', 0.3302),
      new TunedString('high-e-string', tuning[5], 'metal', 0.2540)
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
