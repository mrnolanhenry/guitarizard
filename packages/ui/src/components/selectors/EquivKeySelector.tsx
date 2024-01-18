import { Key } from "note-lib";
import { Base16Theme } from "../../colors/themes";
import { LabeledSelector } from "./LabeledSelector";

interface IEquivKeySelectorProps {
	activeKey: Key;
	minWidth?: string;
	updateKey: (key: Key) => void;
	theme: Base16Theme;
}

const EquivKeySelector = (props: IEquivKeySelectorProps) => {
	const {
		activeKey,
		minWidth,
		updateKey,
		theme
	} = props;

	return (
		<LabeledSelector<Key>
			id="equiv-key-selector"
			label="Equivalent Keys:"
			minWidth={minWidth}
			items={activeKey.getEquivKeys()}
			getValue={(k: Key) => k.getDisplayName()}
			getDisplay={(k: Key) => k.getDisplayName()}
			activeItem={activeKey}
			onChange={updateKey}
			theme={theme}
		/>
	);
};

export { EquivKeySelector };
