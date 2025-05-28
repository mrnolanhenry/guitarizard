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
  InputLabelProps,
  TextField,
} from "@mui/material";
import { render } from "react-dom";

// Example styling
// https://stackoverflow.com/questions/58984406/setting-text-color-outline-and-padding-on-material-ui-autocomplete-component

interface IAutocompleteSelectorProps<T> {
  id: string;
  items: T[]; // list of items for the select
  activeItem?: T; // what is the active item?
  fontSizeStyling: CSSProperties;
  inputLabelProps: Partial<InputLabelProps>
  label?: string;
  minWidth?: string;
  onChange: (item: T) => void; // callback for user changes
  onInputChange?: (event: React.SyntheticEvent, value: string) => void; // callback for user input changes
  getValue?: (item: T) => string; // given an item, what is the option value? // NOLAN TODO: Remove if this remains unused
  getDisplay: (item: T) => string; // given an item, what should we display?
  filterOptions?: (options: T[], state: FilterOptionsState<T>) => T[]; // special handling to filter options
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: T,
    state: AutocompleteRenderOptionState,
    ownerState: unknown,
  ) => ReactNode;
  style: CSSProperties;
  size?: string; // "small" will set styling to smaller sizes
  theme: Base16Theme; // what theme should this component be?
}

const AutocompleteSelector = <T,>(props: IAutocompleteSelectorProps<T>) => {
  const {
    activeItem,
    filterOptions,
    fontSizeStyling,
    getDisplay,
    id,
    inputLabelProps,
    items,
    label,
    minWidth,
    onChange,
    onInputChange,
    renderOption,
    size,
    style,
    theme,
  } = props;

  const [inputVal, setInputVal] = useState(
    !!activeItem && !!getDisplay ? getDisplay(activeItem as T) : "",
  );

  const classStyling = {
    "& .MuiButtonBase-root": {
      color: theme.swatch.base05,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.swatch.base05,
    },
  };

  const customInputProps = {
    sx: {
      color: theme.swatch.base05,
      width: "1em",
      minWidth: "1em",
      ...fontSizeStyling,
    },
  };

  const menuItemProps = {
    sx: {
      "&.menu-item-selected": {
        backgroundColor: theme.swatch.base01,
      },
      "&:hover": {
        backgroundColor: theme.swatch.base05,
        color: theme.swatch.base00,
      },
      backgroundColor: theme.swatch.base00,
      color: theme.swatch.base05,
      ...fontSizeStyling,
    },
  };

  const listBoxProps = {
    sx: {
      "& .MuiAutocomplete-option.Mui-selected": {
        backgroundColor: theme.swatch.base01,
      },
      "& .MuiAutocomplete-option[aria-selected='true']": {
        backgroundColor: theme.swatch.base01,
      },
      "& .MuiAutocomplete-option.Mui-selected:hover": {
        backgroundColor: theme.swatch.base05,
        color: theme.swatch.base00,
      },
      "& .MuiAutocomplete-option[aria-selected='true']:hover": {
        backgroundColor: theme.swatch.base05,
        color: theme.swatch.base00,
      },
      "& .MuiAutocomplete-option.Mui-focused": {
        backgroundColor: theme.swatch.base05,
        color: theme.swatch.base00,
      },
      "& .MuiAutocomplete-option[aria-selected='true'].Mui-focused": {
        backgroundColor: theme.swatch.base05,
        color: theme.swatch.base00,
      },
      backgroundColor: theme.swatch.base00,
      color: theme.swatch.base05,
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
    // Below is Material UI's default renderOption, which we are overriding here to be more consistent with the BasicSelector component and its styling
    // return <li {...props}>{ownerState.getOptionLabel(option)}</li>;
    const additionalClassName = _state.selected ? `${props.className} Mui-selected autocomplete-option-selected` : `${props.className} autocomplete-option`;
    const additionalProps = {...props, className: additionalClassName};
    return <li {...additionalProps}>{ownerState.getOptionLabel(option)}</li>;
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
        // NOLAN TODO: try again at rendering a TextField with select = {true} instead of rendering a BasicSelector component
        // select={true}
        size="small"
        // NOLAN TODO: Come back to rendering HelperText, especially for "Search for Keys" selector
        // helperText="Here's some helper text"
      >
        {/* NOLAN TODO: would need to render children directly like so if TextField's select value is true*/}
        {/* {shouldRenderSelect && items.map((item) => defaultSelectRenderOption(item))} */}
      </TextField>
    );
  };

  return (
    <Autocomplete
      // disablePortal
      clearOnBlur
      clearOnEscape
      defaultValue={activeItem as NonNullable<T>}
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
      getOptionLabel={(option) => getDisplay(option)}
      size="small"
      sx={{
        ...style,
        ...classStyling,
      }}
      renderInput={renderTextField}
      renderOption={renderOption ?? defaultRenderOption}
      value={activeItem as NonNullable<T>}
    />
  );
};

export { AutocompleteSelector };
