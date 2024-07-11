import type { JSONSchema } from '../src/types.js'
import { seedBoolean } from '../src/seed-boolean.js'

it.each<[string, JSONSchema, boolean]>([
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
  [
    'returns the boolean specified in "example"',
    { type: 'boolean', example: true },
    true,
  ],
  [
    'returns the boolean specified in "example" if "example" is string',
    { type: 'boolean', example: 'true' },
    true,
  ],
])('%s', (_, input, output) => {
  expect(seedBoolean(input)).toBe(output)
})
