const { expect } = require("chai")
const Id = require("./id")

describe("Id", () => {
  const id = new Id()

  it("matches itself", () => expect(id).to.eql(id))
  it("does not match others", () => expect(id).not.to.eql(new Id()))

  it("accepts an id string", () => expect(id).to.eql(new Id(id.contents)))
  it("accepts an id instance", () => expect(id).to.eql(new Id(id)))

})
