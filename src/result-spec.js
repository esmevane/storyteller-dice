const { expect } = require("chai")
const Die = require("./die")
const Roll = require("./roll")
const Result = require("./result")

describe("Result", () => {
  const roll =
    new Roll()
      .withPool(5)
      .withDifficulty(2)
      .withTarget(8)
      .withExplode(10)
      .isSafe()

  const dice = [
    new Die(1, roll),
    new Die(8, roll),
    new Die(5, roll),
    new Die(3, roll),
    new Die(10, roll),
    new Die(6, roll.withPool(1).isNotSafe())
  ]

  const result = new Result(dice, roll)

  describe("safety", () => {
    it("contains only the first roll's safety dice", () => {
      const expectation = [
        new Die(1, roll),
        new Die(5, roll),
        new Die(3, roll)
      ]

      expect(result.safety()).to.eql(expectation)
    })
  })

  describe("exploded", () => {
    it("contains each explosion", () => {
      const expectation = [ new Die(10, roll) ]

      expect(result.exploded()).to.eql(expectation)
    })
  })

  describe("successes", () => {
    it("contains each success", () => {
      const expectation = [ new Die(8, roll), new Die(10, roll) ]

      expect(result.successes()).to.eql(expectation)
    })
  })

  describe("concat", () => {
    const otherDice = [ new Die(8, roll), new Die(10, roll) ]
    const otherRoll = new Roll().withPool(2).isNotSafe()
    const other = new Result(otherDice, otherRoll)
    const subject = result.concat(other)

    it("combines result dice", () => {
      expect(subject.length).to.eql(result.length + other.length)
    })

    it("keeps the original roll", () => {
      expect(subject.roll).to.eql(result.roll)
    })
  })

})
