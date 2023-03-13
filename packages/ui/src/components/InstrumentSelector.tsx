import React from "react";
import { instrument } from "note-lib";
import { Base16Theme } from "../colors/colors";
import Selector from "./Selector";
import { IFrettedInstrument } from "note-lib/src/IFrettedInstrument";

interface Props {
  instruments: Map<string, IFrettedInstrument>;
  activeInstrumentName?: string;
  onInstrumentSelect: (instrument: IFrettedInstrument) => void;
  theme: Base16Theme;
}

export default function InstrumentSelector(props: Props) {
  // ... gross (@TODO)
  let activeItem: IFrettedInstrument | undefined = undefined;

  const items: Array<IFrettedInstrument> = [];
  props.instruments.forEach((instrument) => {
    if (
      typeof props.activeInstrumentName !== "undefined" &&
      instrument.name === props.activeInstrumentName
    ) {
      activeItem = instrument;
    }
    items.push(instrument);
  });

  return (
    <Selector<IFrettedInstrument>
      items={items}
      getValue={(inst: IFrettedInstrument) => inst.name}
      getDisplay={(inst: IFrettedInstrument) => inst.name}
      activeItem={activeItem}
      onChange={props.onInstrumentSelect}
      theme={props.theme}
    />
  );
}
