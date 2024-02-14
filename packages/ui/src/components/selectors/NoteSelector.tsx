import React from "react";
import { Note, Temperament } from "note-lib";
import { Base16Theme } from "../../colors/themes";
import { LabeledSelector } from "./LabeledSelector";

interface INoteSelectorProps {
  id: string;
  label?: string;
  minWidth?: string;
  note: Note;
  onNoteSelect: (note: Note) => void;
  temperament: Temperament;
  theme: Base16Theme;
  octaveUIEnabled: boolean;
}

const NoteSelector = (props: INoteSelectorProps) => {
  const {
    id,
    label,
    minWidth,
    note,
    onNoteSelect,
    temperament,
    theme,
    octaveUIEnabled,
  } = props;

  const previousNotes: Note[] = [];
  for (let i = 0; i < temperament.notes.length; i++) {
    previousNotes.push(temperament.getNextNote(note, -i));
  }
  previousNotes.reverse();

  const nextNotes: Note[] = [];
  for (let i = 1; i < temperament.notes.length; i++) {
    previousNotes.push(temperament.getNextNote(note, i));
  }

  return (
    <LabeledSelector<Note>
      id={`note-selector-${id}`}
      label={label}
      minWidth={minWidth}
      items={previousNotes.concat(nextNotes)}
      getValue={(note: Note) => note.id}
      getDisplay={(note: Note) =>
        `${note.id}${octaveUIEnabled ? note.octave : ""}`
      }
      activeItem={note}
      onChange={onNoteSelect}
      theme={theme}
    />
  );
};

export { NoteSelector };
