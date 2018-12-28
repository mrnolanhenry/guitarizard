import { Note, Scale, instrument } from "note-lib";
import { Base16Theme } from "../colors";
import fretBoard from "./fretBoard";

interface Props {
  ukulele: instrument.Ukulele;
  keyNote: Note;
  scale: Scale;
  onTune: (stringID: string, newTuning: Note) => void;
  theme: Base16Theme;
}

export default function ukulele({
  ukulele,
  keyNote,
  scale,
  onTune,
  theme
}: Props) {
  return fretBoard({
    fretBoard: ukulele.fretBoard,
    scale,
    keyNote,
    showFretBar: true,
    onTune,
    theme
  });
}
