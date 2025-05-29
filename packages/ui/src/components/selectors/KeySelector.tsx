import React from "react";
import { Key } from "note-lib";
import { Base16Theme } from "../../colors/themes";
import { LabeledSelector } from "./LabeledSelector";

interface IKeySelectorProps {
  activeKey: Key;
  id: string;
  items: Key[];
  label: string;
  minWidth?: string;
  onChange: (key: Key) => void;
  shouldAutocomplete: boolean;
  theme: Base16Theme;
}

const KeySelector = (props: IKeySelectorProps) => {
  const { activeKey, id, items, label, minWidth, shouldAutocomplete, onChange, theme } = props;

  return (
    <LabeledSelector<Key>
      activeItem={activeKey}
      getValue={(k: Key) => k.name}
      getDisplay={(k: Key) => k.name}
      id={id}
      items={items}
      label={label}
      minWidth={minWidth}
      onChange={onChange}
      shouldAutocomplete={shouldAutocomplete}
      theme={theme}
    />
  );
};

export { KeySelector };
