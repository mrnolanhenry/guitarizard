import "./TopBar.css";
import React from "react";
import { Grid } from "@mui/material";

interface KeyOrChordSearchHelpMenuProps {
  isKey: boolean
}

const getChordSearchByNameText = ()=> {
  return (
    <>
      <p>You can search for chords directly by name, using either full names, abbreviations, or symbols.</p>
      <p style={{marginLeft: "1.5rem"}}>Example 1: <i>"G°7," "Gdim7," "G diminished 7th,"</i> or <i>"G diminished seventh"</i></p>
      <p style={{marginLeft: "1.5rem"}}>Example 2: <i>"Ebm", "E♭min,"</i> or <i>"Eb minor"</i></p>
    </>
  )
}

const getKeySearchByNameText = ()=> {
  return (
    <>
      <p>You can search for keys directly by name, either by including the tonic (first note) or not.</p>
      <p style={{marginLeft: "1.5rem"}}>Example 1: <i>"Eb blues", "E♭ aeolian,"</i> or <i>"D# phrygian"</i></p>
      <p style={{marginLeft: "1.5rem"}}>Example 2: <i>"pentatonic", "lydian"</i> or <i>"aug"</i></p>
    </>
  )
}

const getKeyOrChordSearchByNameText = (isKey: boolean)=> {
  return isKey ? getKeySearchByNameText() : getChordSearchByNameText();
}

const getKeyOrChordSearchByNotesText = (isKey: boolean)=> {
  const item = isKey ? "key" : "chord";
  return (
    <>
      <p>You can search for {item}s by typing each note in the {item}, separated by commas.</p>
      <p style={{marginLeft: "1.5rem"}}>Example 1: <i>"A, F#, Db, C"</i></p>
      <p>You can also specify notes that are specifically NOT in the {item} you're looking for, by adding a <i>"-"</i> before the note.</p>
      <p style={{marginLeft: "1.5rem"}}>Example 2: <i>"A, F#, -G, Db, C"</i> will return {item}s that include A, F#, Db, and C, but does not include G.</p>
    </>
  )
}

const KeyOrChordSearchHelpMenu = (props: KeyOrChordSearchHelpMenuProps) => {
  const { isKey } = props;
  return (
    <Grid container className="chord-search-help" alignItems="center">
      <Grid container item padding={1}>
        <Grid container borderBottom={1} marginBottom={2}>
          <span>Searching by Name:</span>
        </Grid>
        <Grid container alignItems="center" paddingLeft={2} paddingRight={2}>
          <Grid item xs={12} sm={12}>
            {getKeyOrChordSearchByNameText(isKey)}
          </Grid>
        </Grid>
      </Grid>
      <Grid container item padding={1}>
        <Grid container borderBottom={1} marginBottom={2}>
            <span>Searching by Notes:</span>
        </Grid>
        <Grid container alignItems="center" paddingLeft={2} paddingRight={2}>
          <Grid item xs={12} sm={12}>
            {getKeyOrChordSearchByNotesText(isKey)}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export { KeyOrChordSearchHelpMenu };
