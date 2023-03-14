import React from "react";
import { Base16Theme } from "../colors/colors";
import LabeledSelector from "./LabeledSelector";
import { IFrettedInstrument } from "note-lib/src/IFrettedInstrument";
import { Tuning } from "note-lib/src/Tuning";

interface ICommonTuningSelectorProps {
  label: string | undefined;
  activeInstrument: IFrettedInstrument;
  activeTuning: Tuning;
  onCommonTuningSelect: (tuning: Tuning) => void;
  theme: Base16Theme;
}

export default function CommonTuningSelector(props: ICommonTuningSelectorProps) {
  return (
    <LabeledSelector<Tuning>
      items={props.activeInstrument.getCommonTunings()}
      label={props.label}
      getValue={(tuning: Tuning) => tuning.id}
      getDisplay={(tuning: Tuning) => tuning.id}
      activeItem={props.activeTuning}
      onChange={props.onCommonTuningSelect}
      theme={props.theme}
    />
  );
}
