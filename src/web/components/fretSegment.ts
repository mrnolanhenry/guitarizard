import html from "choo/html";
import { instrument } from "note-lib";
import * as css from "sheetify";
import { Base16Theme } from "../colors";

const prefix = css`
  :host {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host > .inner {
    background-color: pink;
  }
`;

interface Props {
  stringScale: instrument.StringScale;
  fret: number;
  selected: boolean;
  theme: Base16Theme;
}

export default function fretSegment({
  stringScale,
  fret,
  selected,
  theme
}: Props) {
  // Get the note on this string (if it exists)
  const note = stringScale.notes.find(note => {
    return note.fretNumber === fret;
  });

  const noteDisplay = note ? note.value.id : "";

  const style = [
    `background-color: ${selected ? theme.base02 : theme.base01}`
  ].join(";");

  return html`<div class=${prefix} style=${style}>
    <div class="inner">${note ? noteDisplay : ""}</div>
  </div>`;
}
