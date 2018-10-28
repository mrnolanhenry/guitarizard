import * as http from "http";
import * as browserify from "browserify";
import { Readable, Writable } from "stream";
import { createReadStream, ReadStream } from "fs";
import * as path from "path";
import { AppClient } from "./web/client";
import * as watchify from "watchify";
import * as WebSocket from "ws";
import { AppServerState } from "./server.d";
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
  conn: { req: http.IncomingMessage; res: http.ServerResponse },
  args: {
    appServerState: AppServerState;
    initialRoute: string;
    appClient: AppClient;
    isDev: boolean;
    appBundle?: string;
  }
) {
  conn.res.setHeader("Content-Type", "text/html; charset=utf-8");

  const __SERVER: ServerGlobal = {
    isDev: args.isDev,
    appServerState: args.appServerState,
    initialRoute: args.initialRoute
  };

  const devBundle = !args.isDev
    ? ""
    : `
const socket = new WebSocket('ws://localhost:5000');

socket.addEventListener('message', function (event) {
  console.log('Message from server ', event.data);

  if (event.data === 'reload') {
    location.reload();
  }
});
`;

  const jsGlobals =
    `<script>` +
    devBundle +
    `window.__SERVER = ${
      args.isDev ? JSON.stringify(__SERVER, null, 4) : JSON.stringify(__SERVER)
    }` +
    `</script>`;

  const jsBundle =
    `<script>` + (args.appBundle || "console.log('no bundle')") + `</script>`;

  const elements = [
    "<!DOCTYPE html><html><head><style>",
    createReadStream(
      path.resolve(__dirname, "..", "..", "src", "web", "dark.css"),
      {
        encoding: "utf8"
      }
    ),
    `</style></head><body>`,
    args.appClient.render ? args.appClient.render : "no rendering",
    jsGlobals,
    jsBundle,
    "</body></html>"
  ];

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    if (typeof element === "string") {
      await sendText(element, conn.res);
    } else if (element instanceof ReadStream) {
      await send(element, conn.res);
    }
  }

  return conn.res.end();
}

function buildAppBundle(
  entryPoint: string,
  isDev: boolean
): browserify.BrowserifyObject {
  return browserify({
    entries: [entryPoint],
    debug: isDev,
    cache: {},
    packageCache: {},
    plugin: isDev ? [watchify] : []
  }).plugin(tsify, {
    project: path.dirname(entryPoint),
    files: [] // only use browserify entry points.
  });
}

interface AppServer {
  appEntry: string;
  port: number;
  options: AppServerOptions;

  appClient: AppClient;

  appBundle?: string;

  server?: http.Server;
  wss?: WebSocket.Server;

  browserifyObject: browserify.BrowserifyObject;
}

interface AppServerOptions {
  appServerState: AppServerState;
  isDev: boolean;
  devPort?: number;
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

    this.browserifyObject = buildAppBundle(this.appEntry, isDev);

    const build = () => {
      console.log("building frontend...");
      return this.bundle()
        .catch(handleErr)
        .then(() => console.log("...done building frontend"));
    };

    build();

    if (isDev) {
      this.wss = new WebSocket.Server({
        port: this.options.devPort || 5000
      });

      this.browserifyObject.on("update", () => {
        build().then(() => {
          if (typeof this.wss === "undefined") {
            return;
          }

          this.wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
              client.send("reload");
            }
          });
        });
      });
    }
  }

  async bundle(): Promise<void> {
    let bundleStr = "";

    await new Promise<string>((ok, fail) =>
      this.browserifyObject
        .bundle()
        .on("data", chunk => {
          bundleStr += chunk.toString();
        })
        .on("error", fail)
        .on("end", _ => ok(bundleStr))
    );

    this.appBundle = bundleStr;
  }

  async start(): Promise<void> {
    if (this.server) return Promise.resolve();

    this.server = http.createServer((req, res) =>
      handleRequest(
        { req, res },
        {
          appServerState: this.options.appServerState,
          initialRoute: "/",
          appClient: this.appClient,
          isDev: this.options.isDev,
          appBundle: this.appBundle
        }
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
