import "./Scalebook.css";
import { Key, Note, Scale, Temperament, instrument } from "note-lib";
import { Base16Theme } from "../../colors/themes";
import { InstrumentSelector } from "../selectors/InstrumentSelector";
import { NoteSelector } from "../selectors/NoteSelector";
import { ScaleSelector } from "../selectors/ScaleSelector";
// import { EquivScaleSelector } from "./EquivScaleSelector";
import { EquivKeySelector } from "../selectors/EquivKeySelector";
import { RainbowModeSelector } from "../selectors/RainbowModeSelector";
import { IntervalTable } from "../IntervalTable";
import { NoteTable } from "../NoteTable";
// import ToggleButtonIntervalTable from "./ToggleButtonIntervalTable";
import { Instrument } from "../Instrument";
import { IFrettedInstrument } from "note-lib/src/IFrettedInstrument";
import { CommonTuningSelector } from "../selectors/CommonTuningSelector";
import { Tuning } from "note-lib/src/Tuning";

interface IScalebookProps {
  activeInstrument: IFrettedInstrument;
  activeKey: Key;
  activeScale: Scale;
  activeTuning: Tuning;  
  instruments: Map<string, IFrettedInstrument>;
  isRainbowMode: boolean;
  keyNote: Note;
  onInstrumentSelect: (instrument: IFrettedInstrument) => void;
  onInstrumentTune: (
    instrumentName: string,
    stringID: string,
    newTuning: Note
  ) => void;
  onInstrumentTuneToPreset: (
    tuning: Tuning
  ) => void;
  onKeyNoteSelect: (keyNote: Note) => void;
  onScaleSelect: (scale: Scale) => void;
  temperament: Temperament;
  theme: Base16Theme;
  toggleRainbowMode: () => void;
  updateKey: (key: Key) => void;
}

const Scalebook = (props: IScalebookProps) => {
  const {
    activeInstrument,
    activeKey,
    activeScale,
    activeTuning,
    instruments,
    isRainbowMode,
    keyNote,
    onInstrumentSelect,
    onInstrumentTune,
    onInstrumentTuneToPreset,
    onKeyNoteSelect,
    onScaleSelect,
    temperament,
    theme,
    toggleRainbowMode,
    updateKey,
  } = props;
  const settingsBarStyle = {
    backgroundColor: theme.base01,
  };

  const instrument: IFrettedInstrument = activeInstrument;

  const instrumentComponent = instrument ? (
    <Instrument
      instrument={instrument}
      activeKey={activeKey}
      keyNote={keyNote}
      scale={activeScale}
      onTune={onInstrumentTune}
      isRainbowMode={isRainbowMode}
      theme={theme}
    />
  ) : <></>;

  return (
    <div className="scalebook">
      <div className="settings-bar" style={settingsBarStyle}>
        <InstrumentSelector
          label="Instrument:"
          activeInstrument={activeInstrument}
          instruments={instruments}
          onInstrumentSelect={onInstrumentSelect}
          theme={theme}
        />

        <CommonTuningSelector
          label="Common Tunings:"
          activeInstrument={activeInstrument}
          activeTuning={activeTuning}
          onCommonTuningSelect={onInstrumentTuneToPreset}
          theme={theme}
        />

        <NoteSelector
          label="Key:"
          temperament={temperament}
          note={keyNote}
          onNoteSelect={onKeyNoteSelect}
          theme={theme}
        />

        <ScaleSelector
          activeScale={activeScale}
          onScaleSelect={onScaleSelect}
          theme={theme}
        />

        <EquivKeySelector
          activeKey={activeKey}
          updateKey={updateKey}
          theme={theme}
        />

        {/* <EquivScaleSelector
          activeScale={activeScale}
          onScaleSelect={onScaleSelect}
          theme={theme}
        /> */}
        <RainbowModeSelector
          isRainbowMode={isRainbowMode}
          toggleRainbowMode={toggleRainbowMode}
          theme={theme}
        />
      </div>

      {instrumentComponent}

      <NoteTable
        activeKey={activeKey}
        isRainbowMode={isRainbowMode}
        theme={theme}
      />

      <IntervalTable
        scale={activeScale}
        isRainbowMode={isRainbowMode}
        theme={theme}
      />
    </div>
  );
}

export { Scalebook };
