import "./Chordbook.css";
import React, { CSSProperties, useEffect, useState } from "react";
// IMPORTANT - must import @mui/icons-material BEFORE @mui/material or app breaks (vite doesn't like)
import { Help as HelpIcon, ScreenRotation as ScreenRotationIcon } from '@mui/icons-material';
import { Divider, Grid, IconButton, SxProps } from "@mui/material";
import { Chord, ChordType, Constants, Key, Note, Scale, Temperament } from "note-lib";
import { Base16Theme } from "../../colors/themes";
import { InstrumentSelector } from "../selectors/InstrumentSelector";
import { NoteSelector } from "../selectors/NoteSelector";
import { IntervalTable } from "../IntervalTable";
import { NoteTable } from "../NoteTable";
import { Instrument } from "../Instrument";
import { CommonTuningSelector } from "../selectors/CommonTuningSelector";
import { Tuning } from "note-lib/src/Tuning";
import { FrettedInstrument } from "note-lib/src/instruments/FrettedInstrument";
import { ChordTypeSelector } from "../selectors/ChordTypeSelector";
import { ChordSearchSelector } from "../selectors/ChordSearchSelector";
import { ChordSelector } from "../selectors/ChordSelector";
import { KeySelector } from "../selectors/KeySelector";
import { IAppDialogState } from "../AppDialog";

interface IChordbookProps {
  activeInstrument: FrettedInstrument;
  activeChord: Chord;
  activeTuning: Tuning;
  allChords: Chord[];
  allChordTypes: ChordType[];
  dialogState: IAppDialogState;
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
  setDialogState: React.Dispatch<React.SetStateAction<IAppDialogState>>
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
    dialogState,
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
    setDialogState,
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
  const keysThatIncludeThisChord = activeChord.getInclusiveKeys();

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

  const renderInstrumentSelectors = () => {
    return (
      <>
        <Grid item className="selectorParent" xs="auto" sm={12} md="auto" marginBottom={isSmallScreen || isMediumScreen ? 2 : 0}>
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
          <Grid item className="selectorParent" xs="auto" sm={12} md="auto">
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
    );
  }

  const renderDivider = (dividerText: string) => {
    let style: SxProps = {
        width:"100%",
        fontSize: ".75rem",
        "&::before, &::after": {
          borderColor: theme.swatch.base05,
        }
    };
    if(!dividerText) {
      style = {...style, backgroundColor: theme.swatch.base05}
    }
    return (
      <Divider sx={style}>
        {dividerText}
      </Divider>
    )
  }

  const renderChordSearchHelp = () => {
    return (
      <Grid container className="chord-search-help" alignItems="center">
        <Grid container item padding={1}>
          <Grid container borderBottom={1} marginBottom={2}>
            <span>Searching by Name:</span>
          </Grid>
          <Grid container alignItems="center" paddingLeft={2} paddingRight={2}>
            <Grid item xs={12} sm={12}>
              <p>
                <p>You can search for chords directly by name, using either full names, abbreviations, or symbols.</p>
                <p style={{marginLeft: "1.5rem"}}>Example 1: <i>"G°7," "Gdim7," "G diminished 7th,"</i> or <i>"G diminished seventh"</i></p>
                <p style={{marginLeft: "1.5rem"}}>Example 2: <i>"Ebm", "E♭min,"</i> or <i>"Eb minor"</i></p>
              </p>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item padding={1}>
          <Grid container borderBottom={1} marginBottom={2}>
              <span>Searching by Notes:</span>
          </Grid>
          <Grid container alignItems="center" paddingLeft={2} paddingRight={2}>
            <Grid item xs={12} sm={12}>
              <p>
                <p>You can search for chords by typing each note in the chord, separated by commas.</p>
                <p style={{marginLeft: "1.5rem"}}>Example 1: <i>"A, F#, Db, C"</i></p>
                <p>You can also specify notes that are specifically NOT in the chord you're looking for, by adding a <i>"-"</i> before the note.</p>
                <p style={{marginLeft: "1.5rem"}}>Example 2: <i>"A, F#, -G, Db, C"</i> will return chords that include A, F#, Db, and C, but does not include G.</p>
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container className="chordbook">
      {showInstrument && <Grid item container xs={12} sm={5} md={6} lg={4} id="instrumentSettings" className="settings-bar" justifyContent="flex-start" alignContent="flex-start" paddingTop={0} paddingBottom={0} style={settingsBarStyle}>
        <Grid item container xs={12}>
          {renderDivider("Current Instrument:")}
        </Grid>
        <Grid item container xs={12}>
        {renderInstrumentSelectors()}
        </Grid>
      </Grid>
      }
              {/* <Divider 
            orientation="vertical"
            variant="fullWidth"
            sx={{
              borderColor: theme.swatch.base05,
              "&::before, &::after": {
                borderColor: theme.swatch.base05,
              }
            }}
          /> */}
      <Grid item container xs={12} sm={7} md={6} lg={8} id="searchChordSettings" className="settings-bar" justifyContent="center" alignContent="flex-start" paddingTop={0} paddingBottom={0} style={settingsBarStyle}>
        <Grid item container xs={12}>
          {renderDivider("Chord Search:")}
        </Grid>
        <Grid item container justifyContent={isLargeScreen ? "flex-start" : "center"} xs={12}>
          <Grid item className="selectorParent" xs={10} sm={10} md={10} lg={6}>
            <ChordSearchSelector
              allChords={allChords}
              minWidth="14em"
              theme={theme}
              updateChord={updateChord}
            />
          </Grid>
          <Grid item className="selectorParent" xs={2} sm={2} md={2} lg={1} alignContent="center">
            <div 
              id="helpButtonChordSearch" 
              aria-label="settings-button" 
              onClick={() => setDialogState({
                ...dialogState, 
                isOpen: true, 
                title: "Searching for Chords", 
                content: renderChordSearchHelp()
                })}>
              <IconButton color="secondary">
                <HelpIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container xs={12} sm={5} md={5} lg={4} id="currentChordSettings" className="settings-bar" justifyContent={isSmallScreen ? "center" : "flex-start"} alignContent="flex-start" paddingTop={0} paddingBottom={1} style={settingsBarStyle}>
        <Grid item container xs={12}>
          {renderDivider("Current Chord:")}
        </Grid>
        <Grid item container xs={12} justifyContent={isSmallScreen ? "center" : "flex-start"}>
          <Grid item className="selectorParent" xs="auto" sm={12} md="auto" marginBottom={isSmallScreen || isMediumScreen ? 2 : 0}>
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
          <Grid item className="selectorParent" xs="auto" sm={12} md="auto">
            <ChordTypeSelector
              activeChordType={activeChordType}
              items={allChordTypes}
              label="Chord Type:"
              minWidth={"12em"}
              onChordTypeSelect={onChordTypeSelect}
              shouldAutocomplete={isLargeScreen}
              theme={theme}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item container xs={12} sm={7} md={7} lg={8} id="aboutChordSettings" className="settings-bar" justifyContent="flex-start" alignContent="flex-start" paddingTop={0} paddingBottom={1} style={settingsBarStyle}>
        <Grid item container xs={12}>
          {renderDivider("About this Chord:")}
        </Grid>
        <Grid item container xs={12}>
          <Grid item className="selectorParent" xs={12} sm={12} md={5} lg={5} marginBottom={isSmallScreen || isMediumScreen ? 2 : 0}>
            <ChordSelector
              activeChord={activeChord}
              id="equiv-chord-selector"
              items={activeChord.getEquivChords()}
              label="Equivalent Chords:"
              minWidth="12em"
              onChange={updateChord}
              shouldAutocomplete={isLargeScreen}
              theme={theme}
            />
          </Grid>
          <Grid item className="selectorParent" xs={12} sm={12} md={7} lg={7}>
            <KeySelector
              activeKey={keysThatIncludeThisChord[0]}
              id="inclusive-key-selector"
              items={keysThatIncludeThisChord}
              label="Keys including this Chord:"
              minWidth="14em"
              onChange={(key: Key) => {}}
              shouldAutocomplete={isLargeScreen}
              theme={theme}
            />
          </Grid>
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
