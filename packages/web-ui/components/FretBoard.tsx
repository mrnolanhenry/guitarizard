import './FretBoard.scss';
import { instrument, Note, Scale } from "guitarizard-note-lib";
import { Base16Theme } from "../lib/colors";
import FretSegment from "./FretSegment";
import NoteSelector from "./NoteSelector";

interface Props {
  fretBoard: instrument.FretBoard;
  scale: Scale;
  keyNote: Note;
  showFretBar: boolean;
  onTune: (stringID: string, newTuning: Note) => void;
  theme: Base16Theme;
}

export default function FretBoard(props: Props) {

  const fretBarStyle = {
    backgroundColor: props.theme.base00,
    borderColor: props.theme.base01
  };

  const fretBar = props.showFretBar && <div className="fret-labels">
    {[...Array(props.fretBoard.getFretCount())].map((_, i) => {
       return <div style={fretBarStyle}>{i === 0 ? '*' : i}</div>;
    })}
  </div>;

  const tuningPegsStyle = {
    backgroundColor: props.theme.base07,
    color: props.theme.base04,
    borderColor: props.theme.base03
  };

  const tuningPegs = <div className="tuning-pegs" style={tuningPegsStyle}>
  {props.fretBoard.tunedStrings.map(string => {
    return <NoteSelector scaleSystem={props.fretBoard.scaleSystem}
                         note={string.tuningNote}
                         onNoteSelect={(n: Note) => props.onTune(string.id, n)}
                         theme={props.theme} />;
  })}
  </div>;

  const stringStyle = { borderColor: props.theme.base09 };

  const stringScales = props.fretBoard.getNotesInScale(props.scale, props.keyNote);

  const boardStyle = { backgroundColor: props.theme.base0F };

  const strings = stringScales.map(stringScale => {
    const fretSegments = [
      ...Array(props.fretBoard.getFretCount())
    ].map((_, i) => {
      return <FretSegment stringScale={stringScale} fret={i} theme={props.theme} />;
    });

    return (<div className="string" style={stringStyle}>
      {fretSegments}
    </div>);
  });

  const board = <div className="board" style={boardStyle}>{strings}</div>;

  const style = { backgroundColor: props.theme.base00 }

  return <div className="fret-board" style={style}>
    {fretBar}
    {tuningPegs}
    {board}
  </div>;
}
