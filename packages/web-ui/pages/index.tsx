import './global.scss';
import { Component } from 'react';
import { cloudCity, Base16Theme } from "../lib/colors";
import { ToolName } from '../components/ToolSelector';
import TopBar from "../components/TopBar";
import Scalebook from '../components/Scalebook';
import { Key, Note, Scale, ScaleSystem, instrument, data } from "guitarizard-note-lib";

type InstrumentMap = Map<string, instrument.FrettedInstrument>;

interface State {
  instruments: InstrumentMap;
  activeInstrumentName?: string;
  activeScale: Scale;
  keyNote: Note;
  activeKey: Key;
  scaleSystem: ScaleSystem;
  activeToolName: ToolName;
  onToggleNoteTable: boolean;
  onToggleIntervalTable: boolean;
  theme: Base16Theme;
}

interface Props { }

export default class Main extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const diatonic = data.scaleSystem.diatonic;
    const scales = data.scales;
    // const tunings = data.tunings;

    const instruments: InstrumentMap = new Map();

    instruments.set(
      "guitar",
      new instrument.Guitar(
        22,
        ["E","A", "D", "G", "B", "E"].map(noteID =>
          diatonic.getNoteFromID(noteID)
        )
      )
    );

    instruments.set(
      "banjo",
      new instrument.Banjo(
        22,
        ["G", "D", "G", "B", "D"].map(noteID =>
          diatonic.getNoteFromID(noteID)
        )
      )
    );

    instruments.set(
      "ukulele",
      new instrument.Ukulele(
        20,
        ["G", "C", "E", "A"].map(noteID =>
          diatonic.getNoteFromID(noteID)
        )
      )
    );

    instruments.set(
      "bass-4",
      new instrument.Bass(
        22,
        ["E", "A", "D", "G"].map(noteID =>
          diatonic.getNoteFromID(noteID)
        )
      )
    );

    instruments.set(
      "bass-5",
      new instrument.Bass(
        22,
        ["B", "E", "A", "D", "G"].map(noteID =>
          diatonic.getNoteFromID(noteID)
        )
      )
    );

    instruments.set(
      "bass-6",
      new instrument.Bass(
        22,
        ["B", "E", "A", "D", "G", "C"].map(noteID =>
          diatonic.getNoteFromID(noteID)
        )
      )
    );

    let activeScale = scales[86];
    let keyNote = diatonic.getNoteFromID("E");

    this.state = {
      instruments,
      activeInstrumentName: "guitar",
      activeScale,
      keyNote,
      onToggleNoteTable: false,
      onToggleIntervalTable: false,
      activeKey: new Key(keyNote, activeScale),
      scaleSystem: diatonic,
      activeToolName: "scalebook",
      theme: cloudCity
    };

    this.onToggleNoteTable = this.onToggleNoteTable.bind(this);
    this.onToggleIntervalTable = this.onToggleIntervalTable.bind(this);

    this.onKeyNoteSelect = this.onKeyNoteSelect.bind(this);
    this.onInstrumentSelect = this.onInstrumentSelect.bind(this);
    this.onScaleSelect = this.onScaleSelect.bind(this);
    this.updateKey = this.updateKey.bind(this);
    this.onGuitarTune = this.onGuitarTune.bind(this);
    this.onBanjoTune = this.onBanjoTune.bind(this);
    this.onUkuleleTune = this.onUkuleleTune.bind(this);
    this.onBassFourTune = this.onBassFourTune.bind(this);
    this.onBassFiveTune = this.onBassFiveTune.bind(this);
    this.onBassSixTune = this.onBassSixTune.bind(this);
  }

  onKeyNoteSelect(keyNote: Note) {
    this.setState({
      keyNote,
      activeKey: new Key(keyNote, this.state.activeScale)
    });
  }

  onInstrumentSelect(instrument: instrument.FrettedInstrument) {
    this.setState({ activeInstrumentName: instrument.name });
  }

  onScaleSelect(scale: Scale) {
    this.setState({
      activeScale: scale,
      activeKey: new Key(this.state.keyNote, scale)
    });
  }

  updateKey(key: Key) {
    this.setState({
      keyNote: key.note,
      activeScale: key.scale,
      activeKey: new Key(key.note, key.scale)
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

    // TODO: hella shit
    this.setState({
      instruments: this.state.instruments
    });
  }

  onGuitarTune(stringID: string, newTuning: Note) {
    return this.setInstrumentTuning('guitar', stringID, newTuning);
  }

  onBanjoTune(stringID: string, newTuning: Note) {
    return this.setInstrumentTuning('banjo', stringID, newTuning);
  }

  onUkuleleTune(stringID: string, newTuning: Note) {
    return this.setInstrumentTuning('ukulele', stringID, newTuning);
  }

  onBassFourTune(stringID: string, newTuning: Note) {
    return this.setInstrumentTuning('bass-4', stringID, newTuning);
  }

  onBassFiveTune(stringID: string, newTuning: Note) {
    return this.setInstrumentTuning('bass-5', stringID, newTuning);
  }

  onBassSixTune(stringID: string, newTuning: Note) {
    return this.setInstrumentTuning('bass-6', stringID, newTuning);
  }

  onToggleNoteTable() {
    console.log('onToggleNoteTable fired')
    return false;
  }

  onToggleIntervalTable() {
    console.log('onToggletIntervalTable fired')
    return false;
  }

  render() {

    let tool;

    switch (this.state.activeToolName) {
      case "scalebook": {
        tool = <Scalebook
          activeScale={this.state.activeScale}
          scaleSystem={this.state.scaleSystem}
          keyNote={this.state.keyNote}
          activeKey={this.state.activeKey}
          instruments={this.state.instruments}
          activeInstrumentName={this.state.activeInstrumentName}
          onToggleNoteTable={this.state.onToggleNoteTable}
          onToggleIntervalTable = {this.state.onToggleIntervalTable}
          onKeyNoteSelect={this.onKeyNoteSelect}
          onInstrumentSelect={this.onInstrumentSelect}
          onScaleSelect={this.onScaleSelect}
          updateKey={this.updateKey}
          onGuitarTune={this.onGuitarTune}
          onBanjoTune={this.onBanjoTune}
          onUkuleleTune={this.onUkuleleTune}
          onBassFourTune={this.onBassFourTune}
          onBassFiveTune={this.onBassFiveTune}
          onBassSixTune={this.onBassSixTune}
          theme={this.state.theme} />;
        break;
      }
      case "songbook": {
        tool = <div>NOLAN FIX ME!</div>;
        break;
      }
    }

    const style = {
      backgroundColor: this.state.theme.base01,
      color: this.state.theme.base05,
      position: "fixed" as "fixed", // lol what the fuck typescript
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      overflow: "auto" 
    };

    return <div id="app">
      <div style={style}>
        <TopBar isAuthenticated={false}
          onLoginClick={() => false}
          onLogoutClick={() => false}
          onToolSelect={(activeToolName) => {
            this.setState({ activeToolName })
          }}
          activeToolName={this.state.activeToolName}
          theme={cloudCity} />

        {tool}

        {/* Nolan mess-around zone */}

          {/* {<button id='toggleNoteTable' onClick={this.onToggleNoteTable}>Hide Note Table</button>}
          {<button id='toggleIntervalTable' onClick={this.onToggleIntervalTable}>Hide Interval Table</button>} */}
        </div>

      </div>



  }
}
