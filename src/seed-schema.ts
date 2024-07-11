import { seedString } from './seed-string.js'
import { seedNumber } from './seed-number.js'
import { seedInteger } from './seed-integer.js'
import { seedBoolean } from './seed-boolean.js'
import { seedArray } from './seed-array.js'
import { seedObject } from './seed-object.js'
import type { JSONSchema } from './types.js'

export function seedSchema(schema: JSONSchema) {
  switch (schema.type) {
    case 'string': {
      return seedString(schema)
    }

    case 'number': {
      return seedNumber(schema)
    }

    case 'integer': {
      return seedInteger(schema)
    }

    case 'boolean': {
      return seedBoolean(schema)
    }

    case 'array': {
      return seedArray(schema)
    }

    case 'object': {
      return seedObject(schema)
    }

    case 'null': {
      return null
    }
  }
}
