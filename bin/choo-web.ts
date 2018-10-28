#!/usr/bin/env node

import { resolve } from "path";
import AppServer from "../src/server";

interface Tools {
  <T>(str: string): T;
  all: any;
  cout: (msg: string) => void;
}

interface Main {
  run: (
    module: NodeModule,
    mdDocPath: string,
    cb: ($: Tools) => Promise<void>
  ) => Promise<void>;
}

(require("main") as Main).run(
  module,
  `${__dirname}/../../README.md`,
  ($: Tools) => {
    const appEntry = resolve(__dirname, "..", "..", "src", "web", "index.ts");

    if ($("dev")) {
      $.cout(`WARNING: development server.`);
      $.cout(`For production: run without '--dev'.`);
    }

    $.cout(`listening on port: ${$("port")}`);

    const server = new AppServer(appEntry, $<number>("port"), {
      isDev: $("dev"),
      appServerState: {
        activeInstrumentName: "banjo",
        activeScaleName: "blues",
        scaleSystemName: "diatonic",
        keyNoteID: "E"
      }
    });

    return server
      .start()
      .catch((error: any) => console.error(error.stack ? error.stack : error));
  }
);
