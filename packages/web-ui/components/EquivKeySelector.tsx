import { data, Key, Note, Scale } from "guitarizard-note-lib";
import { Base16Theme } from "../lib/colors";
import LabeledSelector from "./LabeledSelector";

interface Props {
  activeKey: Key;
  updateKey: (key: Key) => void;
  theme: Base16Theme;
}

export default function EquivKeySelector(props: Props) {
  return <LabeledSelector<Key>
    label= "Equivalent Keys:"
    items={props.activeKey.getEquivKeys()}
    getValue={(k: Key) => k.note.id + ' ' + k.scale.name}
    getDisplay={(k: Key) => k.note.id + ' ' + k.scale.name}
    activeItem={props.activeKey}
    onChange={props.updateKey}
    theme={props.theme} />;
}
