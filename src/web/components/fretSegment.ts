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

    height: 3px;
    align-self: center;
  }

  :host > .inner {
    width: 2em;
    height: 2em;
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 0.5em;
  }

  :host > .horiz-line {
    height: 3px;
    width: 100%;
    min-width: 2em;
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

  const innerStyle = [
    `background-color: ${theme.base01}`,
    `color: ${theme.base0B}`
  ].join(";");

  const horzLineStyle = `background-color: ${theme.base07}`;

  const style = [
    `background-color: ${theme.base07}`,
    `color: ${noteDisplay ? theme.base06 : theme.base03}`,
    `font-weight: ${noteDisplay ? 900 : 300}`,
    `border-color: ${noteDisplay ? theme.base09 : theme.base09}`
  ].join(";");

  return html`<div class=${prefix} style=${style}>
    ${
      note
        ? html`<div class="inner" style=${innerStyle}>${noteDisplay}</div>`
        : html`<div class="horiz-line" style=${horzLineStyle}></div>`
    }
  </div>`;
}
