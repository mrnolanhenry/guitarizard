import "./FretBoard.css";
import React, { CSSProperties } from "react";
import { Key, Note, Temperament } from "note-lib";
import { FretBoard as Fretboard } from "note-lib/src/FretBoard";
import { Base16Theme } from "../colors/themes";
import { ScaleOnCourse } from "note-lib/src/ScaleOnCourse";
import { TunedString } from "note-lib/src/TunedString";
import { Grid } from "@mui/material";
import { KeySegment } from "./KeySegment";
import { KeySegmentBottom } from "./KeySegmentBottom";

interface IKeyBoardProps {
  activeKey: Key;
  fretBoard: Fretboard;
  isMediumScreen: boolean;
  isRainbowMode: boolean;
  onTune: (courseId: string, newTuning: Note) => void;
  temperament: Temperament;
  theme: Base16Theme;
}

const KeyBoard = (props: IKeyBoardProps) => {
  const { activeKey, fretBoard, isMediumScreen, isRainbowMode, onTune, temperament, theme } =
    props;

  const maxFretCount = isMediumScreen && temperament ? Math.round((temperament.notes.length + 1) * 1.5) : fretBoard.getFretCount();
  const columnsCount = maxFretCount * 2;

  // NOLAN TODO - this is terrible lol, figure out spacing a better way
  let columnsRemaining = columnsCount;

  const stringStyle: CSSProperties = { borderColor: theme.swatch.base09 };

  const allNotesOnCourses: ScaleOnCourse[] = fretBoard.getNotes();

  const scalesOnCourses: ScaleOnCourse[] = fretBoard.getNotesInScale(
    activeKey.scale,
    activeKey.note,
  );

  const getWidthBasedOnNeighboringNotes = (scaleOnCourse: ScaleOnCourse, fretNumber: number):number => {
    let columnWidth = 3;
    if (fretNumber !== 0) {
      const prevNote = scaleOnCourse.getNoteFromFretNumber(fretNumber - 1);
      const nextNote = scaleOnCourse.getNoteFromFretNumber(fretNumber + 1);
      if (prevNote && prevNote.isAccidental() && nextNote && nextNote.isAccidental()) {
        columnWidth = 4;
      };
    }
    return Math.min(columnsRemaining, columnWidth);
  };

  const courses = scalesOnCourses.map((scaleOnCourse, courseIndex) => {
    const tunedStrings: TunedString[] = scaleOnCourse.course.tunedStrings;
    const allNotesOnCourse: ScaleOnCourse = allNotesOnCourses[courseIndex];

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
            scaleOnCourse={scaleOnCourse}
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
