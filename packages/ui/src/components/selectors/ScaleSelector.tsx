import { data, Scale } from "note-lib";
import { Base16Theme } from "../../colors/themes";
import { LabeledSelector } from "./LabeledSelector";

interface IScalesSelectorProps {
  activeScale: Scale;
  onScaleSelect: (scale: Scale) => void;
  theme: Base16Theme;
}

const ScaleSelector = (props: IScalesSelectorProps) => {
  return (
    <LabeledSelector<Scale>
      label="Scale:"
      items={data.scales}
      getValue={(s: Scale) => s.name}
      getDisplay={(s: Scale) => s.name}
      activeItem={props.activeScale}
      onChange={props.onScaleSelect}
      theme={props.theme}
    />
  );
}

export { ScaleSelector };
