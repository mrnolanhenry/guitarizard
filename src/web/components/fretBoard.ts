import html from "choo/html";
import { instrument, ScaleSystem, Note } from "note-lib";
import * as css from "sheetify";
import { Base16Theme } from "../colors";
import fretSegment from "./fretSegment";
import noteSelector from "./noteSelector";

const prefix = css`
  :host {
    display: grid;
    grid-template-areas:
      ".        fretLabels"
      "tuning   board";
    grid-template-columns: min-content auto;
  }

  :host > .fret-labels {
    grid-area: fretLabels;

    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  :host > .fret-labels > div {
    flex-grow: 1;
    width: 2.5em;
    height: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    border-width: 0 1px 1px 0;
    border-style: solid;
  }

  :host > .tuning-pegs {
    grid-area: tuning;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  :host > .tuning-pegs > div {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5em;
  }

  :host > .board {
    grid-area: board;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  :host > .board > .string {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
`;

interface Props {
  scaleSystem: ScaleSystem;
  fretCount: number;
  tunedStrings: Array<instrument.TunedString>;
  stringScales: Array<instrument.StringScale>;
  showFretBar: boolean;
  onTune: (
    stringNumber: number,
    oldTuning: instrument.TunedString,
    newTuning: instrument.TunedString
  ) => void;
  theme: Base16Theme;
}

export default function fretBoard({
  scaleSystem,
  fretCount,
  tunedStrings,
  stringScales,
  showFretBar,
  onTune,
  theme
}: Props) {
  console.log("onTune", onTune);

  const fretBarStyle = [
    `background-color: ${theme.base00}`,
    `border-color: ${theme.base03}`
  ].join(";");

  const fretBar =
    showFretBar &&
    html`<div class="fret-labels" style=${fretBarStyle}>
      ${[...Array(fretCount)].map((_, i) => {
        if (i === 0) {
          return html`<div>[*]</div>`;
        }
        return html`<div>${i}</div>`;
      })}
    </div>`;

  const tuningPegsStyle = [
    `background-color: ${theme.base07}`,
    `color: ${theme.base04}`,
    `border-color: ${theme.base03}`
  ].join(";");

  const tuningPegs = html`<div class="tuning-pegs" style=${tuningPegsStyle}>
    ${tunedStrings
      .map(string =>
        noteSelector({
          scaleSystem,
          note: string.tuningNote,
          onNoteSelect: (_n: Note) => {},
          theme
        })
      )
      .reverse()}
  </div>`;

  const stringStyle = `border-color: ${theme.base09}`;

  const board = html`<div class="board">
    ${stringScales.map(stringScale => {
      const fretSegments = [...Array(fretCount)]
        .map((_, i) => {
          return fretSegment({ stringScale, fret: i, theme });
        })
        .reverse();

      return html`<div class="string" style=${stringStyle}>
        ${fretSegments}
      </div>`;
    })}
  </div>`;

  const style = [`background-color: ${theme.base00}`].join(";");

  return html`<div class=${prefix} style=${style}>
    ${fretBar}
    ${tuningPegs}
    ${board}
  </div>`;
}
