import { JSONSchema7 } from 'json-schema'
import { seedInteger } from '../src/seed-integer.js'

it.each<[string, JSONSchema7, number | RegExp]>([
  ['returns random integer by default', { type: 'integer' }, 41.7],
  [
    'returns a random integer with "minimum" set',
    { type: 'integer', minimum: 100 },
    141.7,
  ],
  [
    'returns a random integer with "maximum" set',
    { type: 'integer', maximum: 30 },
    12.51,
  ],
])('%s', (_, input, output) => {
  if (output instanceof RegExp) {
    expect(seedInteger(input)).toMatch(output)
  } else {
    expect(seedInteger(input)).toBe(output)
  }
})
