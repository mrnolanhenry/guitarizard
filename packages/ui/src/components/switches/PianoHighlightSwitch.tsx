import React from "react";
import { Box, styled, Switch, SwitchProps } from "@mui/material";
import { Base16Theme } from "../../colors/themes";
import { lighten, darken } from "@mui/material";

interface IPianoHighlightSwitchProps {
  activeTheme: Base16Theme;
  shouldHighlightPiano: boolean;
  togglePianoHighlight: () => void;
}

interface IStyledSwitchProps extends SwitchProps {
  activetheme: Base16Theme;
}

const StyledSwitch = styled(({  ...props }: IStyledSwitchProps) => (
  <Switch {...props} />
// eslint-disable-next-line @typescript-eslint/no-unused-vars
))(({ theme, activetheme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: activetheme.swatch.base0A,
    '&:hover': {
      background: darken(activetheme.swatch.base0A, .4),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    background: darken(activetheme.swatch.base0A, .4),
  },
  '& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb': {
      color: activetheme.swatch.base0A,
    },
}));

const PianoHighlightSwitch = (props: IPianoHighlightSwitchProps) => {
    const { activeTheme, shouldHighlightPiano, togglePianoHighlight } = props;

    return (
      <Box paddingTop={1}>
        <StyledSwitch 
          id="piano-highlight-switch"
          activetheme={activeTheme}
          checked={shouldHighlightPiano}
          onChange={togglePianoHighlight}
          size="small"
        />
      </Box>
    );
};

export { PianoHighlightSwitch };
