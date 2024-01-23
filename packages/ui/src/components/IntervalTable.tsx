import { Scale, Interval } from "note-lib";
import { Base16Theme, rainbow } from "../colors/themes";
import React, { CSSProperties } from "react";
import { Grid } from "@mui/material";

interface IIntervalTableProps {
  scale: Scale;
  isLargeScreen: boolean;
  isRainbowMode: boolean;
  theme: Base16Theme;
}

const IntervalTable = (props: IIntervalTableProps) => {
  const { scale, isLargeScreen, isRainbowMode, theme } = props;

  const intervalStyle: CSSProperties = {
    backgroundColor: theme.swatch.base00,
    color: theme.swatch.base05,
    borderStyle: "solid",
    borderColor: theme.swatch.base01,
    borderWidth: "1px",
    padding: "2px 0px 2px 5px",
    width: "100px",
  };

  const getIntervalTextStyle = (
    isRainbowMode: boolean,
    intervalStyle: CSSProperties,
    interval: Interval,
  ): CSSProperties => {
    let intervalTextStyle: CSSProperties = intervalStyle;

    if (isRainbowMode) {
      const semitoneColor: string = rainbow[interval.semitones];

      if (semitoneColor) {
        intervalTextStyle = {
          ...intervalTextStyle,
          color: semitoneColor,
        };
      }
    }
    return intervalTextStyle;
  };

  const displayIntervalProperty = (
    interval: Interval,
    rowLabel: string,
  ): string => {
    switch (rowLabel) {
      case "Semitones:":
        return interval.semitones.toString();
      case "Short:":
        return interval.aliases[0].short ? interval.aliases[0].short : "";
      case "Long:":
        return interval.aliases[0].long ? interval.aliases[0].long : "";
      case "Short (Alt):":
        return interval.aliases[1].short ? interval.aliases[1].short : "";
      case "Long (Alt):":
        return interval.aliases[1].long ? interval.aliases[1].long : "";
      default:
        return interval.semitones.toString();
    }
  };

  const mapIntervals = (rowLabel: string): JSX.Element => {
    return (
      <>
        {scale.intervals.map((interval, i) => {
          const intervalTextStyle = getIntervalTextStyle(
            isRainbowMode,
            intervalStyle,
            interval,
          );
          return (
            <Grid item xs={1}
              key={`${i}:${Math.random()}`}
              className="intervalItem"
              style={intervalTextStyle}
            >
              {displayIntervalProperty(interval, rowLabel)}
            </Grid>
          );
        })}
      </>
    );
  };

  const renderIntervalRow = (rowLabel: string): JSX.Element => {
    const xsColumns: number = scale.intervals.length + 2;

    return (
      <Grid item container id="intervalRow"  xs={xsColumns} sm={xsColumns - 1} lg={xsColumns - 1} columns={isLargeScreen ? xsColumns - 1 : xsColumns}>
        <Grid item className="intervalItem" xs={2} sm={1} md={1} lg={1} style={intervalStyle}>
          {rowLabel}
        </Grid>
        {mapIntervals(rowLabel)}
      </Grid>
    );
  };

  return (
    <Grid container id="intervalTable">
      <Grid item xs={12}>
        Intervals included:
      </Grid>
      {renderIntervalRow("Semitones:")}
      {renderIntervalRow("Short:")}
      {renderIntervalRow("Long:")}
      {renderIntervalRow("Short (Alt):")}
      {renderIntervalRow("Long (Alt):")}
    </Grid>
  );
};

export { IntervalTable };
