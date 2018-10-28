import { Note, ScaleSystem } from "note-lib";
import { Base16Theme } from "../colors";
import labeledSelector from "./labeledSelector";

export type ToolName = "chordbook" | "songbook";

interface Props {
  scaleSystem: ScaleSystem;
  keyNote: Note;
  onKeySelect: (note: Note) => void;
  theme: Base16Theme;
}

export default function keySelector({
  scaleSystem,
  keyNote,
  onKeySelect,
  theme
}: Props) {
  return labeledSelector<Note>({
    label: "Key: ",
    items: scaleSystem.getKeyNotes(),
    getKey: (note: Note) => note.id,
    getValue: (note: Note) => note.id,
    activeItem: keyNote,
    onChange: onKeySelect,
    theme
  });
}
