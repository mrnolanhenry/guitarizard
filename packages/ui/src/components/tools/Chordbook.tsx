import "./Chordbook.css";
import React, { CSSProperties, useEffect, useState } from "react";
// IMPORTANT - must import @mui/icons-material BEFORE @mui/material or app breaks (vite doesn't like)
import { ScreenRotation as ScreenRotationIcon } from '@mui/icons-material';
import { Grid } from "@mui/material";
import { Chord, ChordType, Constants, Key, Note, Scale, Temperament } from "note-lib";
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
import { ChordTypeSelector } from "../selectors/ChordTypeSelector";
import { ChordSearchSelector } from "../selectors/ChordSearchSelector";
import { EquivChordSelector } from "../selectors/EquivChordSelector";

interface IChordbookProps {
  activeInstrument: FrettedInstrument;
  activeChord: Chord;
  activeTuning: Tuning;
  allChords: Chord[];
  allChordTypes: ChordType[];
  instruments: Map<string, FrettedInstrument>;
  isSmallScreen: boolean;
  isMediumScreen: boolean;
  isLargeScreen: boolean;
  isRainbowMode: boolean;
  onInstrumentSelect: (instrument: FrettedInstrument) => void;
  onInstrumentTune: (courseId: string, newTuning: Note) => void;
  onInstrumentTuneToPreset: (tuning: Tuning) => void;
  onChordRootSelect: (root: Note) => void;
  onChordTypeSelect: (chordType: ChordType) => void;
  shouldHighlightPiano: boolean;
  temperament: Temperament;
  theme: Base16Theme;
  updateChord: (chord: Chord) => void;
}

const Chordbook = (props: IChordbookProps) => {
  const {
    activeInstrument,
    activeChord,
    activeTuning,
    allChords,
    allChordTypes,
    instruments,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    isRainbowMode,
    onInstrumentSelect,
    onInstrumentTune,
    onInstrumentTuneToPreset,
    onChordRootSelect,
    onChordTypeSelect,
    shouldHighlightPiano,
    temperament,
    theme,
    updateChord,
  } = props;

  const [showInstrument, setShowInstrument] = useState(!isSmallScreen);
  useEffect(() => setShowInstrument(!isSmallScreen), [isSmallScreen])
  const settingsBarStyle: CSSProperties = {
    backgroundColor: theme.swatch.base01,
  };

  const instrument: FrettedInstrument = activeInstrument;
  const activeChordRoot: Note = activeChord.root;
  const activeChordType: ChordType = activeChord.chordType;

  const instrumentComponent = instrument ? (
    <Instrument
      activeKeyOrChord={activeChord}
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
            activeKeyOrChord={activeChord}
            isSmallScreen={isSmallScreen}
            isRainbowMode={isRainbowMode}
            theme={theme}
          />
        </Grid>
        <Grid item xs={9}>
          <IntervalTable
            isSmallScreen={isSmallScreen}
            isRainbowMode={isRainbowMode}
            intervals={activeChordType.intervals}
            temperament={temperament}
            theme={theme}
          />
        </Grid>
      </Grid>
    </> :
    <>
      <Grid item xs={12} paddingTop={1} paddingBottom={1}>
        <NoteTable
          activeKeyOrChord={activeChord}
          isSmallScreen={isSmallScreen}
          isRainbowMode={isRainbowMode}
          theme={theme}
        />
      </Grid>
      <Grid item xs={12}>
        <IntervalTable
          intervals={activeChordType.intervals}
          isSmallScreen={isSmallScreen}
          isRainbowMode={isRainbowMode}
          temperament={temperament}
          theme={theme}
        />
      </Grid> 
    </>
  }

  return (
    <Grid container className="chordbook">
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
            id="active chord"
            items={temperament.getNotesInTemperament()}
            label="Root:"
            note={activeChordRoot}
            onNoteSelect={onChordRootSelect}
            shouldAutocomplete={isLargeScreen}
            theme={theme}
          />
        </Grid>
        <Grid item xs={8} sm="auto" md={4} lg="auto">
          <ChordTypeSelector
            activeChordType={activeChordType}
            items={allChordTypes}
            label="Chord Type:"
            minWidth={isSmallScreen ? "14em" : "16em"}
            onChordTypeSelect={onChordTypeSelect}
            shouldAutocomplete={isLargeScreen}
            theme={theme}
          />
        </Grid>
        <Grid item xs={12} sm="auto" md="auto" lg="auto">
          <EquivChordSelector
            activeChord={activeChord}
            minWidth="18em"
            shouldAutocomplete={isLargeScreen}
            theme={theme}
            updateChord={updateChord}
          />
        </Grid>
        <Grid item xs={12} sm="auto" md="auto" lg="auto">
          <ChordSearchSelector
            allChords={allChords}
            minWidth="18em"
            theme={theme}
            updateChord={(chord: Chord) => updateChord(chord)}
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

export { Chordbook };
