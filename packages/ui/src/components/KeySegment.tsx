import "./FretSegment.css";
import { Chord, Key, Note } from "note-lib";
import { Base16Theme, rainbow } from "../colors/themes";
import React, { CSSProperties } from "react";
import { NotesOnCourse } from "note-lib/src/NotesOnCourse";
import { lighten, darken, Grid } from "@mui/material";

interface IKeySegmentProps {
  activeKeyOrChord: Key | Chord;
  allNotesOnCourse: NotesOnCourse;
  columnsCount: number;
  notesOnCourse: NotesOnCourse;
  fret: number;
  theme: Base16Theme;
  isRainbowMode: boolean;
  shouldHighlightPiano: boolean;
  style?: CSSProperties;
}

const KeySegment = (props: IKeySegmentProps) => {
  const { activeKeyOrChord, allNotesOnCourse, columnsCount, fret, isRainbowMode, notesOnCourse, shouldHighlightPiano, theme } = props;

  // Get the note on this string (if it exists)
  const note: Note | undefined = notesOnCourse.getNoteFromFretNumber(fret);

  // Get the note on this "string" (whether it exists in the scale or not)
  const noteIgnoreScale: Note| undefined = allNotesOnCourse.getNoteFromFretNumber(fret);

  const noteIsInKey = note && activeKeyOrChord.hasNote(note);

  const getRainbowColor = (defaultColor: string = "#BBB") => {
    if (isRainbowMode && note && noteIsInKey) {
      const semitones: number[] = activeKeyOrChord.getIntervalCollection().intervals.map(
        (interval) => interval.semitones,
      );

      const semitoneColors: string[] = semitones.map(
        (semitone) => rainbow[semitone],
      );

      const indexFound = activeKeyOrChord.notes.findIndex((noteInKey) => noteInKey.isEquivalent(note));
      return semitoneColors[indexFound];
    }
    else {
      return defaultColor;
    }
  }

  const rainbowColor = shouldHighlightPiano ? getRainbowColor(theme.swatch.base0A) : getRainbowColor();

  const isAccidental = noteIgnoreScale && !!noteIgnoreScale.isAccidental();
  const noteDisplay: string = note && isAccidental ? note.id : "";

  const noteTextStyle: CSSProperties = {
    color: isAccidental ? lighten(rainbowColor, .5) : rainbowColor,
    borderRadius: "10px",
    margin: "5px",
    fontWeight: "bold",
  };

  const getBackgroundColor = () => {
    let backgroundColor = isAccidental ? "black" : "white";
    if (shouldHighlightPiano && noteIsInKey) {
      if (isAccidental) {
        backgroundColor = darken(rainbowColor, .5);
      }
      else {
        backgroundColor = darken(rainbowColor, .3);
      }
    }
    return backgroundColor;
  }

  const keySegmentStyle: CSSProperties = {
    backgroundColor: getBackgroundColor(),
    borderWidth: isAccidental ? "0px 1px 1px 1px" : "0px 1px 0px 1px",
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
