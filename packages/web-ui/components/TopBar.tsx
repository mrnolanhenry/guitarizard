import './TopBar.scss';
import ToolSelector, { ToolName } from './ToolSelector';
import { bespin, cloudCity, Base16Theme } from '../lib/colors';

interface Props {
  isAuthenticated: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onToolSelect: (toolName: ToolName) => void;
  activeToolName: ToolName;
  theme: Base16Theme;
}

export default function TopBar(props: Props) {
  const auth = props.isAuthenticated
             ? <div onClick={props.onLogoutClick}>logout</div>
             : <div onClick={props.onLoginClick}></div>;

  const logo = <img src="/guitarizard_logo_sq_20.png"
                    className="logo" />;

  const style = {
    backgroundColor: props.theme.base00,
    color: props.theme.base04,
    borderColor: props.theme.base03
  };

  const centerStyle = {
    color: props.theme.base06,
    textShadow: `0 0 1px ${props.theme.base00}`
  };

  return <div className="top-bar" style={style}>
    <div className="left">
      <ToolSelector
        activeToolName={props.activeToolName}
        onToolSelect={props.onToolSelect}
        theme={cloudCity} />
    </div>
    <div className="center" style={centerStyle}>
      {logo}
      <span>guitarizard</span>
    </div>
    <div className="right">
      {auth}
    </div>
  </div>;
}
