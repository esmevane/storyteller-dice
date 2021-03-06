const Id = require("./id")

class Result {
  constructor(contents = [], roll) {
    this.id = new Id()
    this.contents = contents.filter(die => die)
    this.roll = roll
    this.length = this.contents.length
  }

  filter(filter) { return this.contents.filter(filter) }
  map(map) { return this.contents.map(map) }

  successes() { return this.filter(die => die.wasSuccess()) }
  exploded() { return this.filter(die => die.explodeReroll()) }

  safety() {
    const comparison = die => die.roll === this.roll
    const baseDice = this.filter(comparison)

    return baseDice.filter(die => die.safeReroll())
  }

  report() {
    return [
      `Rolled: [ ${ this.map(die => die.number).join(", ") } ]`,
      `Successes: ${ this.successes().length }`,
      `Exploded: ${ this.exploded().length }`,
      `Safe: ${ this.safety().length }`
    ]
  }

  concat(other) {
    const next = new Result(this.contents.concat(other.contents), this.roll)

    next.id = this.id

    return next
  }
}

module.exports = Result
