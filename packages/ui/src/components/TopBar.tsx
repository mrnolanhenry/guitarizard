import "./TopBar.css";
import { ToolSelector, ToolName } from "./selectors/ToolSelector";
import { cloudCity, Base16Theme } from "../colors/themes";

interface Props {
  activeToolName: ToolName;
  isAuthenticated: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onToolSelect: (toolName: ToolName) => void;
  theme: Base16Theme;
}

const TopBar = (props: Props) => {
  const { 
    activeToolName,
    isAuthenticated,
    onLoginClick,
    onLogoutClick,
    onToolSelect,
    theme,
   } = props;
  const auth = isAuthenticated ? (
    <div onClick={onLogoutClick}>logout</div>
  ) : (
    <div onClick={onLoginClick}></div>
  );

  const logo = <img src="/guitarizard_logo_sq_20.png" className="logo" />;

  const style = {
    backgroundColor: theme.base00,
    color: theme.base04,
    borderColor: theme.base03,
  };

  const centerStyle = {
    color: theme.base06,
    textShadow: `0 0 1px ${theme.base00}`,
  };

  return (
    <div className="top-bar" style={style}>
      <div className="left">
        <ToolSelector
          activeToolName={activeToolName}
          onToolSelect={onToolSelect}
          theme={cloudCity}
        />
      </div>
      <div className="center" style={centerStyle}>
        {logo}
        <span>guitarizard</span>
      </div>
      <div className="right">{auth}</div>
    </div>
  );
}

export { TopBar };