import "./TopBar.css";
import React, { CSSProperties, useEffect } from "react";
import { Base16Theme } from "../colors/themes";
import { ThemeSelector } from './selectors/ThemeSelector';
import { FullscreenExitRounded as FullscreenExitRoundedIcon, FullscreenRounded as FullscreenRoundedIcon, Settings as SettingsIcon } from '@mui/icons-material';
import { Button, Grid, IconButton, Tab, Tabs, useTheme } from "@mui/material";
import { IAppDialogState } from "./AppDialog";
import { SettingsMenu } from "./SettingsMenu";
import { Tool } from "../enums/Tool";
import { CustomTooltip } from "./common/CustomTooltip";

interface Props {
  activeToolName: Tool;
  dialogState: IAppDialogState;
  isAuthenticated: boolean;
  isDarkTheme: boolean;
  isFullscreen: boolean;
  isMediumScreen: boolean;
  isRainbowMode: boolean;
  isSmallScreen: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onToolSelect: (toolName: Tool) => void;
  setDialogState: React.Dispatch<React.SetStateAction<IAppDialogState>>;
  setTheme: React.Dispatch<React.SetStateAction<Base16Theme>>;
  shouldHighlightPiano: boolean;
  theme: Base16Theme;
  toggleFullscreen: () => void;
  togglePianoHighlight: () => void;
  toggleRainbowMode: () => void;
  tools: Tool[]
}

const TopBar = (props: Props) => {
  const {
    activeToolName,
    dialogState,
    isAuthenticated,
    isDarkTheme,
    isMediumScreen,
    isRainbowMode,
    isSmallScreen,
    onLoginClick,
    onLogoutClick,
    onToolSelect,
    setDialogState,
    setTheme,
    shouldHighlightPiano,
    isFullscreen,
    theme,
    toggleFullscreen,
    togglePianoHighlight,
    toggleRainbowMode,
    tools,
  } = props;

  // NOLAN TODO - This is a poor way of making the dialog dynamic AND reload props,
  // especially if more than just Settings Menu dialog content were placed in this component.
  // Would need to give dialog an id prop (like id="settings") to check which inner dialog component to render.
  // renderSettingsMenu() is called in useEffect to ensure that the dialog content is updated when any settings are changed.
  // Try refactoring to not use useEffect and just render the SettingsMenu directly instead of using the renderSettingsMenu function.
  useEffect(() => {
    setDialogState({
      ...dialogState, 
      content: renderSettingsMenu()
      });
  }, [isRainbowMode, shouldHighlightPiano, theme]);

  const auth = isAuthenticated ? (
    <div onClick={onLogoutClick}>logout</div>
  ) : (
    <div onClick={onLoginClick}></div>
  );

  const logo = (
    <img
      className={`logo ${!isDarkTheme ? "shadowed" : ""}`}
      src="/favicon_v10.png"
    />
  );

  const logoSpan = (
    <span className={`logo-span ${!isDarkTheme ? "shadowed" : ""}`}>uitarizard</span>
    );

  const style: CSSProperties = {
    backgroundColor: theme.swatch.base00,
    color: theme.swatch.base04,
    borderColor: theme.swatch.base04,
    paddingBottom: 0,
  };

  if (isSmallScreen) {
    style.paddingTop = "24px";
  }

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
        shouldHighlightPiano={shouldHighlightPiano}
        theme={theme}
        togglePianoHighlight={togglePianoHighlight}
        toggleRainbowMode={toggleRainbowMode}
      />
    )
  }

  const renderFullscreenButtonDetails = () => {
    const enterOrExitText: string = isFullscreen ? "Exit" : "Enter";
    return (
        <CustomTooltip showTooltip={true} title={`${enterOrExitText} Full Screen`} theme={theme}>
        { isFullscreen ? 
          <FullscreenExitRoundedIcon sx={{ paddingLeft: "0px", paddingRight: "0px" }}/> 
          :
          <FullscreenRoundedIcon sx={{ paddingLeft: "0px", paddingRight: "0px" }}/>
         }
        </CustomTooltip>
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleTabChange = (event: React.SyntheticEvent, newValue: Tool) => {
    onToolSelect(newValue);
  };

  const tabClassStyling = {
    "& .MuiTab-root": {
      color: theme.swatch.base04,
    },
  };

  return (
    <Grid container className="top-bar" alignItems="center" style={style} padding={isSmallScreen ? 2 : 1}>
      <Grid 
        item 
        container 
        className="left" 
        xs={12} 
        sm={3} 
        md={5} 
        lg={5} 
        justifyContent={isSmallScreen ? "center" : "flex-start"}
        paddingBottom={isSmallScreen ? 1 : 0} 
        style={leftStyle}>
        {logo}
        {logoSpan}
      </Grid>
      <Grid item container className="center" xs={9} sm={4} md={4} lg={6} columnSpacing={2}>
        <Grid item xs={12} sm="auto">
          <Tabs 
            value={activeToolName} 
            onChange={handleTabChange} 
            aria-label="tool-select-tabs" 
            centered={!isSmallScreen}
            textColor="primary"
            indicatorColor="primary"
            sx={tabClassStyling}
            >
            <Tab value={Tool.scalebook} label="Find Scales" id="tab-find-scales" wrapped />
            <Tab value={Tool.chordbook} label="Find Chords" id="tab-find-chords" wrapped />
          </Tabs>
        </Grid>
      </Grid>
      <Grid item container className="right" xs={3} sm={5} md={3} lg={1} justifyContent="flex-end" columnSpacing={2}>
        {isMediumScreen && 
          <Button
            color="secondary"
            onClick={toggleFullscreen}
            size={"small"}
            sx={{paddingLeft: "0px", paddingRight:"0px", fontSize: ".8rem", marginBottom: "2px"}}>
            {renderFullscreenButtonDetails()}
          </Button>
        }
        <CustomTooltip showTooltip={true} theme={theme} title="Settings">
          <div 
            id="settings-button" 
            aria-label="Settings" 
            onClick={() => setDialogState({
              ...dialogState, 
              isOpen: true, 
              title: "Settings", 
              content: renderSettingsMenu()
              })}>
            <IconButton sx={{marginBottom: "2px"}} color="secondary">
              <SettingsIcon />
            </IconButton>
          </div>
        </CustomTooltip>
      </Grid>
    </Grid>
  );
};

export { TopBar };
