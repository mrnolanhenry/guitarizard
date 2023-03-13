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
    <div style={{ display: "flex" }}>
      <span style={{ paddingRight: ".25em" }}>{props.label}</span>

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
