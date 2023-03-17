import "./App.css";
import { Component } from "react";
import { cloudCity, Base16Theme } from "./colors/themes";
import { ToolName } from "./components/selectors/ToolSelector";
import { TopBar } from "./components/TopBar";
import { Scalebook } from "./components/tools/Scalebook";
import { Key, Note, Scale, Temperament, instrument, data } from "note-lib";
import { IFrettedInstrument } from "note-lib/src/IFrettedInstrument";
import { Tuning } from "note-lib/src/Tuning";
import { Constants } from "note-lib/src/constants/Constants"

type InstrumentMap = Map<string, IFrettedInstrument>;

interface State {
  instruments: InstrumentMap;
  activeInstrument: IFrettedInstrument;
  activeScale: Scale;
  activeTuning: Tuning;
  keyNote: Note;
  activeKey: Key;
  temperament: Temperament;
  activeToolName: ToolName;
  isRainbowMode: boolean;
  onToggleNoteTable: boolean;
  onToggleIntervalTable: boolean;
  theme: Base16Theme;
}

interface Props {}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const twelveTET: Temperament = data.temperament.twelveTET;
    const scales: Scale[] = data.scales;

    const instruments: InstrumentMap = new Map();
    const guitar = new instrument.Guitar(
      22,
      ["E", "A", "D", "G", "B", "E"].map((noteID) =>
        twelveTET.getNoteFromID(noteID)
      )
    );
    const banjo = new instrument.Banjo(
      22,
      ["G", "D", "G", "B", "D"].map((noteID) =>
        twelveTET.getNoteFromID(noteID)
      )
    );
    const ukulele = new instrument.Ukulele(
      20,
      ["G", "C", "E", "A"].map((noteID) => twelveTET.getNoteFromID(noteID))
    );
    const fourStringBass = new instrument.Bass(
      22,
      ["E", "A", "D", "G"].map((noteID) => twelveTET.getNoteFromID(noteID))
    );
    const fiveStringBass = new instrument.Bass(
      22,
      ["B", "E", "A", "D", "G"].map((noteID) =>
        twelveTET.getNoteFromID(noteID)
      )
    );
    const sixStringBass = new instrument.Bass(
      22,
      ["B", "E", "A", "D", "G", "C"].map((noteID) =>
        twelveTET.getNoteFromID(noteID)
      )
    );

    instruments.set("guitar", guitar);
    instruments.set("banjo", banjo);
    instruments.set("ukulele",ukulele);
    instruments.set("bass (4 string)",fourStringBass);
    instruments.set("bass (5 string)",fiveStringBass);
    instruments.set("bass (6 string)",sixStringBass);

    let activeScale: Scale = scales[86];
    let keyNote: Note= twelveTET.getNoteFromID("E");

    this.state = {
      instruments,
      activeKey: new Key(keyNote, activeScale),
      activeInstrument: guitar,
      activeScale,
      activeTuning: guitar.getStandardTuning(),
      keyNote,
      onToggleNoteTable: false,
      onToggleIntervalTable: false,
      isRainbowMode: true,
      temperament: twelveTET,
      activeToolName: "scalebook",
      theme: cloudCity,
    };

    this.onToggleNoteTable = this.onToggleNoteTable.bind(this);
    this.onToggleIntervalTable = this.onToggleIntervalTable.bind(this);

    this.onKeyNoteSelect = this.onKeyNoteSelect.bind(this);
    this.onInstrumentSelect = this.onInstrumentSelect.bind(this);
    this.onScaleSelect = this.onScaleSelect.bind(this);
    this.updateKey = this.updateKey.bind(this);
    this.onInstrumentTune = this.onInstrumentTune.bind(this);
    this.onInstrumentTuneToPreset = this.onInstrumentTuneToPreset.bind(this);
    this.toggleRainbowMode = this.toggleRainbowMode.bind(this);
  }

  toggleRainbowMode() {
    this.setState({
      isRainbowMode: !this.state.isRainbowMode,
    });
  }

  onKeyNoteSelect(keyNote: Note) {
    this.setState({
      keyNote,
      activeKey: new Key(keyNote, this.state.activeScale),
    });
  }

  onInstrumentSelect(instrument: IFrettedInstrument) {
    this.setState({ activeInstrument: instrument });
  }

  onScaleSelect(scale: Scale) {
    this.setState({
      activeScale: scale,
      activeKey: new Key(this.state.keyNote, scale),
    });
  }

  updateKey(key: Key) {
    this.setState({
      keyNote: key.note,
      activeScale: key.scale,
      activeKey: new Key(key.note, key.scale),
    });
  }

  setInstrumentTuning(
    instrumentName: string,
    stringID: string,
    newTuning: Note
  ) {
    const instrument = this.state.instruments.get(instrumentName);

    if (typeof instrument === "undefined") {
      return;
    }

    instrument.fretBoard.setStringTuningNote(stringID, newTuning);
    const newActiveTuning = this.checkActiveTuning();

    // TODO: hella shit
    this.setState({
      instruments: this.state.instruments,
      activeTuning: newActiveTuning,
    });
  }

  checkActiveTuning = () => {
    const activeInstrument = this.state.activeInstrument;
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
    return commonTuningMatch ? commonTuningMatch : new Tuning(this.state.activeInstrument.name, Constants.CUSTOM, activeTuningNotes);
  }

  setInstrumentTuningToPreset(tuning: Tuning) {
    const instrument = this.state.activeInstrument;
    const fretBoard = instrument.fretBoard;

    if (typeof instrument === "undefined") {
      return;
    }
    fretBoard.tunedStrings.forEach((tunedString, index) => 
      fretBoard.setStringTuningNote(tunedString.id, tuning.notes[index])
    )
    

    // TODO: hella shit
    this.setState({
      activeTuning: tuning,
      instruments: this.state.instruments
    });
  }

  onInstrumentTune(instrumentName: string, stringID: string, newTuning: Note) {
    return this.setInstrumentTuning(instrumentName, stringID, newTuning);
  }

  onInstrumentTuneToPreset(tuning: Tuning) {
    return this.setInstrumentTuningToPreset(tuning);
  }

  onToggleNoteTable() {
    return false;
  }

  onToggleIntervalTable() {
    return false;
  }

  render() {
    let tool;

    switch (this.state.activeToolName) {
      case "scalebook": {
        tool = (
          <Scalebook
            activeScale={this.state.activeScale}
            activeTuning={this.state.activeTuning}
            temperament={this.state.temperament}
            keyNote={this.state.keyNote}
            activeKey={this.state.activeKey}
            instruments={this.state.instruments}
            activeInstrument={this.state.activeInstrument}
            isRainbowMode={this.state.isRainbowMode}
            toggleRainbowMode={this.toggleRainbowMode}
            onToggleNoteTable={this.state.onToggleNoteTable}
            onToggleIntervalTable={this.state.onToggleIntervalTable}
            onKeyNoteSelect={this.onKeyNoteSelect}
            onInstrumentSelect={this.onInstrumentSelect}
            onScaleSelect={this.onScaleSelect}
            updateKey={this.updateKey}
            onInstrumentTune={this.onInstrumentTune}
            onInstrumentTuneToPreset={this.onInstrumentTuneToPreset}
            theme={this.state.theme}
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
      backgroundColor: this.state.theme.base01,
      color: this.state.theme.base05,
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
              this.setState({ activeToolName });
            }}
            activeToolName={this.state.activeToolName}
            theme={cloudCity}
          />

          {tool}
          {/* {<button id='toggleNoteTable' onClick={this.onToggleNoteTable}>Hide Note Table</button>}
          {<button id='toggleIntervalTable' onClick={this.onToggleIntervalTable}>Hide Interval Table</button>} */}
        </div>
      </div>
    );
  }
}

export default App;
