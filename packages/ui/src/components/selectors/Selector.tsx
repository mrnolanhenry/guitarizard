import React, { ReactNode, CSSProperties, useState } from "react";
import { isEqual } from "lodash";
import Autocomplete, {
  AutocompleteRenderInputParams,
  createFilterOptions,
} from "@mui/material/Autocomplete";
import { Base16Theme } from "../../colors/themes";
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  AutocompleteRenderOptionState,
  FilterOptionsState,
  TextField,
} from "@mui/material";

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
  getValue?: (item: T) => string; // given an item, what is the option value?
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getDisplay?: (item: T) => any; // given an item, what should we display?
  filterOptions?: (options: T[], state: FilterOptionsState<T>) => T[]; // special handling to filter options
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: T,
    state: AutocompleteRenderOptionState,
    ownerState: any,
  ) => ReactNode;
  theme: Base16Theme; // what theme should this component be?
}

const Selector = <T,>(props: ISelectorProps<T>) => {
  const {
    activeItem,
    filterOptions,
    getDisplay,
    id,
    items,
    label,
    minWidth,
    onChange,
    onInputChange,
    renderOption,
    theme,
  } = props;

  const [inputVal, setInputVal] = useState(
    !!activeItem && !!getDisplay ? getDisplay(activeItem as T) : "",
  );

  const fontSizeStyling = {
    fontSize: label ? "inherit" : "12px",
  };

  const classStyling = {
    "& .MuiButtonBase-root": {
      color: theme.base05,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.base05,
    },
  };

  const autoCompleteStyle: CSSProperties = {
    backgroundColor: theme.base00,
    color: theme.base05,
    borderWidth: "0",
    borderRadius: "4px",
    borderStyle: "solid",
    cursor: "pointer",
    minWidth: minWidth ?? "1em",
  };

  const inputLabelProps = {
    sx: {
      color: theme.base05,
    },
  };

  const customInputProps = {
    sx: {
      color: theme.base05,
      width: "1em",
      minWidth: "1em",
      ...fontSizeStyling,
    },
  };

  const listBoxProps = {
    sx: {
      backgroundColor: theme.base00,
      color: theme.base05,
      ...fontSizeStyling,
    },
  };

  const selectProps = {
    autoWidth: true,
    MenuProps: {
      sx: {
        // ...fontSizeStyling
      },
    },
    sx: {
      // ...fontSizeStyling
    },
  };

  const display = (item: T): string => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fn =
      typeof getDisplay === "undefined"
        ? (a: T) => String(a)
        : (getDisplay as (item: T) => any);
    return fn(item);
  };

  const onChangeValue = (
    e: React.SyntheticEvent,
    val: T,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _reason: AutocompleteChangeReason,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _details?: AutocompleteChangeDetails<T>,
  ) => {
    e.preventDefault();

    const item: T | undefined = items.find((item: T) => {
      return isEqual(item, val);
    });

    if (typeof item !== "undefined") {
      onChange(item as T);
    }
  };

  const onInputChangeValue = (
    e: React.SyntheticEvent,
    val: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _reason: AutocompleteInputChangeReason,
  ) => {
    setInputVal(val);
    if (onInputChange) {
      onInputChange(e, val);
    }
  };

  const defaultRenderOption = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: T,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _state: AutocompleteRenderOptionState,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ownerState: any,
  ): ReactNode => {
    return <li {...props}>{ownerState.getOptionLabel(option)}</li>;
  };

  const renderTextField = (params: AutocompleteRenderInputParams) => {
    const { inputProps, InputProps } = params;
    // Special case with Material UI's Autocomplete:
    // need to avoid replacing the inputProps and InputProps
    // that get passed from Autocomplete to TextField's params
    const allInputProps = {
      ...InputProps,
      inputProps: {
        ...inputProps,
        ...customInputProps,
      },
    };
    return (
      <TextField
        {...params}
        InputLabelProps={inputLabelProps}
        InputProps={allInputProps}
        label={label ?? ""}
        SelectProps={selectProps}
        size="small"
      />
    );
  };

  return (
    <Autocomplete
      // disablePortal
      clearOnBlur
      clearOnEscape
      // NOLAN TODO - Check on this undefined statement - don't like it, should be null
      defaultValue={activeItem ?? undefined}
      disableClearable
      filterOptions={
        filterOptions ??
        createFilterOptions({
          ignoreAccents: true,
          ignoreCase: true,
          trim: true,
        })
      }
      // fullWidth
      inputValue={inputVal}
      onChange={onChangeValue}
      onInputChange={onInputChangeValue}
      handleHomeEndKeys
      id={id}
      isOptionEqualToValue={(option, value) => isEqual(option, value)}
      ListboxProps={listBoxProps}
      options={items}
      getOptionLabel={(option) => display(option)}
      size="small"
      sx={{
        ...autoCompleteStyle,
        ...classStyling,
      }}
      renderInput={renderTextField}
      renderOption={renderOption ?? defaultRenderOption}
      value={activeItem as NonNullable<T>}
    />
  );
};

export { Selector };
