const Die = require("./die")

class Dice {
  constructor(numbers, roll) {
    this.contents = numbers.map(number => new Die(number, roll))
    this.numbers = numbers
    this.roll = roll
    this.length = numbers.length
  }

  all() {
    return this.contents
  }

  rerolls() {
    return this.all().filter(die => die.shouldReroll())
  }

}

module.exports = Dice
