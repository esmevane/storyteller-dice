class Roll {
  constructor(options = {}) {
    this.difficulty = options.difficulty
    this.explode = options.explode
    this.pool = options.pool
    this.safe = options.safe || false
    this.target = options.target
  }

  merge(nextState) {
    const options = Object.assign({}, this.toObject(), nextState)
    return new Roll(options)
  }

  isEmpty() { return this.pool === 0 }

  isNotSafe() { return this.merge({ safe: false }) }
  isSafe() { return this.merge({ safe: true }) }

  withDifficulty(difficulty) { return this.merge({ difficulty }) }
  withPool(pool) { return this.merge({ pool }) }
  withTarget(target) { return this.merge({ target }) }
  withExplode(explode) { return this.merge({ explode }) }

  toObject() {
    return {
      difficulty: this.difficulty,
      explode: this.explode,
      pool: this.pool,
      safe: this.safe,
      target: this.target
    }
  }
}

module.exports = Roll
