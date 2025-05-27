import { Chord } from "./Chord";
import { ChordType } from "./ChordType";
import { Key } from "./Key";
import { NoteCollection } from "./NoteCollection";
import { Scale } from "./Scale";

// Given an array of Keys, sort them in ascending order by note id's
// e.g. 'A, A#, Bb, B, C, C#, Db, D#, Eb, E, F, F#, Gb, G, G#, Ab'.
const sortKeysByTonic = (keyArray: Key[], primaryKey?: Key): Key[] => {
  return (sortKeysOrChords(keyArray, true, false, primaryKey) as Key[]);
}

// Given an array of Keys, sort them in ascending order by note id's
// e.g. 'A, A#, Bb, B, C, C#, Db, D#, Eb, E, F, F#, Gb, G, G#, Ab'.
// and then by scale name in ascending order
// e.g. 'Aeolian, Algerian, Arabic, Armenian, Augmented, Bebop, Blues, Chromatic, Diminished, etc.
const sortKeysByTonicAndScale = (keyArray: Key[], primaryKey?: Key): Key[] => {
  return (sortKeysOrChords(keyArray, true, true, primaryKey) as Key[]);
}

// Given an array of Chords, sort them in ascending order by note id's
// e.g. 'A, A#, Bb, B, C, C#, Db, D#, Eb, E, F, F#, Gb, G, G#, Ab'.
const sortChordsByRoot = (chordArray: Chord[], primaryChord?: Chord): Chord[] => {
  return (sortKeysOrChords(chordArray, false, false, primaryChord) as Chord[]);
}

// Given an array of Chords, sort them in ascending order by note id's
// e.g. 'A, A#, Bb, B, C, C#, Db, D#, Eb, E, F, F#, Gb, G, G#, Ab'.
// and then by chordType name in ascending order
// e.g. 'major, minor, etc.
const sortChordsByRootAndChordType = (chordArray: Chord[], primaryChord?: Chord): Chord[] => {
  return (sortKeysOrChords(chordArray, false, true, primaryChord) as Chord[]);
}

// Given an array of Keys or Chords, sort them in ascending order by note id's
// e.g. 'A, A#, Bb, B, C, C#, Db, D#, Eb, E, F, F#, Gb, G, G#, Ab'.
// pass isSortingKeys true for Keys and false for Chords
// and then optionally by IntervalCollection (Scale or ChordType) name in ascending order
// e.g. 'major, minor, etc.
const sortKeysOrChords = (noteCollections: NoteCollection[], isSortingKeys: boolean, shouldSortByIntervalCollection: boolean, primaryNoteCollection?: NoteCollection): NoteCollection[] => {
  if (noteCollections.length <= 1) {
    return noteCollections;
  }

  if (!primaryNoteCollection) {
    primaryNoteCollection = noteCollections[0];
  }
  var ordering: any = {};
  const primaryIntervalCollection: Scale | ChordType  = isSortingKeys ? (primaryNoteCollection as Key).scale : (primaryNoteCollection as Chord).chordType;
  const sortOrder = primaryIntervalCollection.temperament.getSortOrderByNotes();
  for (var i = 0; i < sortOrder.length; i++) {
    ordering[sortOrder[i]] = i;
  }  

  if (isSortingKeys) {
    noteCollections.sort( function(a: NoteCollection, b: NoteCollection): number {
      const orderByTonic = (ordering[(a as Key).tonic.id] - ordering[(b as Key).tonic.id]);
      const orderByScaleName = (a as Key).scale.name.localeCompare((b as Key).scale.name);
      return shouldSortByIntervalCollection ? orderByTonic || orderByScaleName : orderByTonic;  
    });
  }
  else {
    noteCollections.sort( function(a: NoteCollection, b: NoteCollection): number {
      const orderByRoot = (ordering[(a as Chord).root.id] - ordering[(b as Chord).root.id]);
      const orderByChordType = (a as Chord).chordType.shortHand.localeCompare((b as Chord).chordType.shortHand);
      return shouldSortByIntervalCollection ? orderByRoot || orderByChordType : orderByRoot;  
    });
  }
  return noteCollections;
}

// Given an array with numeric values, sort them in ascending order.
const sortNumericArray = (array: number[]): number[] => {
  array.sort(function (a: number, b: number): number {
    return a - b;
  });
  return array;
};

export { sortChordsByRoot, sortChordsByRootAndChordType, sortKeysByTonic, sortKeysByTonicAndScale, sortNumericArray };
