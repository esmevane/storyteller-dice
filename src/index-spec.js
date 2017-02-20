const { expect } = require("chai")
const storyteller = require("./index")

describe("A single roll", () => {
  it("is never over 10", () => {
    const subject = storyteller.die()

    expect(subject).to.be.below(11)
  })

  it("is never under 1", () => {
    const subject = storyteller.die()

    expect(subject).to.be.above(0)
  })
})

describe("Rolling a number of dice", () => {
  it("returns a number of rolls", () => {
    const subject = storyteller.dice(10)

    expect(subject).to.have.length(10)
  })
})

describe("Slicing successes", () => {
  it("has a default target number of 7", () => {
    const roll = [7]
    const subject = storyteller.successes(roll)
    const expectation = [7]

    expect(subject).to.eql(expectation)
  })

  it("returns a number of dice over a target number", () => {
    const roll = [2, 5, 8, 10]
    const subject = storyteller.successes(roll, 8)
    const expectation = [8, 10]

    expect(subject).to.eql(expectation)
  })
})

describe("Measuring success", () => {
  it("has a default difficulty", () => {
    const slice = [7]
    const subject = storyteller.measure(slice)

    expect(subject).to.be.ok
  })

  it("is true when success slice size is greater than difficulty", () => {
    const slice = [8, 8]
    const subject = storyteller.measure(slice, 1)

    expect(subject).to.be.ok
  })

  it("is true when success slice size is equal to difficulty", () => {
    const slice = [8, 8]
    const subject = storyteller.measure(slice, 2)

    expect(subject).to.be.ok
  })

  it("is false when success slice size is lesser than difficulty", () => {
    const slice = [8, 8]
    const subject = storyteller.measure(slice, 3)

    expect(subject).not.to.be.ok
  })
})

describe("Results", () => {
  it("returns a structure describing a roll's success", () => {
    const roll = [2, 5, 8, 10]
    const subject = storyteller.result(roll, 7, 1)
    const expectation = {
      slice: [8, 10],
      target: 7,
      count: 2,
      success: true,
      difficulty: 1
    }

    expect(subject).to.eql(expectation)
  })

  it("has a default target and difficulty", () => {
    const roll = [2, 5, 8, 10]
    const subject = storyteller.result(roll)
    const expectation = {
      slice: [8, 10],
      target: 7,
      count: 2,
      success: true,
      difficulty: 1
    }

    expect(subject).to.eql(expectation)
  })
})

describe("Dice envelopes", () => {
  it("has a basic structure", () => {
    const roll = storyteller.dice(0)
    const data = { dice: roll, result: storyteller.result(roll, 7, 1) }
    const subject = storyteller.envelope(data)
    const expectation = { type: "storyteller", data }

    expect(subject).to.eql(expectation)
  })
})
