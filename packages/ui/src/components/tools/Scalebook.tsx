import "./Scalebook.css";
import React, { CSSProperties, useEffect, useState } from "react";
// IMPORTANT - must import @mui/icons-material BEFORE @mui/material or app breaks (vite doesn't like)
import { ScreenRotation as ScreenRotationIcon } from '@mui/icons-material';
import { Grid } from "@mui/material";
import { Constants, Key, Note, Scale, Temperament } from "note-lib";
import { Base16Theme } from "../../colors/themes";
import { InstrumentSelector } from "../selectors/InstrumentSelector";
import { NoteSelector } from "../selectors/NoteSelector";
import { ScaleSelector } from "../selectors/ScaleSelector";
import { EquivKeySelector } from "../selectors/EquivKeySelector";
import { KeySearchSelector } from "../selectors/KeySearchSelector";
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
  isSmallScreen: boolean;
  isMediumScreen: boolean;
  isLargeScreen: boolean;

  onInstrumentSelect: (instrument: FrettedInstrument) => void;
  onInstrumentTune: (courseId: string, newTuning: Note) => void;
  onInstrumentTuneToPreset: (tuning: Tuning) => void;
  onKeyNoteSelect: (keyNote: Note) => void;
  onScaleSelect: (scale: Scale) => void;
  temperament: Temperament;
  updateKey: (key: Key) => void;

  // - - -
  theme: Base16Theme;
  isRainbowMode: boolean;
  octaveUIEnabled: boolean;
}

const Scalebook = (props: IScalebookProps) => {
  const {
    activeInstrument,
    activeKey,
    activeTuning,
    instruments,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    onInstrumentSelect,
    onInstrumentTune,
    onInstrumentTuneToPreset,
    onKeyNoteSelect,
    onScaleSelect,
    temperament,
    updateKey,
    // - - -
    theme,
    isRainbowMode,
    octaveUIEnabled,
  } = props;

  const [showInstrument, setShowInstrument] = useState(!isSmallScreen);
  useEffect(() => setShowInstrument(!isSmallScreen), [isSmallScreen])
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
      isMediumScreen={isMediumScreen}
      isLargeScreen={isLargeScreen}
      onTune={onInstrumentTune}
      temperament={temperament}
      theme={theme}
      isRainbowMode={isRainbowMode}
      octaveUIEnabled={octaveUIEnabled}
    />
  ) : (
    <></>
  );

  const renderNoteAndIntervalTable = (isSmallScreen: boolean) => {
    return isSmallScreen ?
    <>
      <Grid container item paddingTop={1} paddingBottom={1}>
        <Grid item xs={3}>
          <NoteTable
            activeKey={activeKey}
            isSmallScreen={isSmallScreen}
            isRainbowMode={isRainbowMode}
            theme={theme}
          />
        </Grid>
        <Grid item xs={9}>
          <IntervalTable
            isSmallScreen={isSmallScreen}
            isRainbowMode={isRainbowMode}
            scale={activeScale}
            theme={theme}
          />
        </Grid>
      </Grid>
    </> :
    <>
      <Grid item xs={12} paddingTop={1} paddingBottom={1}>
        <NoteTable
          activeKey={activeKey}
          isSmallScreen={isSmallScreen}
          isRainbowMode={isRainbowMode}
          theme={theme}
        />
      </Grid>
      <Grid item xs={12}>
        <IntervalTable
          isSmallScreen={isSmallScreen}
          isRainbowMode={isRainbowMode}
          scale={activeScale}
          theme={theme}
        />
      </Grid>
    </>
  }

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
                minWidth={isSmallScreen ? "8em" : "12em"}
                onInstrumentSelect={onInstrumentSelect}
                theme={theme}
              />
            </Grid>
            {activeInstrument.name !== Constants.PIANO && (
              <Grid item xs={5} sm={5} md="auto" lg="auto">
                <CommonTuningSelector
                  activeInstrument={activeInstrument}
                  activeTuning={activeTuning}
                  label="Common Tunings:"
                  minWidth={isSmallScreen ? "8em" : "10em"}
                  onCommonTuningSelect={onInstrumentTuneToPreset}
                  theme={theme}
                />
              </Grid>
            )}
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
            minWidth={isSmallScreen ? "14em" : "16em"}
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
      </Grid>
      {isSmallScreen &&
        <Grid container item xs={12} justifyContent="center" alignContent="center" paddingBottom={2}>
          <span>Rotate Screen to Show Instrument </span>
          <ScreenRotationIcon sx={{ paddingLeft: "5px", paddingRight: "5px" }}/>
        </Grid>
      }
      {showInstrument &&
        <Grid item xs={12} paddingBottom={1}>
          {instrumentComponent}
        </Grid>
      }
      {renderNoteAndIntervalTable(isSmallScreen)}
    </Grid>
  );
};

export { Scalebook };
