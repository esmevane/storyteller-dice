const { expect } = require("chai")
const Roll = require("./roll")
const Die = require("./die")

describe("Die", () => {
  const roll =
    new Roll()
      .withPool(5)
      .withDifficulty(2)
      .withTarget(8)
      .withExplode(9)
      .isSafe()

  describe("shouldReroll", () => {
    describe("when the roll is unsafe", () => {
      describe("if the die is equal to explode", () => {
        it("is true", () => {
          expect(new Die(9, roll.isNotSafe()).shouldReroll()).to.be.true
        })
      })

      describe("when the die is greater than explode", () => {
        it("is true", () => {
          expect(new Die(10, roll.isNotSafe()).shouldReroll()).to.be.true
        })
      })

      describe("when the die is lesser than explode", () => {
        it("is false", () => {
          expect(new Die(7, roll.isNotSafe()).shouldReroll()).to.be.false
        })
      })
    })

    describe("when the roll is unsafe", () => {
      describe("when equal to explode", () => {
        it("is true", () => {
          expect(new Die(9, roll).shouldReroll()).to.be.true
        })
      })

      describe("when greater than explode", () => {
        it("is true", () => {
          expect(new Die(10, roll).shouldReroll()).to.be.true
        })
      })

      describe("when lesser than roll explode, but successful", () => {
        it("is false", () => {
          expect(new Die(8, roll).shouldReroll()).to.be.false
        })
      })

      describe("when lesser than roll explode, and unsuccessful", () => {
        it("is true", () => {
          expect(new Die(7, roll).shouldReroll()).to.be.true
        })
      })
    })
  })

  describe("wasSuccess", () => {
    describe("when the die is over roll target", () => {
      it("is true", () => {
        expect(new Die(9, roll).wasSuccess()).to.be.true
      })
    })

    describe("when the die is equal to roll target", () => {
      it("is true", () => {
        expect(new Die(8, roll).wasSuccess()).to.be.true
      })
    })

    describe("when the die is lesser than roll target", () => {
      it("is false", () => {
        expect(new Die(7, roll).wasSuccess()).to.be.false
      })
    })
  })

  describe("toObject", () => {
    it("includes die number", () => {
      expect(new Die(7, roll).toObject().number).to.eql(7)
    })

    it("includes roll", () => {
      expect(new Die(7, roll).toObject().roll).to.eql(roll.toObject())
    })

    describe("a safe reroll", () => {
      it("includes safe reroll", () => {
        expect(new Die(7, roll).toObject().reroll).to.eql("safe")
      })
    })

    describe("an explode reroll", () => {
      it("includes explode reroll", () => {
        expect(new Die(10, roll).toObject().reroll).to.eql("explode")
      })
    })

    describe("otherwise", () => {
      it("includes no reroll", () => {
        expect(new Die(8, roll).toObject().reroll).to.eql("no")
      })
    })
  })

})
