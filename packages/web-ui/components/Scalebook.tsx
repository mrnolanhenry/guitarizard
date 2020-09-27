import './Scalebook.scss';
import { Key, Note, Scale, ScaleSystem, instrument } from "guitarizard-note-lib";
import { Base16Theme } from "../lib/colors";
import InstrumentSelector from "./InstrumentSelector";
import NoteSelector from "./NoteSelector";
import ScaleSelector from "./ScaleSelector";
import EquivScaleSelector from "./EquivScaleSelector";
import EquivKeySelector from "./EquivKeySelector";
import IntervalTable from "./IntervalTable";
import NoteTable from "./NoteTable";
// import ToggleButtonIntervalTable from "./ToggleButtonIntervalTable";
import Instrument from "./Instrument";

interface Props {
  instruments: Map<string, instrument.FrettedInstrument>;
  activeInstrumentName?: string;
  activeScale: Scale;
  keyNote: Note;
  activeKey: Key;
  scaleSystem: ScaleSystem;
  onToggleNoteTable: boolean;
  onToggleIntervalTable: boolean;
  onKeyNoteSelect: (keyNote: Note) => void;
  onInstrumentSelect: (instrument: instrument.FrettedInstrument) => void;
  onScaleSelect: (scale: Scale) => void;
  updateKey: (key: Key) => void;
  onInstrumentTune: (instrumentName: string, stringID: string, newTuning: Note) => void;
  // onGuitarTune: (stringID: string, newTuning: Note) => void;
  // onBanjoTune: (stringID: string, newTuning: Note) => void;
  // onUkuleleTune: (stringID: string, newTuning: Note) => void;
  // onBassFourTune: (stringID: string, newTuning: Note) => void;
  // onBassFiveTune: (stringID: string, newTuning: Note) => void;
  // onBassSixTune: (stringID: string, newTuning: Note) => void;
  theme: Base16Theme;
}

export default function Scalebook(props: Props) {

  const settingsBarStyle = {
    backgroundColor: props.theme.base01
  };

  const instrument = props.activeInstrumentName
    ? props.instruments.get(props.activeInstrumentName)
    : undefined;

  let instrumentComponent;
  
  if (instrument && instrument.name === "guitar") {
    instrumentComponent = <Instrument instrument={instrument}
      activeKey={props.activeKey}
      keyNote={props.keyNote}
      scale={props.activeScale}
      onTune={props.onInstrumentTune}
      theme={props.theme} />;
  }

  if (instrument && instrument.name === "banjo") {
    instrumentComponent = <Instrument instrument={instrument as instrument.Banjo}
      activeKey={props.activeKey}
      keyNote={props.keyNote}
      scale={props.activeScale}
      onTune={props.onInstrumentTune}
      theme={props.theme} />;
  }

  if (instrument && instrument.name === "ukulele") {
    instrumentComponent = <Instrument instrument={instrument as instrument.Ukulele}
      activeKey={props.activeKey}
      keyNote={props.keyNote}
      scale={props.activeScale}
      onTune={props.onInstrumentTune}
      theme={props.theme} />;
  }

  if (instrument && instrument.name === "bass-4") {
    instrumentComponent = <Instrument instrument={instrument as instrument.Bass}
      activeKey={props.activeKey}
      keyNote={props.keyNote}
      scale={props.activeScale}
      onTune={props.onInstrumentTune}
      theme={props.theme} />;
  }

  if (instrument && instrument.name === "bass-5") {
    instrumentComponent = <Instrument instrument={instrument as instrument.Bass}
      activeKey={props.activeKey}
      keyNote={props.keyNote}
      scale={props.activeScale}
      onTune={props.onInstrumentTune}
      theme={props.theme} />;
  }

  if (instrument && instrument.name === "bass-6") {
    instrumentComponent = <Instrument instrument={instrument as instrument.Bass}
      activeKey={props.activeKey}
      keyNote={props.keyNote}
      scale={props.activeScale}
      onTune={props.onInstrumentTune}
      theme={props.theme} />;
  }

  return <div className="scalebook">
    <div className="settings-bar" style={settingsBarStyle}>
      <InstrumentSelector
        activeInstrumentName={props.activeInstrumentName}
        instruments={props.instruments}
        onInstrumentSelect={props.onInstrumentSelect}
        theme={props.theme} />

      <NoteSelector
        label="Key:"
        scaleSystem={props.scaleSystem}
        note={props.keyNote}
        onNoteSelect={props.onKeyNoteSelect}
        theme={props.theme} />

      <ScaleSelector activeScale={props.activeScale}
        onScaleSelect={props.onScaleSelect}
        theme={props.theme} />

      <EquivKeySelector activeKey={props.activeKey}
        updateKey={props.updateKey}
        theme={props.theme} />

      <EquivScaleSelector activeScale={props.activeScale}
        onScaleSelect={props.onScaleSelect}
        theme={props.theme} />
    </div>

    {instrumentComponent}

    <NoteTable activeKey={props.activeKey}
      theme={props.theme} />

    <IntervalTable scale={props.activeScale}
      theme={props.theme} />
  </div>;
}
