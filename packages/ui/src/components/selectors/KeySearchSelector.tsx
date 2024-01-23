// import { AutocompleteRenderOptionState } from "@mui/material";
import { FilterOptionsState } from "@mui/material/useAutocomplete";
import { data, Key, Note, Temperament } from "note-lib";
// import React, { ReactNode, useState } from "react";
import React, { useState } from "react";
import { Base16Theme } from "../../colors/themes";
import { LabeledSelector } from "./LabeledSelector";

interface IKeySearchSelectorProps {
  minWidth?: string;
  updateKey: (key: Key) => void;
  temperament: Temperament;
  theme: Base16Theme;
}

const KeySearchSelector = (props: IKeySearchSelectorProps) => {
  const [searchTimeout, setSearchTimeout] = useState(
    null as ReturnType<typeof setTimeout> | null,
  );
  const [filterOptions, setFilterOptions] = useState([] as Key[]);

  const { minWidth, updateKey, temperament, theme } = props;

  const allKeys: Key[] = [];
  temperament.getNotesInTemperament().forEach((note) => {
    data.scales.forEach((scale) => {
      allKeys.push(new Key(note, scale));
    });
  });

  // Speed up search by only searching through a subset of allKeys,
  // then resetting it to allKeys when appropriate.
  // For instance, you've entered "A, B" already in the search and filtered down to 557 keys vs. the existing 2,193.
  // Now when you continue typing, e.g. "A, B, C#" you'll only filter from those 557 keys.
  const [potentialKeys, setPotentialKeys] = useState(allKeys);

  const handleInputChange = (
    event: React.SyntheticEvent,
    inputValue: string,
  ) => {
    clearTimeout(searchTimeout as ReturnType<typeof setTimeout>);

    // Reset potentialKeys to allKeys if not inserting text
    const isInsertingText: boolean =
      !!(event.nativeEvent as InputEvent).inputType &&
      (event.nativeEvent as InputEvent).inputType === "insertText";

    if (!isInsertingText) {
      setPotentialKeys(allKeys);
    }

    setSearchTimeout(
      setTimeout(() => {
        setFilterOptions(handleFilterOptions(inputValue, isInsertingText));
      }, 200),
    );
  };

  const handleFilterOptions = (
    inputValue: string,
    isInsertingText: boolean,
  ): Key[] => {
    if (!inputValue) {
      setPotentialKeys(allKeys);
      return [];
    } else {
      const trimVal = inputValue.trim().toLowerCase();
      // trimming each term, so it can handle inputs with lots of empty space e.g. "0,1, 2, 3, 5, , , 6, " or "A, B,C#,D, ,Eb"
      const inputValues = trimVal
        .split(",")
        .map((val) => val.trim())
        .filter((val) => !!val);
      let filterOptions = potentialKeys.filter((key) =>
        isKeyDisplayNameMatch(key, trimVal),
      );

      if (filterOptions.length === 0) {
        filterOptions = potentialKeys.filter((key) =>
          isNoteMatch(key, inputValues),
        );
      }

      if (isInsertingText) {
        setPotentialKeys(filterOptions);
      }
      return filterOptions;
    }
  };

  const getFilterOptions = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _options: Key[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _state: FilterOptionsState<Key>,
  ): Key[] => filterOptions;

  const isKeyDisplayNameMatch = (key: Key, inputValue: string) => {
    return key.getDisplayName().toLowerCase().includes(inputValue);
  };

  const isNoteMatch = (key: Key, inputValues: string[]) => {
    let allNotesMatch: boolean = true;

    inputValues.forEach((value) => {
      const trimVal = value.trim();
      const noteToFind = temperament.getNoteFromID(trimVal);
      if (!noteToFind) {
        allNotesMatch = false;
      } else {
        const notesInKey: Note[] = key.scale.getNotesInKey(key.note);
        const noteFound: boolean = !!notesInKey.find((note) =>
          note.isSimilar(noteToFind),
        );
        if (!noteFound) {
          allNotesMatch = false;
        }
      }
    });

    return allNotesMatch;
  };

  // NOLAN TODO - not in use YET - want to replace the default "No Options" text with instructions when input is blank
  // const renderOption = (props: React.HTMLAttributes<HTMLLIElement>, option: Key, state: AutocompleteRenderOptionState, ownerState: any): ReactNode => {
  // 	// console.log("renderOption props");
  // 	// console.log(props);
  // 	// console.log("renderOption state");
  // 	// console.log(state);
  // 	// console.log("renderOption ownerState");
  // 	// console.log(ownerState);
  // 	return (
  // 		<li {...props}>
  // 			{ownerState.getOptionLabel(option)}
  // 		</li>
  // 	);
  // };

  return (
    <LabeledSelector<Key>
      filterOptions={getFilterOptions}
      id="key-search-selector"
      label="Search for Keys"
      minWidth={minWidth}
      items={allKeys}
      getValue={(k: Key) => k.getDisplayName()}
      getDisplay={(k: Key) => k.getDisplayName()}
      onChange={updateKey}
      onInputChange={handleInputChange}
      // renderOption={renderOption}
      theme={theme}
    />
  );
};

export { KeySearchSelector };
