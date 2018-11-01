import * as Choo from "choo";
import * as noteLib from "note-lib";
import { Note, Scale, ScaleSystem, instrument } from "note-lib";
import store from "./store";
import mainView from "./views/main";
import { ToolName } from "./components/toolSelector";
import { AppServerState } from "../server.d";
import { Base16Theme } from "./colors";
import { bespin as theme } from "./colors";
const devtools = require("choo-devtools");

export type ChooEmit = (name: string, ...args: any[]) => void;

type InstrumentMap = Map<string, instrument.FrettedInstrument>;

export interface AppState {
  instruments: InstrumentMap;
  activeInstrumentName?: string;
  activeScale: Scale;
  keyNote: Note;
  scaleSystem: ScaleSystem;
  activeToolName: ToolName;
  theme: Base16Theme;
}

export interface ChooAppState extends Choo.IState, AppState {}

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
      (window as any).initialState = initStateFromServer(
        options.appServerState
      );
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
        state = state as ChooAppState;
        store(state as ChooAppState, emitter, app);
      });

      this.app.mount("#app");
    }
  }
}

export default AppClient;

/**
 * Given the server's state, return an initialized version of the
 * app state with the proper classes, etc.
 *
 */
export function initStateFromServer(appServerState: AppServerState): AppState {
  const diatonic = noteLib.data.scaleSystem.diatonic;
  const scales = noteLib.data.scales;

  const instruments: InstrumentMap = new Map();
  instruments.set(
    "guitar",
    new noteLib.instrument.Guitar(
      21,
      appServerState.guitarTuningNoteIDs.map(noteID =>
        diatonic.getNoteFromID(noteID)
      )
    )
  );

  instruments.set(
    "banjo",
    new noteLib.instrument.Banjo(
      21,
      appServerState.banjoTuningNoteIDs.map(noteID =>
        diatonic.getNoteFromID(noteID)
      )
    )
  );

  instruments.set(
    "ukulele",
    new noteLib.instrument.Ukulele(
      19,
      appServerState.ukuleleTuningNoteIDs.map(noteID =>
        diatonic.getNoteFromID(noteID)
      )
    )
  );

  instruments.set(
    "bass-4",
    new noteLib.instrument.Bass(
      21,
      appServerState.bassFourTuningNoteIDs.map(noteID =>
        diatonic.getNoteFromID(noteID)
      )
    )
  );

  instruments.set(
    "bass-5",
    new noteLib.instrument.Bass(
      21,
      appServerState.bassFiveTuningNoteIDs.map(noteID =>
        diatonic.getNoteFromID(noteID)
      )
    )
  );

  instruments.set(
    "bass-6",
    new noteLib.instrument.Bass(
      21,
      appServerState.bassSixTuningNoteIDs.map(noteID =>
        diatonic.getNoteFromID(noteID)
      )
    )
  );

  const activeScale =
    scales.find(s => s.name === appServerState.activeScaleName) || scales[14];

  const keyNote = diatonic.getNoteFromID(appServerState.keyNoteID);
  const scaleSystem = diatonic;

  const activeToolName = appServerState.activeToolName as ToolName;

  return {
    theme,
    instruments,
    activeInstrumentName: appServerState.activeInstrumentName,
    activeScale,
    keyNote,
    scaleSystem,
    activeToolName
  };
}
