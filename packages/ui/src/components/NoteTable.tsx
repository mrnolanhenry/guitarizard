import { Key, Note } from "note-lib";
import { Base16Theme, rainbow } from "../colors/themes";
import React, { CSSProperties } from "react";
import { Grid } from "@mui/material";

interface INoteTableProps {
  activeKey: Key;
  isSmallScreen: boolean;
  isRainbowMode: boolean;
  theme: Base16Theme;
}

const NoteTable = (props: INoteTableProps) => {
  const { activeKey, isSmallScreen, isRainbowMode, theme } = props;
  const fontSize: string = isSmallScreen ? "12px" : "inherit";

  const noteStyle: CSSProperties = {
    backgroundColor: theme.swatch.base00,
    color: theme.swatch.base05,
    borderStyle: "solid",
    borderColor: theme.swatch.base01,
    borderWidth: "1px",
    padding: "1px 0px 1px 5px",
    fontSize: fontSize,
    minHeight: isSmallScreen ? "40px" : "auto",
  };

  const getNoteTextStyle = (
    isRainbowMode: boolean,
    noteStyle: CSSProperties,
    note: Note | null,
    activeKey: Key,
  ): CSSProperties => {
    let noteTextStyle: CSSProperties = noteStyle;

    if (isRainbowMode && note) {
      const notes: Note[] = activeKey.notesInKey;
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
          color: thisNoteIntervalColorCombo.semitoneColor,
        };
      }
    }
    return noteTextStyle;
  };

  const notes: Note[] = activeKey.notesInKey;

  const mapNotes = (findFlats: boolean): JSX.Element => {
    return (
      <>
        {notes.map((note, i) => {
          const correctNote = findFlats
            ? note.findFlatOrNatural()
            : note.findSharpOrNatural();

          const noteTextStyle = getNoteTextStyle(
            isRainbowMode,
            noteStyle,
            correctNote,
            activeKey,
          );

          return (
            <Grid item xs={1}
              key={`note-item-${i}:${(correctNote as Note).id}`}
              className="noteItem"
              style={noteTextStyle}
            >
              {correctNote ? correctNote.id : ""}
            </Grid>
          );
        })}
      </>
    );
  };

  const renderNoteRow = (findFlats: boolean): JSX.Element => {
    const xsColumns: number = notes.length + 2;

    return (
      <Grid item container id="noteRow" xs={xsColumns} sm={xsColumns - 1} lg={xsColumns - 1} columns={isSmallScreen ? xsColumns : xsColumns - 1}>
        <Grid item className="noteItem" xs={2} sm={1} md={1} lg={1} style={noteStyle}>
          {findFlats ? "Flats:" : "Sharps:"}
        </Grid>
        {mapNotes(findFlats)}
      </Grid>
    );
  };

  const renderNoteColumn = (findFlats: boolean): JSX.Element => {
    return (
      <Grid item container id="noteColumn" direction="column">
        <Grid item className="noteItem" xs={2} sm={1} md={1} lg={1} style={noteStyle}>
          {findFlats ? "Flats:" : "Sharps:"}
        </Grid>
        {mapNotes(findFlats)}
      </Grid>
    );
  };

  const renderNoteData = (isSmallScreen: boolean, findFlats: boolean) => isSmallScreen ? renderNoteColumn(findFlats) : renderNoteRow(findFlats);
  const renderNoteDataTable = () => {
    return isSmallScreen ?
    <Grid container item>
      <Grid item xs={6}>{renderNoteData(isSmallScreen, true)}</Grid>
      <Grid item xs={6}>{renderNoteData(isSmallScreen, false)}</Grid>
    </Grid> :
    <>
      {renderNoteData(isSmallScreen, true)}
      {renderNoteData(isSmallScreen, false)}
    </>
  }

  return (
    <Grid container id="noteTable">
      <Grid item xs={12}>
        <span style={{fontSize: fontSize}}>Notes included:</span>
      </Grid>
      {renderNoteDataTable()}
    </Grid>
  );
};

export { NoteTable };
