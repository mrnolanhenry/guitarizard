import React from "react";
import { FilterOptionsState } from "@mui/material";
import { data, Scale } from "note-lib";
import { Base16Theme } from "../../colors/themes";
import { LabeledSelector } from "./LabeledSelector";

interface IScalesSelectorProps {
  activeScale: Scale;
  label: string;
  minWidth?: string;
  onScaleSelect: (scale: Scale) => void;
  shouldAutocomplete: boolean;
  theme: Base16Theme;
}

const ScaleSelector = (props: IScalesSelectorProps) => {
  const { activeScale, label, minWidth, onScaleSelect, shouldAutocomplete, theme } = props;

  const getSpecialFilterOptions = (
    options: Scale[],
    state: FilterOptionsState<Scale>,
  ): Scale[] => {
    const { inputValue } = state;
    if (!inputValue) {
      return options;
    } else {
      const trimVal = inputValue.trim().toLowerCase();
      // trimming each term, so it can handle inputs with lots of empty space e.g. "0,1, 2, 3, 5, , , 6, " or "A, B,C#,D, ,Eb"
      const inputValues = trimVal
        .split(",")
        .map((val) => val.trim())
        .filter((val) => !!val);

      const filterOptions = options.filter((option) => {
        return (
          isScaleNameMatch(option, trimVal) ||
          isIntervalMatch(option, inputValues)
        );
      });
      return filterOptions;
    }
  };

  const isScaleNameMatch = (scale: Scale, inputValue: string) =>
    scale.name.toLowerCase().includes(inputValue);

  const isIntervalMatch = (scale: Scale, inputValues: string[]) => {
    let allIntervalsMatch: boolean = true;

    inputValues.forEach((value) => {
      const intervalFound: boolean = !!scale.intervals.find(
        (interval) => interval.semitones.toString() === value.trim(),
      );
      if (!intervalFound) {
        allIntervalsMatch = false;
      }
    });

    return allIntervalsMatch;
  };

  return (
    <LabeledSelector<Scale>
      id="scale-selector"
      label={label}
      minWidth={minWidth}
      items={data.scales}
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
