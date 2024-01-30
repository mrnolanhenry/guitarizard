import "./TopBar.css";
import React, { CSSProperties, useEffect } from "react";
import { ToolSelector, ToolName } from "./selectors/ToolSelector";
import { Base16Theme } from "../colors/themes";
import { ThemeSelector } from './selectors/ThemeSelector';
import { Settings as SettingsIcon } from '@mui/icons-material';
import { Grid, IconButton, useTheme } from "@mui/material";
import { IAppDialogState } from "./AppDialog";
import { SettingsMenu } from "./SettingsMenu";

interface Props {
  activeToolName: ToolName;
  dialogState: IAppDialogState;
  isAuthenticated: boolean;
  isRainbowMode: boolean;
  isSmallScreen: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onToolSelect: (toolName: ToolName) => void;
  setDialogState: React.Dispatch<React.SetStateAction<IAppDialogState>>;
  setTheme: React.Dispatch<React.SetStateAction<Base16Theme>>;
  theme: Base16Theme;
  toggleRainbowMode: () => void;
}

const TopBar = (props: Props) => {
  const {
    activeToolName,
    dialogState,
    isAuthenticated,
    isRainbowMode,
    isSmallScreen,
    onLoginClick,
    onLogoutClick,
    onToolSelect,
    setDialogState,
    setTheme,
    theme,
    toggleRainbowMode
  } = props;

  // NOLAN TODO - This is a poor way of making the dialog dynamic AND reload props,
  // especially if more than just Settings Menu dialog content were placed in this component.
  // Would need to give dialog an id prop (like id="settings") to check which inner dialog component to render.
  useEffect(() => {
    setDialogState({
      ...dialogState, 
      content: renderSettingsMenu()
      });
  }, [isRainbowMode, theme]);

  const auth = isAuthenticated ? (
    <div onClick={onLogoutClick}>logout</div>
  ) : (
    <div onClick={onLoginClick}></div>
  );

  const logo = (
    <img
      className="logo"
      src="/favicon_v5.png"
    />
  );

  const style: CSSProperties = {
    backgroundColor: theme.swatch.base00,
    color: theme.swatch.base04,
    borderColor: theme.swatch.base03,
  };

  const leftStyle: CSSProperties = {
    color: theme.swatch.base06,
    textShadow: `0 0 1px ${theme.swatch.base00}`,
  };

  const onThemeSelect = (theme: Base16Theme): void => {
    setTheme(theme);
    localStorage.setItem("theme", theme.id);
  };

  const renderSettingsMenu = () => {
    return (
      <SettingsMenu 
        isRainbowMode={isRainbowMode}
        setTheme={setTheme}
        theme={theme}
        toggleRainbowMode={toggleRainbowMode}
      />
    )
  }

  return (
    <Grid container className="top-bar" alignItems="center" style={style} padding={isSmallScreen ? 2 : 1}>
      <Grid item container className="left" xs={9} sm={3} md={2} justifyContent={"flex-start"} style={leftStyle}>
        {logo}
        <span style={{ position: 'relative', left: '-10px' }}>uitarizard</span>
      </Grid>
      {!isSmallScreen &&
        <Grid item container className="center" sm={2} md={5} lg={6}>
        {auth}
        </Grid>
      }
      <Grid item container className="right" xs={3} sm={7} md={5} lg={4} justifyContent="flex-end" columnSpacing={2}>
        {/* NOLAN TODO - Bring back once we have more Tools!
        <Grid item xs={6} sm="auto">
          <ToolSelector
            activeToolName={activeToolName}
            minWidth="10em"
            onToolSelect={onToolSelect}
            size="small"
            theme={theme}
          />
        </Grid> */}
          <div 
            id="settings-button" 
            aria-label="settings-button" 
            onClick={() => setDialogState({
              ...dialogState, 
              isOpen: true, 
              title: "Settings", 
              content: renderSettingsMenu()
              })}>
            <IconButton color="secondary">
              <SettingsIcon />
            </IconButton>
          </div>
      </Grid>
    </Grid>
  );
};

export { TopBar };
