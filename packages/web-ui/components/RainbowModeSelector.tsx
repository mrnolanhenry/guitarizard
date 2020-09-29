import { Base16Theme } from "../lib/colors";
import LabeledSelector from "./LabeledSelector";

interface Props {
    isRainbowMode: boolean;
    toggleRainbowMode: () => void;
    theme: Base16Theme;
}

export default function rainbowModeSelector(props: Props) {
    return (
        <LabeledSelector<boolean>
            label="Rainbow Mode: "
            items={[true, false]}
            getValue={(item: boolean) => item ? "on" : "off"}
            getDisplay={(item: boolean) => item ? "on" : " off"}
            activeItem={props.isRainbowMode}
            onChange={props.toggleRainbowMode}
            theme={props.theme}
        />
    );
}
