import { FilterOptionsState } from "@mui/material";
import { data, Scale } from "note-lib";
import { Base16Theme } from "../../colors/themes";
import { LabeledSelector } from "./LabeledSelector";

interface IScalesSelectorProps {
  activeScale: Scale;
  minWidth?: string;
  onScaleSelect: (scale: Scale) => void;
  theme: Base16Theme;
}

const ScaleSelector = (props: IScalesSelectorProps) => {
  const {
    activeScale,
    minWidth,
    onScaleSelect,
    theme,
  } = props;

  const getSpecialFilterOptions = (options: Scale[], state: FilterOptionsState<any>): any[] => {
    const { inputValue } = state;
    if (!inputValue) {
      return options;
    }
    else {
      let filterOptions = options.filter((option) => {
        const trimVal = inputValue.trim();
        // trimming each term, so it can handle inputs with lots of empty space e.g. "0,1, 2, 3, 5, , , 6, " or "A, B,C#,D, ,Eb"
        const splitValues = trimVal.split(",").map((val) => val.trim()).filter((val) => !!val);
        return isScaleNameMatch(option, trimVal) || isIntervalMatch(option, splitValues);
        // NOLAN TODO - handle matching by Note names in addition to intervals (and interval long/short names, for that matter)
      });
      return filterOptions;
    }
  }

  const isScaleNameMatch = (option: Scale, inputValue: string) => {
    return option.name.indexOf(inputValue) !== -1;
  }

  const isIntervalMatch = (option: Scale, splitValues: string[]) => {
    let allIntervalsMatch: boolean = true;

    splitValues.forEach((value) => {
      value.trim();  
      const intervalFound: boolean = !!(option.intervals.find((interval) => interval.semitones.toString() === value.trim()));
      if (!intervalFound) {
        allIntervalsMatch = false;
      }
    });

    return allIntervalsMatch;
  }

  return (
    <LabeledSelector<Scale>
      id="scale-selector"
      label="Scale:"
      minWidth={minWidth}
      items={data.scales}
      filterOptions={getSpecialFilterOptions}
      getValue={(s: Scale) => s.name}
      getDisplay={(s: Scale) => s.name}
      activeItem={activeScale}
      onChange={onScaleSelect}
      theme={theme}
    />
  );
}

export { ScaleSelector };
