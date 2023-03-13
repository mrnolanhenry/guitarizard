import React from "react";
import "./Scalebook.css";
import { Key, Note, Scale, Temperament, instrument } from "note-lib";
import { Base16Theme } from "../colors/colors";
import InstrumentSelector from "./InstrumentSelector";
import NoteSelector from "./NoteSelector";
import ScaleSelector from "./ScaleSelector";
import EquivScaleSelector from "./EquivScaleSelector";
import EquivKeySelector from "./EquivKeySelector";
import RainbowModeSelector from "./RainbowModeSelector";
import IntervalTable from "./IntervalTable";
import NoteTable from "./NoteTable";
// import ToggleButtonIntervalTable from "./ToggleButtonIntervalTable";
import Instrument from "./Instrument";
import { IFrettedInstrument } from "note-lib/src/IFrettedInstrument";

interface IScalebookProps {
  instruments: Map<string, IFrettedInstrument>;
  activeInstrumentName: string;
  activeScale: Scale;
  keyNote: Note;
  activeKey: Key;
  temperament: Temperament;
  isRainbowMode: boolean;
  toggleRainbowMode: () => void;
  onToggleNoteTable: boolean;
  onToggleIntervalTable: boolean;
  onKeyNoteSelect: (keyNote: Note) => void;
  onInstrumentSelect: (instrument: IFrettedInstrument) => void;
  onScaleSelect: (scale: Scale) => void;
  updateKey: (key: Key) => void;
  onInstrumentTune: (
    instrumentName: string,
    stringID: string,
    newTuning: Note
  ) => void;
  theme: Base16Theme;
}

export default function Scalebook(props: IScalebookProps) {
  const settingsBarStyle = {
    backgroundColor: props.theme.base01,
  };

  const instrument = props.instruments.get(props.activeInstrumentName);

  const instrumentComponent = instrument ? (
    <Instrument
      instrument={instrument}
      activeKey={props.activeKey}
      keyNote={props.keyNote}
      scale={props.activeScale}
      onTune={props.onInstrumentTune}
      isRainbowMode={props.isRainbowMode}
      theme={props.theme}
    />
  ) : undefined;

  return (
    <div className="scalebook">
      <div className="settings-bar" style={settingsBarStyle}>
        <InstrumentSelector
          activeInstrumentName={props.activeInstrumentName}
          instruments={props.instruments}
          onInstrumentSelect={props.onInstrumentSelect}
          theme={props.theme}
        />

        <NoteSelector
          label="Key:"
          temperament={props.temperament}
          note={props.keyNote}
          onNoteSelect={props.onKeyNoteSelect}
          theme={props.theme}
        />

        <ScaleSelector
          activeScale={props.activeScale}
          onScaleSelect={props.onScaleSelect}
          theme={props.theme}
        />

        <EquivKeySelector
          activeKey={props.activeKey}
          updateKey={props.updateKey}
          theme={props.theme}
        />

        <EquivScaleSelector
          activeScale={props.activeScale}
          onScaleSelect={props.onScaleSelect}
          theme={props.theme}
        />
        <RainbowModeSelector
          isRainbowMode={props.isRainbowMode}
          toggleRainbowMode={props.toggleRainbowMode}
          theme={props.theme}
        />
      </div>

      {instrumentComponent}

      <NoteTable
        activeKey={props.activeKey}
        isRainbowMode={props.isRainbowMode}
        theme={props.theme}
      />

      <IntervalTable
        scale={props.activeScale}
        isRainbowMode={props.isRainbowMode}
        theme={props.theme}
      />
    </div>
  );
}
