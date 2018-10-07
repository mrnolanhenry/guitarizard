const diatonic = require('../data/scaleSystems/diatonic');
const FretBoard = require('./FretBoard');
const TunedString = require('./TunedString');

module.exports = class Banjo {
  constructor(fretCount, tuning) {

    if (typeof tuning === 'undefined') {
      tuning = [
        diatonic.G,
        diatonic.D,
        diatonic.G,
        diatonic.B,
        diatonic.D
      ]
    }

    const tunedStrings = [
      new TunedString(tuning[0], 'metal', 0.11),
      new TunedString(tuning[1], 'metal', 0.13),
      new TunedString(tuning[2], 'metal', 0.17),
      new TunedString(tuning[3], 'metal', 0.26),
      new TunedString(tuning[4], 'metal', 0.11),
    ];

    const stringConfig = [
      { fret: { start: 5, end: fretCount } },
      { fret: { start: 0, end: fretCount } },
      { fret: { start: 0, end: fretCount } },
      { fret: { start: 0, end: fretCount } },
      { fret: { start: 0, end: fretCount } }
    ];

    this.fretBoard = new FretBoard(diatonic, tunedStrings, stringConfig)
  }
}
