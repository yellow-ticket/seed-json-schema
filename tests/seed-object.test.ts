import { JSONSchema7 } from 'json-schema'
import { seedObject } from '../src/seed-object.js'

it.each<[string, JSONSchema7, object]>([
  ['returns an empty object by default', { type: 'object' }, {}],
  [
    'returns the "default" object if specified',
    { type: 'object', default: { foo: 'bar' } },
    { foo: 'bar' },
  ],
  [
    'returns the "examples" object if specified',
    { type: 'object', examples: { foo: 'bar' } },
    { foo: 'bar' },
  ],
  [
    'respects literal property types',
    {
      type: 'object',
      properties: {
        string: { type: 'string' },
        number: { type: 'number' },
        integer: { type: 'integer' },
        boolean: { type: 'boolean' },
      },
    },
    {
      string: 'fully',
      integer: 14,
      number: 99.91,
      boolean: true,
    },
  ],
  [
    'respects array property type',
    {
      type: 'object',
      properties: {
        friends: {
          type: 'array',
          items: { type: 'string' },
          maxItems: 2,
        },
      },
    },
    {
      friends: ['fully', 'until'],
    },
  ],
])('%s', (_, input, output) => {
  expect(seedObject(input)).toEqual(output)
})
