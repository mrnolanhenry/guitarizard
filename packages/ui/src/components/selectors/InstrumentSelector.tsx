import { Base16Theme } from "../../colors/themes";
import { LabeledSelector } from "./LabeledSelector";
import { IFrettedInstrument } from "note-lib/src/IFrettedInstrument";

interface IInstrumentSelectorProps {
  label: string | undefined;
  instruments: Map<string, IFrettedInstrument>;
  activeInstrument: IFrettedInstrument;
  onInstrumentSelect: (instrument: IFrettedInstrument) => void;
  theme: Base16Theme;
}

const InstrumentSelector = (props: IInstrumentSelectorProps) => {
  let activeItem: IFrettedInstrument = props.activeInstrument;

  const items: Array<IFrettedInstrument> = [];
  props.instruments.forEach((instrument) => {
    if (
      typeof props.activeInstrument.name !== "undefined" &&
      instrument.name === props.activeInstrument.name
    ) {
      activeItem = instrument;
    }
    items.push(instrument);
  });

  return (
    <LabeledSelector<IFrettedInstrument>
      items={items}
      label={props.label}
      getValue={(inst: IFrettedInstrument) => inst.name}
      getDisplay={(inst: IFrettedInstrument) => inst.name}
      activeItem={activeItem}
      onChange={props.onInstrumentSelect}
      theme={props.theme}
    />
  );
}

export { InstrumentSelector };
