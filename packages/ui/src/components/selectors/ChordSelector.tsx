import React from "react";
import { Chord } from "note-lib";
import { Base16Theme } from "../../colors/themes";
import { LabeledSelector } from "../common/selectors/LabeledSelector";

interface IChordSelectorProps {
  activeChord: Chord;
  id: string;
  items: Chord[];
  label: string;
  minWidth?: string;
  onChange: (chord: Chord) => void;
  shouldAutocomplete: boolean;
  theme: Base16Theme;
}

const ChordSelector = (props: IChordSelectorProps) => {
  const { activeChord, id, items, label, minWidth, shouldAutocomplete, onChange, theme } = props;

  return (
    <LabeledSelector<Chord>
      activeItem={activeChord}
      getValue={(k: Chord) => k.name}
      getDisplay={(k: Chord) => k.name}
      id={id}
      items={items}
      label={label}
      minWidth={minWidth}
      onChange={onChange}
      shouldAutocomplete={shouldAutocomplete}
      theme={theme}
    />
  );
};

export { ChordSelector };
