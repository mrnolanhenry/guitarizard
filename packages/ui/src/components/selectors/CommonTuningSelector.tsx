import { Base16Theme } from "../../colors/themes";
import { LabeledSelector } from "./LabeledSelector";
import { Tuning } from "note-lib/src/Tuning";
import { Constants } from "note-lib";
import { FrettedInstrument } from "note-lib/src/instruments/FrettedInstrument";

interface ICommonTuningSelectorProps {
  activeInstrument: FrettedInstrument;
  activeTuning: Tuning;
  label: string | undefined;
  onCommonTuningSelect: (tuning: Tuning) => void;
  theme: Base16Theme;
}

const CommonTuningSelector = (props: ICommonTuningSelectorProps) => {
  const { 
    activeInstrument,
    activeTuning,
    label,
    onCommonTuningSelect,
    theme
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
      items={getItems()}
      label={label}
      getValue={(tuning: Tuning) => tuning.id}
      getDisplay={(tuning: Tuning) => tuning.id}
      activeItem={activeTuning}
      onChange={onCommonTuningSelect}
      theme={theme}
    />
  );
}

export { CommonTuningSelector };
