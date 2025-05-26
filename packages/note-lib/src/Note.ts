import { NotePitch } from "./enums/NotePitch";

export type NoteID = string;


// NOLAN TODO:
// At some point, should include a (possibly optional) property related to the note's "octave" or "Scientific Pitch Notation"
// with the latter probably being a better/more universal name, though it's still based on 12TET/the Western chromatic scale
// https://en.wikipedia.org/wiki/C_(musical_note)
// https://en.wikipedia.org/wiki/Scientific_pitch_notation
export class Note {
  id: NoteID;
  pitch: NotePitch;
  aliasNotes: Note[];

  // NOLAN TODO - Don't use array of keys & enforce with type
  constructor(id: NoteID, pitch: NotePitch, aliasNotes?: Note[]) {
    this.id = id;
    this.pitch = pitch;
    this.aliasNotes = aliasNotes ?? [];
  }

  addAliasNote(note: Note): void {
    this.aliasNotes.push(note);
  }

  isIdentical(note: Note): boolean {
    return note.id.toLocaleLowerCase() === this.id.toLocaleLowerCase();
  }

  isEquivalent(note: Note): boolean {
    // check the basics
    if (this.isIdentical(note)) {
      return true;
    }

    // check aliases for a match
    const aliasNote: Note | undefined = this.aliasNotes.find(
      (an) => an.id.toLocaleLowerCase() === note.id.toLocaleLowerCase(),
    );

    return !!aliasNote; // force into a bool type (undefined ==> false);
  }

  /**
   * Find a note by pitch. It can be the current note,
   * or one of its aliases
   */
  findByPitch(pitch: NotePitch): Note | null {
    // check the current note
    if (this.pitch === pitch) {
      return this;
    }

    // else, dive into aliases
    const aliasNote = this.aliasNotes.find((alias) => alias.pitch === pitch);

    if (aliasNote) {
      return aliasNote;
    }

    return null;
  }

  findSharp(): Note | null {
    return this.findByPitch(NotePitch.Sharp);
  }

  findFlat(): Note | null {
    return this.findByPitch(NotePitch.Flat);
  }

  findSharpOrNatural(): Note | null {
    if (this.findByPitch(NotePitch.Natural)) {
      return this as Note;
    } else return this.findByPitch(NotePitch.Sharp);
  }

  findFlatOrNatural(): Note | null {
    if (this.findByPitch(NotePitch.Natural)) {
      return this as Note;
    } else return this.findByPitch(NotePitch.Flat);
  }

  isAccidental(): boolean {
    const flatFound = this.findFlat();
     if(!!flatFound) {
      return !!flatFound;
     }
     else {
      return !!this.findSharp();
     }
  }

  toJSON() {
    return {
      id: this.id,
      pitch: this.pitch,
      // remove recursive nature of note aliases
      aliasNotes: this.aliasNotes.map((aliasNote) => ({
        id: aliasNote.id,
        pitch: aliasNote.pitch,
      })),
    };
  }

  valueOf(): string {
    return JSON.stringify(this);
  }

  toString(): string {
    return JSON.stringify(this);
  }
}
