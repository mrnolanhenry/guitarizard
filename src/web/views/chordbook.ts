import html from "choo/html";
import { Note, Scale, ScaleSystem, instrument } from "note-lib";
import keySelector from "./keySelector";
import instrumentSelector from "./instrumentSelector";

interface Props {
  instruments: Array<instrument.FrettedInstrument>;
  activeInstrument: instrument.FrettedInstrument;
  activeScale: Scale;
  keyNote: Note;
  scaleSystem: ScaleSystem;
  onKeySelect: (keyNote: Note) => void;
  onInstrumentSelect: (instrument: instrument.FrettedInstrument) => void;
}

export default function chordbook({
  instruments,
  activeInstrument,
  activeScale,
  keyNote,
  scaleSystem,
  onKeySelect,
  onInstrumentSelect
}: Props) {
  return html`
    <div>
      ${instrumentSelector({
        activeInstrument,
        instruments,
        onInstrumentSelect
      })}
      ${keySelector({ scaleSystem, keyNote, onKeySelect })}
      <table>
        <tr><td>activeInstrument:</td><td>${activeInstrument.name}</td></tr>
        <tr><td>activeScaleName:</td><td>${activeScale.name}</td></tr>
        <tr><td>keyNote:</td><td>${keyNote.id}</td></tr>
        <tr><td>scaleSystem:</td><td>${scaleSystem.name}</td></tr>
      </table>
      <h1>chordbook :)!!</h1>
    </div>`;
}
