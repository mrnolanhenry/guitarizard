import * as EventEmitter from "events";
import html from "choo/html";
import * as Choo from "choo";
const devtools = require("choo-devtools");

type ChooEmit = (name: string, ...args: any[]) => void;

export interface AppState {
  count?: number;
}

interface ChooAppState extends Choo.IState, AppState {}

export interface AppClient {
  state?: AppState;
  render?: string;
  app: Choo;
}

interface AppClientOptions {
  isServer?: boolean;
  isDev?: boolean;
  initialState?: AppState;
  initialRoute?: string;
}

export class AppClient {
  constructor(options: AppClientOptions = {}) {
    this.state = options.initialState || {};
    this.render = "";

    this.app = new Choo();

    this.app.route("/", (state, emit) => mainView(state as ChooAppState, emit));

    if (options.isServer) {
      const route = options.initialRoute || "/";
      const state = this.state as ChooAppState;
      this.render = this.app.toString(route, state);
    } else {
      if (options.isDev) this.app.use(devtools());
      this.app.use(store);
      this.app.mount("#app");
    }
  }
}

export default AppClient;

function mainView(state: AppState, emit: ChooEmit) {
  return html`
    <div id="app">
      <h1>count is ${state.count}</h1>
      <button onclick=${onclick}>Increment</button>
    </div>
  `;

  function onclick() {
    emit("increment", 1);
  }
}

function store(state: ChooAppState, emitter: EventEmitter, _app: Choo) {
  emitter.on("increment", function(count: number) {
    if (typeof state.count === "undefined") {
      state.count = count;
    } else {
      state.count += count;
    }

    emitter.emit("render");
  });
}
