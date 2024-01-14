import { AutocompleteRenderOptionState } from "@mui/material";
import { FilterOptionsState } from "@mui/material/useAutocomplete";
import { data, Key, Note, Temperament } from "note-lib";
import { ReactNode } from "react";
import { Base16Theme } from "../../colors/themes";
import { LabeledSelector } from "./LabeledSelector";

interface IKeySearchSelectorProps {
  activeKey: Key;
  minWidth?: string;
  updateKey: (key: Key) => void;
  temperament: Temperament;
  theme: Base16Theme;
}

const KeySearchSelector = (props: IKeySearchSelectorProps) => {
  const { 
    activeKey,
    minWidth,
    updateKey,
    temperament,
    theme,
   } = props;

   const allKeys: Key[] = [];
   temperament.getNotesInTemperament().forEach((note) => {
     data.scales.forEach((scale) => {
       allKeys.push(new Key(note, scale));
     });
   });

   const getSpecialFilterOptions = (options: Key[], state: FilterOptionsState<any>): any[] => {
    const { inputValue } = state;
    if (!inputValue) {
      return [];
    }
    else {
      const trimVal = inputValue.trim().toLowerCase();
      // trimming each term, so it can handle inputs with lots of empty space e.g. "0,1, 2, 3, 5, , , 6, " or "A, B,C#,D, ,Eb"
      const inputValues = trimVal.split(",").map((val) => val.trim()).filter((val) => !!val);
      let filterOptions = options.filter((option) => {
        return isKeyDisplayNameMatch(option, trimVal);
      });
      

      if (filterOptions.length === 0) {
        filterOptions = allKeys.filter((key) => isNoteMatch(key, inputValues));
      }

      return filterOptions;
    }
  }

  const isKeyDisplayNameMatch = (key: Key, inputValue: string) => {
    return key.getDisplayName().toLowerCase().indexOf(inputValue) !== -1;
  }

  // const isIntervalMatch = (option: Key, inputValues: string[]) => {
  //   const notesInKey: Note[] = option.scale.getNotesInKey(option.note);

  //   let allIntervalsMatch: boolean = true;

  //   inputValues.forEach((value) => {
  //     value.trim();  
  //     const intervalFound: boolean = !!(option.scale.intervals.find((interval) => interval.semitones.toString() === value.trim()));
  //     if (!intervalFound) {
  //       allIntervalsMatch = false;
  //     }
  //   });

  //   return allIntervalsMatch;
  // }

  const isNoteMatch = (key: Key, inputValues: string[]) => {
    let allNotesMatch: boolean = true;

    inputValues.forEach((value) => {
      const trimVal = value.trim();  
      const noteToFind = temperament.getNoteFromID(trimVal);
      if (!noteToFind) {
        allNotesMatch = false;
      }
      else {
        const notesInKey: Note[] = key.scale.getNotesInKey(key.note);  
        const noteFound: boolean = !!(notesInKey.find((note) => note.isSimilar(noteToFind)));
        if (!noteFound) {
          allNotesMatch = false;
        }
      }
    });

    return allNotesMatch;
  }

  // NOLAN TODO - not in use YET
  const renderOption = (props: React.HTMLAttributes<HTMLLIElement>, option: Key, state: AutocompleteRenderOptionState, ownerState: any): ReactNode => {
    // console.log("renderOption props");
    // console.log(props);
    // console.log("renderOption state");
    // console.log(state);
    // console.log("renderOption ownerState");
    // console.log(ownerState);
    return (
      <li {...props}>
        {ownerState.getOptionLabel(option)}
      </li>
    );
  };

  return (
    <LabeledSelector<Key>
      filterOptions={getSpecialFilterOptions}
      id="key-search-selector"
      label="Search for Keys"
      minWidth={minWidth}
      items={allKeys}
      getValue={(k: Key) => k.getDisplayName()}
      getDisplay={(k: Key) => k.getDisplayName()}
      onChange={updateKey}
      // renderOption={renderOption}
      theme={theme}
    />
  );
}

export { KeySearchSelector };
