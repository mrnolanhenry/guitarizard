import React from 'react';
import { themes, Base16Theme } from "../../colors/themes";

export type ThemeSelectorProps = {
  theme: Base16Theme;
  setTheme: React.Dispatch<React.SetStateAction<Base16Theme>>;
}

export default function ThemeSelector({ theme, setTheme }: ThemeSelectorProps) {
  return (
    <div>
      <span style={{ fontSize: '1.5em' }}>🎨</span>
      <select
        onChange={(e) => {
          console.log(e.currentTarget.value);
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
          let theme = themes[theme_key];
          return (
            <option value={theme_key} key={theme_key}>{theme.name}</option>
          );
        })}
      </select>
    </div>
  );
}
