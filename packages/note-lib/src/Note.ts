/**
 * A single note --- nothing more. ;)
 */

type NoteAttribute = "isSharp" | "isFlat" | "isNatural";

interface NoteAttributes {
  isSharp?: boolean;
  isFlat?: boolean;
  isNatural?: boolean;
}

export type NoteID = string;

export class Note {
  id: NoteID;
  attributes: NoteAttributes;
  aliasNotes: Note[];

  // TODO: Don't use array of keys & enforce with type
  constructor(id: NoteID, attributes?: NoteAttributes, aliasNotes?: Note[]) {
    this.id = id;
    this.attributes = attributes || {};
    this.aliasNotes = aliasNotes || [];
  }

  addAliasNote(note: Note) {
    this.aliasNotes.push(note);
  }

  isSimilar(note: Note) {
    // check the basics
    if (note.id === this.id) {
      return true;
    }

    // check aliases for a match
    const aliasNote = this.aliasNotes.find((an) => an.id === note.id);

    return !!aliasNote; // force into a bool type (undefined ==> false);
  }

  /**
   * Find a note by attribute. It can be the current note,
   * or one of it's aliases
   */
  findByAttribute(attribute: NoteAttribute, value: boolean): Note {
    // check the current note
    if (this.attributes[attribute] === value) {
      return this;
    }

    // else, dive into aliases
    const aliasNote = this.aliasNotes.find(
      (alias) => alias.attributes[attribute] === value
    );

    if (aliasNote) {
      return aliasNote;
    }
  }

  findSharp() {
    return this.findByAttribute("isSharp", true);
  }

  findFlat() {
    return this.findByAttribute("isFlat", true);
  }

  findSharpOrNatural() {
    if (!!this.findByAttribute("isNatural", true)) {
      return this;
    } else return this.findByAttribute("isSharp", true);
  }

  findFlatOrNatural() {
    if (!!this.findByAttribute("isNatural", true)) {
      return this;
    } else return this.findByAttribute("isFlat", true);
  }

  toJSON() {
    return {
      id: this.id,
      attributes: this.attributes,
      // remove recursive nature of note aliases
      aliasNotes: this.aliasNotes.map((aliasNote) => ({
        id: aliasNote.id,
        attributes: aliasNote.attributes,
      })),
    };
  }

  valueOf() {
    return JSON.stringify(this);
  }

  toString() {
    return JSON.stringify(this);
  }
}
