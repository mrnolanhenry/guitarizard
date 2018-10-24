import * as http from "http";
import * as browserify from "browserify";
import { Readable, Writable } from "stream";
import { createReadStream, ReadStream } from "fs";
import { AppClient } from "./web/client";

const end = async (stream: Readable) =>
  new Promise((resolve, reject) => {
    stream.on("end", resolve);
    stream.on("error", reject);
  });

const send = async (readableStream: Readable, wStream: Writable) => {
  readableStream.pipe(
    wStream,
    { end: false }
  );
  return await end(readableStream);
};

const sendText = async (str: string, wStream: Writable) => {
  const rs = new Readable();
  rs.push(str, "utf8");
  rs.push(null);

  return send(rs, wStream);
};

export interface ServerGlobal {
  isDev: boolean;
  appServerState: AppServerState;
  initialRoute: string;
}

async function handleRequest(
  _req: http.IncomingMessage,
  res: http.ServerResponse,
  appServerState: AppServerState,
  initialRoute: string,
  appClient: AppClient,
  isDev: boolean,
  appBundle?: string
) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  const __SERVER: ServerGlobal = {
    isDev,
    appServerState,
    initialRoute
  };

  const jsGlobals =
    `<script>` +
    `window.__SERVER = ${
      isDev ? JSON.stringify(__SERVER, null, 4) : JSON.stringify(__SERVER)
    }` +
    `</script>`;

  const jsBundle =
    `<script>` + (appBundle || "console.log('no bundle')") + `</script>`;

  const elements = [
    "<!DOCTYPE html><html><head><style>",
    createReadStream(`${__dirname}/../src/web/dark.css`, {
      encoding: "utf8"
    }),
    `</style></head><body>`,
    appClient.render ? appClient.render : "no rendering",
    jsGlobals,
    jsBundle,
    "</body></html>"
  ];

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    if (typeof element === "string") {
      await sendText(element, res);
    } else if (element instanceof ReadStream) {
      await send(element, res);
    }
  }

  return res.end();
}

async function buildApp(entryPoint: string, isDev: boolean): Promise<string> {
  process.stdout.write("\nbuilding frontend app.....");
  return new Promise<string>((resolve, reject) => {
    let bundle = "";
    const b = browserify([entryPoint], { debug: isDev }).bundle();
    b.on("data", chunk => {
      bundle += chunk.toString();
    });
    b.on("error", err => reject(err));
    b.on("end", _ => resolve(bundle));
  }).then(bundle => {
    process.stdout.write("done!\n");
    return bundle;
  });
}

export interface AppServerState {
  activeInstrumentName: string;
  activeScaleName: string;
  scaleSystemName: string;
  keyNoteID: string;
}

interface AppServerOptions {
  isDev: boolean;
  appServerState: AppServerState;
}

interface AppServer {
  appEntry: string;
  port: number;
  options: AppServerOptions;

  appClient: AppClient;

  appBundle?: string;

  server?: http.Server;
}

class AppServer {
  constructor(appEntry: string, port: number, options: AppServerOptions) {
    this.port = port;
    this.appEntry = appEntry;
    this.options = options;

    this.appClient = new AppClient({
      isServer: true,
      isDev: options.isDev,
      appServerState: options.appServerState,
      initialRoute: "/"
    });

    buildApp(this.appEntry, !!options.isDev).then(bundle => {
      this.appBundle = bundle;
    });
  }

  async start() {
    if (this.server) return;

    this.server = http.createServer((req, res) => {
      return handleRequest(
        req,
        res,
        this.options.appServerState,
        "/",
        this.appClient,
        this.options.isDev,
        this.appBundle
      ).catch(error => {
        console.error(error.stack ? error : error.stack);
        res.end();
      });

      res.end();
    });

    return new Promise(
      (s, f) =>
        this.server
          ? this.server.listen(this.port, (e: Error) => (e ? f(e) : s()))
          : Promise.reject(new Error("no server defined"))
    );
  }

  async stop() {
    await new Promise(
      (s, f) =>
        this.server
          ? this.server.close((e: Error) => (e ? f(e) : s()))
          : Promise.resolve()
    );

    delete this.server;
  }
}

export default AppServer;
