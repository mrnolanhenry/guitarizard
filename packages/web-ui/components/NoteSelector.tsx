import { Note, ScaleSystem } from "guitarizard-note-lib";
import { Base16Theme } from "../lib/colors";
import LabeledSelector from "./LabeledSelector";

interface Props {
  label?: string;
  scaleSystem: ScaleSystem;
  note: Note;
  onNoteSelect: (note: Note) => void;
  theme: Base16Theme;
}

export default function noteSelector(props: Props) {
  return (
    <LabeledSelector<Note>
      label={props.label}
      items={props.scaleSystem.getKeyNotes()}
      getValue={(note: Note) => note.id}
      getDisplay={(note: Note) => note.id}
      activeItem={props.note}
      onChange={props.onNoteSelect}
      theme={props.theme}
    />
  );
}
