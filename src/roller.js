const Dice = require("./dice")

const randomNumbers = amount => [ ...Array(amount).keys() ].map(randomNumber)
const randomNumber = () => 1 + Math.floor(Math.random() * 10)

class Roller {
  constructor(roll) {
    this.roll = roll
  }

  perform() {
    const { roll } = this
    const dice = new Dice(randomNumbers(roll.pool), roll)

    return { dice, roll }
  }

}

module.exports = Roller
