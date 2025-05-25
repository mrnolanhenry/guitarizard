import { Chord } from "./Chord";
import { Key } from "./Key";

// Given an array of Keys, sort them in ascending order by note id's
// e.g. 'A, A#, Bb, B, C, C#, Db, D#, Eb, E, F, F#, Gb, G, G#, Ab'.
// and then by scale name in ascending order
// e.g. 'Aeolian, Algerian, Arabic, Armenian, Augmented, Bebop, Blues, Chromatic, Diminished, etc.
const sortKeysByTonicAndScale = (keyArray: Key[], primaryKey?: Key): Key[] => {
  if (keyArray.length <= 1) {
    return keyArray;
  }

  if (!primaryKey) {
    primaryKey = keyArray[0];
  }
  var ordering: any = {};
  const sortOrder = primaryKey.scale.temperament.getSortOrderByNotes();
  for (var i = 0; i < sortOrder.length; i++) {
    ordering[sortOrder[i]] = i;
  }  

  keyArray.sort( function(a: Key, b: Key): number {
    return (ordering[a.tonic.id] - ordering[b.tonic.id]) || a.scale.name.localeCompare(b.scale.name);
  });

  return keyArray;
}

// Given an array of Keys, sort them in ascending order by note id's
// e.g. 'A, A#, Bb, B, C, C#, Db, D#, Eb, E, F, F#, Gb, G, G#, Ab'.
const sortChordsByRoot = (chordArray: Chord[], primaryKey?: Chord): Chord[] => {
  return sortChordsByRootAndOrChordType(chordArray, false, primaryKey);
}

// Given an array of Keys, sort them in ascending order by note id's
// e.g. 'A, A#, Bb, B, C, C#, Db, D#, Eb, E, F, F#, Gb, G, G#, Ab'.
// and then by chordType name in ascending order
// e.g. 'major, minor, etc.
const sortChordsByRootAndChordType = (chordArray: Chord[], primaryKey?: Chord): Chord[] => {
  return sortChordsByRootAndOrChordType(chordArray, true, primaryKey);
}

// Given an array of Keys, sort them in ascending order by note id's
// e.g. 'A, A#, Bb, B, C, C#, Db, D#, Eb, E, F, F#, Gb, G, G#, Ab'.
// and then optionally by chordType name in ascending order
// e.g. 'major, minor, etc.
const sortChordsByRootAndOrChordType = (chordArray: Chord[], shouldSortByChordType: boolean, primaryKey?: Chord): Chord[] => {
  if (chordArray.length <= 1) {
    return chordArray;
  }

  if (!primaryKey) {
    primaryKey = chordArray[0];
  }
  var ordering: any = {};
  const sortOrder = primaryKey.chordType.temperament.getSortOrderByNotes();
  for (var i = 0; i < sortOrder.length; i++) {
    ordering[sortOrder[i]] = i;
  }  

  chordArray.sort( function(a: Chord, b: Chord): number {
    return (ordering[a.root.id] - ordering[b.root.id]) || (shouldSortByChordType && a.chordType.shortHand.localeCompare(b.chordType.shortHand));
  });

  return chordArray;
}

// Given an array with numeric values, sort them in ascending order.
const sortNumericArray = (array: number[]): number[] => {
  array.sort(function (a: number, b: number): number {
    return a - b;
  });
  return array;
};


export { sortChordsByRoot, sortChordsByRootAndChordType, sortKeysByTonicAndScale, sortNumericArray };
