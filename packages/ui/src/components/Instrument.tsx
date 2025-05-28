import React from "react";
import { Chord, Constants, Key, Note, Temperament } from "note-lib";
import { FrettedInstrument } from "note-lib/src/instruments/FrettedInstrument";
import { Base16Theme } from "../colors/themes";
import { FretBoard } from "./FretBoard";
import { KeyBoard } from "./KeyBoard";

interface IInstrumentProps {
  activeKeyOrChord: Key | Chord;
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
  const { activeKeyOrChord, instrument, isMediumScreen, isLargeScreen, isRainbowMode, onTune, shouldHighlightPiano, temperament, theme } = props;

  return instrument.name === Constants.PIANO ?
   (
    <KeyBoard
      activeKeyOrChord={activeKeyOrChord}
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
      activeKeyOrChord={activeKeyOrChord}
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
