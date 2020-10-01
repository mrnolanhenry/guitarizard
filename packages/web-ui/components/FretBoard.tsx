import React from "react";
import "./FretBoard.scss";
import { Key, instrument, Note, Scale } from "note-lib";
import { Base16Theme } from "../lib/colors";
import FretSegment from "./FretSegment";
import NoteSelector from "./NoteSelector";

interface Props {
  instrumentName: string;
  fretBoard: instrument.FretBoard;
  scale: Scale;
  keyNote: Note;
  activeKey: Key;
  showFretBar: boolean;
  onTune: (instrumentName: string, stringID: string, newTuning: Note) => void;
  isRainbowMode: boolean;
  theme: Base16Theme;
}

export default function FretBoard(props: Props) {
  const fretBarStyle = {
    backgroundColor: props.theme.base00,
    borderColor: props.theme.base01,
  };

  const fretBar = props.showFretBar && (
    <div className="fret-labels">
      {[...Array(props.fretBoard.getFretCount())].map((_, i) => {
        // TODO: this is a terrible key
        return (
          <div key={`${i}:${Math.random()}`} style={fretBarStyle}>
            {i === 0 ? "*" : i}
          </div>
        );
      })}
    </div>
  );

  const tuningPegsStyle = {
    backgroundColor: props.theme.base07,
    color: props.theme.base04,
    borderColor: props.theme.base03,
    boxShadow: "2px 0px " + props.theme.base07,
  };

  const tuningPegs = (
    <div className="tuning-pegs" style={tuningPegsStyle}>
      {props.fretBoard.tunedStrings.map((string) => {
        return (
          <NoteSelector
            key={string.id}
            scaleSystem={props.fretBoard.scaleSystem}
            note={string.tuningNote}
            onNoteSelect={(n: Note) =>
              props.onTune(props.instrumentName, string.id, n)
            }
            theme={props.theme}
          />
        );
      })}
    </div>
  );

  const stringStyle = { borderColor: props.theme.base09 };

  const stringScales = props.fretBoard.getNotesInScale(
    props.scale,
    props.keyNote
  );

  const boardStyle = { backgroundColor: props.theme.base0F };

  const strings = stringScales.map((stringScale, idx) => {
    const fretSegments = [...Array(props.fretBoard.getFretCount())].map(
      (_, i) => {
        // TODO: this is a terrible key
        return (
          <FretSegment
            key={`${i}:${Math.random()}`}
            activeKey={props.activeKey}
            stringScale={stringScale}
            fret={i}
            isRainbowMode={props.isRainbowMode}
            theme={props.theme}
          />
        );
      }
    );

    // TODO: this is a terrible key
    return (
      <div
        key={`${idx}:${Math.random()}`}
        className="string"
        style={stringStyle}
      >
        {fretSegments}
      </div>
    );
  });

  const board = (
    <div className="board" style={boardStyle}>
      {strings}
    </div>
  );

  const style = {
    backgroundColor: props.theme.base00,
    borderColor: props.theme.base00,
  };

  return (
    <div className="fret-board" style={style}>
      {fretBar}
      {tuningPegs}
      {board}
    </div>
  );
}
