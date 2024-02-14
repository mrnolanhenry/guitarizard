// A single note --- nothing more. ;)

import { NotePitch } from "./enums/NotePitch";

export type NoteID = string;

export type Octave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export class Note {
  id: NoteID;
  pitch: NotePitch;
  aliasNotes: Note[];
  octave: Octave;

  // TODO: Don't use array of keys & enforce with type
  constructor(id: NoteID, pitch: NotePitch, aliasNotes?: Note[]) {
    this.id = id;
    this.pitch = pitch;
    this.aliasNotes = aliasNotes ?? [];
    this.octave = 0;
  }

  clone(): Note {
    const clone = new Note(this.id, this.pitch, this.aliasNotes);
    clone.octave = this.octave;
    return clone;
  }

  withOctave(octave: Octave): Note {
    const note_1 = this.clone();
    note_1.setOctave(octave);
    return note_1;
  }

  setOctave(octave: Octave): void {
    this.octave = octave;
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
    if (flatFound) {
      return !!flatFound;
    } else {
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
      octave: this.octave,
    };
  }

  valueOf(): string {
    return JSON.stringify(this);
  }

  toString(): string {
    return JSON.stringify(this);
  }
}
