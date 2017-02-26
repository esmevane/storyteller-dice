const { expect } = require("chai")
const Roll = require("./roll")
const Roller = require("./roller")

describe("Roller", () => {
  const roll =
    new Roll()
      .withPool(5)
      .withDifficulty(2)
      .withTarget(8)
      .withExplode(10)
      .isSafe()

  const roller = new Roller(roll)

  it("accepts a roll", () => {
    expect(roller.roll.toObject()).to.eql(roll.toObject())
  })

  describe("perform", () => {
    const result = roller.perform()

    it("contains the roll definition", () => {
      expect(result.roll).to.eql(roll.toObject())
    })

    it("contains the dice", () => {
      expect(result.dice.length).to.eql(roll.pool)
    })
  })
})
