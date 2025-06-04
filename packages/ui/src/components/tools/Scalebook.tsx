import "./Scalebook.css";
import React, { CSSProperties, useEffect, useState } from "react";
// IMPORTANT - must import @mui/icons-material BEFORE @mui/material or app breaks (vite doesn't like)
import { Help as HelpIcon, ScreenRotation as ScreenRotationIcon } from '@mui/icons-material';
import { Button, Divider, Grid, IconButton, SxProps } from "@mui/material";
import { Chord, Constants, Key, Note, Scale, Temperament } from "note-lib";
import { Base16Theme } from "../../colors/themes";
import { InstrumentSelector } from "../selectors/InstrumentSelector";
import { NoteSelector } from "../selectors/NoteSelector";
import { ScaleSelector } from "../selectors/ScaleSelector";
import { KeySelector } from "../selectors/KeySelector";
import { KeySearchSelector } from "../selectors/KeySearchSelector";
import { IntervalTable } from "../IntervalTable";
import { NoteTable } from "../NoteTable";
import { Instrument } from "../instruments/Instrument";
import { CommonTuningSelector } from "../selectors/CommonTuningSelector";
import { Tuning } from "note-lib/src/Tuning";
import { FrettedInstrument } from "note-lib/src/instruments/FrettedInstrument";
import { KeyOrChordSearchHelpMenu } from "../KeyOrChordSearchHelpMenu";
import { IAppDialogState } from "../AppDialog";
import { ChordSelector } from "../selectors/ChordSelector";
import { CustomTooltip } from "../common/CustomTooltip";

interface IScalebookProps {
  activeInstrument: FrettedInstrument;
  activeKey: Key;
  activeTuning: Tuning;
  allKeys: Key[];
  allScales: Scale[];
  dialogState: IAppDialogState;
  instruments: Map<string, FrettedInstrument>;
  isSmallScreen: boolean;
  isMediumScreen: boolean;
  isLargeScreen: boolean;
  isExtraLargeScreen: boolean;
  isRainbowMode: boolean;
  onClickGoToChord: (chord: Chord) => void;
  onClickGoToKey: (key: Key) => void;
  onInstrumentSelect: (instrument: FrettedInstrument) => void;
  onInstrumentTune: (courseId: string, newTuning: Note) => void;
  onInstrumentTuneToPreset: (tuning: Tuning) => void;
  onKeyTonicSelect: (tonic: Note) => void;
  onScaleSelect: (scale: Scale) => void;
  setDialogState: React.Dispatch<React.SetStateAction<IAppDialogState>>
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
    dialogState,
    instruments,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    isExtraLargeScreen,
    isRainbowMode,
    onClickGoToChord,
    onClickGoToKey,
    onInstrumentSelect,
    onInstrumentTune,
    onInstrumentTuneToPreset,
    onKeyTonicSelect,
    onScaleSelect,
    setDialogState,
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
  const chordsInKey = activeKey.getIncludedChords();
  const initEquivKey = activeKey;
  const [activeEquivKey, setActiveEquivKey] = useState(initEquivKey);
  useEffect(() => setActiveEquivKey(initEquivKey), [activeKey]);
  const initIncludedChord = chordsInKey[0];
  const [activeIncludedChord, setActiveIncludedChord] = useState(initIncludedChord);
  useEffect(() => setActiveIncludedChord(initIncludedChord), [activeKey]);

  const updateEquivKey = (key: Key) => {
    setActiveEquivKey(key);
  }

  const updateIncludedChord = (chord: Chord) => {
    setActiveIncludedChord(chord);
  }

  const goToButtonStyle: SxProps = {
    backgroundColor: theme.swatch.base00,
    width: "100%",
  }

  const instrumentComponent = instrument ? (
    <Instrument
      activeKeyOrChord={activeKey}
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
      <Grid container item xs={12} paddingTop={1} paddingBottom={1} justifyContent="center">
        <Grid item xs={5}>
          <NoteTable
            activeKeyOrChord={activeKey}
            isSmallScreen={isSmallScreen}
            isRainbowMode={isRainbowMode}
            theme={theme}
          />
        </Grid>
        <Grid item xs={7}>
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

  const renderKeySearchSelector = () => {
    return (
      <>
        <Grid item className="selectorParent" xs={10} sm={10} md={8} lg={11}>
          <KeySearchSelector
              allKeys={allKeys}
              minWidth="14em"
              theme={theme}
              updateKey={(key: Key) => updateKey(key)}
            />
        </Grid>
        <Grid item className="selectorParent" xs={2} sm={2} md={1} lg={1} alignContent="center">
          <CustomTooltip showTooltip={true} theme={theme} title="How to search for keys">
            <div 
              id="helpButtonKeySearch" 
              aria-label="Click for information on how to search for keys"
              onClick={() => setDialogState({
                ...dialogState, 
                isOpen: true, 
                title: "Searching for Chords", 
                content: renderKeySearchHelp()
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

  const renderKeySelectors = () => {
    return (
      <>
        <Grid item className="selectorParent" xs={3} sm={12} md={3} marginBottom={isSmallScreen || isMediumScreen ? 2 : 0}>
          <NoteSelector
            id="active key"
            items={temperament.getNotesInTemperament()}
            label="Key:"
            note={activeKeyTonic}
            onNoteSelect={onKeyTonicSelect}
            shouldAutocomplete={isLargeScreen || isExtraLargeScreen}
            theme={theme}
          />
        </Grid>
        <Grid item className="selectorParent" xs={9} sm={12} md={9}>
          <ScaleSelector
            activeScale={activeScale}
            items={allScales}
            label="Scale:"
            minWidth={"11em"}
            onScaleSelect={onScaleSelect}
            shouldAutocomplete={isLargeScreen || isExtraLargeScreen}
            theme={theme}
          />
        </Grid>
      </>
    )
  }

  const renderAboutKeySelectors = () => {
    return (
      <>
        <Grid item className="selectorParent" xs={9} sm={8} md={8} lg={7} marginBottom={2}>
          <KeySelector
            activeKey={activeEquivKey}
            id="equiv-key-selector"
            items={activeKey.getEquivKeys()}
            label="Equivalent Keys:"
            minWidth="12em"
            onChange={(key: Key) => {updateEquivKey(key)}}
            shouldAutocomplete={isLargeScreen || isExtraLargeScreen}
            theme={theme}
          />
        </Grid>
        <Grid item className="selectorParent" xs={3} sm={4} md={4} lg={3} marginBottom={2}>
          <CustomTooltip showTooltip={true} theme={theme} title={`Go to equivalent key: ${activeEquivKey.name}`}>
            <div 
              id="goToEquivKey" 
              aria-label={`Go to equivalent key: ${activeEquivKey.name}`} 
              onClick={() => onClickGoToKey(activeEquivKey)}>
              <Button size="small"  color="secondary" sx={goToButtonStyle}>
                Go to Key
              </Button>
            </div>
          </CustomTooltip>
        </Grid>
        <Grid item className="selectorParent" xs={9} sm={8} md={8} lg={7}>
          <ChordSelector
            activeChord={activeIncludedChord}
            id="inclusive-key-selector"
            items={chordsInKey}
            label="Chords included in this Key:"
            minWidth="12em"
            onChange={(chord: Chord) => {updateIncludedChord(chord)}}
            shouldAutocomplete={isLargeScreen || isExtraLargeScreen}
            theme={theme}
          />
        </Grid>
        <Grid item className="selectorParent" xs={3} sm={4} md={4} lg={3}>
          <CustomTooltip showTooltip={true} theme={theme} title={`Go to chord: ${activeIncludedChord.name}`}>
            <div 
              id="goToChord" 
              aria-label={`Go to chord: ${activeIncludedChord.name}`} 
              onClick={() => onClickGoToChord(activeIncludedChord)}>
              <Button size="small" color="secondary" sx={goToButtonStyle}>
                Go to Chord
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

  const renderKeySearchHelp = () => {
    return <KeyOrChordSearchHelpMenu isKey={true} />;
  }

return (
    <Grid container className="scalebook">
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
      <Grid item container xs={12} sm={6} md={6} lg={3} id="currentKeySettings" className="settings-bar" justifyContent={isSmallScreen ? "center" : "flex-start"} alignContent="flex-start" paddingTop={0} paddingBottom={1} style={settingsBarStyle}>
        <Grid item container xs={12}>
          {renderDivider("Current Key:")}
        </Grid>
        <Grid item container xs={12} justifyContent={isSmallScreen ? "center" : "flex-start"}>
          {renderKeySelectors()}
        </Grid>
      </Grid>
      <Grid item container xs={12} sm={12} md={12} lg={5} id="searchKeySettings" className="settings-bar" justifyContent="center" alignContent="flex-start" paddingTop={0} paddingBottom={2} style={settingsBarStyle}>
        <Grid item container xs={12}>
          {renderDivider("Key Search:")}
        </Grid>
        <Grid item container justifyContent="center" xs={12}>
          {renderKeySearchSelector()}
        </Grid>
      </Grid>
      {showInstrument && 
        <Grid item xs={12} paddingBottom={2}>
          {instrumentComponent}
        </Grid>
      }
      <Grid item container xs={12} sm={12} md={12} lg={12} id="aboutKeySettings" className="settings-bar" justifyContent="center" alignContent="flex-start" paddingTop={0} paddingBottom={1} style={settingsBarStyle}>
        <Grid item container xs={12}>
          {renderDivider("About this Key:")}
        </Grid>
        <Grid item container xs={12} justifyContent="center">
          <p style={{fontSize: "1.25rem"}}>
            {activeKey.name}
          </p>
        </Grid>
        <Grid item container xs={12} lg={Math.max(activeKey.notes.length + 1, 6)} paddingBottom={2}>
          {renderNoteAndIntervalTable()}
        </Grid>
        <Grid item container xs={12} sm={8} md={7} lg={6} justifyContent="center" alignItems="center" paddingBottom={2}>
          {renderAboutKeySelectors()}
        </Grid>
      </Grid>
    </Grid>
  );
};

export { Scalebook };
