import { Selector } from "./Selector";
import { Base16Theme } from "../../colors/themes";

interface ILabeledSelectorProps<T> {
  activeItem: T;
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
