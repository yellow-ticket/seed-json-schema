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
    ['gloom', 'abaft', 'wedge', 'dimly', 'along', 'gloat', 'daily'],
  ],
  [
    'returns a random array with "maxItems" set',
    { type: 'array', maxItems: 3, items: { type: 'number' } },
    [72.03, 0.01],
  ],
  [
    'returns a random array with "minItems" and "maxItems" set',
    {
      type: 'array',
      minItems: 3,
      maxItems: 3,
      items: { type: 'number' },
    },
    [41.7, 72.03, 0.01],
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
    ['gloom', 'abaft', 'wedge', 'dimly'],
  ],
  [
    'returns a random array with the "number" item type',
    {
      type: 'array',
      items: {
        type: 'number',
      },
    },
    [72.03, 0.01, 30.23, 14.67],
  ],
  [
    'returns a random array with the "integer" item type',
    {
      type: 'array',
      items: {
        type: 'integer',
      },
    },
    [72, 30, 14],
  ],
  [
    'returns a random array with the "boolean" item type',
    {
      type: 'array',
      items: {
        type: 'boolean',
      },
    },
    [true, true, true],
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
      { firstName: 'gloom' },
      { firstName: 'abaft' },
      { firstName: 'wedge' },
      { firstName: 'dimly' },
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
    [[30, 14, 9, 18], [40, 54, 42], [20, 88, 2, 67, 42], [14, 20, 80, 97]],
  ],
])('%s', (_, input, output) => {
  expect(seedArray(input)).toEqual(output)
})
