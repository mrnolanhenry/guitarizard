import { Note, Scale, instrument } from "note-lib";
import { Base16Theme } from "../colors";
import fretBoard from "./fretBoard";

interface Props {
  guitar: instrument.Guitar;
  keyNote: Note;
  scale: Scale;
  onTune: (stringID: string, newTuning: Note) => void;
  theme: Base16Theme;
}

export default function guitar({
  guitar,
  keyNote,
  scale,
  onTune,
  theme
}: Props) {
  return fretBoard({
    fretBoard: guitar.fretBoard,
    scale,
    keyNote,
    showFretBar: true,
    onTune,
    theme
  });
}
