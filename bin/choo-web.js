#!/usr/bin/env node

require("main").run(module, `${__dirname}/docs.md`, $ => {
  const noteLib = require("note-lib");
  const AppServer = require(`${__dirname}/../dist/server.js`).default;

  const diatonic = noteLib.data.scaleSystem.diatonic;

  const appEntry = `${__dirname}/../dist/web/index.js`;

  const server = new AppServer(appEntry, $("port"), {
    isDev: $("dev"),
    initialState: {
      count: 4,
      activeInstrument: "guitar",
      activeScaleName: "blues",
      scaleSystem: diatonic,
      keyNote: diatonic.notes[0]
    }
  });

  server.start().catch(console.error);
});
