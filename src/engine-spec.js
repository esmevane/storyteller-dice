const { expect } = require("chai")
const Engine = require("./engine")
const Roll = require("./roll")
const Result = require("./result")

describe("Engine", () => {
  describe("perform", () => {
    it("returns a Result", () => {
      expect(new Engine(new Roll()).perform()).to.be.instanceof(Result)
    })
  })
})
