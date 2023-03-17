import { Base16Theme } from "../../colors/themes";
import { Selector } from "./Selector";

export type ToolName = "scalebook" | "songbook";

interface IToolSelectorProps {
  activeToolName: ToolName;
  onToolSelect: (toolName: ToolName) => void;
  theme: Base16Theme;
}

const ToolSelector = (props: IToolSelectorProps) => {
  return (
    <Selector<ToolName>
      items={["scalebook"]}
      // TODO: Return to songbook
      // items={["scalebook", "songbook"]}
      activeItem={props.activeToolName}
      onChange={(v) => props.onToolSelect(v as ToolName)}
      theme={props.theme}
    />
  );
}

export { ToolSelector };