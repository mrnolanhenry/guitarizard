import { Scale } from "guitarizard-note-lib";
import { Base16Theme } from "../lib/colors";
import React from 'react';

// a single Interval
interface Props {
    scale: Scale;
    theme: Base16Theme;
  }
  
  export default function intervalTable(props: Props) {
    const rowDiv = {
      display: 'flex',
      flexDirection: 'row'
    }
    
    const colDiv = {
      padding: '5px',
      textAlign: 'left',
      listStylePosition: 'inside',
    }

    const intervalItem = {
      backgroundColor: props.theme.base00,
      color: props.theme.base05,
      borderStyle: 'solid',
      borderColor: props.theme.base01,
      borderWidth: '1px',
      padding: '2px 0px 2px 5px',
      width: '100px'
    }
  
    return (<div id="scaleSummary" style={colDiv}>
    Intervals included:
    <div id="intervalRow" style={rowDiv}>
    <div className="intervalItem" style = {intervalItem}> Semitones:</div>
      {props.scale.intervals.map((interval, i) =>
        <div key={`${i}:${Math.random()}`} className="intervalItem" style={intervalItem}> {interval.semitones}</div>
      )}
    </div>
    
    <div id="intervalRow" style={rowDiv}>
    <div className="intervalItem" style = {intervalItem}> Short:</div>
      {props.scale.intervals.map((interval, i) =>
        <div key={`${i}:${Math.random()}`} className="intervalItem" style={intervalItem}> {interval.aliases[0].short}</div>
      )}
    </div>

    <div id="intervalRow" style={rowDiv}>
    <div className="intervalItem" style = {intervalItem}> Long:</div>
      {props.scale.intervals.map((interval, i) =>
        <div key={`${i}:${Math.random()}`} className="intervalItem" style={intervalItem}> {interval.aliases[0].long}</div>
      )}
    </div>

    <div id="intervalRow" style={rowDiv}>
    <div className="intervalItem"style = {intervalItem}> Short (Alt):</div>
      {props.scale.intervals.map((interval, i) =>
        <div key={`${i}:${Math.random()}`} className="intervalItem" style={intervalItem}> {interval.aliases[1].short}</div>
      )}
    </div>

    <div id="intervalRow" style={rowDiv}>
    <div className="intervalItem" style = {intervalItem}> Long (Alt):</div>
      {props.scale.intervals.map((interval, i) =>
        <div key={`${i}:${Math.random()}`} className="intervalItem" style={intervalItem}> {interval.aliases[1].long}</div>
      )}
    </div>

    </div>);
  }