const API = {
  Note: require('./Note'),
  ScaleSystem: require('./ScaleSystem'),
  Scale: require('./Scale'),
  FrettedString: require('./FrettedString'),
  instruments: {
    Guitar: require('./instruments/Guitar')
  }
};

module.exports = API;
