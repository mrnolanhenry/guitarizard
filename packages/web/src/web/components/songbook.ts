import html from "choo/html";
import * as css from "sheetify";

const prefix = css`
  :host {
    margin: 20px;
  }
`;

interface Props {}

export default function songbook({  }: Props) {
  return html`
    <div class=${prefix}>
      <h2>Songbook</h2>
      <p>WIP</p>
    </div>`;
}
