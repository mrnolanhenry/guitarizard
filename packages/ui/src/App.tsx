/* eslint-disable @typescript-eslint/no-unused-vars */
import "./App.css";
import React, { CSSProperties, useState, useEffect } from "react";
import { themes, cloudCity, Base16Theme } from "./colors/themes";
import { ToolName } from "./components/selectors/ToolSelector";
import { TopBar } from "./components/TopBar";
import { Scalebook } from "./components/tools/Scalebook";
import { Key, Note, Scale, Temperament, instrument, data } from "note-lib";
import { Tuning } from "note-lib/src/Tuning";
import * as Constants from "note-lib/src/constants/Constants";
import { Course } from "note-lib/src/Course";
import { FrettedInstrument } from "note-lib/src/instruments/FrettedInstrument";
import { FretBoard } from "note-lib/src/FretBoard";
import { Grid } from "@mui/material";
import { getContrastRatio, ThemeProvider, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AppDialog, IAppDialogState } from "./components/AppDialog";

type InstrumentMap = Map<string, FrettedInstrument>;

const initInstruments = (temperament: Temperament) => {
  const A: Note = temperament.getNoteFromID(Constants.A) as Note;
  const B: Note = temperament.getNoteFromID(Constants.B) as Note;
  const C: Note = temperament.getNoteFromID(Constants.C) as Note;
  const D: Note = temperament.getNoteFromID(Constants.D) as Note;
  const E: Note = temperament.getNoteFromID(Constants.E) as Note;
  const Fs: Note = temperament.getNoteFromID(Constants.F_SHARP) as Note;
  const G: Note = temperament.getNoteFromID(Constants.G) as Note;

  const instrumentMap: InstrumentMap = new Map();
  const guitar = new instrument.Guitar(21, [E, A, D, G, B, E]);
  const sevenStringGuitar = new instrument.Guitar(21, [B, E, A, D, G, B, E]);
  const eightStringGuitar = new instrument.Guitar(21, [
    Fs,
    B,
    E,
    A,
    D,
    G,
    B,
    E,
  ]);
  const twelveStringGuitar = new instrument.Guitar(
    21,
    [E, A, D, G, B, E],
    true,
  );
  const banjo = new instrument.Banjo(21, [G, D, G, B, D]);
  const fourStringBass = new instrument.Bass(21, [E, A, D, G]);
  const fiveStringBass = new instrument.Bass(21, [B, E, A, D, G]);
  const sixStringBass = new instrument.Bass(21, [B, E, A, D, G, C]);
  const mandolin = new instrument.Mandolin(17, [G, D, A, E]);
  const piano = new instrument.Piano(30, [C]);
  const ukulele = new instrument.Ukulele(20, [G, C, E, A]);

  instrumentMap.set("guitar", guitar);
  instrumentMap.set("guitar (7 string)", sevenStringGuitar);
  instrumentMap.set("guitar (8 string)", eightStringGuitar);
  instrumentMap.set("guitar (12 string)", twelveStringGuitar);
  instrumentMap.set("banjo", banjo);
  instrumentMap.set("bass", fourStringBass);
  instrumentMap.set("bass (5 string)", fiveStringBass);
  instrumentMap.set("bass (6 string)", sixStringBass);
  instrumentMap.set("mandolin", mandolin);
  instrumentMap.set("piano", piano);
  instrumentMap.set("ukulele", ukulele);
  return instrumentMap;
};

const App = () => {
  const [theme, setTheme] = useState(cloudCity);
  const secondaryMain = theme.swatch.base05;

  const isDarkColor = (color: string): boolean => {
    const contrastThreshold: number = 4.5;
    return getContrastRatio(color, '#fff') > contrastThreshold;
  }

  const getContrastText = (color: string) =>  isDarkColor(color) ? '#fff' : '#111';

  const muiTheme = useTheme();
  muiTheme.palette.secondary = {
    main: secondaryMain,
    light: theme.swatch.base06,
    dark: theme.swatch.base02,
    contrastText: getContrastText(secondaryMain)
  };

  const isSmallScreen: boolean = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const isMediumScreen: boolean = useMediaQuery(muiTheme.breakpoints.down("md")) && !isSmallScreen;
  // NOLAN TODO - for later use
  // const isPortrait: boolean = useMediaQuery(`(orientation: portrait)`);

  const twelveTET: Temperament = data.temperaments.find(
    (temperament) => temperament.name === Constants.TWELVE_TET,
  ) as Temperament;
  const scales: Scale[] = data.scales;
  const initKeyNote: Note = twelveTET.getNoteFromID(Constants.E) as Note;
  const initScale: Scale = scales.find(
    (scale) => scale.name === Constants.MAJOR,
  ) as Scale;
  const instrumentMap = initInstruments(twelveTET);
  const [instruments, setInstruments] = useState(instrumentMap);
  const [activeKey, setActiveKey] = useState(new Key(initKeyNote, initScale));
  const initInstrument = instruments.get("guitar") as FrettedInstrument;
  const [activeInstrument, setActiveInstrument] = useState(initInstrument);
  const [activeTuning, setActiveTuning] = useState(
    initInstrument.getStandardTuning(),
  );
  const [isRainbowMode, setIsRainbowMode] = useState(true);
  const [activeTemperament, setActiveTemperament] = useState(twelveTET);
  const [activeToolName, setActiveToolName] = useState("scalebook");
  const initDialogState: IAppDialogState = { isOpen: false }
  const [dialogState, setDialogState] = useState(initDialogState);

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

  const onKeyNoteSelect = (keyNote: Note): void => {
    setActiveKey(new Key(keyNote, activeKey.scale));
  };

  const onInstrumentSelect = (instrument: FrettedInstrument): void => {
    setActiveInstrument(instrument);
    // Reset active tuning to the last tuning set on thie instrument selected.
    const activeTuning: Tuning = checkActiveTuning(instrument);
    setActiveTuning(activeTuning);
  };

  const onScaleSelect = (scale: Scale): void => {
    setActiveKey(new Key(activeKey.note, scale));
  };

  const updateKey = (key: Key): void => {
    setActiveKey(new Key(key.note, key.scale));
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
    const commonTunings: Tuning[] = instrument.getCommonTunings();
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
      new Tuning(instrument.name, Constants.CUSTOM, tuningNotes)
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

  let tool;

  switch (activeToolName) {
    case "scalebook": {
      tool = (
        <Scalebook
          activeInstrument={activeInstrument}
          activeKey={activeKey}
          activeTuning={activeTuning}
          temperament={activeTemperament}
          instruments={instruments}
          isSmallScreen={isSmallScreen}
          isMediumScreen={isMediumScreen}
          isRainbowMode={isRainbowMode}
          onInstrumentSelect={onInstrumentSelect}
          onInstrumentTune={onInstrumentTune}
          onInstrumentTuneToPreset={onInstrumentTuneToPreset}
          onKeyNoteSelect={onKeyNoteSelect}
          onScaleSelect={onScaleSelect}
          theme={theme}
          updateKey={updateKey}
        />
      );
      break;
    }
    // case "songbook": {
    //   tool = <div>COMING SOON</div>;
    //   break;
    // }
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
            activeToolName={activeToolName as ToolName}
            dialogState={dialogState}
            isAuthenticated={false}
            isDarkTheme={isDarkColor(theme.swatch.base01)}
            isRainbowMode={isRainbowMode}
            isSmallScreen={isSmallScreen}
            onLoginClick={() => false}
            onLogoutClick={() => false}
            onToolSelect={(activeToolName) => {
              setActiveToolName(activeToolName);
            }}
            setDialogState={setDialogState}
            setTheme={setTheme}
            theme={theme}
            toggleRainbowMode={toggleRainbowMode}
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
