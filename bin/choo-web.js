#!/usr/bin/env node

require("main").run(module, `${__dirname}/docs.md`, $ => {
  const AppServer = require(`${__dirname}/../dist/server.js`).default;

  const appEntry = `${__dirname}/../dist/web/index.js`;

  const server = new AppServer(appEntry, $("port"), {
    isDev: $("dev"),
    appServerState: {
      activeInstrumentName: "banjo",
      activeScaleName: "blues",
      scaleSystemName: "diatonic",
      keyNoteID: "C"
    }
  });

  server
    .start()
    .catch(error => console.error(error.stack ? error.stack : error));
});
