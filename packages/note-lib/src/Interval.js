// Useful Table:
// https://en.wikipedia.org/wiki/Interval_(music)#Main_intervals
module.exports = class Interval {

  /**
   *
   */
  constructor(semitones, aliases) {
    this.semitones = semitones;
    this.aliases = aliases;

    this.isMajor = this.hasAliasName('major');
    this.isMinor = this.hasAliasName('minor');
    this.isAugmented = this.hasAliasName('augmented');
    this.isDiminished = this.hasAliasName('diminished');
    this.isPerfect = this.hasAliasName('perfect');
    this.isRoot = this.hasAliasName('root');
  }

  hasAliasName(name) {
    const alias = this.aliases.find(a => a.name === name)
    return typeof alias !== 'undefined'
  }

  toJSON(key) {
    return {
      semitones: this.semitones,
      aliases: this.aliases,
      isMajor: this.isMajor,
      isMinor: this.isMinor,
      isAugmented: this.isAugmented,
      isDiminished: this.isDiminished,
      isPerfect: this.isPerfect,
      isRoot: this.isRoot
    }
  }

  valueOf() {
    return JSON.stringify(this);
  }

  toString() {
    return JSON.stringify(this);
  }
}
