import { Key, Note } from "note-lib";
import { Base16Theme, rainbow } from "../colors/themes";
import React, { CSSProperties } from "react";
import { Grid } from "@mui/material";

interface INoteTableProps {
  activeKey: Key;
  isLargeScreen: boolean;
  isRainbowMode: boolean;
  theme: Base16Theme;
}

const NoteTable = (props: INoteTableProps) => {
  const { activeKey, isLargeScreen, isRainbowMode, theme } = props;

  const noteStyle: CSSProperties = {
    backgroundColor: theme.swatch.base00,
    color: theme.swatch.base05,
    borderStyle: "solid",
    borderColor: theme.swatch.base01,
    borderWidth: "1px",
  };

  const getNoteTextStyle = (
    isRainbowMode: boolean,
    noteStyle: CSSProperties,
    note: Note | null,
    activeKey: Key,
  ): CSSProperties => {
    let noteTextStyle: CSSProperties = noteStyle;

    if (isRainbowMode && note) {
      const notes: Note[] = activeKey.scale.getNotesInKey(activeKey.note);
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

  const notes: Note[] = activeKey.scale.getNotesInKey(activeKey.note);

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
              key={`${i}:${Math.random()}`}
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
      <Grid item container id="noteRow" xs={xsColumns} sm={xsColumns - 1} lg={xsColumns - 1} columns={isLargeScreen ? xsColumns - 1 : xsColumns}>
        <Grid item className="noteItem" xs={2} sm={1} md={1} lg={1} style={noteStyle}>
          {findFlats ? "Flats:" : "Sharps:"}
        </Grid>
        {mapNotes(findFlats)}
      </Grid>
    );
  };

  return (
    <Grid container id="noteTable">
      <Grid item xs={12}>
        Notes included:
      </Grid>
      {renderNoteRow(true)}
      {renderNoteRow(false)}
    </Grid>
  );
};

export { NoteTable };
