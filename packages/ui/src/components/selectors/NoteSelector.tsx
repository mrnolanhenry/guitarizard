import { Note, Temperament } from "note-lib";
import { Base16Theme } from "../../colors/themes";
import { LabeledSelector } from "./LabeledSelector";

interface INoteSelectorProps {
  label?: string;
  note: Note;
  onNoteSelect: (note: Note) => void;
  temperament: Temperament;
  theme: Base16Theme;
}

const NoteSelector = (props: INoteSelectorProps) => {
  const {
    label,
    note,
    onNoteSelect,
    temperament,
    theme,
  } = props;
  return (
    <LabeledSelector<Note>
      label={label}
      items={temperament.getKeyNotes()}
      getValue={(note: Note) => note.id}
      getDisplay={(note: Note) => note.id}
      activeItem={note}
      onChange={onNoteSelect}
      theme={theme}
    />
  );
}

export { NoteSelector };
