import { Base16Theme } from "../../colors/themes";
import { Selector } from "./Selector";

export type ToolName = "scalebook" | "songbook";

interface IToolSelectorProps {
  activeToolName: ToolName;
  onToolSelect: (toolName: ToolName) => void;
  theme: Base16Theme;
}

const ToolSelector = (props: IToolSelectorProps) => {
  const {
    activeToolName,
    onToolSelect,
    theme,
  } = props;
  return (
    <Selector<ToolName>
      items={["scalebook"]}
      // TODO: Return to songbook
      // items={["scalebook", "songbook"]}
      activeItem={activeToolName}
      onChange={(v) => onToolSelect(v as ToolName)}
      theme={theme}
    />
  );
}

export { ToolSelector };
