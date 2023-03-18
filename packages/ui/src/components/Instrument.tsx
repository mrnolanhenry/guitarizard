import { Key, Note } from "note-lib";
import { Base16Theme } from "../colors/themes";
import { FretBoard } from "./FretBoard";
import { IFrettedInstrument } from "note-lib/src/IFrettedInstrument";

interface IInstrumentProps {
  activeKey: Key;
  instrument: IFrettedInstrument;
  isRainbowMode: boolean;
  onTune: (stringID: string, newTuning: Note) => void;
  theme: Base16Theme;
}

// This component is currently redundant, but will be useful once other instruments (like Piano) are incorporated.
const Instrument = (props: IInstrumentProps) => {
  const { 
    activeKey,
    instrument,
    isRainbowMode,
    onTune,
    theme,
   } = props;
  return (
    <FretBoard
      activeKey={activeKey}
      fretBoard={instrument.fretBoard}
      isRainbowMode={isRainbowMode}
      onTune={onTune}
      showFretBar={true}
      theme={theme}
    />
  );
}

export { Instrument };
