import { Base16Theme } from "../../colors/themes";
import { LabeledSelector } from "./LabeledSelector";

interface IRainbowModeSelectorProps {
  isRainbowMode: boolean;
  toggleRainbowMode: () => void;
  theme: Base16Theme;
}

const RainbowModeSelector = (props: IRainbowModeSelectorProps) => {
  return (
    <LabeledSelector<boolean>
      label="Rainbow Mode: "
      items={[true, false]}
      getValue={(item: boolean) => (item ? "on" : "off")}
      getDisplay={(item: boolean) => (item ? "on" : " off")}
      activeItem={props.isRainbowMode}
      onChange={props.toggleRainbowMode}
      theme={props.theme}
    />
  );
}

export { RainbowModeSelector };
