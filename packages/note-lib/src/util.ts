import { Key } from "./Key";

// Given an array of Keys, sort them in ascending order by note id's
// e.g. 'A, A#, Bb, B, C, C#, Db, D#, Eb, E, F, F#, Gb, G, G#, Ab'.
// and then by scale name in ascending order
// e.g. 'Aeolian, Algerian, Arabic, Armenian, Augmented, Bebop, Blues, Chromatic, Diminished, etc.
const sortKeysByNoteAndScale = (keyArray: Key[], primaryKey?: Key): Key[] => {
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
    return (ordering[a.note.id] - ordering[b.note.id]) || a.scale.name.localeCompare(b.scale.name);
  });

  return keyArray;
}

// Given an array with numeric values, sort them in ascending order.
const sortNumericArray = (array: number[]): number[] => {
  array.sort(function (a: number, b: number): number {
    return a - b;
  });
  return array;
};

export { sortKeysByNoteAndScale, sortNumericArray };
