# Storyteller Dice

A small dice lib for use in node projects.

## Installation

```bash
npm i storyteller-dice
```

## Usage

The API is meant to be a kit of pieces which can be used to assemble either direct dice rolls, or a JSON-api suitable envelope which imagines those rolls as a storyteller roll resource.

First of all, grab the library:

```javascript
const storyteller = require("storyteller")
```

To perform a basic roll:

```javascript
// A Result object containing 5 dice

console.log(storyteller.roll({ pool: 5 }))
```

To tweak difficulty (number of successes needed, 1 by default):

```javascript
// A Result object containing 5 dice, which succeeds over 3

console.log(storyteller.roll({ pool: 5, difficulty: 3 }))
```

To tweak the target number (number you want to roll over for success, by default this number is 8):

```javascript
// A Result object containing 5 dice, each dice counting as success when over 4

console.log(storyteller.roll({ pool: 5, target: 4 }))
```

To adjust the successful reroll target ("exploding", "X-again" - if a die exceeds this number then it's rerolled, default is 10):

```javascript
// A Result object containing 5 dice, each dice exploding when over 8

console.log(storyteller.roll({ pool: 5, explode: 8 }))
```

To declare a roll as "safe" (in other words, if it's not a success, you can "try again" or reroll it, default false):

```javascript
// A Result object containing 5 dice, each dice rerolling if not successful

console.log(storyteller.roll({ pool: 5, safe: true }))
```

The roll function listens to any of the above options in any combination you like.

### Roll building DSL

We've also got a roll building DSL, which lets you programmatically build up a Roll object and pass that through:

```javascript
const { Roll } = require("storyteller-dice")
const config =
  new Roll()
    .withPool(10)
    .withDifficulty(3)
    .withTarget(7)
    .withExplode(8)

console.log(storyteller.roll({ config, safe: true }))
```

### The Result object

A Result object is designed to give you a pleasant interface with your roll.  It has the following properties:

#### `result.contents` (Array of `Die` objects)

This list contains all of the Die objects and the rolls that they were made against.  Each die knows if it is successful, or if it triggered a reroll (and if so, what type of reroll).

##### A `Die` object:

* `die.wasSuccess()` => `boolean`
* `die.number` => `number`
* `die.roll` => `Roll`
* `die.rerollReason()` => `"explode" | "safe" | "no"`

By using a `Die` object's `roll` object, you can guess if it itself was part of a reroll, because often the `roll.pool` number will be smaller than asked for.  This means the `Die` was created during a smaller reroll.

The internal metadata about a `Die` is kept around so that some advanced output / analytical info is available to anyone who'd like to see it.  So if (for example) you want to color the output of a die based on its success/failure, you can.  

(_Note that there's a possibility that this will lead to issues if the reroll dice equal the original roll, but frequently that won't be the case - however, if it **does** become an issue, it can be resolved by including an incrementing ID on each roll._)

#### `result.exploded()` (Array of `Die` objects)

This list is identical to `result.contents`, except that it slices out only the dice which triggered a reroll.

#### `result.safety()` (Array of `Die` objects)

This list is identical to `result.contents`, except that it slices out only the dice which were part of the initial roll, which triggered a "safe" reroll.  Note that these aren't the actual dice which were rerolled, they're the dice which _resulted in a reroll_.

#### `result.successes()` (Array of `Die` objects)

This list is identical to `result.contents`, except that it slices out only the successful dice.

## License

Licensed 2017, MIT, Joseph McCormick.  [More details here](LICENSE.md)

## Contributing

Submit any issues [here](https://github.com/esmevane/storyteller-dice/issues) - please take note of the [code of conduct][CODE_OF_CONDUCT.md] before submitting any issues or pull requests.

To create a pull request:

* Fork the repository
* Create a local feature branch of your changes
* Please provide tests
* Submit your local feature branch vs. this repository as a pull request

## Contact

Feel free to contact me at any point if you have questions or suggestions!
