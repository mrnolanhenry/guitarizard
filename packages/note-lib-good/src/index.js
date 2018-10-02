const API = {
  Note: require('./Note'),
  ScaleSystem: require('./ScaleSystem'),
  Scale: require('./Scale'),
  FrettedString: require('./FrettedString'),
  instruments: {
    Guitar: require('./instruments/Guitar')
  },
  scaleSystems: require('./scaleSystems'),
  scales: require('./scales')
};

module.exports = API;
