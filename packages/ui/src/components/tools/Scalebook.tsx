import "./Scalebook.css";
import React, { CSSProperties, useEffect, useState } from "react";
// IMPORTANT - must import @mui/icons-material BEFORE @mui/material or app breaks (vite doesn't like)
import { ScreenRotation as ScreenRotationIcon } from '@mui/icons-material';
import { Grid } from "@mui/material";
import { Chord, Constants, Key, Note, Scale, Temperament } from "note-lib";
import { Base16Theme } from "../../colors/themes";
import { InstrumentSelector } from "../selectors/InstrumentSelector";
import { NoteSelector } from "../selectors/NoteSelector";
import { ScaleSelector } from "../selectors/ScaleSelector";
import { KeySelector } from "../selectors/KeySelector";
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
  allKeys: Key[];
  allScales: Scale[];
  instruments: Map<string, FrettedInstrument>;
  isSmallScreen: boolean;
  isMediumScreen: boolean;
  isLargeScreen: boolean;
  isRainbowMode: boolean;
  onInstrumentSelect: (instrument: FrettedInstrument) => void;
  onInstrumentTune: (courseId: string, newTuning: Note) => void;
  onInstrumentTuneToPreset: (tuning: Tuning) => void;
  onKeyTonicSelect: (tonic: Note) => void;
  onScaleSelect: (scale: Scale) => void;
  shouldHighlightPiano: boolean;
  temperament: Temperament;
  theme: Base16Theme;
  updateKey: (key: Key) => void;
}

const Scalebook = (props: IScalebookProps) => {
  const {
    activeInstrument,
    activeKey,
    activeTuning,
    allKeys,
    allScales,
    instruments,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    isRainbowMode,
    onInstrumentSelect,
    onInstrumentTune,
    onInstrumentTuneToPreset,
    onKeyTonicSelect,
    onScaleSelect,
    shouldHighlightPiano,
    temperament,
    theme,
    updateKey,
  } = props;

  const [showInstrument, setShowInstrument] = useState(!isSmallScreen);
  useEffect(() => setShowInstrument(!isSmallScreen), [isSmallScreen])
  const settingsBarStyle: CSSProperties = {
    backgroundColor: theme.swatch.base01,
  };

  const instrument: FrettedInstrument = activeInstrument;
  const activeKeyTonic: Note = activeKey.tonic;
  const activeScale: Scale = activeKey.scale;

  const instrumentComponent = instrument ? (
    <Instrument
      activeKeyOrChord={activeKey}
      instrument={instrument}
      isMediumScreen={isMediumScreen}
      isLargeScreen={isLargeScreen}
      isRainbowMode={isRainbowMode}
      onTune={onInstrumentTune}
      shouldHighlightPiano={shouldHighlightPiano}
      temperament={temperament}
      theme={theme}
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
            activeKeyOrChord={activeKey}
            isSmallScreen={isSmallScreen}
            isRainbowMode={isRainbowMode}
            theme={theme}
          />
        </Grid>
        <Grid item xs={9}>
          <IntervalTable
            intervals={activeScale.intervals}
            isSmallScreen={isSmallScreen}
            isRainbowMode={isRainbowMode}
            temperament={temperament}
            theme={theme}
          />
        </Grid>
      </Grid>
    </> :
    <>
      <Grid item xs={12} paddingTop={1} paddingBottom={1}>
        <NoteTable
          activeKeyOrChord={activeKey}
          isSmallScreen={isSmallScreen}
          isRainbowMode={isRainbowMode}
          theme={theme}
        />
      </Grid>
      <Grid item xs={12}>
        <IntervalTable
          intervals={activeScale.intervals}
          isSmallScreen={isSmallScreen}
          isRainbowMode={isRainbowMode}
          temperament={temperament}
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
                shouldAutocomplete={isLargeScreen}
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
                  shouldAutocomplete={isLargeScreen}
                  theme={theme}
                />
              </Grid>
            )}
          </>
        )}
        <Grid item xs={2} sm="auto" md="auto" lg="auto">
          <NoteSelector
            id="active key"
            items={temperament.getNotesInTemperament()}
            label="Key:"
            note={activeKeyTonic}
            onNoteSelect={onKeyTonicSelect}
            shouldAutocomplete={isLargeScreen}
            theme={theme}
          />
        </Grid>
        <Grid item xs={8} sm="auto" md={4} lg="auto">
          <ScaleSelector
            activeScale={activeScale}
            items={allScales}
            label="Scale:"
            minWidth={isSmallScreen ? "14em" : "16em"}
            onScaleSelect={onScaleSelect}
            shouldAutocomplete={isLargeScreen}
            theme={theme}
          />
        </Grid>
        <Grid item xs={12} sm="auto" md="auto" lg="auto">
          <KeySelector
            activeKey={activeKey}
            id="equiv-key-selector"
            items={activeKey.getEquivKeys()}
            label="Equivalent Keys:"
            minWidth="18em"
            onChange={updateKey}
            shouldAutocomplete={isLargeScreen}
            theme={theme}
          />
        </Grid>
        <Grid item xs={12} sm="auto" md="auto" lg="auto">
          <KeySearchSelector
            allKeys={allKeys}
            minWidth="18em"
            theme={theme}
            updateKey={(key: Key) => updateKey(key)}
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
