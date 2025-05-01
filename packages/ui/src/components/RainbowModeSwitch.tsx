import { Box, styled, Switch, SwitchProps } from "@mui/material";
import { rainbow } from "../colors/themes";

interface IRainbowModeSwitchProps {
  isRainbowMode: boolean;
  toggleRainbowMode: () => void;
}

const RainbowSwitch = styled(({  ...props }: SwitchProps) => (
  <Switch {...props} />
// eslint-disable-next-line @typescript-eslint/no-unused-vars
))(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: `-webkit-linear-gradient(0deg, ${rainbow[0]} 0%, ${rainbow[3]} 60%, ${rainbow[8]} 100%)`,
    '&:hover': {
      // backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
      background: `-webkit-linear-gradient(0deg, ${rainbow[0]} 0%, ${rainbow[5]} 60%, ${rainbow[8]} 100%)`
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    background: `-webkit-linear-gradient(0deg, ${rainbow[0]} 0%, ${rainbow[3]} 60%, ${rainbow[8]} 100%)`,
  },
  '& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb': {
      color: rainbow[3],
    },
}));

const RainbowModeSwitch = (props: IRainbowModeSwitchProps) => {
    const { isRainbowMode, toggleRainbowMode } = props;
    return (
      <Box paddingTop={1}>
        <RainbowSwitch 
          id="rainbow-mode-switch"
          checked={isRainbowMode}
          onChange={toggleRainbowMode}
          size="small"
          />
      </Box>
    );
};

export { RainbowModeSwitch };
