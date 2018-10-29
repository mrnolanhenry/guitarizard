import * as noteLib from "note-lib";
import { Note, Scale, instrument } from "note-lib";
import { Base16Theme } from "../colors";
import fretBoard from "./fretBoard";

interface Props {
  fretCount: number;
  tuningNoteIDs: Array<string>;
  keyNote: Note;
  scale: Scale;
  theme: Base16Theme;
}

export default function guitar({
  fretCount,
  tuningNoteIDs,
  keyNote,
  scale,
  theme
}: Props) {
  const diatonic = noteLib.data.scaleSystem.diatonic;

  const tuningNotes = tuningNoteIDs.map(noteStr =>
    diatonic.getNoteFromID(noteStr)
  );

  const guitar = new instrument.Guitar(fretCount, tuningNotes);

  const notesInScale = guitar.fretBoard.getNotesInScale(scale, keyNote);

  const tunedStrings = tuningNotes.map(
    tuningNote => new instrument.TunedString(tuningNote, "metal", 0.1)
  );

  return fretBoard({
    scaleSystem: diatonic,
    fretCount: guitar.fretBoard.fretCount,
    tunedStrings,
    stringScales: notesInScale,
    showFretBar: true,
    onTune: (_: any) => {},
    theme
  });
}
