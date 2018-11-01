import html from "choo/html";
import { Note, Scale, ScaleSystem, instrument } from "note-lib";
import noteSelector from "./noteSelector";
import instrumentSelector from "./instrumentSelector";
import scaleSelector from "./scaleSelector";
import * as css from "sheetify";
import { Base16Theme } from "../colors";
import guitar from "./guitar";
import banjo from "./banjo";
import ukulele from "./ukulele";
import bass from "./bass";

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
  onBanjoTune: (stringID: string, newTuning: Note) => void;
  onUkuleleTune: (stringID: string, newTuning: Note) => void;
  onBassFourTune: (stringID: string, newTuning: Note) => void;
  onBassFiveTune: (stringID: string, newTuning: Note) => void;
  onBassSixTune: (stringID: string, newTuning: Note) => void;
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
  onBanjoTune,
  onUkuleleTune,
  onBassFourTune,
  onBassFiveTune,
  onBassSixTune,
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

  if (instrument && instrument.name === "banjo") {
    instrumentComponent = banjo({
      banjo: instrument as instrument.Banjo,
      keyNote,
      scale: activeScale,
      onTune: onBanjoTune,
      theme
    });
  }

  if (instrument && instrument.name === "ukulele") {
    instrumentComponent = ukulele({
      ukulele: instrument as instrument.Ukulele,
      keyNote,
      scale: activeScale,
      onTune: onUkuleleTune,
      theme
    });
  }

  if (instrument && instrument.name === "bass-4") {
    instrumentComponent = bass({
      bass: instrument as instrument.Bass,
      keyNote,
      scale: activeScale,
      onTune: onBassFourTune,
      theme
    });
  }

  if (instrument && instrument.name === "bass-5") {
    instrumentComponent = bass({
      bass: instrument as instrument.Bass,
      keyNote,
      scale: activeScale,
      onTune: onBassFiveTune,
      theme
    });
  }

  if (instrument && instrument.name === "bass-6") {
    instrumentComponent = bass({
      bass: instrument as instrument.Bass,
      keyNote,
      scale: activeScale,
      onTune: onBassSixTune,
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
        label: "Key:",
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
