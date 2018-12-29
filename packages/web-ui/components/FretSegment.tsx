import './FretSegment.scss';
import { instrument } from "guitarizard-note-lib";
import { Base16Theme } from "../lib/colors";

interface Props {
  stringScale: instrument.StringScale;
  fret: number;
  theme: Base16Theme;
}

export default function fretSegment(props: Props) {
  // Get the note on this string (if it exists)
  const note = props.stringScale.notes.find(note => {
    return note.fretNumber === props.fret;
  });

  const noteDisplay = note ? note.value.id : "";

  const fretLineStyle = { backgroundColor: props.theme.base01 };

  const stringLineStyle = { backgroundColor: props.theme.base07 };

  const noteTextStyle = {
    backgroundColor: props.theme.base00,
    color: props.theme.base05
  };

  const backgroundStyle = props.fret <= props.stringScale.config.fret.start ? {
    backgroundColor: props.theme.base01
  }: {};

  return (<div className="fret-segment">
    <div className="background" style={backgroundStyle}></div>
    <div className="inner">
      <div className="string-line" style={stringLineStyle}></div>
      {note && <div className="note-container">
        <div className="note-text" style={noteTextStyle}>{noteDisplay}</div>
      </div>}
      <div className="fret-line" style={fretLineStyle}></div>
    </div>
  </div>);
}
