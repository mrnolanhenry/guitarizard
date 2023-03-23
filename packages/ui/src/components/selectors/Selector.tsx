import React from "react";
import { CSSProperties } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import { Base16Theme } from "../../colors/themes";

// Example styling
// https://stackoverflow.com/questions/58984406/setting-text-color-outline-and-padding-on-material-ui-autocomplete-component

interface ISelectorProps<T> {
  id: string;
  items: Array<T>; // list of items for the select
  activeItem?: T; // what is the active item?
  label?: string;
  minWidth?: string;
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
      id,
      items,
      label,
      minWidth,
      onChange,
      theme,
     } = props;

    const classStyling = {
      "& .MuiInputLabel-outlined": {
        // Default transform is "translate(14px, 20px) scale(1)""
        // This lines up the label with the initial cursor position in the input
        // after changing its padding-left.
        // transform: "translate(34px, 20px) scale(1);"
        color: theme.base05
      },
      "& .Mui-focused .MuiInputLabel-outlined": {
        color: theme.base05
      },
      "& .MuiInputBase-root": {
        color: theme.base05
      },
      "& .MuiButtonBase-root": {
        color: theme.base05
      },
      "& .MuiAutocomplete-inputRoot": {
        // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
        '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type': {
          // Default left padding is 6px
          // paddingLeft: 26
        },
        // '&[class*="MuiOutlinedInput-root"]': {
        //   paddingTop: 0,
        //   paddingBottom: 0,
        // },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.base05
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          // borderColor: "red"
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          // borderColor: "purple"
        }
      }
    };

    const style: CSSProperties = {
      backgroundColor: theme.base00,
      color: theme.base05,
      borderWidth: "0",
      borderRadius: "4px",
      borderStyle: "solid",
      cursor: "pointer",
      // width: "100%",
      minWidth: minWidth ? minWidth : "2em",
    };

    const display = (item: T): string => {
      const fn =
        typeof getDisplay === "undefined"
          ? (a: T) => String(a)
          : getDisplay;

      return fn(item);
    }

    const onChangeValue = (e: React.ChangeEvent, val: T) => {
    // onChange?: (
    //   event: React.SyntheticEvent,
    //   value: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>,
    //   reason: AutocompleteChangeReason,
    //   details?: AutocompleteChangeDetails<T>,
    // ) => void
    // const onChangeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
      e.preventDefault();

      const item: T | undefined = items.find(
        (item: T) => {
          console.log('item', item);
          console.log('val', val);
          return item === val;
        }
      );

      if (typeof item !== "undefined") {
        onChange(item as T);
      }
    };

    const inputLabelProps = {
      // disableAnimation: true
    };
    const inputProps = {
      sx: {
        paddingTop: 0,
        paddingBottom: 0,
      }
    };

    return (
      <Autocomplete
        // disablePortal
        defaultValue={activeItem as NonNullable<T>}
        disableClearable
        // fullWidth
        onChange={onChangeValue as any}
        id={id}
        options={items}
        getOptionLabel={(option) => display(option as T)}
        size="small"
        sx={{...style,
          ...classStyling
        }}
        renderInput={(params) => {
          // console.log('params');
          // console.log(params);
          return <TextField 
          {...params} 
            // InputLabelProps={inputLabelProps}
            // InputProps={inputProps}
            label={label ? label : ""} 
            // size="small" 
          />}
        }
        value={activeItem as NonNullable<T>}
      />
    );
  };

 export { Selector };
