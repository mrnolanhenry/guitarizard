import { FrettedInstrument } from "note-lib/src/instruments/FrettedInstrument";
import { Base16Theme } from "../../colors/themes";
import { LabeledSelector } from "./LabeledSelector";

interface IInstrumentSelectorProps {
  activeInstrument: FrettedInstrument;
  instruments: Map<string, FrettedInstrument>;
  label: string | undefined;
  onInstrumentSelect: (instrument: FrettedInstrument) => void;
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
  let activeItem: FrettedInstrument = activeInstrument;

  const items: FrettedInstrument[] = [];
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
    <LabeledSelector<FrettedInstrument>
      items={items}
      label={label}
      getValue={(inst: FrettedInstrument) => inst.name}
      getDisplay={(inst: FrettedInstrument) => inst.name}
      activeItem={activeItem}
      onChange={onInstrumentSelect}
      theme={theme}
    />
  );
}

export { InstrumentSelector };
