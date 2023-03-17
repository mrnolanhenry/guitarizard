import { Key, Note, Scale, instrument } from "note-lib";
import { Base16Theme } from "../colors/themes";
import { FretBoard } from "./FretBoard";
import { IFrettedInstrument } from "note-lib/src/IFrettedInstrument";

interface IInstrumentProps {
  activeKey: Key;
  instrument: IFrettedInstrument;
  isRainbowMode: boolean;
  keyNote: Note;
  onTune: (instrumentName: string, stringID: string, newTuning: Note) => void;
  scale: Scale;
  theme: Base16Theme;
}

// This component is currently redundant, but will be useful once other instruments (like Piano) are incorporated.
const Instrument = (props: IInstrumentProps) => {
  const { 
    activeKey,
    instrument,
    isRainbowMode,
    keyNote,
    onTune,
    scale,
    theme,
   } = props;
  return (
    <FretBoard
      instrumentName={instrument.name}
      fretBoard={instrument.fretBoard}
      scale={scale}
      keyNote={keyNote}
      showFretBar={true}
      onTune={onTune}
      activeKey={activeKey}
      isRainbowMode={isRainbowMode}
      theme={theme}
    />
  );
}

export { Instrument };
