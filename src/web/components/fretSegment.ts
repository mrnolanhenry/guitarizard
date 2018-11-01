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
    align-self: center;
  }

  :host > .inner {
    width: 100%;
    min-width: 2em;
  }

  :host > .inner > .string-line {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    margin: auto;

    height: 3px;
    width: 100%;
    min-width: 2em;
    z-index: 2;
  }

  :host > .inner > .note-container {
    position: relative;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host > .inner > .note-container > .note-text {
    padding: 0.2em;
    border-radius: 1em;
    text-align: center;
    font-size: 0.7em;
    width: 2em;
  }

  :host > .inner > .fret-line {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
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
    // `background-color: ${theme.base07}`,
    // `color: ${noteDisplay ? theme.base06 : theme.base03}`,
    // `font-weight: ${noteDisplay ? 900 : 300}`,
    // `border-color: ${theme.base0D}`
  ].join(";");

  const innerStyle = [
    // `background-color: ${theme.base01}`,
    // `color: ${theme.base0B}`
  ].join(";");

  const fretLineStyle = `background-color: ${theme.base01}`;

  const stringLineStyle = `background-color: ${theme.base07}`;

  const noteContainerStyle = [
    // `background-color: ${theme.base01}`,
    // `color: ${theme.base05}`
  ].join(";");

  const noteTextStyle = [
    `background-color: ${theme.base01}`,
    `color: ${theme.base05}`
  ].join(";");

  return html`<div class=${prefix} style=${style}>
    <div class="inner" style=${innerStyle}>
      <div class="string-line" style=${stringLineStyle}></div>
      ${note &&
        html`
        <div class="note-container" style=${noteContainerStyle}>
          <div class="note-text" style=${noteTextStyle}>${noteDisplay}</div>
        </div>`}
      <div class="fret-line" style=${fretLineStyle}></div>
    </div>
  </div>`;
}
