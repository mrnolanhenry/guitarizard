import "./FretBoard.css";
import React, { CSSProperties } from "react";
import { Key, Note } from "note-lib";
import { FretBoard as Fretboard } from "../../../note-lib/src/FretBoard";
import { Base16Theme } from "../colors/themes";
import { FretSegment } from "./FretSegment";
import { NoteSelector } from "./selectors/NoteSelector";
import { ScaleOnCourse } from "note-lib/src/ScaleOnCourse";
import { TunedString } from "note-lib/src/TunedString";

interface IFretBoardProps {
  activeKey: Key;
  fretBoard: Fretboard;
  isRainbowMode: boolean;
  onTune: (courseId: string, newTuning: Note) => void;
  showFretBar: boolean;
  theme: Base16Theme;
}

const FretBoard = (props: IFretBoardProps) => {
  const { activeKey, fretBoard, isRainbowMode, onTune, showFretBar, theme } =
    props;
  const fretBarStyle: CSSProperties = {
    backgroundColor: theme.swatch.base00,
    borderColor: theme.swatch.base01,
  };

  const fretBar = showFretBar && (
    <div className="fret-labels">
      {[...Array(fretBoard.getFretCount())].map((_, i) => {
        return (
          <div key={`fret-${i}`} style={fretBarStyle}>
            {i === 0 ? "*" : i}
          </div>
        );
      })}
    </div>
  );

  const tuningPegsStyle: CSSProperties = {
    backgroundColor: theme.swatch.base07,
    color: theme.swatch.base04,
    borderColor: theme.swatch.base03,
    boxShadow: "2px 0px " + theme.swatch.base07,
  };

  const tuningPegs = (
    <div className="tuning-pegs" style={tuningPegsStyle}>
      {fretBoard.courses.map((course) => {
        return (
          <NoteSelector
            id={course.id}
            key={course.id}
            temperament={fretBoard.temperament}
            note={course.tunedStrings[0].tuningNote}
            onNoteSelect={(n: Note) => onTune(course.id, n)}
            theme={theme}
          />
        );
      })}
    </div>
  );

  const stringStyle: CSSProperties = { borderColor: theme.swatch.base09 };
  const boardStyle: CSSProperties = { backgroundColor: theme.swatch.base0F };

  const scalesOnCourses: ScaleOnCourse[] = fretBoard.getNotesInScale(
    activeKey.scale,
    activeKey.note,
  );

  const courses = scalesOnCourses.map((scaleOnCourse, courseIndex) => {
    const tunedStrings: TunedString[] = scaleOnCourse.course.tunedStrings;
    return tunedStrings.map((tunedString, stringIndex) => {
      // only want to return true for this if there are multiple strings in 1 course
      // and it is the last string in the course
      // const isLastStringInCourse: boolean = !!(stringIndex) && stringIndex === tunedStrings.length - 1;
      // const lastStringStyle = {paddingTop: ".5em"};
      const fretSegments = [...Array(fretBoard.getFretCount())].map((_, i) => {
        return (
          <FretSegment
            activeKey={activeKey}
            fret={i}
            key={`fret-segment-${courseIndex}-${stringIndex}-${i}`}
            isRainbowMode={isRainbowMode}
            scaleOnCourse={scaleOnCourse}
            // style={isLastStringInCourse ? lastStringStyle : {}}
            theme={theme}
          />
        );
      });

      return (
        <div
          className="string"
          key={`string-${courseIndex}-${stringIndex}`}
          style={stringStyle}
        >
          {fretSegments}
        </div>
      );
    });
  });

  const board = (
    <div className="board" style={boardStyle}>
      {courses}
    </div>
  );

  const style: CSSProperties = {
    backgroundColor: theme.swatch.base00,
    borderColor: theme.swatch.base00,
  };

  return (
    <div className="fret-board" style={style}>
      {fretBar}
      {tuningPegs}
      {board}
    </div>
  );
};

export { FretBoard };
