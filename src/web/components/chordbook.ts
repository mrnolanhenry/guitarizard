import html from "choo/html";
import { Note, Scale, ScaleSystem, instrument } from "note-lib";
import noteSelector from "./noteSelector";
import instrumentSelector from "./instrumentSelector";
import scaleSelector from "./scaleSelector";
import * as css from "sheetify";
import { Base16Theme } from "../colors";
import guitar from "./guitar";

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
  onScaleSelect: (scale: Scale) => void;
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
  onScaleSelect,
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

        ${noteSelector({
          label: "key",
          scaleSystem,
          note: keyNote,
          onNoteSelect: onKeySelect,
          theme
        })}

        ${scaleSelector({ activeScale, onScaleSelect, theme })}
      </div>

      ${guitar({
        fretCount: 21,
        tuningNoteIDs: ["E", "A", "D", "G", "B", "E"],
        keyNote,
        scale: activeScale,
        theme
      })}
    </div>`;
}
