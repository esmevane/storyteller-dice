const Die = require("./die")

class Dice {
  constructor(numbers, roll) {
    this.numbers = numbers
    this.roll = roll
    this.length = numbers.length
  }

  all() {
    return this.numbers.map(number => new Die(number, this.roll))
  }

  rerolls() {
    return this.all().filter(die => die.shouldReroll())
  }

}

module.exports = Dice
