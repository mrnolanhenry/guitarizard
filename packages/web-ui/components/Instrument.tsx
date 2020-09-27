import { Key, Note, Scale, instrument } from "guitarizard-note-lib";
import { Base16Theme } from "../lib/colors";
import FretBoard from "./FretBoard";

interface Props {
  instrument: instrument.FrettedInstrument;
  keyNote: Note;
  scale: Scale;
  onTune: (instrumentName: string, stringID: string, newTuning: Note) => void;
  theme: Base16Theme;
  activeKey: Key;
}

export default function Guitar(props: Props) {
  return (
    <FretBoard
      instrumentName={props.instrument.name}
      fretBoard={props.instrument.fretBoard}
      scale={props.scale}
      keyNote={props.keyNote}
      showFretBar={true}
      onTune={props.onTune}
      activeKey={props.activeKey}
      theme={props.theme}
    />
  );
}
