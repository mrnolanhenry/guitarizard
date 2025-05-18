import React, { ReactNode, CSSProperties, useState } from "react";
import { isEqual } from "lodash";
import { Base16Theme } from "../../colors/themes";
import {
  AutocompleteRenderOptionState,
  FilterOptionsState,
  InputLabelProps,
} from "@mui/material";
import { render } from "react-dom";
import { AutocompleteSelector } from "./AutocompleteSelector";
import { BasicSelector } from "./BasicSelector";

// Example styling
// https://stackoverflow.com/questions/58984406/setting-text-color-outline-and-padding-on-material-ui-autocomplete-component

interface ISelectorProps<T> {
  id: string;
  items: T[]; // list of items for the select
  activeItem?: T; // what is the active item?
  label?: string;
  minWidth?: string;
  onChange: (item: T) => void; // callback for user changes
  onInputChange?: (event: React.SyntheticEvent, value: string) => void; // callback for user input changes
  getValue?: (item: T) => string; // given an item, what is the option value? // NOLAN TODO: Remove if this remains unused
  getDisplay?: (item: T) => string; // given an item, what should we display?
  filterOptions?: (options: T[], state: FilterOptionsState<T>) => T[]; // special handling to filter options
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: T,
    state: AutocompleteRenderOptionState,
    ownerState: unknown,
  ) => ReactNode;
  shouldAutocomplete: boolean;
  size?: string; // "small" will set styling to smaller sizes
  theme: Base16Theme; // what theme should this component be?
}

const Selector = <T,>(props: ISelectorProps<T>) => {
  const {
    activeItem,
    filterOptions,
    getDisplay,
    getValue,
    id,
    items,
    label,
    minWidth,
    onChange,
    onInputChange,
    renderOption,
    shouldAutocomplete,
    size,
    theme,
  } = props;

  const [inputVal, setInputVal] = useState(
    !!activeItem && !!getDisplay ? getDisplay(activeItem as T) : "",
  );

  // Rather annoying workaround due to issue with Material UI rendering Select before all options (derived from items var) are ready 
  // and then comparing reference equality to activeItem.
  // This forces Select to not be rendered until all options/items are ready
  const defaultSelectValue: T | undefined = items.find((item: T) => {
    return isEqual(item, activeItem);
  });

  const fontSizeStyling: CSSProperties = {
    // fontSize: label ? "inherit" : "12px",
    fontSize: size === "small" ? "12px" : "inherit",
  };

  const classStyling = {
    "& .MuiButtonBase-root": {
      color: theme.swatch.base05,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.swatch.base05,
    },
    "& .MuiSelect-icon" : {
      color: theme.swatch.base05,
    }
  };

  const selectorStyle: CSSProperties = {
    backgroundColor: theme.swatch.base00,
    color: theme.swatch.base05,
    borderWidth: "0",
    borderRadius: "4px",
    borderStyle: "solid",
    cursor: "pointer",
    minWidth: minWidth ?? "1em",
  };

  const inputLabelProps: Partial<InputLabelProps> = {
    sx: {
      color: theme.swatch.base05,
    },
  };

  const display = (item: T): string => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fn =
      typeof getDisplay === "undefined"
        ? (a: T) => String(a)
        : (getDisplay as (item: T) => string);
    return fn(item);
  };

  const renderAutocomplete = () => {
    return (
      <AutocompleteSelector<T>
        id={id}
        items={items}
        filterOptions={filterOptions}
        fontSizeStyling={fontSizeStyling}
        getValue={getValue}
        getDisplay={display}
        inputLabelProps={inputLabelProps}
        label={label}
        minWidth={minWidth}
        activeItem={activeItem}
        onChange={onChange}
        onInputChange={onInputChange}
        renderOption={renderOption}
        style={selectorStyle}
        size={size}
        theme={theme}
      />
    );
  }

  const renderSelect = () => {
    return (
        <BasicSelector<T>
          id={id}
          items={items}
          filterOptions={filterOptions}
          fontSizeStyling={fontSizeStyling}
          getValue={getValue}
          getDisplay={display}
          inputLabelProps={inputLabelProps}
          label={label}
          minWidth={minWidth}
          activeItem={activeItem}
          onChange={onChange}
          onInputChange={onInputChange}
          renderOption={renderOption}
          size={size}
          style={selectorStyle}
          theme={theme}
        />
    )
  };

  return shouldAutocomplete ? renderAutocomplete() : renderSelect();
};

export { Selector };
