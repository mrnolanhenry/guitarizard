const diatonic = require('../data/scaleSystem/diatonic');
const FretBoard = require('./FretBoard');
const TunedString = require('./TunedString');

module.exports = class Guitar {
  constructor(fretCount, tuning) {

    this.fretCount = fretCount;
    this.tuning = tuning;

    const tunedStrings = [
      new TunedString(this.tuning[0], 'metal', 0.2540),
      new TunedString(this.tuning[1], 'metal', 0.3302),
      new TunedString(this.tuning[2], 'metal', 0.4318),
      new TunedString(this.tuning[3], 'metal', 0.6604),
      new TunedString(this.tuning[4], 'metal', 0.9144),
      new TunedString(this.tuning[5], 'metal', 1.1684)
    ];

    const stringConfig = [
      { fret: { start: 0, end: this.fretCount } },
      { fret: { start: 0, end: this.fretCount } },
      { fret: { start: 0, end: this.fretCount } },
      { fret: { start: 0, end: this.fretCount } },
      { fret: { start: 0, end: this.fretCount } },
      { fret: { start: 0, end: this.fretCount } }
    ];

    this.fretBoard = new FretBoard(diatonic, tunedStrings, stringConfig)
  }
}
