import { instrument } from "note-lib";
import { Base16Theme } from "../colors";
import selector from "./selector";

interface Props {
  instruments: Array<instrument.FrettedInstrument>;
  activeInstrument: instrument.FrettedInstrument;
  onInstrumentSelect: (instrument: instrument.FrettedInstrument) => void;
  theme: Base16Theme;
}

export default function instrumentsSelector({
  instruments,
  activeInstrument,
  onInstrumentSelect,
  theme
}: Props) {
  return selector<instrument.FrettedInstrument>({
    items: instruments,
    getKey: (inst: instrument.FrettedInstrument) => inst.name,
    getValue: (inst: instrument.FrettedInstrument) => inst.name,
    activeItem: activeInstrument,
    onChange: onInstrumentSelect,
    theme
  });
}
