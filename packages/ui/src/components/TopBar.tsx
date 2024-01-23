import "./TopBar.css";
import React, { CSSProperties } from "react";
import { ToolSelector, ToolName } from "./selectors/ToolSelector";
import { Base16Theme } from "../colors/themes";
import { ThemeSelector } from './selectors/ThemeSelector';
import { Grid } from "@mui/material";

interface Props {
  activeToolName: ToolName;
  isAuthenticated: boolean;
  isLargeScreen: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onToolSelect: (toolName: ToolName) => void;
  theme: Base16Theme;
  setTheme: React.Dispatch<React.SetStateAction<Base16Theme>>;
}

const TopBar = (props: Props) => {
  const {
    activeToolName,
    isAuthenticated,
    isLargeScreen,
    onLoginClick,
    onLogoutClick,
    onToolSelect,
    theme,
    setTheme,
  } = props;
  const auth = isAuthenticated ? (
    <div onClick={onLogoutClick}>logout</div>
  ) : (
    <div onClick={onLoginClick}></div>
  );

  const logo = (
    <img
      className="logo"
      src="/guitarizard_logo_NEW_sq_v5.png"
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

  return (
    <Grid container className="top-bar" alignItems="center" style={style} padding={2}>
      <Grid item container className="left" xs={12} sm={3} md={2} justifyContent={isLargeScreen ? "flex-start" : "center"} paddingBottom={isLargeScreen ? 0 : 2} style={leftStyle}>
        {logo}
        <span style={{ position: 'relative', left: '-10px' }}>uitarizard</span>
      </Grid>
      <Grid item container className="center" xs={12} sm={2} md={5} lg={6}>
        {auth}
      </Grid>
      <Grid item container className="right" xs={12} sm={7} md={5} lg={4} justifyContent="flex-end" columnSpacing={2}>
        <Grid item xs={6} sm="auto">
          <ToolSelector
            activeToolName={activeToolName}
            minWidth="10em"
            onToolSelect={onToolSelect}
            size="small"
            theme={theme}
          />
        </Grid>
        <Grid item xs={6} sm="auto">
          <ThemeSelector 
              activeTheme={theme}
              minWidth={"9em"}
              onThemeSelect={onThemeSelect}
              size="small"
            />
        </Grid>
      </Grid>           
    </Grid>
  );
};

export { TopBar };
