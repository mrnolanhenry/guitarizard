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
  const noteIsInKey = !!notesInKey.find((noteInKey) => noteInKey.isSimilar(note));

  const getNoteTextStyle = (
    isRainbowMode: boolean,
    theme: Base16Theme,
    note: Note | undefined,
    activeKey: Key,
  ): CSSProperties => {
    let noteTextStyle: CSSProperties = {
      color: "#BBB",
      borderRadius: "10px",
      margin: "5px",
      fontWeight: "bold",
      textShadow: "0px 0px 1em black",
    };
  
    if (isRainbowMode && note) {
  
      const semitones: number[] = activeKey.scale.intervals.map(
        (interval) => interval.semitones,
      );
  
      const semitoneColors: string[] = semitones.map(
        (semitone) => rainbow[semitone],
      );
  
      const noteIntervalColorCombos = notesInKey.map((n, i) => ({
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

  const noteTextStyle: CSSProperties = getNoteTextStyle(
    isRainbowMode,
    theme,
    note,
    activeKey,
  );

  const keySegmentStyle: CSSProperties = {
    backgroundColor: "white",
    borderWidth: "0px 1px 0px 1px",
    borderStyle: "solid",
    borderColor: "black",
    height: "6rem",
  };

  return (
      <Grid item xs={columnWidth} id={`key-segment-${note.id}`} className="key-segment" style={keySegmentStyle}>
        <Grid container className="inner">
            <Grid container className="note-container">
              {/* <Grid item className="note-text" style={noteTextStyle}> */}
              <Grid container item id={`note-text-${note.id}`} className="note-text" alignContent="center" justifyContent="center" style={noteTextStyle}>
                {noteIsInKey ? note.id : ""}
              </Grid>
            </Grid>
          <Grid className="key-line"></Grid>
        </Grid>
      </Grid>
    );
};

export { KeySegmentBottom };
