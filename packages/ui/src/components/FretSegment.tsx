import "./FretSegment.css";
import { Key, Note } from "note-lib";
import { NoteID } from "note-lib/src/Note";
import { Base16Theme, rainbow } from "../colors/themes";
import React, { CSSProperties } from "react";
import { ScaleOnCourse } from "note-lib/src/ScaleOnCourse";
import { NoteFretNumberPair } from "note-lib/src/NoteFretNumberPair";

interface IFretSegmentProps {
  scaleOnCourse: ScaleOnCourse;
  fret: number;
  theme: Base16Theme;
  isRainbowMode: boolean;
  activeKey: Key;
  style?: CSSProperties;
}

const getNoteTextStyle = (
  isRainbowMode: boolean,
  theme: Base16Theme,
  note: Note | undefined,
  activeKey: Key,
): CSSProperties => {
  let noteTextStyle: CSSProperties = {
    backgroundColor: theme.swatch.base00,
    color: theme.swatch.base05,
  };

  if (isRainbowMode && note) {
    const semitones: number[] = activeKey.scale.intervals.map(
      (interval) => interval.semitones,
    );

    const semitoneColors: string[] = semitones.map(
      (semitone) => rainbow[semitone],
    );

    const noteIntervalColorCombos = activeKey.notes.map((n, i) => ({
      note: n,
      semitone: semitones[i],
      semitoneColor: semitoneColors[i],
    }));

    const thisNoteIntervalColorCombo = noteIntervalColorCombos.find(
      (noteIntervalColorCombo) => noteIntervalColorCombo.note.isEquivalent(note),
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

// A note as defined by MIT.
type MITNote = { note: string, frequency_hz: number, wavelength_cm: number }

// - - -
// notes for "A is 440".
//
// Note Frequencies sourced from:
// --> https://pages.mtu.edu/~suits/notefreqs.html
const a_440_fr3qu3ncy_list: MITNote[] = [
  { note: "C0", frequency_hz: 16.35, wavelength_cm: 2109.89 },
  { note: "C#0/Db0", frequency_hz: 17.32, wavelength_cm: 1991.47 },
  { note: "D0", frequency_hz: 18.35, wavelength_cm: 1879.69 },
  { note: "D#0/Eb0", frequency_hz: 19.45, wavelength_cm: 1774.20 },
  { note: "E0", frequency_hz: 20.60, wavelength_cm: 1674.62 },
  { note: "F0", frequency_hz: 21.83, wavelength_cm: 1580.63 },
  { note: "F#0/Gb0", frequency_hz: 23.12, wavelength_cm: 1491.91 },
  { note: "G0", frequency_hz: 24.50, wavelength_cm: 1408.18 },
  { note: "G#0/Ab0", frequency_hz: 25.96, wavelength_cm: 1329.14 },
  { note: "A0", frequency_hz: 27.50, wavelength_cm: 1254.55 },
  { note: "A#0/Bb0", frequency_hz: 29.14, wavelength_cm: 1184.13 },
  { note: "B0", frequency_hz: 30.87, wavelength_cm: 1117.67 },
  { note: "C1", frequency_hz: 32.70, wavelength_cm: 1054.94 },
  { note: "C#1/Db1", frequency_hz: 34.65, wavelength_cm: 995.73 },
  { note: "D1", frequency_hz: 36.71, wavelength_cm: 939.85 },
  { note: "D#1/Eb1", frequency_hz: 38.89, wavelength_cm: 887.10 },
  { note: "E1", frequency_hz: 41.20, wavelength_cm: 837.31 },
  { note: "F1", frequency_hz: 43.65, wavelength_cm: 790.31 },
  { note: "F#1/Gb1", frequency_hz: 46.25, wavelength_cm: 745.96 },
  { note: "G1", frequency_hz: 49.00, wavelength_cm: 704.09 },
  { note: "G#1/Ab1", frequency_hz: 51.91, wavelength_cm: 664.57 },
  { note: "A1", frequency_hz: 55.00, wavelength_cm: 627.27 },
  { note: "A#1/Bb1", frequency_hz: 58.27, wavelength_cm: 592.07 },
  { note: "B1", frequency_hz: 61.74, wavelength_cm: 558.84 },
  { note: "C2", frequency_hz: 65.41, wavelength_cm: 527.47 },
  { note: "C#2/Db2", frequency_hz: 69.30, wavelength_cm: 497.87 },
  { note: "D2", frequency_hz: 73.42, wavelength_cm: 469.92 },
  { note: "D#2/Eb2", frequency_hz: 77.78, wavelength_cm: 443.55 },
  { note: "E2", frequency_hz: 82.41, wavelength_cm: 418.65 },
  { note: "F2", frequency_hz: 87.31, wavelength_cm: 395.16 },
  { note: "F#2/Gb2", frequency_hz: 92.50, wavelength_cm: 372.98 },
  { note: "G2", frequency_hz: 98.00, wavelength_cm: 352.04 },
  { note: "G#2/Ab2", frequency_hz: 103.83, wavelength_cm: 332.29 },
  { note: "A2", frequency_hz: 110.00, wavelength_cm: 313.64 },
  { note: "A#2/Bb2", frequency_hz: 116.54, wavelength_cm: 296.03 },
  { note: "B2", frequency_hz: 123.47, wavelength_cm: 279.42 },
  { note: "C3", frequency_hz: 130.81, wavelength_cm: 263.74 },
  { note: "C#3/Db3", frequency_hz: 138.59, wavelength_cm: 248.93 },
  { note: "D3", frequency_hz: 146.83, wavelength_cm: 234.96 },
  { note: "D#3/Eb3", frequency_hz: 155.56, wavelength_cm: 221.77 },
  { note: "E3", frequency_hz: 164.81, wavelength_cm: 209.33 },
  { note: "F3", frequency_hz: 174.61, wavelength_cm: 197.58 },
  { note: "F#3/Gb3", frequency_hz: 185.00, wavelength_cm: 186.49 },
  { note: "G3", frequency_hz: 196.00, wavelength_cm: 176.02 },
  { note: "G#3/Ab3", frequency_hz: 207.65, wavelength_cm: 166.14 },
  { note: "A3", frequency_hz: 220.00, wavelength_cm: 156.82 },
  { note: "A#3/Bb3", frequency_hz: 233.08, wavelength_cm: 148.02 },
  { note: "B3", frequency_hz: 246.94, wavelength_cm: 139.71 },
  { note: "C4", frequency_hz: 261.63, wavelength_cm: 131.87 },
  { note: "C#4/Db4", frequency_hz: 277.18, wavelength_cm: 124.47 },
  { note: "D4", frequency_hz: 293.66, wavelength_cm: 117.48 },
  { note: "D#4/Eb4", frequency_hz: 311.13, wavelength_cm: 110.89 },
  { note: "E4", frequency_hz: 329.63, wavelength_cm: 104.66 },
  { note: "F4", frequency_hz: 349.23, wavelength_cm: 98.79 },
  { note: "F#4/Gb4", frequency_hz: 369.99, wavelength_cm: 93.24 },
  { note: "G4", frequency_hz: 392.00, wavelength_cm: 88.01 },
  { note: "G#4/Ab4", frequency_hz: 415.30, wavelength_cm: 83.07 },
  { note: "A4", frequency_hz: 440.00, wavelength_cm: 78.41 },
  { note: "A#4/Bb4", frequency_hz: 466.16, wavelength_cm: 74.01 },
  { note: "B4", frequency_hz: 493.88, wavelength_cm: 69.85 },
  { note: "C5", frequency_hz: 523.25, wavelength_cm: 65.93 },
  { note: "C#5/Db5", frequency_hz: 554.37, wavelength_cm: 62.23 },
  { note: "D5", frequency_hz: 587.33, wavelength_cm: 58.74 },
  { note: "D#5/Eb5", frequency_hz: 622.25, wavelength_cm: 55.44 },
  { note: "E5", frequency_hz: 659.25, wavelength_cm: 52.33 },
  { note: "F5", frequency_hz: 698.46, wavelength_cm: 49.39 },
  { note: "F#5/Gb5", frequency_hz: 739.99, wavelength_cm: 46.62 },
  { note: "G5", frequency_hz: 783.99, wavelength_cm: 44.01 },
  { note: "G#5/Ab5", frequency_hz: 830.61, wavelength_cm: 41.54 },
  { note: "A5", frequency_hz: 880.00, wavelength_cm: 39.20 },
  { note: "A#5/Bb5", frequency_hz: 932.33, wavelength_cm: 37.00 },
  { note: "B5", frequency_hz: 987.77, wavelength_cm: 34.93 },
  { note: "C6", frequency_hz: 1046.50, wavelength_cm: 32.97 },
  { note: "C#6/Db6", frequency_hz: 1108.73, wavelength_cm: 31.12 },
  { note: "D6", frequency_hz: 1174.66, wavelength_cm: 29.37 },
  { note: "D#6/Eb6", frequency_hz: 1244.51, wavelength_cm: 27.72 },
  { note: "E6", frequency_hz: 1318.51, wavelength_cm: 26.17 },
  { note: "F6", frequency_hz: 1396.91, wavelength_cm: 24.70 },
  { note: "F#6/Gb6", frequency_hz: 1479.98, wavelength_cm: 23.31 },
  { note: "G6", frequency_hz: 1567.98, wavelength_cm: 22.00 },
  { note: "G#6/Ab6", frequency_hz: 1661.22, wavelength_cm: 20.77 },
  { note: "A6", frequency_hz: 1760.00, wavelength_cm: 19.60 },
  { note: "A#6/Bb6", frequency_hz: 1864.66, wavelength_cm: 18.50 },
  { note: "B6", frequency_hz: 1975.53, wavelength_cm: 17.46 },
  { note: "C7", frequency_hz: 2093.00, wavelength_cm: 16.48 },
  { note: "C#7/Db7", frequency_hz: 2217.46, wavelength_cm: 15.56 },
  { note: "D7", frequency_hz: 2349.32, wavelength_cm: 14.69 },
  { note: "D#7/Eb7", frequency_hz: 2489.02, wavelength_cm: 13.86 },
  { note: "E7", frequency_hz: 2637.02, wavelength_cm: 13.08 },
  { note: "F7", frequency_hz: 2793.83, wavelength_cm: 12.35 },
  { note: "F#7/Gb7", frequency_hz: 2959.96, wavelength_cm: 11.66 },
  { note: "G7", frequency_hz: 3135.96, wavelength_cm: 11.00 },
  { note: "G#7/Ab7", frequency_hz: 3322.44, wavelength_cm: 10.38 },
  { note: "A7", frequency_hz: 3520.00, wavelength_cm: 9.80 },
  { note: "A#7/Bb7", frequency_hz: 3729.31, wavelength_cm: 9.25 },
  { note: "B7", frequency_hz: 3951.07, wavelength_cm: 8.73 },
  { note: "C8", frequency_hz: 4186.01, wavelength_cm: 8.24 },
  { note: "C#8/Db8", frequency_hz: 4434.92, wavelength_cm: 7.78 },
  { note: "D8", frequency_hz: 4698.63, wavelength_cm: 7.34 },
  { note: "D#8/Eb8", frequency_hz: 4978.03, wavelength_cm: 6.93 },
  { note: "E8", frequency_hz: 5274.04, wavelength_cm: 6.54 },
  { note: "F8", frequency_hz: 5587.65, wavelength_cm: 6.17 },
  { note: "F#8/Gb8", frequency_hz: 5919.91, wavelength_cm: 5.83 },
  { note: "G8", frequency_hz: 6271.93, wavelength_cm: 5.50 },
  { note: "G#8/Ab8", frequency_hz: 6644.88, wavelength_cm: 5.19 },
  { note: "A8", frequency_hz: 7040.00, wavelength_cm: 4.90 },
  { note: "A#8/Bb8", frequency_hz: 7458.62, wavelength_cm: 4.63 },
  { note: "B8", frequency_hz: 7902.13, wavelength_cm: 4.37 }
];


// TODO: the "number of the note" does not exist in the Note class
//       yet, but once it does, we can replace the hard-coded "5"
//       with the proper value.
function findMitNote(a_fr3quency_list: MITNote[], noteName: string): MITNote | undefined {
  return a_fr3quency_list.find(value => new RegExp(`${noteName}5`).test(value.note));
}


// Notes that are currently playing on the page.
let active_notes: {
  [id: NoteID]: {
    note: Note,
    oscillator: OscillatorNode,
  }
}= {};


const stopNote = (note: Note) => {
  const mitNote = findMitNote(a_440_fr3qu3ncy_list, note.id);

  if (mitNote) {

    let active_note = active_notes[note.id]

    if (active_note) {
      active_note.oscillator.stop();
      delete active_notes[note.id];
    }
  }
};

const startNote = (note: Note) => {
  const mitNote = findMitNote(a_440_fr3qu3ncy_list, note.id);

  if (mitNote) {
    // create web audio api context
    const audioCtx = new window.AudioContext();

    // create Oscillator node
    var oscillator = audioCtx.createOscillator();

    oscillator.type = 'square';
    oscillator.frequency.value = mitNote.frequency_hz; // value in hertz
    oscillator.connect(audioCtx.destination);
    oscillator.start();

    active_notes[note.id] = {
      note,
      oscillator
    };
  }
}



// ----------------------------------------------------------------------------------
//
//    > RENDER
//
const FretSegment = (props: IFretSegmentProps) => {
  const { fret, isRainbowMode, scaleOnCourse, theme, activeKey } = props;

  // Get the note on this string (if it exists)
  const noteFretNumberPair: NoteFretNumberPair | undefined =
    scaleOnCourse.notes.find((note) => note.fretNumber === fret);

  const note: Note | undefined = noteFretNumberPair
    ? noteFretNumberPair.value
    : undefined;
  const noteDisplay: string = note ? note.id : "";

  const fretLineStyle: CSSProperties = { backgroundColor: theme.swatch.base07 };
  const stringLineStyle: CSSProperties = { backgroundColor: theme.swatch.base0E };

  const noteTextStyle: CSSProperties = getNoteTextStyle(
    isRainbowMode,
    theme,
    note,
    activeKey,
  );

  const backgroundStyle: CSSProperties =
    fret <= scaleOnCourse.config.fret.start
      ? { backgroundColor: theme.swatch.base01 }
      : {};

  return (
    <div className="fret-segment">
      <div className="background" style={backgroundStyle}></div>
      <div className="inner">
        <div className="string-line" style={stringLineStyle}></div>
        {note && (
          <div className="note-container">
            <div className="note-text"
              style={noteTextStyle}
              onMouseUp={() => stopNote(note)}
              onMouseOut={() => stopNote(note)}
              onMouseDown={() => startNote(note)}>
              {noteDisplay}
            </div>
          </div>
        )}
        <div className="fret-line" style={fretLineStyle}></div>
      </div>
    </div>
  );
};

export { FretSegment };
