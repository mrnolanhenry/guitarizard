// A single note --- nothing more. ;)

import { NotePitch } from "./enums/NotePitch";

export type NoteID = string;

export class Note {
  id: NoteID;
  pitch: NotePitch;
  aliasNotes: Note[];

  // TODO: Don't use array of keys & enforce with type
  constructor(id: NoteID, pitch: NotePitch, aliasNotes?: Note[]) {
    this.id = id;
    this.pitch = pitch;
    this.aliasNotes = aliasNotes ?? [];
  }

  addAliasNote(note: Note): void {
    this.aliasNotes.push(note);
  }

  isSimilar(note: Note): boolean {
    // check the basics
    if (note.id.toLowerCase() === this.id.toLowerCase()) {
      return true;
    }

    // check aliases for a match
    const aliasNote: Note | undefined = this.aliasNotes.find(
      (an) => an.id.toLowerCase() === note.id.toLowerCase(),
    );

    return !!aliasNote; // force into a bool type (undefined ==> false);
  }

  /**
   * Find a note by pitch. It can be the current note,
   * or one of it's aliases
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
    if (this.findByPitch(NotePitch.Neither)) {
      return this as Note;
    } else return this.findByPitch(NotePitch.Sharp);
  }

  findFlatOrNatural(): Note | null {
    if (this.findByPitch(NotePitch.Neither)) {
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
