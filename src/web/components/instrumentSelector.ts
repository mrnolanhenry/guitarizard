import { instrument } from "note-lib";
import { Base16Theme } from "../colors";
import selector from "./selector";

interface Props {
  instruments: Map<string, instrument.FrettedInstrument>;
  activeInstrumentName?: string;
  onInstrumentSelect: (instrument: instrument.FrettedInstrument) => void;
  theme: Base16Theme;
}

export default function instrumentsSelector({
  instruments,
  activeInstrumentName,
  onInstrumentSelect,
  theme
}: Props) {
  // ... gross
  let activeItem: instrument.FrettedInstrument | undefined = undefined;

  const items: Array<instrument.FrettedInstrument> = [];
  instruments.forEach(instrument => {
    if (
      typeof activeInstrumentName !== "undefined" &&
      instrument.name === activeInstrumentName
    ) {
      activeItem = instrument;
    }
    items.push(instrument);
  });

  return selector<instrument.FrettedInstrument>({
    items,
    getKey: (inst: instrument.FrettedInstrument) => inst.name,
    getValue: (inst: instrument.FrettedInstrument) => inst.name,
    activeItem: activeItem,
    onChange: onInstrumentSelect,
    theme
  });
}
