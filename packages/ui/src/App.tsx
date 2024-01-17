import "./App.css";
import { CSSProperties, useState } from "react";
import { cloudCity } from "./colors/themes";
import { ToolName } from "./components/selectors/ToolSelector";
import { TopBar } from "./components/TopBar";
import { Scalebook } from "./components/tools/Scalebook";
import { Key, Note, Scale, Temperament, instrument, data } from "note-lib";
import { Tuning } from "note-lib/src/Tuning";
import { Constants } from "note-lib/src/constants/Constants";
import { Course } from "note-lib/src/Course";
import { FrettedInstrument } from "note-lib/src/instruments/FrettedInstrument";
import { FretBoard } from "note-lib/src/FretBoard";

type InstrumentMap = Map<string, FrettedInstrument>;

const initInstruments = (temperament: Temperament) => {
  const A: Note = temperament.getNoteFromID(Constants.A);
  const B: Note = temperament.getNoteFromID(Constants.B);
  const C: Note = temperament.getNoteFromID(Constants.C);
  const D: Note = temperament.getNoteFromID(Constants.D);
  const E: Note = temperament.getNoteFromID(Constants.E);
  const Fs: Note = temperament.getNoteFromID(Constants.F_SHARP);
  const G: Note = temperament.getNoteFromID(Constants.G);

  const instrumentMap: InstrumentMap = new Map();
  const guitar = new instrument.Guitar(21, [E, A, D, G, B, E]);
  const sevenStringGuitar = new instrument.Guitar(21, [B, E, A, D, G, B, E]);
  const eightStringGuitar = new instrument.Guitar(21, [Fs, B, E, A, D, G, B, E]);
  const twelveStringGuitar = new instrument.Guitar(21, [E, A, D, G, B, E], true);
  const banjo = new instrument.Banjo(21, [G, D, G, B, D]);
  const ukulele = new instrument.Ukulele(20, [G, C, E, A]);
  const fourStringBass = new instrument.Bass(21, [E, A, D, G]);
  const fiveStringBass = new instrument.Bass(21, [B, E, A, D, G]);
  const sixStringBass = new instrument.Bass(21, [B, E, A, D, G, C]);
  const mandolin = new instrument.Mandolin(17, [G, D, A, E]);

  instrumentMap.set("guitar", guitar);
  instrumentMap.set("guitar (7 string)", sevenStringGuitar);
  instrumentMap.set("guitar (8 string)", eightStringGuitar);
  instrumentMap.set("guitar (12 string)", twelveStringGuitar);
  instrumentMap.set("banjo", banjo);
  instrumentMap.set("ukulele",ukulele);
  instrumentMap.set("bass", fourStringBass);
  instrumentMap.set("bass (5 string)",fiveStringBass);
  instrumentMap.set("bass (6 string)",sixStringBass);
  instrumentMap.set("mandolin", mandolin);
  return instrumentMap;
}

const App = () => {
    const twelveTET: Temperament = data.temperaments.find((temperament) => temperament.name === Constants.TWELVE_TET) as Temperament;
    const scales: Scale[] = data.scales;
    const initKeyNote: Note = twelveTET.getNoteFromID(Constants.E);
    const initScale: Scale = scales.find(scale => scale.name === Constants.MAJOR) as Scale;
    const instrumentMap = initInstruments(twelveTET);
    const [instruments, setInstruments] = useState(instrumentMap);
    const [activeKey, setActiveKey] = useState(new Key(initKeyNote, initScale));
    const initInstrument = instruments.get("guitar") as FrettedInstrument;
    const [activeInstrument, setActiveInstrument] = useState(initInstrument);
    const [activeTuning, setActiveTuning] = useState(initInstrument.getStandardTuning());
    const [isRainbowMode, setIsRainbowMode] = useState(true);
    const [activeTemperament, setActiveTemperament] = useState(twelveTET);
    const [activeToolName, setActiveToolName] = useState("scalebook");
    const [theme, setTheme] = useState(cloudCity);

  const toggleRainbowMode = (): void => {
    setIsRainbowMode(!isRainbowMode);
  }

  const onKeyNoteSelect = (keyNote: Note): void => {
    setActiveKey(new Key(keyNote, activeKey.scale));
  }

  const onInstrumentSelect = (instrument: FrettedInstrument): void => {
    setActiveInstrument(instrument);
    // Reset active tuning to the last tuning set on thie instrument selected.
    const activeTuning: Tuning = checkActiveTuning(instrument);
    setActiveTuning(activeTuning);
  }

  const onScaleSelect = (scale: Scale): void => {
    setActiveKey(new Key(activeKey.note, scale));
  }

  const updateKey = (key: Key): void => {
    setActiveKey(new Key(key.note, key.scale));
  }

  const setInstrumentTuning = (
    courseId: string,
    newTuning: Note
    ): void => {
    const instrument = activeInstrument;
    const fretBoard = instrument.fretBoard;

    if (typeof instrument === Constants.UNDEFINED) {
      return;
    }

    const courseSelected: Course = fretBoard.courses.find(course => course.id === courseId) as Course;
    fretBoard.setCourseTuningNote(courseSelected.id, newTuning)
    const newActiveTuning = checkActiveTuning(activeInstrument);

    setActiveTuning(newActiveTuning);
  }

  const checkActiveTuning = (instrument: FrettedInstrument): Tuning => {
    const tuningNotes: Note[] = instrument.fretBoard.courses.map(course => course.tunedStrings[0].tuningNote);
    const commonTunings: Tuning[] = instrument.getCommonTunings();
    const commonTuningMatch: Tuning | undefined = commonTunings.find(tuning => {
      let isMatch: boolean = true;
      tuning.notes.forEach((note, index) => {
        if (tuningNotes[index].id !== note.id) {
          isMatch = false;
        }
      });
      return isMatch;
    });
    return commonTuningMatch ? commonTuningMatch : new Tuning(instrument.name, Constants.CUSTOM, tuningNotes);
  }

  const setInstrumentTuningToPreset = (tuning: Tuning): void => {
    const instrument: FrettedInstrument = activeInstrument;
    const fretBoard: FretBoard = instrument.fretBoard;

    if (typeof instrument === Constants.UNDEFINED) {
      return;
    }
    fretBoard.courses.forEach((course, index) => 
      fretBoard.setCourseTuningNote(course.id, tuning.notes[index])
    )
    setActiveTuning(tuning);
  }

  const onInstrumentTune = (courseId: string, newTuning: Note): void => {
    return setInstrumentTuning(courseId, newTuning);
  }

  const onInstrumentTuneToPreset = (tuning: Tuning): void => {
    return setInstrumentTuningToPreset(tuning);
  }

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
            isRainbowMode={isRainbowMode}
            onInstrumentSelect={onInstrumentSelect}
            onInstrumentTune={onInstrumentTune}
            onInstrumentTuneToPreset={onInstrumentTuneToPreset}
            onKeyNoteSelect={onKeyNoteSelect}
            onScaleSelect={onScaleSelect}
            toggleRainbowMode={toggleRainbowMode}
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
      backgroundColor: theme.base01,
      color: theme.base05,
      position: "fixed" as "fixed", // lol what the heck typescript
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      overflow: "auto",
    };

    return (
      <div id="app">
        <div style={style}>
          <TopBar
            isAuthenticated={false}
            onLoginClick={() => false}
            onLogoutClick={() => false}
            onToolSelect={(activeToolName) => {
              setActiveToolName(activeToolName);
            }}
            activeToolName={activeToolName as ToolName}
            theme={cloudCity}
          />

          {tool}
        </div>
      </div>
    );
}

export default App;
