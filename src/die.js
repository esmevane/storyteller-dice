class Die {
  constructor(number, roll) {
    this.number = number
    this.roll = roll
    this.reroll = this.rerollReason()
  }

  explodeReroll() { return this.number >= this.roll.explode }
  safeReroll() { return !this.wasSuccess() && this.roll.safe }
  shouldReroll() { return this.safeReroll() || this.explodeReroll() }
  wasSuccess() { return this.number >= this.roll.target }

  rerollReason() {
    if (this.safeReroll()) return "safe"

    return this.explodeReroll() ? "explode" : "no"
  }

  toObject() {
    const { number, reroll, roll } = this

    return { number, roll, reroll }
  }

}

module.exports = Die
