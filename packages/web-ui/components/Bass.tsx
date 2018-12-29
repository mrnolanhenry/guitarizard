import { Note, Scale, instrument } from "guitarizard-note-lib";
import { Base16Theme } from "../lib/colors";
import FretBoard from "./FretBoard";

interface Props {
  bass: instrument.Bass;
  keyNote: Note;
  scale: Scale;
  onTune: (stringID: string, newTuning: Note) => void;
  theme: Base16Theme;
}

export default function Bass(props: Props) {
  return <FretBoard
           fretBoard={props.bass.fretBoard}
           scale={props.scale}
           keyNote={props.keyNote}
           showFretBar={true}
           onTune={props.onTune}
           theme={props.theme} />;
}
