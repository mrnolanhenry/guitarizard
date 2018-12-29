import './global.scss';
import { Component } from 'react';
import { bespin, Base16Theme } from "../lib/colors";
import { ToolName } from '../components/ToolSelector';
import TopBar from "../components/TopBar";
import { Note, Scale, ScaleSystem, instrument, data } from "guitarizard-note-lib";

type InstrumentMap = Map<string, instrument.FrettedInstrument>;

interface State {
  instruments: InstrumentMap;
  activeInstrumentName?: string;
  activeScale: Scale;
  keyNote: Note;
  scaleSystem: ScaleSystem;
  activeToolName: ToolName;
  theme: Base16Theme;
}

interface Props {}

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

    this.state = {
      instruments,
      activeInstrumentName: "",
      activeScale: scales[14],
      keyNote: diatonic.getNoteFromID("A"),
      scaleSystem: diatonic,
      activeToolName: "chordbook",
      theme: bespin
    };
  }

  render() {
    return <div>
      <TopBar isAuthenticated={false}
              onLoginClick={() => false}
              onLogoutClick={() => false}
              onToolSelect={(activeToolName) => {
                  console.log(activeToolName + '...');
                  this.setState({ activeToolName })
              }}
              activeToolName={this.state.activeToolName}
              theme={bespin} />
    </div>;
  }
}
