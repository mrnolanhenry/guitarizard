import "./Scalebook.css";
import React, { CSSProperties, useState } from "react";
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
import { Button, Grid } from "@mui/material";
import { HtmlTooltip } from "../HtmlTooltip";

interface IScalebookProps {
  activeInstrument: FrettedInstrument;
  activeKey: Key;
  activeTuning: Tuning;
  instruments: Map<string, FrettedInstrument>;
  isLargeScreen: boolean;
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
    isLargeScreen,
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

  const [showInstrument, setShowInstrument] = useState(isLargeScreen);
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

  const showInstrumentTooltipContent = (
    <React.Fragment>
    <span>{`Instruments are best viewed on a desktop. You've been warned!`}</span>
  </React.Fragment>
  );

  return (
    <Grid container className="scalebook">
      <Grid item container xs={12} className="settings-bar" justifyContent="center" paddingTop={1} paddingBottom={1} style={settingsBarStyle}>
        {showInstrument && (
          <>
            <Grid item xs={5} sm={5} md="auto" lg="auto">
              <InstrumentSelector
                activeInstrument={activeInstrument}
                instruments={instruments}
                label="Instrument:"
                minWidth={isLargeScreen ? "12em" : "8em"}
                onInstrumentSelect={onInstrumentSelect}
                theme={theme}
              />
            </Grid>
            <Grid item xs={5} sm={5} md="auto" lg="auto">
              <CommonTuningSelector
                activeInstrument={activeInstrument}
                activeTuning={activeTuning}
                label="Common Tunings:"
                minWidth={isLargeScreen ? "10em" : "8em"}
                onCommonTuningSelect={onInstrumentTuneToPreset}
                theme={theme}
              />
            </Grid>
          </>
        )}
        <Grid item xs={2} sm="auto" md="auto" lg="auto">
          <NoteSelector
            id="active key"
            label="Key:"
            note={activeKeyNote}
            onNoteSelect={onKeyNoteSelect}
            temperament={temperament}
            theme={theme}
          />
        </Grid>
        <Grid item xs={8} sm="auto" md={4} lg="auto">
          <ScaleSelector
            activeScale={activeScale}
            label="Scale:"
            minWidth={isLargeScreen ? "16em" : "14em"}
            onScaleSelect={onScaleSelect}
            theme={theme}
          />
        </Grid>
        <Grid item xs={12} sm="auto" md="auto" lg="auto">
          <EquivKeySelector
            activeKey={activeKey}
            minWidth="18em"
            theme={theme}
            updateKey={updateKey}
          />
        </Grid>
        <Grid item xs={12} sm="auto" md="auto" lg="auto">
          <KeySearchSelector
            minWidth="18em"
            temperament={temperament}
            theme={theme}
            updateKey={updateKey}
          />
        </Grid>
        <Grid item xs={4} sm="auto" md="auto" lg="auto">
          <RainbowModeSelector
            isRainbowMode={isRainbowMode}
            minWidth="8em"
            toggleRainbowMode={toggleRainbowMode}
            theme={theme}
          />
        </Grid>
      </Grid>
      {!isLargeScreen && 
        <Grid container item xs={12} justifyContent="center" paddingBottom={2}>
          <HtmlTooltip showTooltip={!showInstrument} theme={theme} title={showInstrumentTooltipContent}>
            <Button variant="outlined" onClick={() => setShowInstrument(!showInstrument)} color="secondary">
              {`${showInstrument ? `Hide` : `Show`} Instrument`}
            </Button>
          </HtmlTooltip>
        </Grid>
      }
      {showInstrument && 
        <Grid item xs={12} paddingBottom={1}>
          {instrumentComponent}
        </Grid>
      }
      <Grid item xs={12} paddingTop={1} paddingBottom={1}>
        <NoteTable
          activeKey={activeKey}
          isLargeScreen={isLargeScreen}
          isRainbowMode={isRainbowMode}
          theme={theme}
        />
      </Grid>
      <Grid item xs={12}>
        <IntervalTable
          isLargeScreen={isLargeScreen}
          isRainbowMode={isRainbowMode}
          scale={activeScale}
          theme={theme}
        />
      </Grid>
    </Grid>
  );
};

export { Scalebook };
