import { instrument } from "guitarizard-note-lib";
import { Base16Theme } from "../lib/colors";
import Selector from "./Selector";

interface Props {
  instruments: Map<string, instrument.FrettedInstrument>;
  activeInstrumentName?: string;
  onInstrumentSelect: (instrument: instrument.FrettedInstrument) => void;
  theme: Base16Theme;
}

export default function InstrumentSelector(props: Props) {
  // ... gross (@TODO)
  let activeItem: instrument.FrettedInstrument | undefined = undefined;

  const items: Array<instrument.FrettedInstrument> = [];
  props.instruments.forEach(instrument => {
    if (
      typeof props.activeInstrumentName !== "undefined" &&
      instrument.name === props.activeInstrumentName
    ) {
      activeItem = instrument;
    }
    items.push(instrument);
  });

  return <Selector<instrument.FrettedInstrument>
    items={items}
    getValue={(inst: instrument.FrettedInstrument) => inst.name}
    getDisplay={(inst: instrument.FrettedInstrument) => inst.name}
    activeItem={activeItem}
    onChange={props.onInstrumentSelect}
    theme={props.theme} />;
}
