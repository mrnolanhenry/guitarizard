import React from "react";
import { FilterOptionsState } from "@mui/material";
import { Scale } from "note-lib";
import { Base16Theme } from "../../colors/themes";
import { LabeledSelector } from "../common/selectors/LabeledSelector";

interface IScalesSelectorProps {
  activeScale: Scale;
  items: Scale[];
  label: string;
  minWidth?: string;
  onScaleSelect: (scale: Scale) => void;
  shouldAutocomplete: boolean;
  theme: Base16Theme;
}

const ScaleSelector = (props: IScalesSelectorProps) => {
  const { activeScale, items, label, minWidth, onScaleSelect, shouldAutocomplete, theme } = props;

  const getSpecialFilterOptions = (
    options: Scale[],
    state: FilterOptionsState<Scale>,
  ): Scale[] => {
    const { inputValue } = state;
    if (!inputValue) {
      return options;
    } else {
      const trimVal = inputValue.trim().toLocaleLowerCase();
      return options.filter((option) => isNameMatch(option, trimVal));
    }
  };

  const isNameMatch = (scale: Scale, inputValue: string) =>
    scale.name.toLocaleLowerCase().includes(inputValue);

  return (
    <LabeledSelector<Scale>
      id="scale-selector"
      label={label}
      minWidth={minWidth}
      items={items}
      filterOptions={getSpecialFilterOptions}
      getValue={(s: Scale) => s.name}
      getDisplay={(s: Scale) => s.name}
      activeItem={activeScale}
      onChange={onScaleSelect}
      shouldAutocomplete={shouldAutocomplete}
      theme={theme}
    />
  );
};

export { ScaleSelector };
