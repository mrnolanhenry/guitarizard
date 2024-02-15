import { Scale, Interval } from "note-lib";
import { Base16Theme, rainbow } from "../colors/themes";
import React, { CSSProperties } from "react";
import { Grid } from "@mui/material";

interface IIntervalTableProps {
  scale: Scale;
  isSmallScreen: boolean;
  isRainbowMode: boolean;
  theme: Base16Theme;
}

const IntervalTable = (props: IIntervalTableProps) => {
  const { scale, isSmallScreen, isRainbowMode, theme } = props;
  const fontSize: string = isSmallScreen ? "12px" : "inherit";

  const intervalStyle: CSSProperties = {
    backgroundColor: theme.swatch.base00,
    color: theme.swatch.base05,
    borderStyle: "solid",
    borderColor: theme.swatch.base01,
    borderWidth: "1px",
    padding: "1px 0px 1px 5px",
    fontSize: fontSize,
    width: isSmallScreen ? "auto" : "100px",
    minHeight: isSmallScreen ? "40px" : "auto",
    wordWrap: "break-word",
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
              key={`interval-item-${i}:${interval.aliases[0].name}`}
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

  const renderIntervalRow = (label: string): JSX.Element => {
    const xsColumns: number = scale.intervals.length + 2;

    return (
      <Grid item container id="intervalRow"  xs={xsColumns} sm={xsColumns - 1} lg={xsColumns - 1} columns={isSmallScreen ? xsColumns : xsColumns - 1}>
        <Grid item className="intervalItem" xs={2} sm={1} md={1} lg={1} style={intervalStyle}>
          {label}
        </Grid>
        {mapIntervals(label)}
      </Grid>
    );
  };

  const renderIntervalColumn = (label: string): JSX.Element => {
    return (
      <Grid item container id="intervalColumn" direction="column">
        <Grid item className="intervalItem" style={intervalStyle}>
          {label}
        </Grid>
        {mapIntervals(label)}
      </Grid>
    );
  };

  const renderIntervalData = (isSmallScreen: boolean, label: string): JSX.Element  => isSmallScreen ? renderIntervalColumn(label) : renderIntervalRow(label);
  const renderIntervalDataTable = (isSmallScreen: boolean) => {
    return isSmallScreen ?
      <Grid container item columns={8}>
        <Grid item xs={2}>{renderIntervalData(isSmallScreen, "Semitones:")}</Grid>
        <Grid item xs={1}>{renderIntervalData(isSmallScreen, "Short:")}</Grid>
        <Grid item xs={2}>{renderIntervalData(isSmallScreen, "Long:")}</Grid>
        <Grid item xs={1}>{renderIntervalData(isSmallScreen, "Short (Alt):")}</Grid>
        <Grid item xs={2}>{renderIntervalData(isSmallScreen, "Long (Alt):")}</Grid>
      </Grid> :
      <>
        {renderIntervalData(isSmallScreen, "Semitones:")}
        {renderIntervalData(isSmallScreen, "Short:")}
        {renderIntervalData(isSmallScreen, "Long:")}
        {renderIntervalData(isSmallScreen, "Short (Alt):")}
        {renderIntervalData(isSmallScreen, "Long (Alt):")}
      </> 
      
  }


  return (
    <Grid container id="intervalTable">
      <Grid item xs={12}>
        <span style={{fontSize: fontSize}}>Intervals included:</span>
      </Grid>
      {renderIntervalDataTable(isSmallScreen)}
    </Grid>
  );
};

export { IntervalTable };
