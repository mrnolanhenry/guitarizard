import React from "react";
import "./FretSegment.css";
import { Chord, Key, Note } from "note-lib";
import { CSSProperties } from "react";
import { darken, Grid, lighten } from "@mui/material";
import { Base16Theme, rainbow } from "../../colors/themes";
import { IntervalCollection } from "note-lib/src/IntervalCollection";

interface IKeySegmentBottomProps {
  activeKeyOrChord: Key | Chord;
  columnWidth: number;
  isRainbowMode: boolean;
  note: Note;
  shouldHighlightPiano: boolean;
  style?: CSSProperties;
  theme: Base16Theme;
}

const KeySegmentBottom = (props: IKeySegmentBottomProps) => {
  const { activeKeyOrChord, columnWidth, isRainbowMode, note, shouldHighlightPiano, theme } = props;
  const noteIsInKey = activeKeyOrChord.hasNote(note);

  const getRainbowColor = (defaultColor: string = "#BBB") => {
    if (isRainbowMode && note && noteIsInKey) {
      const intervalCollection = activeKeyOrChord.getIntervalCollection();
      const semitones: number[] = activeKeyOrChord.getIntervalCollection().intervals.map(
        (interval) => interval.semitones,
      );

      const semitoneColors: string[] = semitones.map(
        (semitone) => rainbow[semitone % intervalCollection.temperament.notes.length],
      );

      const indexFound = activeKeyOrChord.notes.findIndex((noteInKey) => noteInKey.isEquivalent(note));
      return semitoneColors[indexFound];
    }
    else {
      return defaultColor;
    }
  }

  const noteTextStyle: CSSProperties = {
      color: shouldHighlightPiano ? lighten(getRainbowColor(theme.swatch.base0A),.2) : getRainbowColor(lighten("#000",.2)),
      fontWeight: "bold",
      margin: "5px"
    };

  const keySegmentStyle: CSSProperties = {
    backgroundColor: shouldHighlightPiano && noteIsInKey ? darken(getRainbowColor(theme.swatch.base0A), .3) : "white",
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
