import React from "react";
import { themes, Base16Theme } from "../../colors/themes";
import { Selector } from "./Selector";

interface IThemeSelectorProps {
  activeTheme: Base16Theme;
  minWidth?: string;
  onThemeSelect: (theme: Base16Theme) => void;
  size?: string; // "small" will set styling to smaller sizes
}

const ThemeSelector = (props: IThemeSelectorProps) => {
  const { activeTheme, minWidth, onThemeSelect, size } = props;

  return (
    <Selector<Base16Theme>
      id="theme-selector"
      minWidth={minWidth}
      items={themes}
      getValue={(theme: Base16Theme) => theme.id}
      getDisplay={(theme: Base16Theme) => theme.name}
      activeItem={activeTheme}
      onChange={onThemeSelect}
      shouldAutocomplete={false}
      size={size}
      theme={activeTheme}
    />
  );
};

export { ThemeSelector };
