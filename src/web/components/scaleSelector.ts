import { data, Scale } from "note-lib";
import { Base16Theme } from "../colors";
import labeledSelector from "./labeledSelector";

interface Props {
  activeScale: Scale;
  onScaleSelect: (scale: Scale) => void;
  theme: Base16Theme;
}

export default function scalesSelector({
  activeScale,
  onScaleSelect,
  theme
}: Props) {
  return labeledSelector<Scale>({
    label: "Scale:",
    items: data.scales,
    getKey: (s: Scale) => s.name,
    getValue: (s: Scale) => s.name,
    activeItem: activeScale,
    onChange: onScaleSelect,
    theme
  });
}
