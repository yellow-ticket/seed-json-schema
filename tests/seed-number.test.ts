import { JSONSchema7 } from 'json-schema'
import { seedNumber } from '../src/seed-number.js'

it.each<[string, JSONSchema7, number | RegExp]>([
  ['returns random number by default', { type: 'number' }, 41.7],
  [
    'returns a random number with "minimum" set',
    { type: 'number', minimum: 100 },
    141.7,
  ],
  [
    'returns a random number with "maximum" set',
    { type: 'number', maximum: 30 },
    12.51,
  ],
  [
    'respects "exclusiveMinimum"',
    { type: 'number', exclusiveMinimum: 0, maximum: 2 },
    1.42,
  ],
  [
    'respects "exclusiveMaximum"',
    { type: 'number', minimum: 1, exclusiveMaximum: 2 },
    1,
  ],
  [
    'respects "multipleOf"',
    { type: 'number', multipleOf: 0.5, maximum: 1 },
    0.5,
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
