import React from "react";
import Selector from "./Selector";
import { Base16Theme } from "../colors/colors";

interface ILabeledSelectorProps<T> {
  label?: string;
  items: Array<T>;
  activeItem: T;
  onChange: (item: T) => void;
  getValue?: (item: T) => string;
  getDisplay?: (item: T) => string;
  theme: Base16Theme;
}

export default function labeledSelector<T>(props: ILabeledSelectorProps<T>) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start"  }}>
      {/* <span style={{ paddingRight: ".25em" }}>{props.label}</span> */}
      <div className="selector-label" style={{ paddingBottom: ".25em" }}>{props.label}</div>
      <Selector<T>
        items={props.items}
        getValue={props.getValue}
        getDisplay={props.getDisplay}
        activeItem={props.activeItem}
        onChange={props.onChange}
        theme={props.theme}
      />
    </div>
  );
}
