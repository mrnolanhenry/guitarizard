const diatonic = require('../data/scaleSystem/diatonic');
const FretBoard = require('./FretBoard');
const TunedString = require('./TunedString');
const Tunings = require('../data/tunings');

module.exports = class Bass {
  constructor(fretCount, tuning) {
    const stringCount = tuning.length;

    this.name = `bass-${stringCount}`;

    // TODO: get correct gague for bass strings
    const tunedStrings = {
      '4': [
        new TunedString('string-4', tuning[0], 'metal', 4),
        new TunedString('string-3', tuning[1], 'metal', 3),
        new TunedString('string-2', tuning[2], 'metal', 2),
        new TunedString('string-1', tuning[3], 'metal', 1)
      ],
      // TODO: This is the most common configuration, but
      //       we should support in the UI a "common config"
      //       for popular 5-string configurations.
      '5': [
        new TunedString('string-5', tuning[0], 'metal', 5),
        new TunedString('string-4', tuning[1], 'metal', 4),
        new TunedString('string-3', tuning[2], 'metal', 3),
        new TunedString('string-2', tuning[3], 'metal', 2),
        new TunedString('string-1', tuning[4], 'metal', 1)
      ],
      '6': [
        new TunedString('string-6', tuning[0], 'metal', 6),
        new TunedString('string-5', tuning[1], 'metal', 5),
        new TunedString('string-4', tuning[2], 'metal', 4),
        new TunedString('string-3', tuning[3], 'metal', 3),
        new TunedString('string-2', tuning[4], 'metal', 2),
        new TunedString('string-1', tuning[5], 'metal', 1)
      ]
    }[`${stringCount}`]


    const stringConfig = tuning.map(() => {
      return { fret: { start: 0, end: fretCount } };
    });

    this.fretBoard = new FretBoard(diatonic, tunedStrings, stringConfig)
  }

  getCommonTunings() {
    let commonTunings = [];
    for (let i = 0; i < Tunings.length; i++) {
      if (Tunings[i].instrument === this.name) {
        commonTunings.push(Tunings[i]);
      }
    }
    return commonTunings;
  }

  getStandardTuning() {
    return this.getCommonTunings()[0];
  }
}
