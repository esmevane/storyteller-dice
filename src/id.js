const crypto = require("crypto")

const getId = (maybeId, defaultValue) => {
  if (typeof maybeId === "undefined") return defaultValue
  if (typeof maybeId === "string") return maybeId

  return maybeId.contents
}

class Id {
  constructor(contents) {
    this.contents = getId(contents, crypto.randomBytes(16).toString('hex'))
  }
}

module.exports = Id
