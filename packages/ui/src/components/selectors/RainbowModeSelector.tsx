import { Base16Theme } from "../../colors/themes";
import { LabeledSelector } from "./LabeledSelector";

interface IRainbowModeSelectorProps {
	isRainbowMode: boolean;
	minWidth?: string;
	theme: Base16Theme;
	toggleRainbowMode: () => void;
}

const RainbowModeSelector = (props: IRainbowModeSelectorProps) => {
	const {
		isRainbowMode,
		minWidth,
		theme,
		toggleRainbowMode
	} = props;
	return (
		<LabeledSelector<boolean>
			id="rainbow-mode-selector"
			label="Rainbow Mode: "
			minWidth={minWidth}
			items={[true, false]}
			getValue={(item: boolean) => (item ? "on" : "off")}
			getDisplay={(item: boolean) => (item ? "on" : " off")}
			activeItem={isRainbowMode}
			onChange={toggleRainbowMode}
			theme={theme}
		/>
	);
};

export { RainbowModeSelector };
