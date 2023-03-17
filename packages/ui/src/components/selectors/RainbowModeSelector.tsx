import { Base16Theme } from "../../colors/themes";
import { LabeledSelector } from "./LabeledSelector";

interface IRainbowModeSelectorProps {
  isRainbowMode: boolean;
  theme: Base16Theme;
  toggleRainbowMode: () => void;
}

const RainbowModeSelector = (props: IRainbowModeSelectorProps) => {
  const {
    isRainbowMode,
    theme,
    toggleRainbowMode,
  } = props;
  return (
    <LabeledSelector<boolean>
      label="Rainbow Mode: "
      items={[true, false]}
      getValue={(item: boolean) => (item ? "on" : "off")}
      getDisplay={(item: boolean) => (item ? "on" : " off")}
      activeItem={isRainbowMode}
      onChange={toggleRainbowMode}
      theme={theme}
    />
  );
}

export { RainbowModeSelector };
