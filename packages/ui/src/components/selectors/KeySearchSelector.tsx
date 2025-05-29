// import { AutocompleteRenderOptionState } from "@mui/material";
import { FilterOptionsState } from "@mui/material/useAutocomplete";
import { data, Key, Note, Temperament, util } from "note-lib";
// import React, { ReactNode, useState } from "react";
import React, { useState } from "react";
import { Base16Theme } from "../../colors/themes";
import { LabeledSelector } from "./LabeledSelector";

interface IKeySearchSelectorProps {
  allKeys: Key[];
  minWidth?: string;
  updateKey: (key: Key) => void;
  theme: Base16Theme;
}

const KeySearchSelector = (props: IKeySearchSelectorProps) => {
  const [searchTimeout, setSearchTimeout] = useState(
    null as ReturnType<typeof setTimeout> | null,
  );
  const [filterOptions, setFilterOptions] = useState([] as Key[]);

  const { allKeys, minWidth, updateKey, theme } = props;

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
    const inputEvent = event.nativeEvent as InputEvent;
    const inputType = inputEvent.inputType;
    const isInsertingText: boolean =
      !!inputType &&
      (inputType === "insertText" || inputType === "insertFromPaste" || inputType === "insertReplacementText");

    // NOLAN TODO - not in use YET but may be useful later
    // const isDeletingText: boolean =
    //   !!inputType &&
    //   (inputType === "deleteContentBackward" || inputType === "deleteContentForward" || inputType === "deleteByCut" || inputType === "deleteContent");

    const isInsertingSearchModifier: boolean = inputEvent.data === "-";
    const shouldResetPotentialKeys: boolean = !isInsertingText;

    if (shouldResetPotentialKeys) {
      setPotentialKeys(allKeys);
    }

    const shouldFilterFromAllKeys: boolean = shouldResetPotentialKeys;
    const availableKeys: Key[] = shouldFilterFromAllKeys ? allKeys : potentialKeys;

    setSearchTimeout(
      setTimeout(() => {
        setFilterOptions(handleFilterOptions(inputValue, isInsertingText && !isInsertingSearchModifier, availableKeys));
      }, 200),
    );
  };

  const handleFilterOptions = (
    inputValue: string,
    shouldSetPotentialKeys: boolean,
    availableKeys: Key[],
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
      let filteredOptions: Key[] = [];
      let filteredOptionsByDisplayName = availableKeys.filter((key) =>
        isKeyDisplayNameMatch(key, trimVal)
      );
      filteredOptions.push(...filteredOptionsByDisplayName);

      // If we didn't find any keys by display name OR our search term is less than 3 characters, 
      // search by the notes in the key
      if (filteredOptionsByDisplayName.length === 0 || trimVal.length < 3) {
        let filteredOptionsByNotes = availableKeys.filter((key) =>
          isNoteMatch(key, inputValues)
        );
        filteredOptions.push(...filteredOptionsByNotes);
      }
      const uniqueFilteredOptions = util.sortKeysByTonicAndScale([...new Set(filteredOptions)]);

      if (shouldSetPotentialKeys) {
        setPotentialKeys(uniqueFilteredOptions);
      }
      return uniqueFilteredOptions;
    }
  };

  const getFilterOptions = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _options: Key[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _state: FilterOptionsState<Key>,
  ): Key[] => filterOptions;

  // check a key by key name
  // e.g. "alg", "algerian", "Gb alg", "Gb algerian", etc.
  const isKeyDisplayNameMatch = (key: Key, inputValue: string) => {
    return key.name.toLowerCase().includes(inputValue);
  };
  // check a key by notes in the key
  // e.g. "A", "A, B", "A, B, C#", "A, B, C#, D", "A, B, C#, D, Eb", etc.
  // OR even "A, B, C#, D, Eb, -F, -Gb" which would look for a key with A, B, C#, D, Eb, but not F or Gb
  const isNoteMatch = (key: Key, inputValues: string[]) => {
    let allNotesMatch: boolean = true;

    inputValues.forEach((value) => {
      const trimVal = value.trim();
      // if the value starts with a "-", it means we want to avoid finding that note in the key
      const isNoteToAvoid: boolean = trimVal.startsWith("-");
      const noteVal = isNoteToAvoid ? trimVal.substring(1) : trimVal;
      const noteToFind = key.scale.temperament.getNoteFromID(noteVal);
      if (!noteToFind) {
        allNotesMatch = false;
      } else {
        const noteFound: boolean = !!key.hasNote(noteToFind, true);
        // if we didn't find the note in the key, and it's not a note to avoid, or we found the note in the key and it is a note to avoid
        if ((!noteFound && !isNoteToAvoid) || (noteFound && isNoteToAvoid)) {
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
      freeSolo={true}
      id="key-search-selector"
      label="Search for Keys"
      minWidth={minWidth}
      items={allKeys}
      getValue={(k: Key) => k.name}
      getDisplay={(k: Key) => k.name}
      onChange={updateKey}
      onInputChange={handleInputChange}
      placeholder={"Search by name or notes ('A, Bb, D, E, F#')"}
      // renderOption={renderOption}
      shouldAutocomplete={true}
      showSearchIcon={true}
      theme={theme}
    />
  );
};

export { KeySearchSelector };