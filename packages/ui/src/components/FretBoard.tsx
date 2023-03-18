import "./FretBoard.css";
import { Key, Note } from "note-lib";
import { FretBoard as Fretboard } from "../../../note-lib/src/FretBoard";
import { Base16Theme } from "../colors/themes";
import { FretSegment } from "./FretSegment";
import { NoteSelector } from "./selectors/NoteSelector";

interface IFretBoardProps {
  activeKey: Key;
  fretBoard: Fretboard;
  isRainbowMode: boolean;
  onTune: (courseId: string, newTuning: Note) => void;
  showFretBar: boolean;
  theme: Base16Theme;
}

const FretBoard = (props: IFretBoardProps) => {
  const { 
    activeKey, 
    fretBoard, 
    isRainbowMode, 
    onTune, 
    showFretBar, 
    theme 
  } = props;
  const fretBarStyle = {
    backgroundColor: theme.base00,
    borderColor: theme.base01,
  };

  const fretBar = showFretBar && (
    <div className="fret-labels">
      {[...Array(fretBoard.getFretCount())].map((_, i) => {
        // TODO: this is a terrible key
        return (
          <div key={`${i}:${Math.random()}`} style={fretBarStyle}>
            {i === 0 ? "*" : i}
          </div>
        );
      })}
    </div>
  );

  const tuningPegsStyle = {
    backgroundColor: theme.base07,
    color: theme.base04,
    borderColor: theme.base03,
    boxShadow: "2px 0px " + theme.base07,
  };

  const tuningPegs = (
    <div className="tuning-pegs" style={tuningPegsStyle}>
      {fretBoard.courses.map((course) => {
        return (
          <NoteSelector
            key={course.id}
            temperament={fretBoard.temperament}
            note={course.tunedStrings[0].tuningNote}
            onNoteSelect={(n: Note) =>
              onTune(course.id, n)
            }
            theme={theme}
          />
        );
      })}
    </div>
  );

  const stringStyle = { borderColor: theme.base09 };

  const stringScales = fretBoard.getNotesInScale(
    activeKey.scale,
    activeKey.note
  );

  const boardStyle = { backgroundColor: theme.base0F };

  const strings = stringScales.map((stringScale, idx) => {
    const fretSegments = [...Array(fretBoard.getFretCount())].map(
      (_, i) => {
        // TODO: this is a terrible key
        return (
          <FretSegment
            key={`${i}:${Math.random()}`}
            activeKey={activeKey}
            stringScale={stringScale}
            fret={i}
            isRainbowMode={isRainbowMode}
            theme={theme}
          />
        );
      }
    );

    // TODO: this is a terrible key
    return (
      <div
        key={`${idx}:${Math.random()}`}
        className="string"
        style={stringStyle}
      >
        {fretSegments}
      </div>
    );
  });

  const board = (
    <div className="board" style={boardStyle}>
      {strings}
    </div>
  );

  const style = {
    backgroundColor: theme.base00,
    borderColor: theme.base00,
  };

  return (
    <div className="fret-board" style={style}>
      {fretBar}
      {tuningPegs}
      {board}
    </div>
  );
}

export { FretBoard };
