import type { JSONSchema7 } from 'json-schema'
import { seedString } from '../src/seed-string.js'

it.each<[string, JSONSchema7, string | RegExp]>([
  ['generates a random string by default', { type: 'string' }, 'fully'],
  ['respects "minLength"', { type: 'string', minLength: 10 }, 'especially'],
  [
    'respects "minLength" and "maxLength"',
    {
      type: 'string',
      minLength: 2,
      maxLength: 4,
    },
    'less',
  ],
  [
    'returns the "const" if defined',
    { type: 'string', const: 'hello' },
    'hello',
  ],
  [
    'returns the "examples" if defined',
    { type: 'string', examples: 'world' },
    'world',
  ],
  [
    'returns a random string matching a pattern',
    { type: 'string', pattern: '^[a-z]{3}-[0-9]{3}$' },
    /^[a-z]{3}-[0-9]{3}$/,
  ],

  // Byte.
  [
    'returns a random "byte" format',
    { type: 'string', format: 'byte' },
    'R31jdyE=',
  ],
  [
    'returns a random "byte" with "minLegth" set',
    { type: 'string', format: 'byte', minLength: 15 },
    'R31jdyEsPX0uNilFMkVB',
  ],

  [
    'returns a random "uuid"',
    { type: 'string', format: 'uuid' },
    '6fbe024f-2316-4265-aa6e-8d65a837e308',
  ],
  [
    'returns a random "firstName"',
    { type: 'string', format: 'firstName' },
    'Hayley',
  ],
  [
    'returns a random "lastName"',
    { type: 'string', format: 'lastName' },
    'Zieme',
  ],
  [
    'returns a random "email"',
    { type: 'string', format: 'email' },
    'Zion.Watsica30@yahoo.com',
  ],
  [
    'returns a random "password"',
    { type: 'string', format: 'password' },
    'Hey7F2EAFyTqHbR',
  ],

  // Date.
  [
    'returns a random "date"',
    { type: 'string', format: 'date' },
    /\d{4}-\d{2}-\d{2}/,
  ],
  [
    'returns a random "date" with "minimum" set',
    {
      type: 'string',
      format: 'date',
      minimum: new Date('2026-01-01').getTime(),
    },
    '2026-06-01',
  ],
  [
    'returns a random "date" with "minimum" and "maximum" set',
    {
      type: 'string',
      format: 'date',
      minimum: new Date('2026-01-01').getTime(),
      maximum: new Date('2026-01-30').getTime(),
    },
    '2026-01-13',
  ],

  // Date and time.
  [
    'returns a random "date-time"',
    { type: 'string', format: 'date-time' },
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
  ],
  [
    'returns a random "date-time" with "minimum" set',
    {
      type: 'string',
      format: 'date-time',
      minimum: new Date('2026-01-01 12:24:02.000Z').getTime(),
    },
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
  ],
  [
    'returns a random "date-time" with "minimum" and "maximum" set',
    {
      type: 'string',
      format: 'date-time',
      minimum: new Date('2026-01-01 12:24:02.000Z').getTime(),
      maximum: new Date('2026-01-30 12:24:02.000Z').getTime(),
    },
    /^2026-01-13T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
  ],

  // URI.
  [
    'returns a random "uri"',
    { type: 'string', format: 'uri' },
    'https://zany-ramen.org/',
  ],

  // Hostname.
  [
    'returns a random "hostname"',
    { type: 'string', format: 'hostname' },
    'imperfect-yoyo.net',
  ],

  // IPs.
  [
    'returns a random "ipv4"',
    { type: 'string', format: 'ipv4' },
    '255.184.238.0',
  ],
  [
    'returns a random "ipv6"',
    { type: 'string', format: 'ipv6' },
    '9ffe:026f:3528:487e:8ebc:96fb:49d5:0bee',
  ],

  // Misc.
  [
    'returns a random "creditCard"',
    {
      type: 'string',
      format: 'creditCard',
    },
    '6489-6201-3912-0313-3636',
  ],
  [
    'returns a random "hexcolor"',
    { type: 'string', format: 'hexcolor' },
    '#35805c',
  ],
  [
    'returns a random "mac"',
    { type: 'string', format: 'mac' },
    '6f:be:02:4f:23:16',
  ],
])('%s', (_, input, output) => {
  if (output instanceof RegExp) {
    expect(seedString(input)).toMatch(output)
  } else {
    expect(seedString(input)).toBe(output)
  }
})
