const { expect } = require("chai")
const storyteller = require("./index")
const Roll = require("./roll")

describe("Scratch pad", () => {
  it("spills to console", () => {
    const config =
      new Roll()
        .withPool(10)
        .withDifficulty(1)
        .withTarget(8)
        .withExplode(10)

    result = storyteller.roll({ config })

    console.log(result.report())
  })
})
