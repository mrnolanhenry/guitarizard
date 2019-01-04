import './global.scss';
import { Component } from 'react';
import { tomorrow, bespin, Base16Theme } from "../lib/colors";
import { ToolName } from '../components/ToolSelector';
import TopBar from "../components/TopBar";
import Chordbook from '../components/Chordbook';
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
  theme: Base16Theme;
}

interface Props { }

export default class Main extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const diatonic = data.scaleSystem.diatonic;
    const scales = data.scales;

    const instruments: InstrumentMap = new Map();

    instruments.set(
      "guitar",
      new instrument.Guitar(
        21,
        ["E", "A", "D", "G", "B", "E"].map(noteID =>
          diatonic.getNoteFromID(noteID)
        )
      )
    );

    instruments.set(
      "banjo",
      new instrument.Banjo(
        21,
        ["G", "D", "G", "B", "D"].map(noteID =>
          diatonic.getNoteFromID(noteID)
        )
      )
    );

    instruments.set(
      "ukulele",
      new instrument.Ukulele(
        19,
        ["G", "C", "E", "A"].map(noteID =>
          diatonic.getNoteFromID(noteID)
        )
      )
    );

    instruments.set(
      "bass-4",
      new instrument.Bass(
        21,
        ["E", "A", "D", "G"].map(noteID =>
          diatonic.getNoteFromID(noteID)
        )
      )
    );

    instruments.set(
      "bass-5",
      new instrument.Bass(
        21,
        ["B", "E", "A", "D", "G"].map(noteID =>
          diatonic.getNoteFromID(noteID)
        )
      )
    );

    instruments.set(
      "bass-6",
      new instrument.Bass(
        21,
        ["B", "E", "A", "D", "G", "C"].map(noteID =>
          diatonic.getNoteFromID(noteID)
        )
      )
    );

    let activeScale = scales[13];
    let keyNote = diatonic.getNoteFromID("E");

    this.state = {
      instruments,
      activeInstrumentName: "guitar",
      activeScale,
      keyNote,
      activeKey: new Key(keyNote, activeScale),
      scaleSystem: diatonic,
      activeToolName: "chordbook",
      theme: bespin
    };



    this.onKeyNoteSelect = this.onKeyNoteSelect.bind(this);
    this.onInstrumentSelect = this.onInstrumentSelect.bind(this);
    this.onScaleSelect = this.onScaleSelect.bind(this);
    this.onGuitarTune = this.onGuitarTune.bind(this);
    this.onBanjoTune = this.onBanjoTune.bind(this);
    this.onUkuleleTune = this.onUkuleleTune.bind(this);
    this.onBassFourTune = this.onBassFourTune.bind(this);
    this.onBassFiveTune = this.onBassFiveTune.bind(this);
    this.onBassSixTune = this.onBassSixTune.bind(this);
  }

  onKeyNoteSelect(keyNote: Note) {
    console.log("passing in note ", keyNote.id)
    this.setState({
      keyNote
    });
    this.updateKey(keyNote,this.state.activeScale);
    console.log(this.state.keyNote.id, " should be ", keyNote.id)
  }

  onInstrumentSelect(instrument: instrument.FrettedInstrument) {
    this.setState({ activeInstrumentName: instrument.name });
  }

  onScaleSelect(scale: Scale) {
    console.log("passing in scale ", scale.name)
    this.setState({
      activeScale: scale
    });
    this.updateKey(this.state.keyNote, scale);
    console.log(this.state.activeScale.name, " should be ", scale.name)
    // console.log(this.state.activeKey.note.id,this.state.activeKey.scale.name,this.state.keyNote.id,this.state.activeScale.name);
  }

  updateKey(keyNote: Note,scale: Scale) {
    this.setState({
      activeKey: new Key(keyNote, scale)
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

  render() {

    let tool;

    switch (this.state.activeToolName) {
      case "chordbook": {
        tool = <Chordbook
          activeScale={this.state.activeScale}
          scaleSystem={this.state.scaleSystem}
          keyNote={this.state.keyNote}
          instruments={this.state.instruments}
          activeInstrumentName={this.state.activeInstrumentName}
          onKeyNoteSelect={this.onKeyNoteSelect}
          onInstrumentSelect={this.onInstrumentSelect}
          onScaleSelect={this.onScaleSelect}
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
      left: 0
    };

    const equivKeysDiv = {
      padding: '5px',
      margin: 'auto',
      textAlign: 'left',
      listStylePosition: 'inside',
      maxWidth: '400px'
    }

    const btnStyle = {
      backgroundColor: this.state.theme.base00,
      color: this.state.theme.base05,
      borderColor: this.state.theme.base03,
      borderWidth: '1px',
      minWidth: '185.9px',
      maxWidth: '380px'
    }

    let equivKeys = this.state.activeKey.getEquivKeys();

    return <div id="app">
      <div style={style}>
        <TopBar isAuthenticated={false}
          onLoginClick={() => false}
          onLogoutClick={() => false}
          onToolSelect={(activeToolName) => {
            this.setState({ activeToolName })
          }}
          activeToolName={this.state.activeToolName}
          theme={bespin} />

        {tool}

        {/* Nolan mess-around zone */}
        <div id="equivKeys" style={equivKeysDiv}>
          <br />
          <ul>Equivalent Keys to {`${this.state.keyNote.id} ${this.state.activeScale.name}: `}
            {equivKeys.map(key =>
              <li><button className="btn-equiv-key" style={btnStyle} onClick={() => {
                //  console.log('Before onKeyNoteSelect:',this.state.activeKey.note.id,this.state.activeKey.scale.name, key.note.id,key.scale.name)
                this.onKeyNoteSelect(key.note);
                //  console.log('Before onScaleSelect: ',this.state.activeKey.note.id,this.state.activeKey.scale.name, key.note.id,key.scale.name)
                this.onScaleSelect(key.scale);
                //  console.log('After: ',this.state.activeKey.note.id,this.state.activeKey.scale.name, key.note.id,key.scale.name)
              }}>
                {key.note.id} {key.scale.name}
              </button></li>
            )}
          </ul>
        </div>
      </div>
      {console.log('After all: ', this.state.activeKey.note.id, ' ', this.state.activeKey.scale.name)}
    </div>;


  }
}
