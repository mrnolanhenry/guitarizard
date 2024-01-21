import "./Scalebook.css";
import React, { CSSProperties } from "react";
import { Key, Note, Scale, Temperament } from "note-lib";
import { Base16Theme } from "../../colors/themes";
import { InstrumentSelector } from "../selectors/InstrumentSelector";
import { NoteSelector } from "../selectors/NoteSelector";
import { ScaleSelector } from "../selectors/ScaleSelector";
import { EquivKeySelector } from "../selectors/EquivKeySelector";
import { KeySearchSelector } from "../selectors/KeySearchSelector";
import { RainbowModeSelector } from "../selectors/RainbowModeSelector";
import { IntervalTable } from "../IntervalTable";
import { NoteTable } from "../NoteTable";
import { Instrument } from "../Instrument";
import { CommonTuningSelector } from "../selectors/CommonTuningSelector";
import { Tuning } from "note-lib/src/Tuning";
import { FrettedInstrument } from "note-lib/src/instruments/FrettedInstrument";

interface IScalebookProps {
  activeInstrument: FrettedInstrument;
  activeKey: Key;
  activeTuning: Tuning;
  instruments: Map<string, FrettedInstrument>;
  isRainbowMode: boolean;
  onInstrumentSelect: (instrument: FrettedInstrument) => void;
  onInstrumentTune: (courseId: string, newTuning: Note) => void;
  onInstrumentTuneToPreset: (tuning: Tuning) => void;
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
    activeTuning,
    instruments,
    isRainbowMode,
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
  const settingsBarStyle: CSSProperties = {
    backgroundColor: theme.swatch.base01,
  };

  const instrument: FrettedInstrument = activeInstrument;
  const activeKeyNote: Note = activeKey.note;
  const activeScale: Scale = activeKey.scale;

  const instrumentComponent = instrument ? (
    <Instrument
      activeKey={activeKey}
      instrument={instrument}
      isRainbowMode={isRainbowMode}
      onTune={onInstrumentTune}
      theme={theme}
    />
  ) : (
    <></>
  );

  return (
    <div className="scalebook">
      <div className="settings-bar" style={settingsBarStyle}>
        <InstrumentSelector
          activeInstrument={activeInstrument}
          instruments={instruments}
          label="Instrument:"
          minWidth="12em"
          onInstrumentSelect={onInstrumentSelect}
          theme={theme}
        />

        <CommonTuningSelector
          activeInstrument={activeInstrument}
          activeTuning={activeTuning}
          label="Common Tunings:"
          minWidth="10em"
          onCommonTuningSelect={onInstrumentTuneToPreset}
          theme={theme}
        />

        <NoteSelector
          id="active key"
          label="Key:"
          note={activeKeyNote}
          onNoteSelect={onKeyNoteSelect}
          temperament={temperament}
          theme={theme}
        />

        <ScaleSelector
          activeScale={activeScale}
          minWidth="16em"
          onScaleSelect={onScaleSelect}
          theme={theme}
        />

        <EquivKeySelector
          activeKey={activeKey}
          minWidth="18em"
          theme={theme}
          updateKey={updateKey}
        />

        <KeySearchSelector
          minWidth="18em"
          temperament={temperament}
          theme={theme}
          updateKey={updateKey}
        />

        <RainbowModeSelector
          isRainbowMode={isRainbowMode}
          minWidth="8em"
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
        isRainbowMode={isRainbowMode}
        scale={activeScale}
        theme={theme}
      />
    </div>
  );
};

export { Scalebook };
