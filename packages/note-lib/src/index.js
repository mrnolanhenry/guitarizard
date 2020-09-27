const API = {
  Note: require("./Note"),
  ScaleSystem: require("./ScaleSystem"),
  Scale: require("./Scale"),
  Key: require("./Key"),
  Interval: require("./Interval"),

  data: {
    scaleSystem: {
      diatonic: require("./data/scaleSystem/diatonic"),
    },
    intervals: require("./data/intervals"),
    scales: require("./data/scales"),
  },

  instrument: {
    TunedString: require("./instrument/TunedString"),
    Tuning: require("./instrument/Tuning"),
    FretBoard: require("./instrument/FretBoard"),
    Guitar: require("./instrument/Guitar"),
    Banjo: require("./instrument/Banjo"),
    Bass: require("./instrument/Bass"),
    Ukulele: require("./instrument/Ukulele"),
  },
};

module.exports = API;
