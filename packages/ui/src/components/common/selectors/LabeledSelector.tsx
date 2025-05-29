import { Selector } from "./Selector";
import { Base16Theme } from "../../../colors/themes";
import {
  AutocompleteRenderOptionState,
  FilterOptionsState,
} from "@mui/material";
import React, { ReactNode } from "react";

interface ILabeledSelectorProps<T> {
  activeItem?: T;
  containerClass?: string;
  filterOptions?: (options: T[], state: FilterOptionsState<T>) => T[]; // special handling to filter options
  freeSolo?: boolean;
  getValue?: (item: T) => string;
  getDisplay?: (item: T) => string;
  id: string;
  items: T[];
  label?: string;
  minWidth?: string;
  onChange: (item: T) => void; // callback for user changes
  onInputChange?: (event: React.SyntheticEvent, value: string) => void; // callback for user input changes
  placeholder?: string;
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: T,
    state: AutocompleteRenderOptionState,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ownerState: any,
  ) => ReactNode;
  shouldAutocomplete: boolean;
  showSearchIcon?: boolean;
  size?: string; // "small" will set styling to smaller sizes
  theme: Base16Theme;
}

const LabeledSelector = <T,>(props: ILabeledSelectorProps<T>) => {
  const {
    activeItem,
    containerClass,
    filterOptions,
    freeSolo,
    getDisplay,
    getValue,
    id,
    items,
    label,
    minWidth,
    onChange,
    onInputChange,
    placeholder,
    renderOption,
    shouldAutocomplete,
    showSearchIcon,
    size,
    theme,
  } = props;
  return (
    <div
      className={containerClass ?? ""}
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Selector<T>
        id={id}
        items={items}
        filterOptions={filterOptions}
        freeSolo={freeSolo}
        getValue={getValue}
        getDisplay={getDisplay}
        label={label}
        minWidth={minWidth}
        activeItem={activeItem}
        onChange={onChange}
        onInputChange={onInputChange}
        placeholder={placeholder}
        renderOption={renderOption}
        shouldAutocomplete={shouldAutocomplete}
        showSearchIcon={showSearchIcon}
        size={size}
        theme={theme}
      />
    </div>
  );
};

export { LabeledSelector };
