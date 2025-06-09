/* eslint-disable @typescript-eslint/no-unused-vars */
import "./App.css";
import React, { CSSProperties, useState, useEffect } from "react";
import { themes, cloudCity, Base16Theme } from "./colors/themes";
import { TopBar } from "./components/TopBar";
import { Scalebook } from "./components/tools/Scalebook";
import { Key, Note, Scale, ChordType, Temperament, instrument, data, Chord } from "note-lib";
import { Tuning } from "note-lib/src/Tuning";
import * as Constants from "note-lib/src/constants/Constants";
import { Course } from "note-lib/src/Course";
import { FrettedInstrument } from "note-lib/src/instruments/FrettedInstrument";
import { FretBoard } from "note-lib/src/FretBoard";
import { Grid } from "@mui/material";
import { getContrastRatio, ThemeProvider, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AppDialog, IAppDialogState } from "./components/AppDialog";
import { Tool } from "./enums/Tool";
import { Chordbook } from "./components/tools/Chordbook";

type InstrumentMap = Map<string, FrettedInstrument>;

const { Banjo, Bass, BassType, Guitar, GuitarType, Mandola, Mandolin, Piano, Ukulele } = instrument;

const initInstruments = (temperament: Temperament): InstrumentMap => {
  const A: Note = temperament.getNoteFromID(Constants.A) as Note;
  const B: Note = temperament.getNoteFromID(Constants.B) as Note;
  const C: Note = temperament.getNoteFromID(Constants.C) as Note;
  const D: Note = temperament.getNoteFromID(Constants.D) as Note;
  const E: Note = temperament.getNoteFromID(Constants.E) as Note;
  const Fs: Note = temperament.getNoteFromID(Constants.F_SHARP) as Note;
  const G: Note = temperament.getNoteFromID(Constants.G) as Note;

  const instrumentMap: InstrumentMap = new Map();
  const guitar = new Guitar(21, [E, A, D, G, B, E], GuitarType.SIX_STRING);
  const sevenStringGuitar = new Guitar(21, [B, E, A, D, G, B, E], GuitarType.SEVEN_STRING);
  const eightStringGuitar = new Guitar(21, [Fs, B, E, A, D, G, B, E], GuitarType.EIGHT_STRING);
  const twelveStringGuitar = new Guitar(21, [E, A, D, G, B, E], GuitarType.TWELVE_STRING, true);
  const banjo = new Banjo(21, [G, D, G, B, D]);
  const fourStringBass = new Bass(21, [E, A, D, G], BassType.FOUR_STRING);
  const fiveStringBass = new Bass(21, [B, E, A, D, G], BassType.FIVE_STRING);
  const sixStringBass = new Bass(21, [B, E, A, D, G, C], BassType.SIX_STRING);
  const mandola = new Mandola(19, [C, G, D, A]);
  const mandolin = new Mandolin(17, [G, D, A, E]);
  const piano = new Piano(40, [C]);
  const ukulele = new Ukulele(20, [G, C, E, A]);

  instrumentMap.set("banjo", banjo);
  instrumentMap.set("bass", fourStringBass);
  instrumentMap.set("bass (5 string)", fiveStringBass);
  instrumentMap.set("bass (6 string)", sixStringBass);
  instrumentMap.set("guitar", guitar);
  instrumentMap.set("guitar (7 string)", sevenStringGuitar);
  instrumentMap.set("guitar (8 string)", eightStringGuitar);
  instrumentMap.set("guitar (12 string)", twelveStringGuitar);
  instrumentMap.set("mandola", mandola);
  instrumentMap.set("mandolin", mandolin);
  instrumentMap.set("piano", piano);
  instrumentMap.set("ukulele", ukulele);
  return instrumentMap;
};

const App = () => {
  const [theme, setTheme] = useState(cloudCity);
  const primaryMain = theme.swatch.base0B;
  const secondaryMain = theme.swatch.base05;

  const isDarkColor = (color: string): boolean => {
    const contrastThreshold: number = 4.5;
    return getContrastRatio(color, '#fff') > contrastThreshold;
  }

  const getContrastText = (color: string) =>  isDarkColor(color) ? '#fff' : '#111';

  const muiTheme = useTheme();
  muiTheme.palette.primary = {
    main: primaryMain,
    light: theme.swatch.base06,
    dark: theme.swatch.base02,
    contrastText: getContrastText(primaryMain)
  };
  muiTheme.palette.secondary = {
    main: secondaryMain,
    light: theme.swatch.base06,
    dark: theme.swatch.base02,
    contrastText: getContrastText(secondaryMain)
  };

  const isSmallScreen: boolean = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const isMediumScreen: boolean = useMediaQuery(muiTheme.breakpoints.down("md")) && !isSmallScreen;
  const isLargeScreen: boolean = useMediaQuery(muiTheme.breakpoints.down("lg")) && !isSmallScreen && !isMediumScreen;
  const isExtraLargeScreen: boolean = useMediaQuery(muiTheme.breakpoints.down("xl")) && !isSmallScreen && !isMediumScreen && !isLargeScreen;
  // NOLAN TODO - for later use
  // const isPortrait: boolean = useMediaQuery(`(orientation: portrait)`);

  const tools = [Tool.scalebook, Tool.chordbook];

  const twelveTET: Temperament = data.temperaments.find(
    (temperament) => temperament.name === Constants.TWELVE_TET,
  ) as Temperament;
  const initKeyTonic: Note = twelveTET.getNoteFromID(Constants.E) as Note;
  const scales: Scale[] = data.scales;
  const initScale: Scale = scales.find(
    (scale) => scale.name === Constants.MAJOR.toLocaleLowerCase(),
  ) as Scale;
  const initChordRoot: Note = twelveTET.getNoteFromID(Constants.E) as Note;
  const chordTypes: ChordType[] = data.chordTypes;
  const initChordType: ChordType = chordTypes.find(
    (chordType) => chordType.shortHand === "maj",
  ) as ChordType;
  const instrumentMap = initInstruments(twelveTET);
  const [instruments, setInstruments] = useState(instrumentMap);
  const [activeKey, setActiveKey] = useState(new Key(initKeyTonic, initScale));
  const [activeChord, setActiveChord] = useState(new Chord(initChordRoot, initChordType));
  const initInstrument = instruments.get("guitar") as FrettedInstrument;
  const [activeInstrument, setActiveInstrument] = useState(initInstrument);
  const [activeTuning, setActiveTuning] = useState(
    initInstrument.standardTuning,
  );
  const [isRainbowMode, setIsRainbowMode] = useState(true);
  const [shouldHighlightPiano, setShouldHighlightPiano] = useState(true);
  const [activeTemperament, setActiveTemperament] = useState(twelveTET);
  const [activeToolName, setActiveToolName] = useState(Tool.scalebook);
  const initDialogState: IAppDialogState = { isOpen: false }
  const [dialogState, setDialogState] = useState(initDialogState);
  const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement);
  const [allKeys, setAllKeys] = useState<Key[]>([]);
  const [allChords, setAllChords] = useState<Chord[]>([]);

  useEffect(() => {
    const {keys, chords} = getAllKeysAndChords(activeTemperament);
    setAllKeys(keys);
    setAllChords(chords);
  }, [activeTemperament]);

  const getAllKeysAndChords = (temperament: Temperament): {keys: Key[], chords: Chord[] } => {
    let keys: Key[] = [];
    let chords: Chord[] = [];
    temperament.getNotesInTemperament().forEach((note) => {
      data.scales.forEach((scale: Scale) => {
        keys.push(new Key(note, scale));
      });
      data.chordTypes.forEach((chordType: ChordType) => {
        const newChord = new Chord(note, chordType);
        chords.push(newChord);
        newChord.getSlashChords().forEach((slashChord: Chord) => {
          chords.push(slashChord);
        });
      });
    });
    return {keys, chords};
  }

  const toggleFullscreen = (): void => {
    setIsFullscreen(!isFullscreen);
  }

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
        if (isFullscreen) {
          body.requestFullscreen()
            .then(() => {
              body.style.overflow = "auto";
            });
        } else if (document.fullscreenElement) {
          document.exitFullscreen();
        }
    }
  }, [isFullscreen]);

  useEffect(() => {
    const ls_theme = localStorage.getItem("theme");
    if (ls_theme) {
      const themeFound = themes.find((theme: Base16Theme) => theme.id === ls_theme);
      if (themeFound) {
        setTheme(themeFound);
      }
    }
  }, [ setTheme ]);

  const toggleRainbowMode = (): void => {
    setIsRainbowMode(!isRainbowMode);
  };

  const togglePianoHighlight = (): void => {
    setShouldHighlightPiano(!shouldHighlightPiano);
  };

  const updateKey = (key: Key): void => {
    setActiveKey(new Key(key.tonic, key.scale));
  };

  const onKeyTonicSelect = (tonic: Note): void => {
    setActiveKey(new Key(tonic, activeKey.scale));
  };

  const onScaleSelect = (scale: Scale): void => {
    setActiveKey(new Key(activeKey.tonic, scale));
  };

  const updateChord = (chord: Chord): void => {
    setActiveChord(new Chord(chord.root, chord.chordType));
  };

  const onChordRootSelect = (root: Note): void => {
    setActiveChord(new Chord(root, activeChord.chordType));
  };

  const onChordTypeSelect = (chordType: ChordType): void => {
    setActiveChord(new Chord(activeChord.root, chordType));
  };

  const onClickGoToKey = (key: Key) => {
    updateKey(key);
    setActiveToolName(Tool.scalebook);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onClickGoToChord = (chord: Chord) => {
    updateChord(chord);
    setActiveToolName(Tool.chordbook);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onInstrumentSelect = (instrument: FrettedInstrument): void => {
    setActiveInstrument(instrument);
    // Reset active tuning to the last tuning set on thie instrument selected.
    const activeTuning: Tuning = checkActiveTuning(instrument);
    setActiveTuning(activeTuning);
  };

  const setInstrumentTuning = (courseId: string, newTuning: Note): void => {
    const instrument = activeInstrument;
    const fretBoard = instrument.fretBoard;

    if (typeof instrument === "undefined") {
      return;
    }

    const courseSelected: Course = fretBoard.courses.find(
      (course) => course.id === courseId,
    ) as Course;
    fretBoard.setCourseTuningNote(courseSelected.id, newTuning);
    const newActiveTuning = checkActiveTuning(activeInstrument);

    setActiveTuning(newActiveTuning);
  };

  const checkActiveTuning = (instrument: FrettedInstrument): Tuning => {
    const tuningNotes: Note[] = instrument.fretBoard.courses.map(
      (course) => course.tunedStrings[0].tuningNote,
    );
    const commonTunings: Tuning[] = instrument.commonTunings;
    const commonTuningMatch: Tuning | undefined = commonTunings.find(
      (tuning) => {
        let isMatch: boolean = true;
        tuning.notes.forEach((note, index) => {
          if (tuningNotes[index].id !== note.id) {
            isMatch = false;
          }
        });
        return isMatch;
      },
    );
    return (
      commonTuningMatch ??
      new Tuning(Constants.CUSTOM, tuningNotes)
    );
  };

  const setInstrumentTuningToPreset = (tuning: Tuning): void => {
    const instrument: FrettedInstrument = activeInstrument;
    const fretBoard: FretBoard = instrument.fretBoard;

    if (typeof instrument === "undefined") {
      return;
    }
    fretBoard.courses.forEach((course, index) =>
      fretBoard.setCourseTuningNote(course.id, tuning.notes[index]),
    );
    setActiveTuning(tuning);
  };

  const onInstrumentTune = (courseId: string, newTuning: Note): void => {
    setInstrumentTuning(courseId, newTuning);
  };

  const onInstrumentTuneToPreset = (tuning: Tuning): void => {
    setInstrumentTuningToPreset(tuning);
  };

  const groupByRegularOrSlashChords = (chord: Chord): string => {
    return chord.isSlashChord ? 'Slash Chords' : 'Regular Chords'
  }

  let tool;

  switch (activeToolName) {
    case Tool.scalebook: {
      tool = (
        <Scalebook
          activeInstrument={activeInstrument}
          activeKey={activeKey}
          activeTuning={activeTuning}
          allKeys={allKeys}
          allScales={scales}
          dialogState={dialogState}
          groupChordsBy={groupByRegularOrSlashChords}
          temperament={activeTemperament}
          instruments={instruments}
          isSmallScreen={isSmallScreen}
          isMediumScreen={isMediumScreen}
          isLargeScreen={isLargeScreen}
          isExtraLargeScreen={isExtraLargeScreen}
          isRainbowMode={isRainbowMode}
          onClickGoToChord={onClickGoToChord}
          onClickGoToKey={onClickGoToKey}
          onInstrumentSelect={onInstrumentSelect}
          onInstrumentTune={onInstrumentTune}
          onInstrumentTuneToPreset={onInstrumentTuneToPreset}
          onKeyTonicSelect={onKeyTonicSelect}
          onScaleSelect={onScaleSelect}
          shouldHighlightPiano={shouldHighlightPiano}
          setDialogState={setDialogState}
          theme={theme}
          updateKey={updateKey}
        />
      );
      break;
    }
    case Tool.chordbook: {
      tool = (
        <Chordbook
          activeInstrument={activeInstrument}
          activeChord={activeChord}
          activeTuning={activeTuning}
          allChords={allChords}
          allChordTypes={chordTypes}
          dialogState={dialogState}
          groupChordsBy={groupByRegularOrSlashChords}
          instruments={instruments}
          isSmallScreen={isSmallScreen}
          isMediumScreen={isMediumScreen}
          isLargeScreen={isLargeScreen}
          isExtraLargeScreen={isExtraLargeScreen}
          isRainbowMode={isRainbowMode}
          onChordRootSelect={onChordRootSelect}
          onChordTypeSelect={onChordTypeSelect}
          onClickGoToChord={onClickGoToChord}
          onClickGoToKey={onClickGoToKey}
          onInstrumentSelect={onInstrumentSelect}
          onInstrumentTune={onInstrumentTune}
          onInstrumentTuneToPreset={onInstrumentTuneToPreset}
          setDialogState={setDialogState}
          shouldHighlightPiano={shouldHighlightPiano}
          temperament={activeTemperament}
          theme={theme}
          updateChord={updateChord}
        />
      );
      break;
    }
  }

  const style: CSSProperties = {
    backgroundColor: theme.swatch.base01,
    color: theme.swatch.base05,
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <Grid container id="app" justifyContent="center" alignItems="center" style={style}>
        <Grid item xs={12}>
          <TopBar
            activeToolName={activeToolName}
            dialogState={dialogState}
            isAuthenticated={false}
            isDarkTheme={isDarkColor(theme.swatch.base01)}
            isFullscreen={isFullscreen}
            isMediumScreen={isMediumScreen}
            isRainbowMode={isRainbowMode}
            isSmallScreen={isSmallScreen}
            onLoginClick={() => false}
            onLogoutClick={() => false}
            onToolSelect={(activeToolName) => {
              setActiveToolName(activeToolName);
            }}
            setDialogState={setDialogState}
            setTheme={setTheme}
            shouldHighlightPiano={shouldHighlightPiano}
            theme={theme}
            toggleFullscreen={toggleFullscreen}
            togglePianoHighlight={togglePianoHighlight}
            toggleRainbowMode={toggleRainbowMode}
            tools={tools}
          />
        </Grid>
        <Grid item xs={12}>
          {tool}
        </Grid>
      </Grid>
      <AppDialog dialogState={dialogState} setDialogState={setDialogState} fullScreen={isSmallScreen} theme={theme} />
    </ThemeProvider>
  );
};

export default App;
