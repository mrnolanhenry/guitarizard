const diatonic = require('../data/scaleSystem/diatonic');
const FretBoard = require('./FretBoard');
const TunedString = require('./TunedString');

module.exports = class Banjo {
  constructor(fretCount, tuning) {

    this.fretCount = fretCount;
    this.tuning = tuning;

    const tunedStrings = [
      new TunedString(this.tuning[0], 'metal', 0.11),
      new TunedString(this.tuning[1], 'metal', 0.13),
      new TunedString(this.tuning[2], 'metal', 0.17),
      new TunedString(this.tuning[3], 'metal', 0.26),
      new TunedString(this.tuning[4], 'metal', 0.11),
    ];

    const stringConfig = [
      { fret: { start: 5, end: this.fretCount } },
      { fret: { start: 0, end: this.fretCount } },
      { fret: { start: 0, end: this.fretCount } },
      { fret: { start: 0, end: this.fretCount } },
      { fret: { start: 0, end: this.fretCount } }
    ];

    this.fretBoard = new FretBoard(diatonic, tunedStrings, stringConfig)
  }
}
