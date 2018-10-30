import html from "choo/html";
import * as css from "sheetify";
import { Base16Theme } from "../colors";

const prefix = css`
  :host {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-width: 0 0 1px 0;
    border-style: solid;
    cursor: pointer;
    padding: 0.2em;
  }
`;

interface Props<T> {
  items: Array<T>;
  activeItem?: T;
  onChange: (value: T) => void;
  getKey?: (value: T) => string;
  getValue?: (value: T) => string;
  theme: Base16Theme;
}

export default function selector<T>({
  items,
  getKey,
  getValue,
  activeItem,
  onChange,
  theme
}: Props<T>) {
  const keyFn = typeof getKey === "undefined" ? (a: T) => String(a) : getKey;
  const valueFn =
    typeof getValue === "undefined" ? (a: T) => String(a) : getValue;

  const options = items.map((item: T) => {
    const k = keyFn(item);
    const v = valueFn(item);

    const isSelected = activeItem ? k === keyFn(activeItem) : false;

    return html`<option selected=${isSelected}
                        value="${k}">${v}</option>`;
  });

  const style = [
    `background-color: ${theme.base00}`,
    `color: ${theme.base05}`,
    `border-color: ${theme.base0D}`
  ].join(";");

  return html`<select onchange=${_onChange}
                      class=${prefix}
                      style=${style}>${options}</select>`;

  function _onChange(e: Event) {
    e.preventDefault();

    const key: string = e.target ? (e.target as HTMLSelectElement).value : "";

    const item: T | undefined = items.find((item: T) => keyFn(item) === key);

    if (typeof item !== "undefined") {
      onChange(item as T);
    }
  }
}
