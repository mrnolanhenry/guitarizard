import "./FretSegment.css";
import { Key, Note } from "note-lib";
import { Base16Theme, rainbow } from "../colors/themes";
import React, { CSSProperties } from "react";
import { ScaleOnCourse } from "note-lib/src/ScaleOnCourse";
import { Grid } from "@mui/material";

interface IKeySegmentProps {
  allNotesOnCourse: ScaleOnCourse;
  columnsCount: number;
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
    color: "#111",
    backgroundColor: "#BBB",
    textShadow: "1px 1px 1px 1rem black",
    borderRadius: "10px",
    margin: "5px"
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
        backgroundColor: thisNoteIntervalColorCombo.semitoneColor,
      };
    }
  }
  return noteTextStyle;
};

const KeySegment = (props: IKeySegmentProps) => {
  const { allNotesOnCourse, columnsCount, fret, isRainbowMode, scaleOnCourse, theme, activeKey } = props;

  // Get the note on this string (if it exists)
  const note: Note | undefined = scaleOnCourse.getNoteFromFretNumber(fret);
  const noteDisplay: string = note ? note.id : "";

  // Get the note on this "string" (whether it exists in the scale or not)
  const noteIgnoreScale: Note| undefined = allNotesOnCourse.getNoteFromFretNumber(fret);

  const noteTextStyle: CSSProperties = getNoteTextStyle(
    isRainbowMode,
    theme,
    note,
    activeKey,
  );

  const isAccidental = noteIgnoreScale && !!noteIgnoreScale.isAccidental();

  const keySegmentStyle: CSSProperties = {
    backgroundColor: isAccidental ? "black" : "white",
    borderWidth: "0px 1px 0px 1px",
    borderStyle: "solid",
    borderColor: "black",
    height: "12rem",
  };

  return (
    <Grid container columns={columnsCount} item xs={2} className="key-segment" alignContent="flex-end"  paddingBottom={1} justifyContent="center" style={keySegmentStyle}>
      <Grid container className="inner" alignContent="center" justifyContent="center">
        {note && (
          <Grid container className="note-container" alignContent="flex-end" justifyContent="center">
            <Grid container item className="note-text" alignContent="center" justifyContent="center" style={noteTextStyle}>
              {noteDisplay}
            </Grid>
          </Grid>
        )}
        <Grid className="key-line"></Grid>
      </Grid>
    </Grid>
  );
};

export { KeySegment };
