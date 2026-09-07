import type { JSONSchema7 } from 'json-schema'
import { seedString } from '../src/seed-string.js'

it.each<[string, JSONSchema7, string | RegExp]>([
  ['generates a random string by default', { type: 'string' }, 'yowza'],
  ['respects "minLength"', { type: 'string', minLength: 10 }, 'gadzooks'],
  [
    'respects "minLength" and "maxLength"',
    {
      type: 'string',
      minLength: 2,
      maxLength: 4,
    },
    'pfft',
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
    'R2MhPS4=',
  ],
  [
    'returns a random "byte" with "minLegth" set',
    { type: 'string', format: 'byte', minLength: 15 },
    'R2MhPS4pMkFFU0dgNHIj',
  ],

  [
    'returns a random "uuid"',
    { type: 'string', format: 'uuid' },
    '6b042125-686a-43e0-8a68-23cf5bee102e',
  ],
  [
    'returns a random "firstName"',
    { type: 'string', format: 'firstName' },
    'Aaliyah',
  ],
  [
    'returns a random "lastName"',
    { type: 'string', format: 'lastName' },
    'Abbott',
  ],
  [
    'returns a random "email"',
    { type: 'string', format: 'email' },
    'Eldred.Dibbert@hotmail.com',
  ],
  [
    'returns a random "password"',
    { type: 'string', format: 'password' },
    'He2AFTHb4tHV3mb',
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
    '2026-04-20',
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
    'https://self-reliant-cd.com/',
  ],

  // Hostname.
  [
    'returns a random "hostname"',
    { type: 'string', format: 'hostname' },
    'inferior-punctuation.biz',
  ],

  // IPs.
  [
    'returns a random "ipv4"',
    { type: 'string', format: 'ipv4' },
    '184.103.47.157',
  ],
  [
    'returns a random "ipv6"',
    { type: 'string', format: 'ipv6' },
    '9f06:3247:8b9f:4d0e:9c34:bf6f:dd10:3d29',
  ],

  // Misc.
  [
    'returns a random "creditCard"',
    {
      type: 'string',
      format: 'creditCard',
    },
    '6503-1013-3546-2805',
  ],
  [
    'returns a random "hexcolor"',
    { type: 'string', format: 'hexcolor' },
    '#9f0632',
  ],
  [
    'returns a random "mac"',
    { type: 'string', format: 'mac' },
    '6b:04:21:25:68:6a',
  ],
])('%s', (_, input, output) => {
  if (output instanceof RegExp) {
    expect(seedString(input)).toMatch(output)
  } else {
    expect(seedString(input)).toBe(output)
  }
})
