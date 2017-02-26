const Roller = require("./roller")
const Result = require("./result")

class Engine {
  constructor(roll) {
    this.roll = roll
    this.roller = new Roller(roll)
    this.outcome = this.roller.perform()
  }

  perform() {
    if (this.roll.isEmpty()) return []

    const pool = this.outcome.dice.rerolls().length
    const roll = this.roll.isNotSafe().withPool(pool)
    const next = new Engine(roll)
    const result = new Result(this.outcome.dice.all(), this.roll)

    return result.concat(next.perform())
  }
}

module.exports = Engine
