import { Base16Theme } from "../../colors/themes";
import { Selector } from "./Selector";

export type ToolName = "scalebook" | "songbook";

interface IToolSelectorProps {
  activeToolName: ToolName;
  minWidth?: string;
  onToolSelect: (toolName: ToolName) => void;
  theme: Base16Theme;
}

const ToolSelector = (props: IToolSelectorProps) => {
  const {
    activeToolName,
    minWidth,
    onToolSelect,
    theme,
  } = props;
  return (
    <Selector<ToolName>
      id="tool-selector"
      items={["scalebook"]}
      // TODO: Return to songbook
      // items={["scalebook", "songbook"]}
      minWidth={minWidth}
      activeItem={activeToolName}
      onChange={(v: ToolName) => onToolSelect(v)}
      theme={theme}
    />
  );
}

export { ToolSelector };
