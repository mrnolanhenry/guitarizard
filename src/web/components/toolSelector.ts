import { Base16Theme } from "../colors";
import selector from "./selector";

export type ToolName = "chordbook" | "songbook";

interface Props {
  activeToolName: ToolName;
  onToolSelect: (toolName: ToolName) => void;
  theme: Base16Theme;
}

export default function toolSelector({
  activeToolName,
  onToolSelect,
  theme
}: Props) {
  return selector<ToolName>({
    items: ["chordbook", "songbook"],
    activeItem: activeToolName,
    onChange: onToolSelect,
    theme
  });
}
