import React from "react";
import { FilterOptionsState } from "@mui/material";
import { ChordType } from "note-lib";
import { Base16Theme } from "../../colors/themes";
import { LabeledSelector } from "../common/selectors/LabeledSelector";

interface IChordTypesSelectorProps {
  activeChordType: ChordType;
  items: ChordType[];
  label: string;
  minWidth?: string;
  onChordTypeSelect: (chordType: ChordType) => void;
  shouldAutocomplete: boolean;
  theme: Base16Theme;
}

const ChordTypeSelector = (props: IChordTypesSelectorProps) => {
  const { activeChordType, items, label, minWidth, onChordTypeSelect, shouldAutocomplete, theme } = props;

  const getSpecialFilterOptions = (
    options: ChordType[],
    state: FilterOptionsState<ChordType>,
  ): ChordType[] => {
    const { inputValue } = state;
    if (!inputValue) {
      return options;
    } else {
      const trimVal = inputValue.trim().toLocaleLowerCase();
      return options.filter((option) => isNameMatch(option, trimVal));
    }
  };

  const isNameMatch = (chordType: ChordType, inputValue: string) =>
    chordType.shortHand.toLocaleLowerCase().includes(inputValue);

  return (
    <LabeledSelector<ChordType>
      id="chordtype-selector"
      label={label}
      minWidth={minWidth}
      items={items}
      filterOptions={getSpecialFilterOptions}
      getValue={(s: ChordType) => s.shortHand}
      getDisplay={(s: ChordType) => s.shortHand}
      activeItem={activeChordType}
      onChange={onChordTypeSelect}
      shouldAutocomplete={shouldAutocomplete}
      theme={theme}
    />
  );
};

export { ChordTypeSelector };
