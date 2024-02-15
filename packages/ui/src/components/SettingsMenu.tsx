import "./TopBar.css";
import React from "react";
import { Base16Theme } from "../colors/themes";
import { ThemeSelector } from './selectors/ThemeSelector';
import { Grid } from "@mui/material";
import { RainbowModeSwitch } from "./RainbowModeSwitch";

interface Props {
  isRainbowMode: boolean;
  setTheme: React.Dispatch<React.SetStateAction<Base16Theme>>;
  theme: Base16Theme;
  toggleRainbowMode: () => void;
}

const SettingsMenu = (props: Props) => {
  const {
    isRainbowMode,
    setTheme,
    theme,
    toggleRainbowMode,
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
        </Grid>
      </Grid>
    </Grid>
  );
};

export { SettingsMenu };
