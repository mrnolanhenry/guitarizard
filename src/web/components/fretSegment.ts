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

    border-width: 0 5px 0 0;
    border-style: solid;
  }

  :host > .inner {
    width: 2em;
    height: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

interface Props {
  stringScale: instrument.StringScale;
  fret: number;
  theme: Base16Theme;
}

export default function fretSegment({ stringScale, fret, theme }: Props) {
  // Get the note on this string (if it exists)
  const note = stringScale.notes.find(note => {
    return note.fretNumber === fret;
  });

  const noteDisplay = note ? note.value.id : "";

  const style = [
    `background-color: ${noteDisplay ? theme.base01 : theme.base00}`,
    `color: ${noteDisplay ? theme.base06 : theme.base03}`,
    `font-weight: ${noteDisplay ? 900 : 300}`,
    `border-color: ${theme.base09}`
  ].join(";");

  return html`<div class=${prefix} style=${style}>
    <div class="inner">${note ? noteDisplay : "-"}</div>
  </div>`;
}
