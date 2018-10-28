import html from "choo/html";
import { Note, Scale, ScaleSystem, instrument } from "note-lib";
import keySelector from "./keySelector";
import instrumentSelector from "./instrumentSelector";
import * as css from "sheetify";
import { Base16Theme } from "../colors";

const prefix = css`
  :host {
    display: flex;
    flex-direction: column;
  }

  :host > .settings-bar {
    flex-grow: 1;
    display: flex;
  }

  :host > .settings-bar > * {
    margin: 0.5em;
  }
`;

interface Props {
  instruments: Array<instrument.FrettedInstrument>;
  activeInstrument: instrument.FrettedInstrument;
  activeScale: Scale;
  keyNote: Note;
  scaleSystem: ScaleSystem;
  onKeySelect: (keyNote: Note) => void;
  onInstrumentSelect: (instrument: instrument.FrettedInstrument) => void;
  theme: Base16Theme;
}

export default function chordbook({
  instruments,
  activeInstrument,
  activeScale,
  keyNote,
  scaleSystem,
  onKeySelect,
  onInstrumentSelect,
  theme
}: Props) {
  const settingsBarStyle = [`background-color: ${theme.base01}`].join(";");

  return html`
    <div class=${prefix}>

      <div class="settings-bar" style=${settingsBarStyle}>
        ${instrumentSelector({
          activeInstrument,
          instruments,
          onInstrumentSelect,
          theme
        })}

        ${keySelector({ scaleSystem, keyNote, onKeySelect, theme })}
      </div>


      <table>
        <tr><td>activeInstrument:</td><td>${activeInstrument.name}</td></tr>
        <tr><td>activeScaleName:</td><td>${activeScale.name}</td></tr>
        <tr><td>keyNote:</td><td>${keyNote.id}</td></tr>
        <tr><td>scaleSystem:</td><td>${scaleSystem.name}</td></tr>
      </table>
    </div>`;
}
