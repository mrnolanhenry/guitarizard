import React, { Component } from "react";
import { Base16Theme } from "../colors/colors";

interface Props<T> {
  items: Array<T>; // list of items for the select
  activeItem?: T; // what is the active item?
  onChange: (item: T) => void; // callback for user changes
  getValue?: (item: T) => string; // given an item, what is the option value?
  getDisplay?: (item: T) => any; // given an item, what should we display?
  theme: Base16Theme; // what theme should this component be?
}

export default class Selector<T> extends Component<Props<T>> {
  constructor(props: Props<T>) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();

    const key: string = e.target.value;

    const item: T | undefined = this.props.items.find(
      (item: T) => this.value(item) === key
    );

    if (typeof item !== "undefined") {
      this.props.onChange(item as T);
    }
  }

  value(item: T) {
    const fn =
      typeof this.props.getValue === "undefined"
        ? (a: T) => String(a)
        : this.props.getValue;

    return fn(item);
  }

  display(item: T) {
    const fn =
      typeof this.props.getDisplay === "undefined"
        ? (a: T) => String(a)
        : this.props.getDisplay;

    return fn(item);
  }

  render() {
    const { theme, activeItem } = this.props;

    const style = {
      backgroundColor: theme.base00,
      color: theme.base05,
      borderWidth: "0 0 1px 0",
      borderStyle: "solid",
      borderColor: theme.base0D,
      cursor: "pointer",
      padding: "0.2em",
      height: "2em",
      width: "100%",
      minWidth: "3.5em",
    };

    const options = this.props.items.map((item: T) => {
      const value = this.value(item);
      const display = this.display(item);
      return (
        <option key={value} value={value}>
          {display}
        </option>
      );
    });

    const selectedValue = activeItem ? this.value(activeItem) : undefined;

    return (
      <select value={selectedValue} onChange={this.onChange} style={style}>
        {options}
      </select>
    );
  }
}
