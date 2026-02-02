import type { JSONSchema7 } from 'json-schema'
import { seedArray } from '../src/seed-array.js'

it.each<[string, JSONSchema7, unknown[]]>([
  ['returns an empty array by default', { type: 'array' }, []],
  ['returns an empty array if schema is boolean', true as any, []],
  [
    'returns an empty array if "items" is true',
    {
      type: 'array',
      items: true,
    },
    [],
  ],
  [
    'returns an empty array if "items" is false',
    {
      type: 'array',
      items: false,
    },
    [],
  ],
  [
    'returns a random array with "minItems" set',
    { type: 'array', minItems: 5, items: { type: 'string' } },
    ['wetly', 'fooey', 'fully', 'abaft', 'lined', 'waste', 'sword'],
  ],
  [
    'returns a random array with "maxItems" set',
    { type: 'array', maxItems: 3, items: { type: 'number' } },
    [99.72, 72.03],
  ],
  [
    'returns a random array with "minItems" and "maxItems" set',
    {
      type: 'array',
      minItems: 3,
      maxItems: 3,
      items: { type: 'number' },
    },
    [41.7, 99.72, 72.03],
  ],

  // Item type.
  [
    'returns a random array with the "string" item type',
    {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    ['wetly', 'fooey', 'fully', 'abaft'],
  ],
  [
    'returns a random array with the "number" item type',
    {
      type: 'array',
      items: {
        type: 'number',
      },
    },
    [99.72, 72.03, 93.26, 0.01],
  ],
  [
    'returns a random array with the "integer" item type',
    {
      type: 'array',
      items: {
        type: 'integer',
      },
    },
    [100, 72, 94],
  ],
  [
    'returns a random array with the "boolean" item type',
    {
      type: 'array',
      items: {
        type: 'boolean',
      },
    },
    [true],
  ],
  [
    'returns a random array with the "object" item type',
    {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          firstName: {
            type: 'string',
          },
        },
      },
    },
    [
      { firstName: 'wetly' },
      { firstName: 'fooey' },
      { firstName: 'fully' },
      { firstName: 'abaft' },
    ],
  ],
  [
    'returns a random array with the "array" item type',
    {
      type: 'array',
      items: {
        type: 'array',
        items: {
          type: 'integer',
        },
      },
    },
    [
      [72, 94, 12, 30, 100],
      [23, 9],
      [18, 39, 34],
      [40, 94, 54, 85, 42],
    ],
  ],
])('%s', (_, input, output) => {
  expect(seedArray(input)).toEqual(output)
})
