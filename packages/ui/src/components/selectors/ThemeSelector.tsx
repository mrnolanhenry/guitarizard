
      {/* <select
        onChange={(e) => {
          setTheme(themes[e.currentTarget.value]);
          localStorage.setItem("theme", e.currentTarget.value);
        }}
        value={theme.id}
        style={{
          backgroundColor: theme.swatch.base00,
          color: theme.swatch.base05,
          borderWidth: '1px',
          padding: '0.5em 1em',
          borderRadius: '5px',
          marginLeft: '1em',
        }}>
        {Object.keys(themes).map(theme_key => {
          const theme = themes[theme_key];
          return (
            <option value={theme_key} key={theme_key}>{theme.name}</option>
          );
        })}
      </select> */}
//

import React from "react";
import { themes, Base16Theme } from "../../colors/themes";
import { LabeledSelector } from "./LabeledSelector";

interface IThemeSelectorProps {
  activeTheme: Base16Theme;
  minWidth?: string;
  onThemeSelect: (theme: Base16Theme) => void;
  size?: string // "small" will set styling to smaller sizes
}

const ThemeSelector = (props: IThemeSelectorProps) => {
  const { activeTheme, minWidth, onThemeSelect, size } = props;
  const items = Object.keys(themes).map(theme_key => themes[theme_key]);

  return (
    <LabeledSelector<Base16Theme>
      id="theme-selector"
      label="Theme:"
      minWidth={minWidth}
      items={items}
      getValue={(theme: Base16Theme) => theme.id}
      getDisplay={(theme: Base16Theme) => theme.name}
      activeItem={activeTheme}
      onChange={onThemeSelect}
      size={size}
      theme={activeTheme}
    />
  );
};

export { ThemeSelector };
