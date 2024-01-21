import React from "react";
import { Base16Theme } from "../../colors/themes";
import { Selector } from "./Selector";

export type ToolName = "scalebook" | "songbook";

interface IToolSelectorProps {
  activeToolName: ToolName;
  minWidth?: string;
  onToolSelect: (toolName: ToolName) => void;
  size?: string // "small" will set styling to smaller sizes
  theme: Base16Theme;
}

const ToolSelector = (props: IToolSelectorProps) => {
  const { activeToolName, minWidth, onToolSelect, size, theme } = props;
  return (
    <Selector<ToolName>
      id="tool-selector"
      items={["scalebook"]}
      // NOLAN TODO: Return to songbook
      // items={["scalebook", "songbook"]}
      minWidth={minWidth}
      activeItem={activeToolName}
      onChange={(v: ToolName) => onToolSelect(v)}
      size={size}
      theme={theme}
    />
  );
};

export { ToolSelector };
