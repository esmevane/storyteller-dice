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

describe("Slicing misses", () => {
  it("has a default target number of 8", () => {
    const roll = [7]
    const subject = storyteller.miss(roll)
    const expectation = [7]

    expect(subject).to.eql(expectation)
  })

  it("returns a number of dice under a target number", () => {
    const roll = [2, 5, 8, 10]
    const subject = storyteller.miss(roll, 8)
    const expectation = [2, 5]

    expect(subject).to.eql(expectation)
  })
})

describe("Slicing successes", () => {
  it("has a default target number of 8", () => {
    const roll = [8]
    const subject = storyteller.successes(roll)
    const expectation = [8]

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

describe("Rerolls", () => {
  it("creates a new roll of all given dice", () => {
    const slice = [10]
    const subject = storyteller.reroll(slice)

    expect(subject.length).to.eql(slice.length)
  })
})

describe("Rerolling against X", () => {
  it("rerolls the amount of given dice over a default of 10", () => {
    const slice = [8, 10]
    const subject = storyteller.rerollAgainst(slice)

    expect(subject.length).to.eql(1)
  })

  it("rerolls the amount of given dice over X", () => {
    const slice = [8, 9, 10]
    const subject = storyteller.rerollAgainst(slice, 9)

    expect(subject.length).to.eql(2)
  })
})

describe("Recursive rerolling against X", () => {
  it("keeps rerolling", () => {
    const slice = [10]
    const subject = storyteller.recursivelyRerollAgainst(slice, 2)

    expect(subject.length).to.be.above(slice.length)
  })

  it("tracks depth", () => {
    const slice = [10]
    const subject = storyteller.recursivelyRerollAgainst(slice, 2)
    const last = subject[subject.length - 1]

    expect(last.depth).to.be.above(1)
  })
})
