import React from "react";
import { Note, Temperament } from "note-lib";
import { Base16Theme } from "../../colors/themes";
import { LabeledSelector } from "./LabeledSelector";

interface INoteSelectorProps {
  id: string;
  items: Note[];
  containerClass?: string;
  label?: string;
  minWidth?: string;
  note: Note;
  onNoteSelect: (note: Note) => void;
  shouldAutocomplete: boolean;
  theme: Base16Theme;
}

const NoteSelector = (props: INoteSelectorProps) => {
  const { id, items, containerClass, label, minWidth, note, onNoteSelect, shouldAutocomplete, theme } = props;
  return (
    <LabeledSelector<Note>
      id={`note-selector-${id}`}
      containerClass={containerClass}
      label={label}
      minWidth={minWidth}
      items={items}
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
