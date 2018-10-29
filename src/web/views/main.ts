import html from "choo/html";
import { AppState, ChooEmit } from "../client";
import chordbook from "../components/chordbook";
import songbook from "../components/songbook";
import topBar from "../components/topBar";
import { ToolName } from "../components/toolSelector";
import { Note, instrument, Scale } from "note-lib";
import * as css from "sheetify";

const prefix = css`
  :host {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

export default function mainView(state: AppState, emit: ChooEmit) {
  let toolRendering: HTMLElement;

  switch (state.activeToolName) {
    case "chordbook":
      toolRendering = chordbook({
        activeScale: state.activeScale,
        scaleSystem: state.scaleSystem,
        keyNote: state.keyNote,
        instruments: state.instruments,
        activeInstrument: state.activeInstrument,
        onKeySelect,
        onInstrumentSelect,
        onScaleSelect,
        theme: state.theme
      });
      break;
    case "songbook":
      toolRendering = songbook({});
      break;
    default:
      toolRendering = html`<span>invalid tool...</span>`;
      break;
  }

  const style = [
    `background-color: ${state.theme.base00}`,
    `color: ${state.theme.base05}`
  ].join(";");

  return html`
    <div id="app">
      <div style=${style} class=${prefix}>
        ${topBar({
          isAuthenticated: false,
          onLoginClick,
          onLogoutClick,
          onToolSelect,
          activeToolName: state.activeToolName,
          theme: state.theme
        })}

        ${toolRendering}
      </div>
    </div>`;

  function onToolSelect(toolName: ToolName) {
    emit("set-tool", toolName);
  }

  function onLoginClick() {
    emit("start-login-flow");
  }

  function onLogoutClick() {
    emit("start-logout-flow");
  }

  function onKeySelect(keyNote: Note) {
    emit("set-key-note", keyNote);
  }

  function onInstrumentSelect(instrument: instrument.FrettedInstrument) {
    emit("set-instrument", instrument);
  }

  function onScaleSelect(scale: Scale) {
    emit("set-scale", scale);
  }
}
