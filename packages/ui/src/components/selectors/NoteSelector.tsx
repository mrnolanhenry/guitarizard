import React from "react";
import { Note, Temperament } from "note-lib";
import { Base16Theme } from "../../colors/themes";
import { LabeledSelector } from "./LabeledSelector";

interface INoteSelectorProps {
  id: string;
  containerClass?: string;
  label?: string;
  minWidth?: string;
  note: Note;
  onNoteSelect: (note: Note) => void;
  shouldAutocomplete: boolean;
  temperament: Temperament;
  theme: Base16Theme;
}

const NoteSelector = (props: INoteSelectorProps) => {
  const { id, containerClass, label, minWidth, note, onNoteSelect, shouldAutocomplete, temperament, theme } = props;
  return (
    <LabeledSelector<Note>
      id={`note-selector-${id}`}
      containerClass={containerClass}
      label={label}
      minWidth={minWidth}
      items={temperament.getNotesInTemperament()}
      getValue={(note: Note) => note.id}
      getDisplay={(note: Note) => note.id}
      activeItem={note}
      onChange={onNoteSelect}
      shouldAutocomplete={shouldAutocomplete}
      theme={theme}
    />
  );
};

export { NoteSelector };
