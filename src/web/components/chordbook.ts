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
  instruments: Map<string, instrument.FrettedInstrument>;
  activeInstrumentName?: string;
  activeScale: Scale;
  keyNote: Note;
  scaleSystem: ScaleSystem;
  onKeySelect: (keyNote: Note) => void;
  onInstrumentSelect: (instrument: instrument.FrettedInstrument) => void;
  onScaleSelect: (scale: Scale) => void;
  onGuitarTune: (stringID: string, newTuning: Note) => void;
  theme: Base16Theme;
}

export default function chordbook({
  instruments,
  activeInstrumentName,
  activeScale,
  keyNote,
  scaleSystem,
  onKeySelect,
  onInstrumentSelect,
  onScaleSelect,
  onGuitarTune,
  theme
}: Props) {
  const settingsBarStyle = [`background-color: ${theme.base01}`].join(";");

  const instrument = activeInstrumentName
    ? instruments.get(activeInstrumentName)
    : undefined;

  let instrumentComponent;

  if (instrument && instrument.name === "guitar") {
    instrumentComponent = guitar({
      guitar: instrument as instrument.Guitar,
      keyNote,
      scale: activeScale,
      onTune: onGuitarTune,
      theme
    });
  }

  return html`
  <div class=${prefix}>

    <div class="settings-bar" style=${settingsBarStyle}>
      ${instrumentSelector({
        activeInstrumentName,
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

     ${instrumentComponent}
  </div>`;
}
