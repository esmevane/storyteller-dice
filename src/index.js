const Engine = require("./engine")
const Roll = require("./roll")

DEFAULT_EXPLODE = 10
DEFAULT_DIFFICULTY = 1
DEFAULT_TARGET = 8
DEFAULT_SAFETY = false

DEFAULT_OPTIONS = {
  pool: 0,
  difficulty: DEFAULT_DIFFICULTY,
  target: DEFAULT_TARGET,
  safe: DEFAULT_SAFETY,
  explode: DEFAULT_EXPLODE
}

const roll = ({
  pool,
  difficulty,
  target,
  safe,
  explode,
  config
} = DEFAULT_OPTIONS) => {
  const roll =
    config ?
      config :
      new Roll()
        .withPool(pool)
        .withDifficulty(difficulty)
        .withTarget(target)
        .withExplode(explode)

  return new Engine(safe ? roll.isSafe() : roll).perform()
}

module.exports = { Roll, roll }
