import { Note } from "./Note";

export abstract class NoteCollection {
  abstract name: string;
  abstract notes: Note[];
  // Given a Note,
  // return true if Note matches any Notes in this NoteCollection by Note Id
  // Optionally pass true for allowEquivalents to return true if Note matches an equivalent Note 
  // e.g. A# and Bb
  hasNote(noteToFind: Note, allowEquivalents: boolean = false): boolean {
    return !!this.notes.find((note: Note) => allowEquivalents ? note.isEquivalent(noteToFind) : note.isIdentical(noteToFind));
  }

  // Given another NoteCollection,
  // return true if the amount of Notes in the other NoteCollection are the same as the amount in this NoteCollection
  // AND all the Note IDs in the other NoteCollection match the Note IDs in this NoteCollection
  // In other words, this NoteCollection "shares" all the same Notes as otherCollection
  sharesIdenticalNotes(otherCollection: NoteCollection): boolean {
    return this.notes.length === otherCollection.notes.length && this.includesIdenticalNotes(otherCollection);
  };

  // Given another NoteCollection,
  // return true if the amount of Notes in the other NoteCollection are the same as the amount in this NoteCollection
  // AND all the Note IDs in the other NoteCollection match the Note IDs in this NoteCollection
  // OR their enharmonic equivalent Notes (e.g. A# and Bb)
  // In other words, this NoteCollection "shares" all the same Notes as otherCollection, or equivalent Notes
  sharesEquivalentNotes(otherCollection: NoteCollection): boolean {
    return this.notes.length === otherCollection.notes.length && this.includesEquivalentNotes(otherCollection);
  };

  // Given another NoteCollection,
  // return true if all the Note IDs in the other NoteCollection match the Note IDs in this NoteCollection
  // In other words, this NoteCollection "includes" the Notes of otherCollection
  includesIdenticalNotes(otherCollection: NoteCollection): boolean {
    return this.compareNoteCollectionByNoteIds(otherCollection);
  };

  // Given another NoteCollection,
  // return true if all the Note IDs in the other NoteCollection match the Note IDs in this NoteCollection
  // OR their enharmonic equivalent Notes (A# instead of Bb)
  // In other words, this NoteCollection "includes" the Notes of otherCollection, or equivalent Notes
  includesEquivalentNotes(otherCollection: NoteCollection): boolean {
    return this.compareNoteCollectionByNoteIds(otherCollection, true);
  };

  // Given another NoteCollection,
  // return true if every Note in the other NoteCollection is found by Note id in this NoteCollection
  protected compareNoteCollectionByNoteIds(otherCollection: NoteCollection, allowEquivalents: boolean = false): boolean {
    return otherCollection.notes.every((currentNote: Note) => {
      return this.hasNote(currentNote, allowEquivalents);
    });
  }
}
