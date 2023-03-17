import { Base16Theme } from "../../colors/themes";
import { LabeledSelector } from "./LabeledSelector";
import { IFrettedInstrument } from "note-lib/src/IFrettedInstrument";

interface IInstrumentSelectorProps {
  activeInstrument: IFrettedInstrument;
  instruments: Map<string, IFrettedInstrument>;
  label: string | undefined;
  onInstrumentSelect: (instrument: IFrettedInstrument) => void;
  theme: Base16Theme;
}

const InstrumentSelector = (props: IInstrumentSelectorProps) => {
  const { 
    activeInstrument,
    instruments,
    label,
    onInstrumentSelect,
    theme,
  } = props;
  let activeItem: IFrettedInstrument = activeInstrument;

  const items: Array<IFrettedInstrument> = [];
  instruments.forEach((instrument) => {
    if (
      typeof activeInstrument.name !== "undefined" &&
      instrument.name === activeInstrument.name
    ) {
      activeItem = instrument;
    }
    items.push(instrument);
  });

  return (
    <LabeledSelector<IFrettedInstrument>
      items={items}
      label={label}
      getValue={(inst: IFrettedInstrument) => inst.name}
      getDisplay={(inst: IFrettedInstrument) => inst.name}
      activeItem={activeItem}
      onChange={onInstrumentSelect}
      theme={theme}
    />
  );
}

export { InstrumentSelector };
