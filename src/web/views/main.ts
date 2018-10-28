import html from "choo/html";
import { AppState, ChooEmit } from "../client";
import chordbook from "../components/chordbook";
import { Note, instrument } from "note-lib";

export default function mainView(state: AppState, emit: ChooEmit) {
  return html`
    <div id="app">
      ${chordbook({
        activeScale: state.activeScale,
        scaleSystem: state.scaleSystem,
        keyNote: state.keyNote,
        onKeySelect,
        instruments: state.instruments,
        activeInstrument: state.activeInstrument,
        onInstrumentSelect
      })}
      <button onclick=${onclick}>click</button>
    <div>${state.count}</div>
    </div>
  `;

  function onKeySelect(keyNote: Note) {
    emit("set-key-note", keyNote);
  }

  function onInstrumentSelect(instrument: instrument.FrettedInstrument) {
    emit("set-instrument", instrument);
  }

  function onclick() {
    emit("increment", 1);
  }
}
