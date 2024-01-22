import "./TopBar.css";
import React, { CSSProperties } from "react";
import { ToolSelector, ToolName } from "./selectors/ToolSelector";
import { Base16Theme } from "../colors/themes";
import { ThemeSelector } from './selectors/ThemeSelector';

interface Props {
  activeToolName: ToolName;
  isAuthenticated: boolean;
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
    display: 'flex',
    alignItems: 'center',
  };

  const onThemeSelect = (theme: Base16Theme): void => {
    setTheme(theme);
    localStorage.setItem("theme", theme.id);
    // setTheme(themes[e.currentTarget.value]);
    // localStorage.setItem("theme", e.currentTarget.value);
  };

  return (
    <div className="top-bar" style={style}>
      <div className="left" style={{
        color: theme.swatch.base06,
        textShadow: `0 0 1px ${theme.swatch.base00}`,
        display: 'flex',
        alignItems: 'end',
      }}>
        {logo}
        <span style={{ position: 'relative', left: '-10px' }}>uitarizard</span>
      </div>
      <div className="center">{auth}</div>
      <div className="right" style={{ display: 'flex', alignItems: 'center' }}>
        <ToolSelector
          activeToolName={activeToolName}
          minWidth="10em"
          onToolSelect={onToolSelect}
          size="small"
          theme={theme}
        />

        <ThemeSelector 
            activeTheme={theme}
            minWidth={"9em"}
            onThemeSelect={onThemeSelect}
            size="small"
          />

      </div>            
    </div>
  );
};

export { TopBar };
