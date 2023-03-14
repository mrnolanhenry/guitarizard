import React from "react";
import { Base16Theme } from "../colors/colors";
import Selector from "./Selector";

export type ToolName = "scalebook" | "songbook";

interface Props {
  activeToolName: ToolName;
  onToolSelect: (toolName: ToolName) => void;
  theme: Base16Theme;
}

export default function ToolSelector(props: Props) {
  return (
    <Selector<ToolName>
      items={["scalebook", "songbook"]}
      activeItem={props.activeToolName}
      onChange={(v) => props.onToolSelect(v as ToolName)}
      theme={props.theme}
    />
  );
}
