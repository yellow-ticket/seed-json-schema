import { JSONSchema7 } from 'json-schema'
import { seedInteger } from '../src/seed-integer.js'

it.each<[string, JSONSchema7, number | RegExp]>([
  ['returns a random integer by default', { type: 'integer' }, 42],
  [
    'returns a random integer with "minimum" set',
    { type: 'integer', minimum: 100 },
    142,
  ],
  [
    'returns a random integer with "maximum" set',
    { type: 'integer', maximum: 30 },
    12,
  ],
  [
    'respect "exclusiveMinimum"',
    { type: 'integer', exclusiveMinimum: 0, maximum: 2 },
    1,
  ],
  [
    'respect "exclusiveMaximum"',
    { type: 'integer', minimum: 1, exclusiveMaximum: 2 },
    1,
  ],
  [
    'returns the integer specified in "const"',
    {
      type: 'integer',
      const: 12.345,
    },
    12.345,
  ],
  [
    'returns the integer specified in "examples"',
    {
      type: 'integer',
      examples: 12.345,
    },
    12.345,
  ],
])('%s', (_, input, output) => {
  if (output instanceof RegExp) {
    expect(seedInteger(input)).toMatch(output)
  } else {
    expect(seedInteger(input)).toBe(output)
  }
})
