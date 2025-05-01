import "./FretSegment.css";
import { Key, Note } from "note-lib";
import { CSSProperties } from "react";
import { darken, Grid } from "@mui/material";
import { Base16Theme, rainbow } from "../colors/themes";

interface IKeySegmentBottomProps {
  activeKey: Key;
  columnWidth: number;
  isRainbowMode: boolean;
  note: Note;
  shouldHighlightPiano: boolean;
  style?: CSSProperties;
  theme: Base16Theme;
}

const KeySegmentBottom = (props: IKeySegmentBottomProps) => {
  const { activeKey, columnWidth, isRainbowMode, note, shouldHighlightPiano, theme } = props;
  const notesInKey: Note[] = activeKey.scale.getNotesInKey(activeKey.note);
  const noteIsInKey = !!notesInKey.find((noteInKey) => noteInKey.isSimilar(note));

  const getRainbowColor = (defaultColor: string = "#BBB") => {
    if (isRainbowMode && note && noteIsInKey) {
      const semitones: number[] = activeKey.scale.intervals.map(
        (interval) => interval.semitones,
      );

      const semitoneColors: string[] = semitones.map(
        (semitone) => rainbow[semitone],
      );

      const indexFound = notesInKey.findIndex((noteInKey) => noteInKey.isSimilar(note));
      return semitoneColors[indexFound];
    }
    else {
      return defaultColor;
    }
  }

  const noteTextStyle: CSSProperties = {
      color: shouldHighlightPiano ? getRainbowColor(theme.swatch.base0A) : getRainbowColor(),
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
