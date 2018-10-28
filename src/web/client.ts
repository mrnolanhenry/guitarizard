import * as EventEmitter from "events";
import * as Choo from "choo";
import * as noteLib from "note-lib";
import { Note, Scale, ScaleSystem, instrument } from "note-lib";
import mainView from "./views/main";
import { AppServerState } from "../server.d";
const devtools = require("choo-devtools");

export type ChooEmit = (name: string, ...args: any[]) => void;

export interface AppState {
  count: number;

  instruments: Array<instrument.FrettedInstrument>;
  activeInstrument: instrument.FrettedInstrument;
  activeScale: Scale;
  keyNote: Note;
  scaleSystem: ScaleSystem;
}

interface ChooAppState extends Choo.IState, AppState {}

export interface AppClient {
  state: AppState;
  render: string;
  app: Choo;
}

interface AppClientOptions {
  isServer: boolean;
  isDev: boolean;
  appServerState: AppServerState;
  initialRoute: string;
}

export class AppClient {
  constructor(options: AppClientOptions) {
    this.state = initStateFromServer(options.appServerState);

    this.render = "";

    if (!options.isServer) {
      (window as any).initialState = this.state;
    }

    this.app = new Choo();

    this.app.route("/", (state, emit) => mainView(state as ChooAppState, emit));

    if (options.isServer) {
      const route = options.initialRoute || "/";
      const state = this.state as ChooAppState;

      this.render = this.app.toString(route, state);
    } else {
      if (options.isDev) {
        this.app.use(devtools());

        const socket = new WebSocket("ws://localhost:5000");

        socket.addEventListener("message", function(event) {
          if (event.data === "reload") {
            location.reload();
          }
        });
      }

      this.app.use((state, emitter, app) => {
        state = this.state as ChooAppState;
        store(state as ChooAppState, emitter, app);
      });

      this.app.mount("#app");
    }
  }
}

export default AppClient;

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

/**
 * Given the server's state, return an initialized version of the
 * app state with the proper classes, etc.
 *
 */
export function initStateFromServer(appServerState: AppServerState): AppState {
  const diatonic = noteLib.data.scaleSystem.diatonic;
  const scales = noteLib.data.scales;

  const instruments = [
    new noteLib.instrument.Guitar(
      21,
      ["E", "A", "D", "G", "B", "E"].map(noteID =>
        diatonic.getNoteFromID(noteID)
      )
    ),
    new noteLib.instrument.Banjo(
      21,
      ["G", "D", "G", "B", "D"].map(noteID => diatonic.getNoteFromID(noteID))
    )
  ];

  const activeInstrument =
    instruments[appServerState.activeInstrumentName === "guitar" ? 0 : 1];

  const activeScale =
    scales.find(s => s.name === appServerState.activeScaleName) || scales[14];

  const keyNote = diatonic.getNoteFromID(appServerState.keyNoteID);
  const scaleSystem = diatonic;

  return {
    count: 4,
    instruments,
    activeInstrument,
    activeScale,
    keyNote,
    scaleSystem
  };
}
