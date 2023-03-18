import "./App.css";
import { useState } from "react";
import { cloudCity } from "./colors/themes";
import { ToolName } from "./components/selectors/ToolSelector";
import { TopBar } from "./components/TopBar";
import { Scalebook } from "./components/tools/Scalebook";
import { Key, Note, Scale, Temperament, instrument, data } from "note-lib";
import { IFrettedInstrument } from "note-lib/src/IFrettedInstrument";
import { Tuning } from "note-lib/src/Tuning";
import { Constants } from "note-lib/src/constants/Constants";

type InstrumentMap = Map<string, IFrettedInstrument>;

const initInstruments = (temperament: Temperament) => {
  const A: Note = temperament.getNoteFromID("A");
  const B: Note = temperament.getNoteFromID("B");
  const C: Note = temperament.getNoteFromID("C");
  const D: Note = temperament.getNoteFromID("D");
  const E: Note = temperament.getNoteFromID("E");
  const Fs: Note = temperament.getNoteFromID("F#");
  const G: Note = temperament.getNoteFromID("G");

  const instrumentMap: InstrumentMap = new Map();
  const guitar = new instrument.Guitar(21, [E, A, D, G, B, E]);
  const sevenStringGuitar = new instrument.Guitar(21, [B, E, A, D, G, B, E]);
  const eightStringGuitar = new instrument.Guitar(21, [Fs, B, E, A, D, G, B, E]);
  const banjo = new instrument.Banjo(21, [G, D, G, B, D]);
  const ukulele = new instrument.Ukulele(20, [G, C, E, A]);
  const fourStringBass = new instrument.Bass(21, [E, A, D, G]);
  const fiveStringBass = new instrument.Bass(21, [B, E, A, D, G]);
  const sixStringBass = new instrument.Bass(21, [B, E, A, D, G, C]);
  const mandolin = new instrument.Mandolin(17, [G, D, A, E]);

  instrumentMap.set("guitar", guitar);
  instrumentMap.set("guitar (7 string)", sevenStringGuitar);
  instrumentMap.set("guitar (8 string)", eightStringGuitar);
  instrumentMap.set("banjo", banjo);
  instrumentMap.set("ukulele",ukulele);
  instrumentMap.set("bass", fourStringBass);
  instrumentMap.set("bass (5 string)",fiveStringBass);
  instrumentMap.set("bass (6 string)",sixStringBass);
  instrumentMap.set("mandolin", mandolin);
  return instrumentMap;
}

const App = () => {
    const twelveTET: Temperament = data.temperament.twelveTET;
    const scales: Scale[] = data.scales;
    const instrumentMap = initInstruments(twelveTET);
    const [instruments, setInstruments] = useState(instrumentMap);
    const [activeScale, setActiveScale] = useState(scales[86]);
    const [activeKeyNote, setActiveKeyNote] = useState(twelveTET.getNoteFromID("E"));
    const [activeKey, setActiveKey] = useState(new Key(activeKeyNote, activeScale));
    const guitar = instruments.get("guitar") as IFrettedInstrument;
    const [activeInstrument, setActiveInstrument] = useState(guitar);
    const [activeTuning, setActiveTuning] = useState(guitar.getStandardTuning());
    const [isRainbowMode, setIsRainbowMode] = useState(true);
    const [activeTemperament, setActiveTemperament] = useState(twelveTET);
    const [activeToolName, setActiveToolName] = useState("scalebook");
    const [theme, setTheme] = useState(cloudCity);

  const toggleRainbowMode = () => {
    setIsRainbowMode(!isRainbowMode);
  }

  const onKeyNoteSelect = (keyNote: Note) => {
    setActiveKey(new Key(keyNote, activeScale));
    setActiveKeyNote(keyNote);
  }

  const onInstrumentSelect = (instrument: IFrettedInstrument) => {
    setActiveInstrument(instrument);
  }

  const onScaleSelect = (scale: Scale) => {
    setActiveKey(new Key(activeKeyNote, scale));
    setActiveScale(scale);
  }

  const updateKey = (key: Key) => {
    setActiveKey(new Key(key.note, key.scale));
    setActiveScale(key.scale);
    setActiveKeyNote(key.note);
  }

  const setInstrumentTuning = (
    instrumentName: string,
    stringID: string,
    newTuning: Note
  ) => {
    const instrument = instruments.get(instrumentName);

    if (typeof instrument === "undefined") {
      return;
    }

    instrument.fretBoard.setStringTuningNote(stringID, newTuning);
    const newActiveTuning = checkActiveTuning();

    // TODO: hella shit
    setInstruments(instruments);

    setActiveTuning(newActiveTuning);
  }

  const checkActiveTuning = () => {
    const activeTuningNotes = activeInstrument.fretBoard.tunedStrings.map(tunedString => tunedString.tuningNote)
    const commonTunings = activeInstrument.getCommonTunings();
    const commonTuningMatch = commonTunings.find(tuning => {
      let isMatch = true;
      tuning.notes.forEach((note, index) => {
        if (activeTuningNotes[index].id !== note.id) {
          isMatch = false;
        }
      });
      return isMatch;
    });
    return commonTuningMatch ? commonTuningMatch : new Tuning(activeInstrument.name, Constants.CUSTOM, activeTuningNotes);
  }

  const setInstrumentTuningToPreset = (tuning: Tuning) => {
    const instrument = activeInstrument;
    const fretBoard = instrument.fretBoard;

    if (typeof instrument === "undefined") {
      return;
    }
    fretBoard.tunedStrings.forEach((tunedString, index) => 
      fretBoard.setStringTuningNote(tunedString.id, tuning.notes[index])
    )
    
    // TODO: hella shit
    setInstruments(instruments);

    setActiveTuning(tuning);
  }

  const onInstrumentTune = (instrumentName: string, stringID: string, newTuning: Note) => {
    return setInstrumentTuning(instrumentName, stringID, newTuning);
  }

  const onInstrumentTuneToPreset = (tuning: Tuning) => {
    return setInstrumentTuningToPreset(tuning);
  }

    let tool;

    switch (activeToolName) {
      case "scalebook": {
        tool = (
          <Scalebook
            activeScale={activeScale}
            activeTuning={activeTuning}
            temperament={activeTemperament}
            keyNote={activeKeyNote}
            activeKey={activeKey}
            instruments={instruments}
            activeInstrument={activeInstrument}
            isRainbowMode={isRainbowMode}
            toggleRainbowMode={toggleRainbowMode}
            onKeyNoteSelect={onKeyNoteSelect}
            onInstrumentSelect={onInstrumentSelect}
            onScaleSelect={onScaleSelect}
            updateKey={updateKey}
            onInstrumentTune={onInstrumentTune}
            onInstrumentTuneToPreset={onInstrumentTuneToPreset}
            theme={theme}
          />
        );
        break;
      }
      // case "songbook": {
      //   tool = <div>COMING SOON</div>;
      //   break;
      // }
    }

    const style = {
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
