import './Scalebook.scss';
import { Key, Note, Scale, ScaleSystem, instrument } from "guitarizard-note-lib";
import { Base16Theme } from "../lib/colors";
import InstrumentSelector from "./InstrumentSelector";
import NoteSelector from "./NoteSelector";
import ScaleSelector from "./ScaleSelector";
import EquivScaleSelector from "./EquivScaleSelector";
import EquivKeySelector from "./EquivKeySelector";
import IntervalTable from "./IntervalTable";
import NoteTable from "./NoteTable";
// import ToggleButtonIntervalTable from "./ToggleButtonIntervalTable";
import Guitar from "./Guitar";
import Banjo from "./Banjo";
import Ukulele from "./Ukulele";
import Bass from "./Bass";

interface Props {
  instruments: Map<string, instrument.FrettedInstrument>;
  activeInstrumentName?: string;
  activeScale: Scale;
  keyNote: Note;
  activeKey: Key;
  scaleSystem: ScaleSystem;
  onToggleNoteTable: boolean;
  onToggleIntervalTable: boolean;
  onKeyNoteSelect: (keyNote: Note) => void;
  onInstrumentSelect: (instrument: instrument.FrettedInstrument) => void;
  onScaleSelect: (scale: Scale) => void;
  updateKey: (key: Key) => void;
  onGuitarTune: (stringID: string, newTuning: Note) => void;
  onBanjoTune: (stringID: string, newTuning: Note) => void;
  onUkuleleTune: (stringID: string, newTuning: Note) => void;
  onBassFourTune: (stringID: string, newTuning: Note) => void;
  onBassFiveTune: (stringID: string, newTuning: Note) => void;
  onBassSixTune: (stringID: string, newTuning: Note) => void;
  theme: Base16Theme;
}

export default function Scalebook(props: Props) {

  const settingsBarStyle = {
    backgroundColor: props.theme.base01
  };

  const instrument = props.activeInstrumentName
                   ? props.instruments.get(props.activeInstrumentName)
                   : undefined;

  let instrumentComponent;

  if (instrument && instrument.name === "guitar") {
      instrumentComponent = <Guitar guitar={instrument as instrument.Guitar}
                                    activeKey = {props.activeKey}
                                    keyNote={props.keyNote}
                                    scale={props.activeScale}
                                    onTune={props.onGuitarTune}
                                    theme={props.theme} />;
  }

    if (instrument && instrument.name === "banjo") {
      instrumentComponent = <Banjo banjo={instrument as instrument.Banjo}
                                   activeKey = {props.activeKey}
                                   keyNote={props.keyNote}
                                   scale={props.activeScale}
                                   onTune={props.onBanjoTune}
                                   theme={props.theme} />;
  }

  if (instrument && instrument.name === "ukulele") {
      instrumentComponent = <Ukulele ukulele={instrument as instrument.Ukulele}
                                     activeKey = {props.activeKey}
                                     keyNote={props.keyNote}
                                     scale={props.activeScale}
                                     onTune={props.onUkuleleTune}
                                     theme={props.theme} />;
  }

  if (instrument && instrument.name === "bass-4") {
      instrumentComponent = <Bass bass={instrument as instrument.Bass}
                                  activeKey = {props.activeKey}
                                  keyNote={props.keyNote}
                                  scale={props.activeScale}
                                  onTune={props.onBassFourTune}
                                  theme={props.theme} />;
  }

  if (instrument && instrument.name === "bass-5") {
      instrumentComponent = <Bass bass={instrument as instrument.Bass}
                                  activeKey = {props.activeKey}
                                  keyNote={props.keyNote}
                                  scale={props.activeScale}
                                  onTune={props.onBassFiveTune}
                                  theme={props.theme} />;
  }

  if (instrument && instrument.name === "bass-6") {
      instrumentComponent = <Bass bass={instrument as instrument.Bass}
                                  activeKey = {props.activeKey}
                                  keyNote={props.keyNote}
                                  scale={props.activeScale}
                                  onTune={props.onBassSixTune}
                                  theme={props.theme} />;
  }

  return <div className="scalebook">
    <div className="settings-bar" style={settingsBarStyle}>
      <InstrumentSelector
        activeInstrumentName={props.activeInstrumentName}
        instruments={props.instruments}
        onInstrumentSelect={props.onInstrumentSelect}
        theme={props.theme} />

      <NoteSelector
        label="Key:"
        scaleSystem={props.scaleSystem}
        note={props.keyNote}
        onNoteSelect={props.onKeyNoteSelect}
        theme={props.theme} />

      <ScaleSelector activeScale={props.activeScale}
                     onScaleSelect={props.onScaleSelect}
                     theme={props.theme} />
      
      <EquivKeySelector activeKey=  {props.activeKey}
                    updateKey= {props.updateKey}
                    theme= {props.theme} />

      <EquivScaleSelector   activeScale={props.activeScale}
                            onScaleSelect={props.onScaleSelect}
                            theme={props.theme} />
    </div>

    {instrumentComponent}
    
    <NoteTable  activeKey = {props.activeKey}
                theme = {props.theme} />
    
    <IntervalTable  scale = {props.activeScale}
                    theme ={props.theme} />
  </div>;
}
