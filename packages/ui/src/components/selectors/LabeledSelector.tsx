import { Selector } from "./Selector";
import { Base16Theme } from "../../colors/themes";
import { FilterOptionsState } from "@mui/material";

interface ILabeledSelectorProps<T> {
  activeItem: T;
  filterOptions?: (options: T[], state: FilterOptionsState<T>) => T[] // special handling to filter options
  getValue?: (item: T) => string;
  getDisplay?: (item: T) => string;
  id: string;
  items: Array<T>;
  label?: string;
  minWidth?: string;
  onChange: (item: T) => void;
  theme: Base16Theme;
}

const LabeledSelector = <T,>(props: ILabeledSelectorProps<T>) => {
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
    theme
  } = props;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start"  }}>
      <Selector<T>
        id={id}
        items={items}
        filterOptions={filterOptions}
        getValue={getValue}
        getDisplay={getDisplay}
        label={label}
        minWidth={minWidth}
        activeItem={activeItem}
        onChange={onChange}
        theme={theme}
      />
    </div>
  );
}

export { LabeledSelector };
