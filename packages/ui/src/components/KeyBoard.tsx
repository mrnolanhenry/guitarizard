import "./FretBoard.css";
import React, { CSSProperties } from "react";
import { Key, Note, Temperament } from "note-lib";
import { FretBoard as Fretboard } from "note-lib/src/FretBoard";
import { Base16Theme } from "../colors/themes";
import { NotesOnCourse } from "note-lib/src/NotesOnCourse";
import { TunedString } from "note-lib/src/TunedString";
import { Grid } from "@mui/material";
import { KeySegment } from "./KeySegment";
import { KeySegmentBottom } from "./KeySegmentBottom";

interface IKeyBoardProps {
  activeKey: Key;
  fretBoard: Fretboard;
  isMediumScreen: boolean;
  isLargeScreen: boolean;
  isRainbowMode: boolean;
  onTune: (courseId: string, newTuning: Note) => void;
  shouldHighlightPiano: boolean;
  temperament: Temperament;
  theme: Base16Theme;
}

const KeyBoard = (props: IKeyBoardProps) => {
  const { activeKey, fretBoard, isMediumScreen, isLargeScreen, isRainbowMode, shouldHighlightPiano, temperament, theme } =
    props;

  const getMaxFretCount = () => {
    let maxFretCount = fretBoard.getFretCount();
    const multiple = isMediumScreen ? 1.5 : 2.3;
    if (temperament && (isMediumScreen || isLargeScreen)) {
      maxFretCount = Math.round((temperament.notes.length + 1) * multiple);
    }
    return maxFretCount;
  } 
  const maxFretCount = getMaxFretCount();
  const columnsCount = maxFretCount * 2;

  // NOLAN TODO - figure out spacing a better way, if you can
  let columnsRemaining = columnsCount;

  const stringStyle: CSSProperties = { borderColor: theme.swatch.base09 };

  const allNotesOnCourses: NotesOnCourse[] = fretBoard.getNotes();

  const activeNotesOnCourses: NotesOnCourse[] = fretBoard.getNotesInKey(activeKey);

  const getWidthBasedOnNeighboringNotes = (notesOnCourse: NotesOnCourse, fretNumber: number):number => {
    let columnWidth = 3;
    if (fretNumber !== 0) {
      const prevNote = notesOnCourse.getNoteFromFretNumber(fretNumber - 1);
      const nextNote = notesOnCourse.getNoteFromFretNumber(fretNumber + 1);
      if (prevNote && prevNote.isAccidental() && nextNote && nextNote.isAccidental()) {
        columnWidth = 4;
      }
    }
    return Math.min(columnsRemaining, columnWidth);
  };

  const courses = activeNotesOnCourses.map((notesOnCourse, courseIndex) => {
    const tunedStrings: TunedString[] = notesOnCourse.course.tunedStrings;
    const allNotesOnCourse: NotesOnCourse = allNotesOnCourses[courseIndex];

    return tunedStrings.map((tunedString, stringIndex) => {
      const keySegments = [...Array(maxFretCount)].map((_, i) => {      
        return (
          <KeySegment
            activeKey={activeKey}
            allNotesOnCourse={allNotesOnCourses[courseIndex]}
            columnsCount={columnsCount}
            fret={i}
            key={`fret-segment-${courseIndex}-${stringIndex}-${i}`}
            isRainbowMode={isRainbowMode}
            notesOnCourse={notesOnCourse}
            shouldHighlightPiano={shouldHighlightPiano}
            theme={theme}
          />
        );
      });
      const keySegmentBottoms = [...Array(maxFretCount)].map((_, i) => {
        const note = allNotesOnCourse.getNoteFromFretNumber(i);
        if (note && !note.isAccidental()) {
          const columnWidth = getWidthBasedOnNeighboringNotes(allNotesOnCourse, i);
          columnsRemaining = columnsRemaining - columnWidth;
          return (
            <KeySegmentBottom
              activeKey={activeKey}
              columnWidth={columnWidth}
              note={note}
              key={`fret-segment-${courseIndex}-${stringIndex}-${i}`}
              isRainbowMode={isRainbowMode}
              shouldHighlightPiano={shouldHighlightPiano}
              theme={theme}
            />
          );
        }
      });
      return (
        <Grid
          container
          columns={columnsCount}
          className="string"
          key={`string-${courseIndex}-${stringIndex}`}
          style={stringStyle}
        >
          {keySegments}
          {keySegmentBottoms}
        </Grid>
      );
    });
  });

  const board = (
    <Grid container className="board">
      {courses}
    </Grid>
  );

  const style: CSSProperties = {
    backgroundColor: 'white',
    borderColor: theme.swatch.base00,
  };

  return (
    <Grid container className="key-board" style={style}>
      {board}
    </Grid>
  );
};

export { KeyBoard };
