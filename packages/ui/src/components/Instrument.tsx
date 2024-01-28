import React from "react";
import { Key, Note, Temperament } from "note-lib";
import { FrettedInstrument } from "note-lib/src/instruments/FrettedInstrument";
import { Base16Theme } from "../colors/themes";
import { FretBoard } from "./FretBoard";

interface IInstrumentProps {
  activeKey: Key;
  instrument: FrettedInstrument;
  isMediumScreen: boolean;
  isRainbowMode: boolean;
  onTune: (courseId: string, newTuning: Note) => void;
  temperament: Temperament;
  theme: Base16Theme;
}

// NOLAN TODO - This component is currently redundant, but will be useful once other instruments (like Piano) are incorporated.
const Instrument = (props: IInstrumentProps) => {
  const { activeKey, instrument, isMediumScreen, isRainbowMode, onTune, temperament, theme } = props;

  return (
    <FretBoard
      activeKey={activeKey}
      fretBoard={instrument.fretBoard}
      isMediumScreen={isMediumScreen}
      isRainbowMode={isRainbowMode}
      onTune={onTune}
      showFretBar={true}
      temperament={temperament}
      theme={theme}
    />
  );
};

export { Instrument };
