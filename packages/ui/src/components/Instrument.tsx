import React from "react";
import { Constants, Key, Note, Temperament } from "note-lib";
import { FrettedInstrument } from "note-lib/src/instruments/FrettedInstrument";
import { Base16Theme } from "../colors/themes";
import { FretBoard } from "./FretBoard";
import { KeyBoard } from "./KeyBoard";

interface IInstrumentProps {
  activeKey: Key;
  instrument: FrettedInstrument;
  isMediumScreen: boolean;
  isLargeScreen: boolean;
  isRainbowMode: boolean;
  onTune: (courseId: string, newTuning: Note) => void;
  shouldHighlightPiano: boolean;
  temperament: Temperament;
  theme: Base16Theme;
}

const Instrument = (props: IInstrumentProps) => {
  const { activeKey, instrument, isMediumScreen, isLargeScreen, isRainbowMode, onTune, shouldHighlightPiano, temperament, theme } = props;

  return instrument.name === Constants.PIANO ?
   (
    <KeyBoard
      activeKey={activeKey}
      fretBoard={instrument.fretBoard}
      isMediumScreen={isMediumScreen}
      isLargeScreen={isLargeScreen}
      isRainbowMode={isRainbowMode}
      onTune={onTune}
      shouldHighlightPiano={shouldHighlightPiano}
      temperament={temperament}
      theme={theme}
    />
  ) :
  (
    <FretBoard
      activeKey={activeKey}
      fretBoard={instrument.fretBoard}
      isMediumScreen={isMediumScreen}
      isLargeScreen={isLargeScreen}
      isRainbowMode={isRainbowMode}
      onTune={onTune}
      showFretBar={true}
      temperament={temperament}
      theme={theme}
    />
  )
};

export { Instrument };
