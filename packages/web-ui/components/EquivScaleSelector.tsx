import { data, Scale } from "guitarizard-note-lib";
import { Base16Theme } from "../lib/colors";
import LabeledSelector from "./LabeledSelector";

interface Props {
  activeScale: Scale;
  onScaleSelect: (scale: Scale) => void;
  theme: Base16Theme;
}

export default function equivScalesSelector(props: Props) {
  return (
    <LabeledSelector<Scale>
      label="Equivalent Scales: "
      items={props.activeScale.getEquivScales(data.scales)}
      getValue={(s: Scale) => s.name}
      getDisplay={(s: Scale) => s.name}
      activeItem={props.activeScale}
      onChange={props.onScaleSelect}
      theme={props.theme}
    />
  );
}
