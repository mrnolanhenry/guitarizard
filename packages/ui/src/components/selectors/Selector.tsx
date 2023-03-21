import React from "react";
import { CSSProperties } from "react";
import { Base16Theme } from "../../colors/themes";

interface ISelectorProps<T> {
  items: Array<T>; // list of items for the select
  activeItem?: T; // what is the active item?
  onChange: (item: T) => void; // callback for user changes
  getValue?: (item: T) => string; // given an item, what is the option value?
  getDisplay?: (item: T) => any; // given an item, what should we display?
  theme: Base16Theme; // what theme should this component be?
}

const Selector =<T,> (props: ISelectorProps<T>) => {
    const { 
      activeItem,
      getDisplay,
      getValue,
      items,
      onChange,
      theme,
     } = props;

    const style: CSSProperties = {
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
    
    const value = (item: T) => {
      const fn =
        typeof getValue === "undefined"
          ? (a: T) => String(a)
          : getValue;

      return fn(item);
    }

    const display = (item: T) => {
      const fn =
        typeof getDisplay === "undefined"
          ? (a: T) => String(a)
          : getDisplay;

      return fn(item);
    }

    const onChangeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
      e.preventDefault();

      const key: string = e.target.value;

      const item: T | undefined = items.find(
        (item: T) => value(item) === key
      );

      if (typeof item !== "undefined") {
        onChange(item as T);
      }
    }

    const options = items.map((item: T) => {
      const value1 = value(item);
      const display1 = display(item);
      return (
        <option key={value1} value={value1}>
          {display1}
        </option>
      );
    });

    const selectedValue = activeItem ? value(activeItem) : undefined;

    return (
      <select value={selectedValue} onChange={onChangeValue} style={style}>
        {options}
      </select>
    );
 };

 export { Selector };
 