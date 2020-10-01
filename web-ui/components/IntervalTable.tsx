import { Scale, Interval } from "note-lib";
import { Base16Theme, rainbow } from "../lib/colors";
import React, { CSSProperties } from "react";

interface Props {
  scale: Scale;
  isRainbowMode: boolean;
  theme: Base16Theme;
}

export default function intervalTable(props: Props) {
  const {
    scale,
    isRainbowMode,
    theme,
  } = props;

  const rowDiv: CSSProperties = {
    display: "flex",
    flexDirection: "row",
  };

  const colDiv: CSSProperties = {
    padding: "5px",
    textAlign: "left",
    listStylePosition: "inside",
  };

  const intervalStyle: CSSProperties = {
    backgroundColor: theme.base00,
    color: theme.base05,
    borderStyle: "solid",
    borderColor: theme.base01,
    borderWidth: "1px",
    padding: "2px 0px 2px 5px",
    width: "100px",
  };

  const getIntervalTextStyle = (isRainbowMode: boolean, intervalStyle: CSSProperties, interval: Interval) => {
    let intervalTextStyle: CSSProperties = intervalStyle;

    if (isRainbowMode) {
      const semitoneColor = rainbow[interval.semitones]

      if (semitoneColor) {
        intervalTextStyle = {
          ...intervalTextStyle,
          color: semitoneColor,
        }
      }
    }
    return intervalTextStyle;
  }

  const displayIntervalProperty = (interval: Interval, rowLabel: string): string => {
    switch (rowLabel) {
      case "Semitones:":
        return interval.semitones.toString();
      case "Short:":
        return interval.aliases[0].short;
      case "Long:":
        return interval.aliases[0].long;
      case "Short (Alt):":
        return interval.aliases[1].short;
      case "Long (Alt):":
        return interval.aliases[1].long;
      default:
        return interval.semitones.toString();
    }
  }

  const mapIntervals = (rowLabel: string): JSX.Element => {

    return (
      <>
        {scale.intervals.map((interval, i) => {
          const intervalTextStyle = getIntervalTextStyle(isRainbowMode, intervalStyle, interval);
          return (
            <div
              key={`${i}:${Math.random()}`}
              className="intervalItem"
              style={intervalTextStyle}
            >
              {" "}
              {displayIntervalProperty(interval, rowLabel)}
            </div>
          )
        })
        }
      </>
    )
  };

  const renderIntervalRow = (rowLabel: string): JSX.Element => {
    return (
      <div id="intervalRow" style={rowDiv}>
        <div className="intervalItem" style={intervalStyle}>
          {" "}
          {rowLabel}
        </div>
        {mapIntervals(rowLabel)}
      </div>
    )
  };

  return (
    <div id="intervalTable" style={colDiv}>
      Intervals included:
      {renderIntervalRow("Semitones:")}
      {renderIntervalRow("Short:")}
      {renderIntervalRow("Long:")}
      {renderIntervalRow("Short (Alt):")}
      {renderIntervalRow("Long (Alt):")}
    </div>
  );
}
