import React from "react";
import { Note, Temperament } from "note-lib";
import { Base16Theme } from "../colors/colors";
import LabeledSelector from "./LabeledSelector";

interface INoteSelectorProps {
  label?: string;
  temperament: Temperament;
  note: Note;
  onNoteSelect: (note: Note) => void;
  theme: Base16Theme;
}

export default function noteSelector(props: INoteSelectorProps) {
  return (
    <LabeledSelector<Note>
      label={props.label}
      items={props.temperament.getKeyNotes()}
      getValue={(note: Note) => note.id}
      getDisplay={(note: Note) => note.id}
      activeItem={props.note}
      onChange={props.onNoteSelect}
      theme={props.theme}
    />
  );
}
