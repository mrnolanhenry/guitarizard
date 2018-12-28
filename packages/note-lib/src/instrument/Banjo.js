const diatonic = require('../data/scaleSystem/diatonic');
const FretBoard = require('./FretBoard');
const TunedString = require('./TunedString');

module.exports = class Banjo {
  constructor(fretCount, tuning) {
    this.name = 'banjo';

    // ["G", "D", "G", "B", "D"]

    const tunedStrings = [
      new TunedString('first-G-string', tuning[0], 'metal', 0.11),
      new TunedString('first-D-string', tuning[1], 'metal', 0.13),
      new TunedString('second-G-string', tuning[2], 'metal', 0.17),
      new TunedString('B-string', tuning[3], 'metal', 0.26),
      new TunedString('second-D-string', tuning[4], 'metal', 0.11),
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
