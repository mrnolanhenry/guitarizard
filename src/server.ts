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
    appJS?: string;
    appCSS?: string;
  }
) {
  if (
    typeof conn.req.url !== "undefined" &&
    conn.req.url.startsWith("/static")
  ) {
    const fileName = path.basename(conn.req.url);

    conn.res.setHeader("Content-Type", "image/png");

    const filePath = path.resolve(__dirname, "..", "..", "static", fileName);

    await send(createReadStream(filePath), conn.res);

    return conn.res.end();
  }

  if (conn.req.url === "/app.js") {
    conn.res.setHeader("Content-Type", "application/javascript; charset=utf-8");

    const __SERVER: ServerGlobal = {
      isDev: args.isDev,
      appServerState: args.appServerState,
      initialRoute: args.initialRoute
    };

    const jsGlobals = `window.__SERVER = ${
      args.isDev ? JSON.stringify(__SERVER, null, 4) : JSON.stringify(__SERVER)
    };
    `;

    await sendText(jsGlobals, conn.res);
    await sendText(args.appJS || "/* no bundle */", conn.res);

    return conn.res.end();
  }

  if (conn.req.url === "/app.css") {
    conn.res.setHeader("Content-Type", "text/css; charset=utf-8");
    await sendText(args.appCSS || "/* no bundle */", conn.res);
    return conn.res.end();
  }

  conn.res.setHeader("Content-Type", "text/html; charset=utf-8");

  const elements: Array<string | ReadStream> = [
    "<!DOCTYPE html><html><head>",

    "<style>",
    createReadStream(
      path.resolve(__dirname, "..", "..", "src", "web", "head.css"),
      {
        encoding: "utf8"
      }
    ),
    "</style>",

    '<link rel="stylesheet" type="text/css" href="app.css" >',

    "</head><body>",
    args.appClient.render ? args.appClient.render : "no rendering",
    '<script src="app.js"></script>',
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

function getBrowserifyObj(
  entryPoint: string,
  isDev: boolean,
  getCssExtractWritable: () => Writable
): browserify.BrowserifyObject {
  let browserifyObject = browserify([entryPoint], {
    debug: isDev,
    cache: {},
    packageCache: {},
    plugin: isDev ? [watchify] : []
  })
    .plugin(tsify, {
      project: path.dirname(entryPoint),
      files: [] // only use browserify entry points.
    })
    .transform("sheetify", { transform: [] });

  if (!isDev) {
    browserifyObject = browserifyObject.plugin("css-extract", {
      out: () => getCssExtractWritable()
    });
  }

  return browserifyObject;
}

async function buildApp(
  browserifyObj: browserify.BrowserifyObject
): Promise<string> {
  let js = "";

  return new Promise<string>((ok, fail) =>
    browserifyObj
      .bundle()
      .on("data", chunk => {
        js += chunk.toString();
      })
      .on("error", fail)
      .on("end", () => ok(js))
  );
}

interface AppServer {
  appEntry: string;
  port: number;
  options: AppServerOptions;

  appClient: AppClient;

  appJS?: string;
  appCSS?: string;

  server?: http.Server;
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

    let wss: WebSocket.Server;
    if (isDev) {
      wss = new WebSocket.Server({
        port: this.options.devPort || 5000
      });
    }

    let css = "";

    const browserifyObj = getBrowserifyObj(this.appEntry, isDev, () => {
      css = "";
      return new Writable({
        write(chunk, _encoding, callback) {
          css += chunk.toString();
          callback();
        }
      });
    });

    const build = () => {
      console.log("Building Frontend...");
      buildApp(browserifyObj)
        .then(js => {
          console.log("Frontend Built!");
          this.appJS = js;
          this.appCSS = css;

          if (isDev && typeof wss !== "undefined") {
            wss.clients.forEach(function each(client) {
              if (client.readyState === WebSocket.OPEN) {
                client.send("reload");
              }
            });
          }
        })
        .catch(error => console.error(error.stack ? error.stack : error));
    };

    build();

    if (isDev) {
      browserifyObj.on("update", () => build());
    }
  }

  async bundle(): Promise<void> {}

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
          appJS: this.appJS,
          appCSS: this.appCSS
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
