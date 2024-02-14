import "./TopBar.css";
import React from "react";
import { Base16Theme } from "../colors/themes";
import { ThemeSelector } from './selectors/ThemeSelector';
import { Grid } from "@mui/material";
import { RainbowModeSwitch } from "./RainbowModeSwitch";
import { OctaveUIModeSwitch } from "./OctaveUIModeSwitch";

interface Props {
  setTheme: React.Dispatch<React.SetStateAction<Base16Theme>>;
  theme: Base16Theme;
  isRainbowMode: boolean;
  toggleRainbowMode: () => void;
  octaveUIEnabled: boolean;
  toggleOctaveUIMode: () => void;
}

const SettingsMenu = (props: Props) => {
  const {
    setTheme,
    theme,
    isRainbowMode,
    toggleRainbowMode,
    octaveUIEnabled,
    toggleOctaveUIMode,
  } = props;

  const onThemeSelect = (theme: Base16Theme): void => {
    setTheme(theme);
    localStorage.setItem("theme", theme.id);
  };

  return (
    <Grid container className="settings-menu" alignItems="center">
      <Grid container item padding={1}>
        <Grid container borderBottom={1} marginBottom={2}>
          <span>App Settings:</span>
        </Grid>
        <Grid container alignItems="center" paddingLeft={2} paddingRight={2}>
          <Grid item xs={12} sm={6}>
            Theme:
          </Grid>
          <Grid item xs="auto" justifyContent="flex-end">
            <ThemeSelector
                activeTheme={theme}
                minWidth={"9em"}
                onThemeSelect={onThemeSelect}
                size="small"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container item padding={1}>
        <Grid container borderBottom={1} marginBottom={2}>
            <span>Scalebook Settings:</span>
        </Grid>
        <Grid container alignItems="center" paddingLeft={2} paddingRight={2}>
          <Grid item xs={12} sm={6}>
            <span>Rainbow Mode: </span>
          </Grid>
          <Grid item xs="auto" justifyContent="flex-end">
            <RainbowModeSwitch
              isRainbowMode={isRainbowMode}
              toggleRainbowMode={toggleRainbowMode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <span>Octave UI Mode: </span>
          </Grid>
          <Grid item xs="auto" justifyContent="flex-end">
            <OctaveUIModeSwitch
              enabled={octaveUIEnabled}
              toggle={toggleOctaveUIMode}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { SettingsMenu };
