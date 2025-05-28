import React from "react";
import { FrettedInstrument } from "note-lib/src/instruments/FrettedInstrument";
import { Base16Theme } from "../../colors/themes";
import { LabeledSelector } from "./LabeledSelector";

interface IInstrumentSelectorProps {
  activeInstrument: FrettedInstrument;
  instruments: Map<string, FrettedInstrument>;
  label: string | undefined;
  minWidth?: string;
  onInstrumentSelect: (instrument: FrettedInstrument) => void;
  shouldAutocomplete: boolean;
  theme: Base16Theme;
}

const InstrumentSelector = (props: IInstrumentSelectorProps) => {
  const {
    activeInstrument,
    instruments,
    label,
    minWidth,
    onInstrumentSelect,
    shouldAutocomplete,
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
      id="instrument-selector"
      items={items}
      label={label}
      minWidth={minWidth}
      getValue={(inst: FrettedInstrument) => inst.name}
      getDisplay={(inst: FrettedInstrument) => inst.name}
      activeItem={activeItem}
      onChange={onInstrumentSelect}
      shouldAutocomplete={shouldAutocomplete}
      theme={theme}
    />
  );
};

export { InstrumentSelector };
