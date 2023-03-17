import { Key } from "note-lib";
import { Base16Theme } from "../../colors/themes";
import { LabeledSelector } from "./LabeledSelector";

interface IEquivKeySelectorProps {
  activeKey: Key;
  updateKey: (key: Key) => void;
  theme: Base16Theme;
}

const EquivKeySelector = (props: IEquivKeySelectorProps) => {
  return (
    <LabeledSelector<Key>
      label="Equivalent Keys:"
      items={props.activeKey.getEquivKeys()}
      getValue={(k: Key) => k.note.id + " " + k.scale.name}
      getDisplay={(k: Key) => k.note.id + " " + k.scale.name}
      activeItem={props.activeKey}
      onChange={props.updateKey}
      theme={props.theme}
    />
  );
}

export { EquivKeySelector };
