import "./FretSegment.css";
import { Key, Note } from "note-lib";
import React, { CSSProperties } from "react";
import { Grid } from "@mui/material";
import { Base16Theme, rainbow } from "../colors/themes";

interface IKeySegmentBottomProps {
  activeKey: Key;
  columnWidth: number;
  isRainbowMode: boolean;
  note: Note;
  style?: CSSProperties;
  theme: Base16Theme;
}

const KeySegmentBottom = (props: IKeySegmentBottomProps) => {
  const { activeKey, columnWidth, isRainbowMode, note, theme } = props;
  const notesInKey: Note[] = activeKey.scale.getNotesInKey(activeKey.note);
  const noteIsInKey = !!notesInKey.find((noteInKey) =>
    noteInKey.isSimilar(note),
  );

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

  const noteTextStyle: CSSProperties = {
    color: rainbowColor,
    fontWeight: "bold",
    margin: "5px",
  };

  const keySegmentStyle: CSSProperties = {
    backgroundColor: noteIsInKey ? theme.swatch.base0A : "white",
    borderWidth: "0px 1px 0px 1px",
    borderStyle: "solid",
    borderColor: "black",
    height: "6rem",
  };

  return (
    <Grid
      item
      xs={columnWidth}
      id={`key-segment-${note.id}`}
      className="key-segment"
      style={keySegmentStyle}
    >
      <Grid container className="inner">
        <Grid container className="note-container">
          {/* <Grid item className="note-text" style={noteTextStyle}> */}
          <Grid
            container
            item
            id={`note-text-${note.id}`}
            className="note-text"
            alignContent="center"
            justifyContent="center"
            style={noteTextStyle}
          >
            {noteIsInKey ? note.id : ""}
          </Grid>
        </Grid>
        <Grid className="key-line"></Grid>
      </Grid>
    </Grid>
  );
};

export { KeySegmentBottom };
