DEFAULT_DIFFICULTY = 1
DEFAULT_TARGET = 7

const dice = amount => [ ...Array(amount).keys() ].map(die)

const die = () => 1 + Math.floor(Math.random() * 10)

const envelope = data => (
  { type: "storyteller", data }
)

const measure = (dice, difficulty = DEFAULT_DIFFICULTY) =>
  dice.length >= difficulty

const result = (
  dice,
  target = DEFAULT_TARGET,
  difficulty = DEFAULT_DIFFICULTY
) => {
  const slice = successes(dice, target)
  const count = slice.length
  const success = measure(slice, difficulty)

  return {
    count,
    difficulty,
    slice,
    success,
    target
  }
}

const successes = (dice, target = DEFAULT_TARGET) =>
  dice.filter(die => die >= target)

const perform = (
  amount,
  target = DEFAULT_TARGET,
  difficulty = DEFAULT_DIFFICULTY
) => envelope(result(dice(amount), target, difficulty))

module.exports = {
  dice,
  die,
  envelope,
  measure,
  result,
  perform,
  successes
}
