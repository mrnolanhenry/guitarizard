import { Key, Note, Scale, instrument } from "note-lib";
import { Base16Theme } from "../colors/themes";
import { FretBoard } from "./FretBoard";
import { IFrettedInstrument } from "note-lib/src/IFrettedInstrument";

interface IInstrumentProps {
  instrument: IFrettedInstrument;
  keyNote: Note;
  scale: Scale;
  onTune: (instrumentName: string, stringID: string, newTuning: Note) => void;
  isRainbowMode: boolean;
  theme: Base16Theme;
  activeKey: Key;
}

// This component is currently redundant, but will be useful once other instruments (like Piano) are incorporated.
const Instrument = (props: IInstrumentProps) => {
  return (
    <FretBoard
      instrumentName={props.instrument.name}
      fretBoard={props.instrument.fretBoard}
      scale={props.scale}
      keyNote={props.keyNote}
      showFretBar={true}
      onTune={props.onTune}
      activeKey={props.activeKey}
      isRainbowMode={props.isRainbowMode}
      theme={props.theme}
    />
  );
}

export { Instrument };
