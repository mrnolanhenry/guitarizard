// Type definitions for note-lib
// Project: note-lib
// Definitions by: Jay Querie <jay@querie.cc>

type NoteID = string;

type NoteAttribute = 'isSharp' | 'isFlat';

export interface Note {
  id: NoteID;
  attributes: {
    isSharp?: boolean;
    isFlat?: boolean;
  };
  aliasNotes: Array<Note>;
  findByAttribute: (attribute: NoteAttribute, value: any) => Note | void;
  findSharp: () => Note | void;
  findFlat: () => Note | void;
  isSimilar: (note: Note) => boolean;
}

export interface ScaleSystem {
  name: string;
  notes: Array<Note>;

  getNoteFromID: (noteID: NoteID) => Note;
  getShiftedNotes: (fromNote: Note) => Array<Note>;
  _getRelativeNoteOffset: (fromNote: Note) => number;
  getNoteInterval: (fromNote: Note, toNote: Note) => number;
  getNextNote: (fromNote: Note, stepsAway: number) => Note;
  getKeyNotes: () => Array<Note>;
}

export type IntervalAlias = String;

export interface Interval {
  semitones: number;
  aliases: Array<IntervalAlias>;

  isMajor: boolean;
  isMinor: boolean;
  isAugmented: boolean;
  isDiminished: boolean;
  isPerfect: boolean;
  isRoot: boolean;

  hasAliasName: (alias: IntervalAlias) => boolean;
}

export interface Scale {
  name: string;
  scaleSystem: ScaleSystem;
  intervals: Array<Interval>;

  getNotesInKey: (key: Note) => Array<Note>;
}

export namespace data {
  export const scaleSystem: {
    diatonic: ScaleSystem;
  };
  export const intervals: Array<Interval>;
  export const scales: Array<Scale>;
}

type MaterialType = 'metal' | 'nylon';
type GaugeMilliMeters = number;

export namespace instrument {

  export class TunedString {
    tuningNote: Note;
    material: MaterialType;
    gauge: GaugeMilliMeters;

    getFrettedNotes: (scaleSystem: ScaleSystem, fretSpan: number) => Array<Note>

    constructor(tuningNote: Note, material: MaterialType, gauge: GaugeMilliMeters);
  }

  export interface StringConfig {
    fret: {
      start: number;
      end: number;
    }
  }

  export interface StringScale {
    tunedString: TunedString,
    config: StringConfig;
    notes: Array<{
      value: Note;
      fretNumber: number;
    }>;
  }

  export class FretBoard {
    scaleSystem: ScaleSystem;
    tunedStrings: Array<TunedString>;
    stringConfig: Array<StringConfig>;

    fretCount: number;

    stringNotes: Array<StringScale>;

    _getNotes: () => Array<StringScale>;

    getNotesInScale: (scale: Scale, keyNote: Note) => Array<StringScale>
  }

  export interface FrettedInstrument {
    fretCount: number;
    tuning: Array<Note>;
    fretBoard: FretBoard;
  }

  export class Guitar implements FrettedInstrument {
    fretCount: number;
    tuning: Array<Note>;
    fretBoard: FretBoard;

    constructor(fretCount: number, tuning: Array<Note>);
  }

  export class Banjo implements FrettedInstrument {
    fretCount: number;
    tuning: Array<Note>;
    fretBoard: FretBoard;

    constructor(fretCount: number, tuning: Array<Note>);
  }
}
