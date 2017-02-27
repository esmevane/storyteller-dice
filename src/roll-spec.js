const { expect } = require("chai")
const Id = require("./id")
const Roll = require("./roll")

describe("Roll", () => {
  describe("Build syntax", () => {
    it("can set the pool amount", () => {
      const roll = new Roll().withPool(5)

      expect(roll.pool).to.eql(5)
    })

    it("can set the target", () => {
      const roll = new Roll().withTarget(7)

      expect(roll.target).to.eql(7)
    })

    it("can set the difficulty", () => {
      const roll = new Roll().withDifficulty(3)

      expect(roll.difficulty).to.eql(3)
    })

    it("can set the explode point", () => {
      const roll = new Roll().withExplode(9)

      expect(roll.explode).to.eql(9)
    })

    it("can set safe", () => {
      const roll = new Roll().isSafe()
      expect(roll.safe).to.be.ok
    })

    it("can unset safe", () => {
      let roll = new Roll().isSafe()

      expect(roll.safe).to.be.ok

      roll = roll.isNotSafe()

      expect(roll.safe).not.to.be.ok
    })
  })

  describe("toObject", () => {
    it("exposes its attributes as an object", () => {
      const id = new Id()
      const options = {
        difficulty: 2,
        id,
        explode: 10,
        pool: 5,
        safe: false,
        target: 8
      }

      const subject = new Roll(options)

      expect(subject.toObject()).to.eql(options)
    })

    it("works with gradual build-up", () => {
      const id = new Id()
      const expectation = {
        difficulty: 2,
        explode: 10,
        id,
        pool: 5,
        safe: false,
        target: 8
      }

      const subject =
        new Roll({ id })
          .withPool(5)
          .withDifficulty(2)
          .withTarget(8)
          .withExplode(10)

        expect(subject.toObject()).to.eql(expectation)
    })
  })

  describe("isEmpty", () => {
    it("is true when pool is 0", () => {
      expect(new Roll().withPool(0).isEmpty()).to.be.true
    })

    it("is false otherwise", () => {
      expect(new Roll().withPool(1).isEmpty()).to.be.false
    })
  })
})
