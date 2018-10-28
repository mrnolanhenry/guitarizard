import selector from "./selector";

import html from "choo/html";
import * as css from "sheetify";
import { Base16Theme } from "../colors";

const prefix = css`
  :host {
    display: flex;
  }
`;

interface Props<T> {
  label: string;
  items: Array<T>;
  activeItem: T;
  onChange: (value: T) => void;
  getKey?: (value: T) => string;
  getValue?: (value: T) => string;
  theme: Base16Theme;
}

export default function labeledSelector<T>({
  label,
  items,
  getKey,
  getValue,
  activeItem,
  onChange,
  theme
}: Props<T>) {
  const select = selector<T>({
    items,
    getKey,
    getValue,
    activeItem,
    onChange,
    theme
  });

  return html`<div prefix=${prefix}>
    <span>${label}</span>
    ${select}
  </div>`;
}
