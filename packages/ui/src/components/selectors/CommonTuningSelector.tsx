import React from "react";
import { Base16Theme } from "../../colors/themes";
import { LabeledSelector } from "./LabeledSelector";
import { Tuning } from "note-lib/src/Tuning";
import * as Constants from "note-lib/src/constants/Constants";
import { FrettedInstrument } from "note-lib/src/instruments/FrettedInstrument";

interface ICommonTuningSelectorProps {
  activeInstrument: FrettedInstrument;
  activeTuning: Tuning;
  label: string | undefined;
  minWidth?: string;
  onCommonTuningSelect: (tuning: Tuning) => void;
  shouldAutocomplete: boolean;
  theme: Base16Theme;
}

const CommonTuningSelector = (props: ICommonTuningSelectorProps) => {
  const {
    activeInstrument,
    activeTuning,
    label,
    minWidth,
    onCommonTuningSelect,
    shouldAutocomplete,
    theme,
  } = props;
  const getItems = (): Tuning[] => {
    const isActiveTuningCustom: boolean = activeTuning.id === Constants.CUSTOM;
    const commonTunings: Tuning[] = activeInstrument.getCommonTunings();
    return isActiveTuningCustom
      ? [...commonTunings, activeTuning]
      : commonTunings;
  };
  return (
    <LabeledSelector<Tuning>
      id="common-tuning-selector"
      items={getItems()}
      label={label}
      getValue={(tuning: Tuning) => tuning.id}
      getDisplay={(tuning: Tuning) => tuning.id}
      minWidth={minWidth}
      activeItem={activeTuning}
      onChange={onCommonTuningSelect}
      shouldAutocomplete={shouldAutocomplete}
      theme={theme}
    />
  );
};

export { CommonTuningSelector };
