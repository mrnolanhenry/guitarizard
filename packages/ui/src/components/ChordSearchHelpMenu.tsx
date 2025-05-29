import "./TopBar.css";
import React from "react";
import { Grid } from "@mui/material";

const ChordSearchHelpMenu = () => {
  return (
    <Grid container className="chord-search-help" alignItems="center">
      <Grid container item padding={1}>
        <Grid container borderBottom={1} marginBottom={2}>
          <span>Searching by Name:</span>
        </Grid>
        <Grid container alignItems="center" paddingLeft={2} paddingRight={2}>
          <Grid item xs={12} sm={12}>
              <p>You can search for chords directly by name, using either full names, abbreviations, or symbols.</p>
              <p style={{marginLeft: "1.5rem"}}>Example 1: <i>"G°7," "Gdim7," "G diminished 7th,"</i> or <i>"G diminished seventh"</i></p>
              <p style={{marginLeft: "1.5rem"}}>Example 2: <i>"Ebm", "E♭min,"</i> or <i>"Eb minor"</i></p>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item padding={1}>
        <Grid container borderBottom={1} marginBottom={2}>
            <span>Searching by Notes:</span>
        </Grid>
        <Grid container alignItems="center" paddingLeft={2} paddingRight={2}>
          <Grid item xs={12} sm={12}>
              <p>You can search for chords by typing each note in the chord, separated by commas.</p>
              <p style={{marginLeft: "1.5rem"}}>Example 1: <i>"A, F#, Db, C"</i></p>
              <p>You can also specify notes that are specifically NOT in the chord you're looking for, by adding a <i>"-"</i> before the note.</p>
              <p style={{marginLeft: "1.5rem"}}>Example 2: <i>"A, F#, -G, Db, C"</i> will return chords that include A, F#, Db, and C, but does not include G.</p>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export { ChordSearchHelpMenu };
