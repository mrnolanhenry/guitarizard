import React, { Component } from 'react';
import { Base16Theme } from "../lib/colors";

interface Props<T> {
  items: Array<T>; // list of items for the select
  activeItem?: T; // what is the active item?
  onChange: (value: string) => void; // callback for user changes
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
    const activeValue = e.target.value;
    this.props.onChange(activeValue);
    this.setState({ activeValue });
  }

  render() {
    const {
      theme, getValue, getDisplay, activeItem
    } = this.props;

    const style = {
      backgroundColor: theme.base00,
      color: theme.base05,
      borderWidth: '0 0 1px 0',
      borderStyle: 'solid',
      borderColor: theme.base0D,
      cursor: 'pointer',
      padding: '0.2em',
      height: '2em'
    };

    const valueFn = typeof getValue === "undefined" ?
                  (a: T) => String(a) : getValue;

    const displayFn = typeof getDisplay === "undefined" ?
                      (a: T) => String(a) : getDisplay;

    const options = this.props.items.map((item: T) => {
      const value = valueFn(item);
      const display = displayFn(item);
      return <option key={value} value={value}>{display}</option>;
    });

    const selectedValue = activeItem ? valueFn(activeItem) : undefined;

    return <select value={selectedValue} onChange={this.onChange} style={style}>
      {options}
    </select>;
  }
}
