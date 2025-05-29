// import { AutocompleteRenderOptionState } from "@mui/material";
import { FilterOptionsState } from "@mui/material/useAutocomplete";
import { data, Chord, Note, Temperament, util } from "note-lib";
import React, { useState } from "react";
import { Base16Theme } from "../../colors/themes";
import { LabeledSelector } from "../common/selectors/LabeledSelector";

interface IChordSearchSelectorProps {
  allChords: Chord[];
  minWidth?: string;
  updateChord: (chord: Chord) => void;
  theme: Base16Theme;
}

const ChordSearchSelector = (props: IChordSearchSelectorProps) => {
  const [searchTimeout, setSearchTimeout] = useState(
    null as ReturnType<typeof setTimeout> | null,
  );
  const [filterOptions, setFilterOptions] = useState([] as Chord[]);

  const { allChords, minWidth, updateChord, theme } = props;

  // Speed up search by only searching through a subset of allChords,
  // then resetting it to allChords when appropriate.
  // For instance, you've entered "A, B" already in the search and filtered down to 557 chords vs. the existing 2,193.
  // Now when you continue typing, e.g. "A, B, C#" you'll only filter from those 557 chords.
  const [potentialChords, setPotentialChords] = useState(allChords);

  const handleInputChange = (
    event: React.SyntheticEvent,
    inputValue: string,
  ) => {
    clearTimeout(searchTimeout as ReturnType<typeof setTimeout>);

    // Reset potentialChords to allChords if not inserting text
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
    const shouldResetPotentialChords: boolean = !isInsertingText;

    if (shouldResetPotentialChords) {
      setPotentialChords(allChords);
    }

    const shouldFilterFromAllChords: boolean = shouldResetPotentialChords;
    const availableChords: Chord[] = shouldFilterFromAllChords ? allChords : potentialChords;

    setSearchTimeout(
      setTimeout(() => {
        setFilterOptions(handleFilterOptions(inputValue, isInsertingText && !isInsertingSearchModifier, availableChords));
      }, 200),
    );
  };

  const handleFilterOptions = (
    inputValue: string,
    shouldSetPotentialChords: boolean,
    availableChords: Chord[],
  ): Chord[] => {
    if (!inputValue) {
      setPotentialChords(allChords);
      return [];
    } else {
      const trimVal = inputValue.trim().toLowerCase();
      // trimming each term, so it can handle inputs with lots of empty space e.g. "0,1, 2, 3, 5, , , 6, " or "A, B,C#,D, ,Eb"
      const inputValues = trimVal
        .split(",")
        .map((val) => val.trim())
        .filter((val) => !!val);
      let filteredOptions: Chord[] = [];
      let filteredOptionsByDisplayName = availableChords.filter((chord) =>
        isChordDisplayNameMatch(chord, trimVal)
      );
      filteredOptions.push(...filteredOptionsByDisplayName);

      // If we didn't find any chords by display name OR our search term is less than 3 characters, 
      // search by the notes in the chord
      if (filteredOptionsByDisplayName.length === 0 || trimVal.length < 3) {
        let filteredOptionsByNotes = availableChords.filter((chord) =>
          isNoteMatch(chord, inputValues)
        );
        filteredOptions.push(...filteredOptionsByNotes);
      }
      const uniqueFilteredOptions = util.sortChordsByRoot([...new Set(filteredOptions)]);

      if (shouldSetPotentialChords) {
        setPotentialChords(uniqueFilteredOptions);
      }
      return uniqueFilteredOptions;
    }
  };

  const getFilterOptions = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _options: Chord[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _state: FilterOptionsState<Chord>,
  ): Chord[] => filterOptions;

  // check a chord by chord name
  // e.g. "alg", "algerian", "Gb alg", "Gb algerian", etc.
  const isChordDisplayNameMatch = (chord: Chord, inputValue: string) => {
    return chord.name.toLowerCase().includes(inputValue);
  };
  // check a chord by notes in the chord
  // e.g. "A", "A, B", "A, B, C#", "A, B, C#, D", "A, B, C#, D, Eb", etc.
  // OR even "A, B, C#, D, Eb, -F, -Gb" which would look for a chord with A, B, C#, D, Eb, but not F or Gb
  const isNoteMatch = (chord: Chord, inputValues: string[]) => {
    let allNotesMatch: boolean = true;

    inputValues.forEach((value) => {
      const trimVal = value.trim();
      // if the value starts with a "-", it means we want to avoid finding that note in the chord
      const isNoteToAvoid: boolean = trimVal.startsWith("-");
      const noteVal = isNoteToAvoid ? trimVal.substring(1) : trimVal;
      const noteToFind = chord.chordType.temperament.getNoteFromID(noteVal);
      if (!noteToFind) {
        allNotesMatch = false;
      } else {
        const noteFound: boolean = !!chord.hasNote(noteToFind, true);
        // if we didn't find the note in the chord, and it's not a note to avoid, or we found the note in the chord and it is a note to avoid
        if ((!noteFound && !isNoteToAvoid) || (noteFound && isNoteToAvoid)) {
          allNotesMatch = false;
        }
      }
    });

    return allNotesMatch;
  };

  // NOLAN TODO - not in use YET - want to replace the default "No Options" text with instructions when input is blank
  // const renderOption = (props: React.HTMLAttributes<HTMLLIElement>, option: Chord, state: AutocompleteRenderOptionState, ownerState: any): ReactNode => {
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
    <LabeledSelector<Chord>
      filterOptions={getFilterOptions}
      freeSolo={true}
      id="chord-search-selector"
      label="Search for Chords"
      minWidth={minWidth}
      items={allChords}
      getValue={(k: Chord) => k.name}
      getDisplay={(k: Chord) => k.name}
      onChange={updateChord}
      onInputChange={handleInputChange}
      placeholder={"Search by name or notes ('A, Bb, D, E, F#')"}
      // renderOption={renderOption}
      shouldAutocomplete={true}
      showSearchIcon={true}
      theme={theme}
    />
  );
};

export { ChordSearchSelector };