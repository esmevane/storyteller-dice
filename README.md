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

To get just a single die:

```javascript
// A number, 1-10
console.log(storyteller.die())
```

To get a list of dice:

```javascript
const amount = 5

// A list of 5 1-10 numbers
console.log(storyteller.dice(amount))
```

To see if a roll succeeds at a specific difficulty (default: 1):

```javascript
const amount = 5
const difficulty = 3

// A boolean result
console.log(storyteller.measure(storyteller.dice(amount), difficulty))
```

To get a slice of successes over a target number (default 7):

```javascript
const amount = 5
const target = 8

// A list of dice over 8
console.log(storyteller.successes(storyteller.dice(amount), target))
```

To get a nice summary of a roll:

```javascript
const amount = 5
const target = 8
const difficulty = 3

// An object describing the roll and its results
console.log(
  storyteller.result(storyteller.dice(amount), target, difficulty)
)
```

To just give the roller the details it needs and get a pretty JSON-API compliant envelope back:

```javascript
const amount = 5
const target = 8
const difficulty = 3

// An envelope object describing the roll and its results
console.log(storyteller.perform(amount, target, difficulty))
```

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
