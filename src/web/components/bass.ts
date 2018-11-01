import { Note, Scale, instrument } from "note-lib";
import { Base16Theme } from "../colors";
import fretBoard from "./fretBoard";

interface Props {
  bass: instrument.Bass;
  keyNote: Note;
  scale: Scale;
  onTune: (stringID: string, newTuning: Note) => void;
  theme: Base16Theme;
}

export default function bass({ bass, keyNote, scale, onTune, theme }: Props) {
  return fretBoard({
    fretBoard: bass.fretBoard,
    scale,
    keyNote,
    showFretBar: true,
    onTune,
    theme
  });
}
