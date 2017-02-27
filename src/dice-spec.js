const { expect } = require("chai")
const Roll = require("./roll")
const Die = require("./die")
const Dice = require("./dice")

describe("Dice", () => {
  const roll =
    new Roll()
      .withPool(5)
      .withDifficulty(2)
      .withTarget(8)
      .withExplode(10)
      .isSafe()

  const dice = new Dice([ 1, 8, 10 ], roll)

  describe("all", () => {
    it("contains the Die versions of each number", () => {
      const expectation = [
        new Die(1, roll),
        new Die(8, roll),
        new Die(10, roll)
      ]

      expect(dice.all()).to.eql(expectation)
    })
  })

  describe("rerolls", () => {
    it("should have both reroll candidates", () => {
      const expectation = [
        new Die(1, roll),
        new Die(10, roll)
      ]

      expect(dice.rerolls()).to.eql(expectation)
    })
  })

})
