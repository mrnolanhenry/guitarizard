import "./FretSegment.css";
import { Key, Note } from "note-lib";
import { Base16Theme, rainbow } from "../colors/themes";
import React, { CSSProperties } from "react";
import { ScaleOnCourse } from "note-lib/src/ScaleOnCourse";
import { lighten, darken, Grid } from "@mui/material";

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

const KeySegment = (props: IKeySegmentProps) => {
  const {
    allNotesOnCourse,
    columnsCount,
    fret,
    isRainbowMode,
    scaleOnCourse,
    theme,
    activeKey,
  } = props;

  // Get the note on this string (if it exists)
  const note: Note | undefined = scaleOnCourse.getNoteFromFretNumber(fret);

  // Get the note on this "string" (whether it exists in the scale or not)
  const noteIgnoreScale: Note | undefined =
    allNotesOnCourse.getNoteFromFretNumber(fret);

  const notesInKey: Note[] = activeKey.scale.getNotesInKey(activeKey.note);
  const noteIsInKey =
    note && !!notesInKey.find((noteInKey) => noteInKey.isSimilar(note));

  const getRainbowColor = () => {
    if (isRainbowMode && note && noteIsInKey) {
      const semitones: number[] = activeKey.scale.intervals.map(
        (interval) => interval.semitones,
      );

      const semitoneColors: string[] = semitones.map(
        (semitone) => rainbow[semitone],
      );

      const indexFound = notesInKey.findIndex((noteInKey) =>
        noteInKey.isSimilar(note),
      );
      return semitoneColors[indexFound];
    } else {
      return "#BBB";
    }
  };

  const rainbowColor = getRainbowColor();

  const isAccidental = noteIgnoreScale && !!noteIgnoreScale.isAccidental();
  const noteDisplay: string = note && isAccidental ? note.id : "";

  const noteTextStyle: CSSProperties = {
    color: isAccidental ? lighten(rainbowColor, 0.4) : rainbowColor,
    borderRadius: "10px",
    margin: "5px",
    fontWeight: "bold",
  };

  const getBackgroundColor = () => {
    let backgroundColor = isAccidental ? "black" : "white";
    if (noteIsInKey) {
      if (isAccidental) {
        backgroundColor = darken(theme.swatch.base0A, 0.4);
      } else {
        backgroundColor = theme.swatch.base0A;
      }
    }
    return backgroundColor;
  };

  const keySegmentStyle: CSSProperties = {
    backgroundColor: getBackgroundColor(),
    borderWidth: isAccidental ? "0px 1px 1px 1px" : "0px 1px 0px 1px",
    borderStyle: "solid",
    borderColor: "black",
    height: "12rem",
  };

  return (
    <Grid
      container
      columns={columnsCount}
      item
      xs={2}
      className="key-segment"
      alignContent="flex-end"
      paddingBottom={1}
      justifyContent="center"
      style={keySegmentStyle}
    >
      <Grid
        container
        className="inner"
        alignContent="center"
        justifyContent="center"
      >
        {note && (
          <Grid
            container
            className="note-container"
            alignContent="flex-end"
            justifyContent="center"
          >
            <Grid
              container
              item
              className="note-text"
              alignContent="center"
              justifyContent="center"
              style={noteTextStyle}
            >
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
