import { Selector } from "./Selector";
import { Base16Theme } from "../../colors/themes";

interface ILabeledSelectorProps<T> {
  activeItem: T;
  getValue?: (item: T) => string;
  getDisplay?: (item: T) => string;
  items: Array<T>;
  label?: string;
  onChange: (item: T) => void;
  theme: Base16Theme;
}

const LabeledSelector = <T,>(props: ILabeledSelectorProps<T>) => {
  const {
    activeItem,
    getValue,
    getDisplay,
    items,
    label,
    onChange,
    theme
  } = props;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start"  }}>
      <div className="selector-label" style={{ paddingBottom: ".25em" }}>{label}</div>
      <Selector<T>
        items={items}
        getValue={getValue}
        getDisplay={getDisplay}
        activeItem={activeItem}
        onChange={onChange}
        theme={theme}
      />
    </div>
  );
}

export { LabeledSelector };
