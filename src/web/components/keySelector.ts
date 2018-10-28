import html from "choo/html";
import { Note, ScaleSystem } from "note-lib";

interface Props {
  scaleSystem: ScaleSystem;
  keyNote: Note;
  onKeySelect: (note: Note) => void;
}

export default function keySelector({
  scaleSystem,
  keyNote,
  onKeySelect
}: Props) {
  const options = scaleSystem.getKeyNotes().map((k: Note) => {
    return html`<option selected=${k.id === keyNote.id}
                        value="${k.id}">${k.id}</option>`;
  });

  return html`<select onchange=${onChange}>${options}</select>`;

  function onChange(e: Event) {
    e.preventDefault();

    const keyNoteID = e.target ? (e.target as HTMLSelectElement).value : "";

    const keyNote: Note | undefined = scaleSystem
      .getKeyNotes()
      .find(k => k.id === keyNoteID);

    if (typeof keyNote !== "undefined") {
      onKeySelect(keyNote);
    }
  }
}
