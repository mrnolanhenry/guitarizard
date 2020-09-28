import "./FretSegment.scss";
import { instrument, Key, Note } from "guitarizard-note-lib";
import { Base16Theme, rainbow } from "../lib/colors";

interface Props {
  stringScale: instrument.StringScale;
  fret: number;
  theme: Base16Theme;
  isRainbowMode: boolean;
  activeKey: Key;
}

const getNoteTextStyle = (isRainbowMode: boolean, theme: Base16Theme, note: any, activeKey: Key) => {
  let noteTextStyle: any = {
    backgroundColor: theme.base00,
    color: theme.base05
  };

  if (isRainbowMode && note) {
    let notes = activeKey.scale.getNotesInKey(activeKey.note);
    let semitones = activeKey.scale.intervals.map(
      (interval) => interval.semitones
    );

    let semitoneColors = semitones.map((semitone) => rainbow[semitone]);

    let noteIntervalColorCombos = notes.map((n, i) => ({
      note: n,
      semitone: semitones[i],
      semitoneColor: semitoneColors[i],
    }));

    const thisNoteIntervalColorCombo = noteIntervalColorCombos.find((noteIntervalColorCombo) => noteIntervalColorCombo.note.isSimilar(note.value));

    if (thisNoteIntervalColorCombo) {
      noteTextStyle = {
        backgroundColor: thisNoteIntervalColorCombo.semitoneColor,
        color: theme.base00,
        fontWeight: 550,
      }
    }

  }
  return noteTextStyle;
}

export default function fretSegment(props: Props) {
  const {
    fret,
    isRainbowMode,
    stringScale,
    theme,
    activeKey,
  } = props;

  // Get the note on this string (if it exists)
  const note = stringScale.notes.find((note) => {
    return note.fretNumber === fret;
  });

  const noteDisplay = note ? note.value.id : "";

  const fretLineStyle = { backgroundColor: theme.base07 };

  const stringLineStyle = { backgroundColor: theme.base0E };

  const noteTextStyle = getNoteTextStyle(isRainbowMode, theme, note, activeKey);

  const backgroundStyle =
    fret <= stringScale.config.fret.start
      ? {
        backgroundColor: theme.base01,
      }
      : {};

  return (
    <div className="fret-segment">
      <div className="background" style={backgroundStyle}></div>
      <div className="inner">
        <div className="string-line" style={stringLineStyle}></div>
        {note && (
          <div className="note-container">
            <div className="note-text" style={noteTextStyle}>
              {noteDisplay}
            </div>
          </div>
        )}
        <div className="fret-line" style={fretLineStyle}></div>
      </div>
    </div>
  );
}
