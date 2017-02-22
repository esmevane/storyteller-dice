DEFAULT_THRESHOLD = 10
DEFAULT_DIFFICULTY = 1
DEFAULT_TARGET = 8
DEFAULT_SAFETY = false

const dice = amount => [ ...Array(amount).keys() ].map(die)

const die = () => 1 + Math.floor(Math.random() * 10)

const envelope = data => (
  { type: "storyteller", data }
)

const measure = (dice, difficulty = DEFAULT_DIFFICULTY) =>
  dice.length >= difficulty

const miss = (dice, target = DEFAULT_TARGET) =>
  dice.filter(die => die < target)

const recursivelyRerollAgainst = (
  dice,
  threshold = DEFAULT_THRESHOLD,
  depth = 1
) => {
  if (dice.length === 0) return []

  const reroll = rerollAgainst(dice, threshold)
  const withDepth = reroll.map(die => (
    { die, depth }
  ))

  return withDepth.concat(
    recursivelyRerollAgainst(
      successes(reroll, threshold),
      threshold,
      depth + 1
    )
  )
}

const reroll = slice => dice(slice.length)

const rerollAgainst = (slice, threshold = DEFAULT_THRESHOLD) =>
  dice(successes(slice, threshold).length)

const successes = (dice, target = DEFAULT_TARGET) =>
  dice.filter(die => die >= target)

const result = (
  dice,
  target = DEFAULT_TARGET,
  difficulty = DEFAULT_DIFFICULTY,
  threshold = DEFAULT_THRESHOLD,
  isSafe = DEFAULT_SAFETY
) => {
  const initialMisses = miss(dice, target)
  const initialSuccess = successes(dice, target)
  const maybeSafeDice = dice.concat(isSafe ? reroll(initialMisses) : [])
  const rollAgains = recursivelyRerollAgainst(maybeSafeDice, threshold)

  const allDice =
    maybeSafeDice
      .concat(rollAgains.map(roll => roll.die))

  const slice = successes(allDice, target)
  const misses = miss(allDice, target)
  const count = slice.length
  const success = measure(slice, difficulty)

  return {
    count,
    difficulty,
    misses,
    isSafe,
    rollAgains,
    slice,
    success,
    target,
    threshold
  }
}

const perform = (
  amount,
  target = DEFAULT_TARGET,
  difficulty = DEFAULT_DIFFICULTY,
  threshold = DEFAULT_THRESHOLD
) => envelope(
  result(
    dice(amount),
    target,
    difficulty,
    threshold
  )
)

module.exports = {
  dice,
  die,
  envelope,
  measure,
  miss,
  recursivelyRerollAgainst,
  reroll,
  rerollAgainst,
  result,
  perform,
  successes
}
