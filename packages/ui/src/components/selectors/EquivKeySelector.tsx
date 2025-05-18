import React from "react";
import { Key } from "note-lib";
import { Base16Theme } from "../../colors/themes";
import { LabeledSelector } from "./LabeledSelector";

interface IEquivKeySelectorProps {
  activeKey: Key;
  minWidth?: string;
  shouldAutocomplete: boolean;
  updateKey: (key: Key) => void;
  theme: Base16Theme;
}

const EquivKeySelector = (props: IEquivKeySelectorProps) => {
  const { activeKey, minWidth, shouldAutocomplete, updateKey, theme } = props;
  const equivKeyItems = activeKey.getEquivKeys();

  return (
    <LabeledSelector<Key>
      id="equiv-key-selector"
      label="Equivalent Keys:"
      minWidth={minWidth}
      items={equivKeyItems}
      getValue={(k: Key) => k.name}
      getDisplay={(k: Key) => k.name}
      activeItem={activeKey}
      onChange={updateKey}
      shouldAutocomplete={shouldAutocomplete}
      theme={theme}
    />
  );
};

export { EquivKeySelector };
