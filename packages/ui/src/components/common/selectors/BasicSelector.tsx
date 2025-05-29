import React, { ReactNode, CSSProperties } from "react";
import { isEqual } from "lodash";
import { Base16Theme } from "../../../colors/themes";
import {
  AutocompleteRenderOptionState,
  FilterOptionsState,
  FormControl,
  InputLabel,
  InputLabelProps,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { render } from "react-dom";

// Example styling
// https://stackoverflow.com/questions/58984406/setting-text-color-outline-and-padding-on-material-ui-autocomplete-component

interface IBasicSelectorProps<T> {
  id: string;
  items: T[]; // list of items for the select
  activeItem?: T; // what is the active item?
  fontSizeStyling: CSSProperties;
  inputLabelProps: Partial<InputLabelProps>;
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
  size?: string; // "small" will set styling to smaller sizes
  style: CSSProperties;
  theme: Base16Theme; // what theme should this component be?
}

const BasicSelector = <T,>(props: IBasicSelectorProps<T>) => {
  const {
    activeItem,
    fontSizeStyling,
    getDisplay,
    getValue,
    id,
    inputLabelProps,
    items,
    label,
    minWidth,
    onChange,
    size,
    style,
    theme,
  } = props;

  // Rather annoying workaround due to issue with Material UI rendering Select before all options (derived from items var) are ready 
  // and then comparing reference equality to activeItem.
  // This forces Select to not be rendered until all options/items are ready
  const defaultSelectValue: T | undefined = items.find((item: T) => {
    return isEqual(item, activeItem);
  });

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

  const selectClassStyling = {
    "& .MuiPaper-root": {
      backgroundColor: theme.swatch.base00,
    }
  }

  const listBoxProps = {
    sx: {
      "&:hover": {
        backgroundColor: theme.swatch.base05,
        color: theme.swatch.base00,
      },
      "&.MuiButtonBase-root.MuiMenuItem-root.Mui-focusVisible.Mui-selected": {
        backgroundColor: theme.swatch.base01,
      },
      "&.MuiButtonBase-root.MuiMenuItem-root.Mui-focusVisible[aria-selected='true']": {
        backgroundColor: theme.swatch.base01,
      },
      "&.MuiButtonBase-root.MuiMenuItem-root.Mui-focusVisible.Mui-selected:hover": {
        backgroundColor: theme.swatch.base05,
        color: theme.swatch.base00,
      },
      "&.MuiButtonBase-root.MuiMenuItem-root.Mui-focusVisible[aria-selected='true']:hover": {
        backgroundColor: theme.swatch.base05,
        color: theme.swatch.base00,
      },
      backgroundColor: theme.swatch.base00,
      color: theme.swatch.base05,
      ...fontSizeStyling,
    },
  };

  const menuProps = {
    MenuListProps: {
    },
    PaperProps: {
      sx: {
        backgroundColor: theme.swatch.base00,
        ...selectClassStyling,
      }
    },
    sx: {
      ...selectClassStyling
      // ...fontSizeStyling
    },
  };

  const onChangeValueSelect = (
    e: SelectChangeEvent<T>,
  ) => {
    e.preventDefault();
    const item: T | undefined = items.find((item: T) => {
      return isEqual(item, e.target.value);
    });

    if (typeof item !== "undefined") {
      onChange(item as T);
    }
  };

  const defaultSelectRenderOption = (option: T): ReactNode => {
    return (
    <MenuItem 
    {...listBoxProps}
      key={`menu-item-${getDisplay(option)}`}
      value={option as string}
    >
    {getDisplay(option)}
    </MenuItem>
    )
  };

  const renderedOptions = items.map((item) => defaultSelectRenderOption(item));

  const labelId = `input-label-${id}`;

  return (
    <FormControl 
    {...listBoxProps}
      // fullWidth
    >
      <InputLabel {...inputLabelProps} id={labelId}>{label}</InputLabel>
      <Select
        // autoWidth={true}
        defaultValue={defaultSelectValue as NonNullable<T>}
        MenuProps={menuProps}
        onChange={onChangeValueSelect}
        id={id}
        labelId={labelId}
        label={label}
        size="small"
        sx={{
          ...style,
          ...classStyling,
          ...selectClassStyling,
        }}
        value={defaultSelectValue as NonNullable<T>}
      >
        {renderedOptions}
      </Select>
    </FormControl>
  );
};

export { BasicSelector };
