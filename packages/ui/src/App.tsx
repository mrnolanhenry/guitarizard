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
    const initKeyNote: Note = twelveTET.getNoteFromID("E");
    const initScale: Scale = scales.find(scale => scale.name === "major") as Scale;
    const instrumentMap = initInstruments(twelveTET);
    const [instruments, setInstruments] = useState(instrumentMap);
    const [activeKey, setActiveKey] = useState(new Key(initKeyNote, initScale));
    const initInstrument = instruments.get("guitar") as IFrettedInstrument;
    const [activeInstrument, setActiveInstrument] = useState(initInstrument);
    const [activeTuning, setActiveTuning] = useState(initInstrument.getStandardTuning());
    const [isRainbowMode, setIsRainbowMode] = useState(true);
    const [activeTemperament, setActiveTemperament] = useState(twelveTET);
    const [activeToolName, setActiveToolName] = useState("scalebook");
    const [theme, setTheme] = useState(cloudCity);

  const toggleRainbowMode = () => {
    setIsRainbowMode(!isRainbowMode);
  }

  const onKeyNoteSelect = (keyNote: Note) => {
    setActiveKey(new Key(keyNote, activeKey.scale));
  }

  const onInstrumentSelect = (instrument: IFrettedInstrument) => {
    setActiveInstrument(instrument);
    // Reset active tuning to the last tuning set on thie instrument selected.
    const activeTuning = checkActiveTuning(instrument);
    setActiveTuning(activeTuning);
  }

  const onScaleSelect = (scale: Scale) => {
    setActiveKey(new Key(activeKey.note, scale));
  }

  const updateKey = (key: Key) => {
    setActiveKey(new Key(key.note, key.scale));
  }

  const setInstrumentTuning = (
    stringID: string,
    newTuning: Note
  ) => {
    const instrument = activeInstrument;

    if (typeof instrument === "undefined") {
      return;
    }

    instrument.fretBoard.setStringTuningNote(stringID, newTuning);
    const newActiveTuning = checkActiveTuning(activeInstrument);

    setActiveTuning(newActiveTuning);
  }

  const checkActiveTuning = (instrument: IFrettedInstrument) => {
    const tuningNotes = instrument.fretBoard.tunedStrings.map(tunedString => tunedString.tuningNote)
    const commonTunings = instrument.getCommonTunings();
    const commonTuningMatch = commonTunings.find(tuning => {
      let isMatch = true;
      tuning.notes.forEach((note, index) => {
        if (tuningNotes[index].id !== note.id) {
          isMatch = false;
        }
      });
      return isMatch;
    });
    return commonTuningMatch ? commonTuningMatch : new Tuning(instrument.name, Constants.CUSTOM, tuningNotes);
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
    setActiveTuning(tuning);
  }

  const onInstrumentTune = (stringID: string, newTuning: Note) => {
    return setInstrumentTuning(stringID, newTuning);
  }

  const onInstrumentTuneToPreset = (tuning: Tuning) => {
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
