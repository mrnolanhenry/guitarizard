import React from "react";
import { Key, Note, Scale, instrument } from "note-lib";
import { Base16Theme } from "../colors/colors";
import FretBoard from "./FretBoard";

//  NOLAN - kill this component - just use Fretboard
interface Props {
  instrument: instrument.FrettedInstrument;
  keyNote: Note;
  scale: Scale;
  onTune: (instrumentName: string, stringID: string, newTuning: Note) => void;
  isRainbowMode: boolean;
  theme: Base16Theme;
  activeKey: Key;
}

export default function Guitar(props: Props) {
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
