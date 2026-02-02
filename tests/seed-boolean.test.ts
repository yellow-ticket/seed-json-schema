import type { JSONSchema7 } from 'json-schema'
import { seedBoolean } from '../src/seed-boolean.js'

it.each<[string, JSONSchema7, boolean]>([
  ['returns a random boolean by default', { type: 'boolean' }, true],
  [
    'returns the boolean specified in "const"',
    { type: 'boolean', const: true },
    true,
  ],
  [
    'returns the boolean specified in "examples"',
    { type: 'boolean', examples: true },
    true,
  ],
])('%s', (_, input, output) => {
  expect(seedBoolean(input)).toBe(output)
})
