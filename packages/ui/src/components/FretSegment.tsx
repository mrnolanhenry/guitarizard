import "./FretSegment.css";
import { Key, Note } from "note-lib";
import { Base16Theme, rainbow } from "../colors/themes";
import React, { CSSProperties } from "react";
import { ScaleOnCourse } from "note-lib/src/ScaleOnCourse";
import { NoteFretNumberPair } from "note-lib/src/NoteFretNumberPair";

interface IFretSegmentProps {
  scaleOnCourse: ScaleOnCourse;
  fret: number;
  theme: Base16Theme;
  isRainbowMode: boolean;
  activeKey: Key;
  style?: CSSProperties;
}

const getNoteTextStyle = (
  isRainbowMode: boolean,
  theme: Base16Theme,
  note: Note | undefined,
  activeKey: Key,
): CSSProperties => {
  let noteTextStyle: CSSProperties = {
    backgroundColor: theme.swatch.base00,
    color: theme.swatch.base05,
  };

  if (isRainbowMode && note) {
    const notes: Note[] = activeKey.scale.getNotesInKey(activeKey.note);

    const semitones: number[] = activeKey.scale.intervals.map(
      (interval) => interval.semitones,
    );

    const semitoneColors: string[] = semitones.map(
      (semitone) => rainbow[semitone],
    );

    const noteIntervalColorCombos = notes.map((n, i) => ({
      note: n,
      semitone: semitones[i],
      semitoneColor: semitoneColors[i],
    }));

    const thisNoteIntervalColorCombo = noteIntervalColorCombos.find(
      (noteIntervalColorCombo) => noteIntervalColorCombo.note.isSimilar(note),
    );

    if (thisNoteIntervalColorCombo) {
      noteTextStyle = {
        ...noteTextStyle,
        color: thisNoteIntervalColorCombo.semitoneColor,
      };
    }
  }
  return noteTextStyle;
};

const FretSegment = (props: IFretSegmentProps) => {
  const { fret, isRainbowMode, scaleOnCourse, theme, activeKey } = props;

  // Get the note on this string (if it exists)
  const noteFretNumberPair: NoteFretNumberPair | undefined =
    scaleOnCourse.notes.find((note) => note.fretNumber === fret);

  const note: Note | undefined = noteFretNumberPair
    ? noteFretNumberPair.value
    : undefined;
  const noteDisplay: string = note ? note.id : "";

  const fretLineStyle: CSSProperties = { backgroundColor: theme.swatch.base07 };
  const stringLineStyle: CSSProperties = { backgroundColor: theme.swatch.base0E };

  const noteTextStyle: CSSProperties = getNoteTextStyle(
    isRainbowMode,
    theme,
    note,
    activeKey,
  );

  const backgroundStyle: CSSProperties =
    fret <= scaleOnCourse.config.fret.start
      ? { backgroundColor: theme.swatch.base01 }
      : {};

  return (
    <div className="fret-segment">
      <div className="background" style={backgroundStyle}></div>
      <div className="inner">
        <div className="string-line" style={stringLineStyle}></div>
        {note && (
          <div className="note-container">
            <div className="note-text" style={noteTextStyle}>
              {noteDisplay}
            </div>
          </div>
        )}
        <div className="fret-line" style={fretLineStyle}></div>
      </div>
    </div>
  );
};

export { FretSegment };
