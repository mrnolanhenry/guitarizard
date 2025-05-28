import React from "react";
import { Chord } from "note-lib";
import { Base16Theme } from "../../colors/themes";
import { LabeledSelector } from "./LabeledSelector";

interface IEquivChordSelectorProps {
  activeChord: Chord;
  minWidth?: string;
  shouldAutocomplete: boolean;
  updateChord: (chord: Chord) => void;
  theme: Base16Theme;
}

const EquivChordSelector = (props: IEquivChordSelectorProps) => {
  const { activeChord, minWidth, shouldAutocomplete, updateChord, theme } = props;
  const equivChordItems = activeChord.getEquivChords();

  return (
    <LabeledSelector<Chord>
      id="equiv-chord-selector"
      label="Equivalent Chords:"
      minWidth={minWidth}
      items={equivChordItems}
      getValue={(k: Chord) => k.name}
      getDisplay={(k: Chord) => k.name}
      activeItem={activeChord}
      onChange={updateChord}
      shouldAutocomplete={shouldAutocomplete}
      theme={theme}
    />
  );
};

export { EquivChordSelector };
