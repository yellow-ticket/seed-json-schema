import { JSONSchema7 } from 'json-schema'
import { seedNumber } from '../src/seed-number.js'

it.each<[string, JSONSchema7, number | RegExp]>([
  ['returns random number by default', { type: 'number' }, 42],
  [
    'returns a random number with "minimum" set',
    { type: 'number', minimum: 100 },
    142,
  ],
  [
    'returns a random number with "maximum" set',
    { type: 'number', maximum: 30 },
    12,
  ],
  [
    'returns the number specified in "const"',
    {
      type: 'number',
      const: 12.345,
    },
    12.345,
  ],
  [
    'returns the number specified in "examples"',
    {
      type: 'number',
      examples: 12.345,
    },
    12.345,
  ],
])('%s', (_, input, output) => {
  if (output instanceof RegExp) {
    expect(seedNumber(input)).toMatch(output)
  } else {
    expect(seedNumber(input)).toBe(output)
  }
})
