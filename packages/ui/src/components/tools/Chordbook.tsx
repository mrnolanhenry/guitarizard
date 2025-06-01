import "./Chordbook.css";
import React, { CSSProperties, useEffect, useState } from "react";
// IMPORTANT - must import @mui/icons-material BEFORE @mui/material or app breaks (vite doesn't like)
import { Help as HelpIcon, ScreenRotation as ScreenRotationIcon } from '@mui/icons-material';
import { Button, Divider, Grid, IconButton, SxProps } from "@mui/material";
import { Chord, ChordType, Constants, Key, Note, Temperament } from "note-lib";
import { Base16Theme } from "../../colors/themes";
import { InstrumentSelector } from "../selectors/InstrumentSelector";
import { NoteSelector } from "../selectors/NoteSelector";
import { IntervalTable } from "../IntervalTable";
import { NoteTable } from "../NoteTable";
import { Instrument } from "../instruments/Instrument";
import { CommonTuningSelector } from "../selectors/CommonTuningSelector";
import { Tuning } from "note-lib/src/Tuning";
import { FrettedInstrument } from "note-lib/src/instruments/FrettedInstrument";
import { ChordTypeSelector } from "../selectors/ChordTypeSelector";
import { ChordSearchSelector } from "../selectors/ChordSearchSelector";
import { ChordSelector } from "../selectors/ChordSelector";
import { KeySelector } from "../selectors/KeySelector";
import { IAppDialogState } from "../AppDialog";
import { KeyOrChordSearchHelpMenu } from "../KeyOrChordSearchHelpMenu";
import { CustomTooltip } from "../common/CustomTooltip";

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
  isExtraLargeScreen: boolean;
  isRainbowMode: boolean;
  onInstrumentSelect: (instrument: FrettedInstrument) => void;
  onInstrumentTune: (courseId: string, newTuning: Note) => void;
  onInstrumentTuneToPreset: (tuning: Tuning) => void;
  onChordRootSelect: (root: Note) => void;
  onChordTypeSelect: (chordType: ChordType) => void;
  onClickGoToChord: (chord: Chord) => void;
  onClickGoToKey: (key: Key) => void;
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
    isExtraLargeScreen,
    isRainbowMode,
    onInstrumentSelect,
    onInstrumentTune,
    onInstrumentTuneToPreset,
    onChordRootSelect,
    onChordTypeSelect,
    onClickGoToChord,
    onClickGoToKey,
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
  const initEquivChord = activeChord;
  const [activeEquivChord, setActiveEquivChord] = useState(initEquivChord);
  useEffect(() => setActiveEquivChord(initEquivChord), [activeChord]);
  const initInclusiveKey = keysThatIncludeThisChord[0];
  const [activeInclusiveKey, setActiveInclusiveKey] = useState(initInclusiveKey);
  useEffect(() => setActiveInclusiveKey(initInclusiveKey), [activeChord]);

  const updateEquivChord = (chord: Chord) => {
    setActiveEquivChord(chord);
  }

  const updateInclusiveKey = (key: Key) => {
    setActiveInclusiveKey(key);
  }

  const goToButtonStyle: SxProps = {
    backgroundColor: theme.swatch.base00,
    width: "100%",
  }

  const instrumentComponent = instrument ? (
    <Instrument
      activeKeyOrChord={activeChord}
      instrument={instrument}
      isMediumScreen={isMediumScreen}
      isLargeScreen={isLargeScreen || isExtraLargeScreen}
      isRainbowMode={isRainbowMode}
      onTune={onInstrumentTune}
      shouldHighlightPiano={shouldHighlightPiano}
      temperament={temperament}
      theme={theme}
    />
  ) : (
    <></>
  );

  const renderNoteAndIntervalTable = () => {
    return isSmallScreen ? 
    <>
      <Grid container item xs={12} paddingTop={1} paddingBottom={1}>
        <Grid item xs={5}>
          <NoteTable
            activeKeyOrChord={activeChord}
            isSmallScreen={isSmallScreen}
            isRainbowMode={isRainbowMode}
            theme={theme}
          />
        </Grid>
        <Grid item xs={7}>
          <IntervalTable
            intervals={activeChordType.intervals}
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
        <Grid item className="selectorParent" xs="auto" sm={12} md={6} marginBottom={isSmallScreen || isMediumScreen ? 2 : 0}>
          <InstrumentSelector
            activeInstrument={activeInstrument}
            instruments={instruments}
            label="Instrument:"
            minWidth={isSmallScreen ? "8em" : "12em"}
            onInstrumentSelect={onInstrumentSelect}
            shouldAutocomplete={isLargeScreen || isExtraLargeScreen}
            theme={theme}
          />
        </Grid>
        {activeInstrument.name !== Constants.PIANO && (
          <Grid item className="selectorParent" xs="auto" sm={12} md={6}>
            <CommonTuningSelector
              activeInstrument={activeInstrument}
              activeTuning={activeTuning}
              label="Common Tunings:"
              minWidth={isSmallScreen ? "8em" : "10em"}
              onCommonTuningSelect={onInstrumentTuneToPreset}
              shouldAutocomplete={isLargeScreen || isExtraLargeScreen}
              theme={theme}
            />
          </Grid>
        )}
      </>
    );
  }

  const renderChordSearchSelector = () => {
    return (
      <>
        <Grid item className="selectorParent" xs={10} sm={10} md={8} lg={11}>
          <ChordSearchSelector
            allChords={allChords}
            minWidth="14em"
            theme={theme}
            updateChord={updateChord}
          />
        </Grid>
        <Grid item className="selectorParent" xs={2} sm={2} md={1} lg={1} alignContent="center">
          <CustomTooltip showTooltip={true} theme={theme} title="How to search for chords">
            <div 
              id="helpButtonChordSearch" 
              aria-label="Click for information on how to search for chords"
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
          </CustomTooltip>
        </Grid>
        </>
    )
  }

  const renderChordSelectors = () => {
    return (
      <>
        <Grid item className="selectorParent" xs={3} sm={12} md={3} marginBottom={isSmallScreen || isMediumScreen ? 2 : 0}>
          <NoteSelector
            id="active chord"
            items={temperament.getNotesInTemperament()}
            label="Root:"
            note={activeChordRoot}
            onNoteSelect={onChordRootSelect}
            shouldAutocomplete={isLargeScreen || isExtraLargeScreen}
            theme={theme}
          />
        </Grid>
        <Grid item className="selectorParent" xs={9} sm={12} md={9}>
          <ChordTypeSelector
            activeChordType={activeChordType}
            items={allChordTypes}
            label="Chord Type:"
            minWidth={"11em"}
            onChordTypeSelect={onChordTypeSelect}
            shouldAutocomplete={isLargeScreen || isExtraLargeScreen}
            theme={theme}
          />
        </Grid>
      </>
    )
  }

  const renderAboutChordSelectors = () => {
    return (
      <>
        <Grid item className="selectorParent" xs={9} sm={8} md={8} lg={7} marginBottom={2}>
          <ChordSelector
            activeChord={activeChord}
            id="equiv-chord-selector"
            items={activeChord.getEquivChords()}
            label="Equivalent Chords:"
            minWidth="12em"
            onChange={(chord: Chord) => {updateEquivChord(chord)}}
            shouldAutocomplete={isLargeScreen || isExtraLargeScreen}
            theme={theme}
          />
        </Grid>
        <Grid item className="selectorParent" xs={3} sm={4} md={4} lg={3}  marginBottom={2}>
          <CustomTooltip showTooltip={true} theme={theme} title="Go to selected chord">
            <div 
              id="goToEquivChord" 
              aria-label="Go to selected chord" 
              onClick={() => onClickGoToChord(activeEquivChord)}>
              <Button size="small" color="secondary" sx={goToButtonStyle}>
                Go to Chord
              </Button>
            </div>
          </CustomTooltip>
        </Grid>
        <Grid item className="selectorParent" xs={9} sm={8} md={8} lg={7}>
          <KeySelector
            activeKey={activeInclusiveKey}
            id="inclusive-key-selector"
            items={keysThatIncludeThisChord}
            label="Keys including this Chord:"
            minWidth="14em"
            onChange={(key: Key) => {updateInclusiveKey(key)}}
            shouldAutocomplete={isLargeScreen || isExtraLargeScreen}
            theme={theme}
          />
        </Grid>
        <Grid item className="selectorParent" xs={3} sm={4} md={4} lg={3}>
          <CustomTooltip showTooltip={true} theme={theme} title="Go to selected key">
            <div 
              id="helpButtonChordSearch" 
              aria-label="Go to selected key" 
              onClick={() => onClickGoToKey(activeInclusiveKey)}>
              <Button size="small" color="secondary" sx={goToButtonStyle}>
                Go to Key
              </Button>
            </div>
          </CustomTooltip>
        </Grid>
      </>
    )
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
    return <KeyOrChordSearchHelpMenu isKey={false} />;
  }

  return (
    <Grid container className="chordbook">
      {!showInstrument && 
        <Grid container item xs={12} justifyContent="center" alignContent="center" paddingTop={2} paddingBottom={2}>
          <span>Rotate Screen to Show Instrument </span>
          <ScreenRotationIcon sx={{ paddingLeft: "5px", paddingRight: "5px" }}/>
        </Grid>
      }
      {showInstrument && <Grid item container xs={12} sm={6} md={6} lg={4} id="instrumentSettings" className="settings-bar" justifyContent="flex-start" alignContent="flex-start" paddingTop={0} paddingBottom={0} style={settingsBarStyle}>
        <Grid item container xs={12}>
          {renderDivider("Current Instrument:")}
        </Grid>
        <Grid item container xs={12}>
        {renderInstrumentSelectors()}
        </Grid>
      </Grid>
      }
      <Grid item container xs={12} sm={6} md={6} lg={3} id="currentChordSettings" className="settings-bar" justifyContent={isSmallScreen ? "center" : "flex-start"} alignContent="flex-start" paddingTop={0} paddingBottom={1} style={settingsBarStyle}>
        <Grid item container xs={12}>
          {renderDivider("Current Chord:")}
        </Grid>
        <Grid item container xs={12} justifyContent={isSmallScreen ? "center" : "flex-start"}>
          {renderChordSelectors()}
        </Grid>
      </Grid>
      <Grid item container xs={12} sm={12} md={12} lg={5} id="searchChordSettings" className="settings-bar" justifyContent="center" alignContent="flex-start" paddingTop={0} paddingBottom={2} style={settingsBarStyle}>
        <Grid item container xs={12}>
          {renderDivider("Chord Search:")}
        </Grid>
        <Grid item container justifyContent="center" xs={12}>
          {renderChordSearchSelector()}
        </Grid>
      </Grid>
      {showInstrument && 
        <Grid item xs={12} paddingBottom={2}>
          {instrumentComponent}
        </Grid>
      }
      <Grid item container xs={12} sm={12} md={12} lg={12} id="aboutKeySettings" className="settings-bar" justifyContent="center" alignContent="flex-start" paddingTop={0} paddingBottom={1} style={settingsBarStyle}>
        <Grid item container xs={12}>
          {renderDivider("About this Chord:")}
        </Grid>
        <Grid item container xs={12} paddingBottom={2}>
          {renderNoteAndIntervalTable()}
        </Grid>
        <Grid item container xs={12} sm={8} md={7} lg={6} justifyContent="center" alignItems="center" paddingBottom={2}>
          {renderAboutChordSelectors()}
        </Grid>
      </Grid>
    </Grid>
  );
};

export { Chordbook };
