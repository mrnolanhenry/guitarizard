import { Key, Note } from "note-lib";
import { FrettedInstrument } from "note-lib/src/instruments/FrettedInstrument";
import { Base16Theme } from "../colors/themes";
import { FretBoard } from "./FretBoard";

interface IInstrumentProps {
  activeKey: Key;
  instrument: FrettedInstrument;
  isRainbowMode: boolean;
  onTune: (courseId: string, newTuning: Note) => void;
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
