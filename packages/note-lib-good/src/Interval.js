// Useful Table:
// https://en.wikipedia.org/wiki/Interval_(music)#Main_intervals
module.exports = class Interval {

  /**
   *
   */
  constructor(semitones, aliases) {
    
    this.semitones = semitones;

    this.aliases = Object.keys(aliases).reduce((acc, key) => {
      const alias = aliases[key];

      if (alias.name && alias.short) {
        acc[key] = { name: alias.name, short: alias.short };
      }

      return acc;
    }, {})
    
  }

  isMajor() {
    return typeof this.aliases.major !== 'undefined'
  }

  isMinor() {
    return typeof this.aliases.minor !== 'undefined'
  }

  isAugmented() {
    return typeof this.aliases.augmented !== 'undefined'
  }

  isDiminished() {
    return typeof this.aliases.diminished !== 'undefined'
  }

  isPerfect() {
    return typeof this.aliases.perfect !== 'undefined'
  }
  
  toJSON(key) {
    return {
      semitones: this.semitones,
      aliases: this.aliases
    }
  }

  valueOf() {
    return JSON.stringify(this);
  }

  toString() {
    return JSON.stringify(this);
  }
}