/**
 * A single note --- nothing more. ;)
 */
module.exports = class Note {
  // TODO: Don't use array of keys & enforce with type
  constructor(id, aliases) {
    this.id = id;
    this.aliases = aliases;
  }

  toJSON(key) {
    return { id: this.id, aliases: this.aliases };
  }

  valueOf() {
    return JSON.stringify(this);
  }

  toString() {
    return JSON.stringify(this);
  }
}
