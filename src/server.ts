import * as http from "http";
import * as browserify from "browserify";
import { Readable, Writable } from "stream";
import { createReadStream, ReadStream } from "fs";
import * as path from "path";
import { AppClient } from "./web/client";
const watch: any = require("node-watch");
const tsify: any = require("tsify");

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
    createReadStream(
      path.resolve(__dirname, "..", "..", "src", "web", "dark.css"),
      {
        encoding: "utf8"
      }
    ),
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

async function buildAppBundle(
  entryPoint: string,
  isDev: boolean
): Promise<string> {
  process.stdout.write("\nbuilding frontend app.....");
  return new Promise<string>((resolve, reject) => {
    let bundle = "";
    const b = browserify([entryPoint], { debug: isDev })
      .plugin(tsify, {
        project: path.join(__dirname, ".."),
        files: [] // only use browserify entry points.
      })
      .bundle();
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

    const isDev = !!options.isDev;

    const handleErr = (error: any) => {
      console.error(error.stack ? error.stack : error);
    };

    buildAppBundle(this.appEntry, isDev)
      .then(this.setAppBundle.bind(this))
      .catch(handleErr);

    if (options.isDev) {
      watch(
        path.dirname(appEntry),
        { recursive: true },
        (_evt: any, filePath: string) => {
          // todo: support other "non-standard" tmp files as needed.
          // todo: this is a hack---Emacs (by default?) creates tmp
          //   files in the directory under .#<filename>, which causes
          //   this fn to trigger when it really isn't necessary. This
          //   hack is to prevent needless rebuilds when editing files
          //   that haven't been saved yet.
          const needsUpdate = /^(?!\.#).+$/.test(path.basename(filePath));

          if (needsUpdate) {
            buildAppBundle(this.appEntry, isDev)
              .then(this.setAppBundle.bind(this))
              .catch(handleErr);
          }
        }
      );
    }
  }

  setAppBundle(bundle: string) {
    this.appBundle = bundle;
  }

  async start(): Promise<void> {
    if (this.server) return Promise.resolve();

    this.server = http.createServer((req, res) =>
      handleRequest(
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
      })
    );

    await new Promise(
      (ok, fail) =>
        this.server
          ? this.server.listen(this.port, (e: Error) => (e ? fail(e) : ok()))
          : fail(new Error("no server defined"))
    );
  }

  async stop(): Promise<void> {
    await new Promise(
      (ok, fail) =>
        this.server
          ? this.server.close((e: Error) => (e ? fail(e) : ok()))
          : ok()
    );

    delete this.server;
  }
}

export default AppServer;
