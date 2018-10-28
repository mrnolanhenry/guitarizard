import html from "choo/html";
import { instrument } from "note-lib";
import * as css from "sheetify";
import { Base16Theme } from "../colors";
import fretSegment from "./fretSegment";

const prefix = css`
  :host {
  }

  :host > .inner {
  }
`;

interface Props {
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
  fretCount,
  tunedStrings,
  stringScales,
  showFretBar,
  onTune,
  theme
}: Props) {
  console.log(
    fretCount,
    tunedStrings,
    stringScales,
    showFretBar,
    onTune,
    fretSegment
  );

  const style = [`background-color: ${theme.base00}`].join(";");

  return html`<div class=${prefix} style=${style}>
  </div>`;
}
