import html from "choo/html";
import * as css from "sheetify";
import { Base16Theme } from "../colors";
import toolSelector, { ToolName } from "./toolSelector";

const prefix = css`
  :host {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0.3em;
    border-width: 0 0 1px 0;
    border-style: solid;
  }

  :host > .left {
    margin-left: 0.2em;
  }

  :host > .center {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
  }

  :host > .center > .logo {
    height: 20px;
    width: 20px;
    display: block;
    opacity: 0.7;
    margin-right: 5px;
  }

  :host > select::-ms-expand {
    display: none; /* hide the default arrow in ie10 and ie11 */
  }

  :host > .right {
    font-family: monospace;
    margin-right: 0.2em;
  }
`;

interface Props {
  isAuthenticated: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onToolSelect: (toolName: ToolName) => void;
  activeToolName: ToolName;
  theme: Base16Theme;
}

export default function topBar({
  isAuthenticated,
  onLoginClick,
  onLogoutClick,
  onToolSelect,
  activeToolName,
  theme
}: Props) {
  const auth = isAuthenticated
    ? html`<div onclick=${onLogoutClick}>logout</div>`
    : html`<div onclick=${onLoginClick}>login</div>`;

  const logo = html`<img class="logo" src="static/guitarizard-logo-20.png">`;

  const centerStyle = [
    `color: ${theme.base06}`,
    `text-shadow: 0 0 1px ${theme.base00}`
  ].join(";");

  const style = [
    `background-color: ${theme.base00}`,
    `color: ${theme.base04}`,
    `border-color: ${theme.base03}`
  ].join(";");

  return html`<div class=${prefix} style=${style}>
    <div class="left">
      ${toolSelector({ activeToolName, theme, onToolSelect })}
    </div>
    <div class="center" style=${centerStyle}>
      ${logo}
      <span>guitarizard</span>
    </div>
    <div class="right">
      ${auth}
    </div>
  </div>`;
}
