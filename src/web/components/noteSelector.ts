import { Note, ScaleSystem } from "note-lib";
import { Base16Theme } from "../colors";
import labeledSelector from "./labeledSelector";

export type ToolName = "chordbook" | "songbook";

interface Props {
  label?: string;
  scaleSystem: ScaleSystem;
  note: Note;
  onNoteSelect: (note: Note) => void;
  theme: Base16Theme;
}

export default function noteSelector({
  label,
  scaleSystem,
  note,
  onNoteSelect,
  theme
}: Props) {
  return labeledSelector<Note>({
    label,
    items: scaleSystem.getKeyNotes(),
    getKey: (note: Note) => note.id,
    getValue: (note: Note) => note.id,
    activeItem: note,
    onChange: onNoteSelect,
    theme
  });
}
