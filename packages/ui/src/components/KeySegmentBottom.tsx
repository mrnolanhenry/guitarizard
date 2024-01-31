import "./FretSegment.css";
import { Note } from "note-lib";
import React, { CSSProperties } from "react";
import { Grid } from "@mui/material";

interface IKeySegmentBottomProps {
  columnWidth: number;
  note: Note;
  style?: CSSProperties;
}

const KeySegmentBottom = (props: IKeySegmentBottomProps) => {
  const { columnWidth, note } = props;

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
              <Grid item id={`note-text-${note.id}`} className="note-text">
              </Grid>
            </Grid>
          <Grid className="key-line"></Grid>
        </Grid>
      </Grid>
    );
};

export { KeySegmentBottom };
