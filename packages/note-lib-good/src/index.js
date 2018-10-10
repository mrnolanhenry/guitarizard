const API = {
  Note: require('./Note'),
  ScaleSystem: require('./ScaleSystem'),
  Scale: require('./Scale'),
  Interval: require('./Interval'),

  data: {
    scaleSystem: {
      diatonic: require('./data/scaleSystem/diatonic')
    },
    intervals: require('./data/intervals'),
    scales: require('./data/scales')
  },

  instrument: {
    TunedString: require('./instrument/TunedString'),
    FretBoard: require('./instrument/FretBoard'),
    Guitar: require('./instrument/Guitar'),
    Banjo: require('./instrument/Banjo')
  }
};

module.exports = API;
