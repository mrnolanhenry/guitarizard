import { Base16Theme } from "../lib/colors";
import Selector from "./Selector";

export type ToolName = "chordbook" | "songbook";

interface Props {
  activeToolName: ToolName;
  onToolSelect: (toolName: ToolName) => void;
  theme: Base16Theme;
}

export default function(props: Props) {
  return <Selector<ToolName>
    items={[ "chordbook", "songbook" ]}
    activeItem={props.activeToolName}
    onChange={(v) => props.onToolSelect(v as ToolName)}
    theme={props.theme} />;
}
