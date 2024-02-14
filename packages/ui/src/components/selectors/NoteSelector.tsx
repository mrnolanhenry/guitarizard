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
  select_strat: SelectStrategy;
}

type SelectStrategy = "before_and_after" | "all_notes";

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
    select_strat,
  } = props;

  let noteItems: Note[] = [];

  switch (select_strat) {
    case "all_notes": {
      noteItems = temperament.notes.map((n) => n.clone());
      break;
    }
    case "before_and_after": {
      const previousNotes: Note[] = [];
      for (let i = 0; i < temperament.notes.length; i++) {
        previousNotes.push(temperament.getNextNote(note, -i));
      }
      previousNotes.reverse();

      const nextNotes: Note[] = [];
      for (let i = 1; i < temperament.notes.length; i++) {
        previousNotes.push(temperament.getNextNote(note, i));
      }

      noteItems = previousNotes.concat(nextNotes);
      break;
    }
  }

  return (
    <LabeledSelector<Note>
      id={`note-selector-${id}`}
      label={label}
      minWidth={minWidth}
      items={noteItems}
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
