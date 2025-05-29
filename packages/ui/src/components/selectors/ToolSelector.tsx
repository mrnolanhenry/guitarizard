import React from "react";
import { Base16Theme } from "../../colors/themes";
import { Selector } from "../common/selectors/Selector";
import { Tool } from "../../enums/Tool";

interface IToolSelectorProps {
  activeToolName: Tool;
  minWidth?: string;
  onToolSelect: (toolName: Tool) => void;
  size?: string; // "small" will set styling to smaller sizes
  theme: Base16Theme;
  tools: Tool[];
}

const ToolSelector = (props: IToolSelectorProps) => {
  const { activeToolName, minWidth, onToolSelect, size, theme, tools } = props;
  return (
    <Selector<Tool>
      id="tool-selector"
      items={tools}
      minWidth={minWidth}
      activeItem={activeToolName}
      onChange={(v: Tool) => onToolSelect(v)}
      shouldAutocomplete= {false}
      size={size}
      theme={theme}
    />
  );
};

export { ToolSelector };
