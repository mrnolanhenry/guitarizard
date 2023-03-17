import { Base16Theme } from "../../colors/themes";
import { LabeledSelector } from "./LabeledSelector";
import { IFrettedInstrument } from "note-lib/src/IFrettedInstrument";
import { Tuning } from "note-lib/src/Tuning";
import { Constants } from "note-lib";

interface ICommonTuningSelectorProps {
  label: string | undefined;
  activeInstrument: IFrettedInstrument;
  activeTuning: Tuning;
  onCommonTuningSelect: (tuning: Tuning) => void;
  theme: Base16Theme;
}

const CommonTuningSelector = (props: ICommonTuningSelectorProps) => {
  const getItems = (): Tuning[] => {
    const isActiveTuningCustom = props.activeTuning.id === Constants.CUSTOM;
    const commonTunings = props.activeInstrument.getCommonTunings();
    return isActiveTuningCustom
      ? [...commonTunings, props.activeTuning]
      : commonTunings;
  };
  return (
    <LabeledSelector<Tuning>
      items={getItems()}
      label={props.label}
      getValue={(tuning: Tuning) => tuning.id}
      getDisplay={(tuning: Tuning) => tuning.id}
      activeItem={props.activeTuning}
      onChange={props.onCommonTuningSelect}
      theme={props.theme}
    />
  );
}

export { CommonTuningSelector };
