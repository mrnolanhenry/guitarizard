import { Note, Scale, instrument } from "note-lib";
import { Base16Theme } from "../colors";
import fretBoard from "./fretBoard";

interface Props {
  banjo: instrument.Banjo;
  keyNote: Note;
  scale: Scale;
  onTune: (stringID: string, newTuning: Note) => void;
  theme: Base16Theme;
}

export default function banjo({ banjo, keyNote, scale, onTune, theme }: Props) {
  return fretBoard({
    fretBoard: banjo.fretBoard,
    scale,
    keyNote,
    showFretBar: true,
    onTune,
    theme
  });
}
