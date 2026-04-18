import type { JSONSchema7 } from 'json-schema'
import { seedString } from './seed-string.js'
import { seedNumber } from './seed-number.js'
import { seedInteger } from './seed-integer.js'
import { seedBoolean } from './seed-boolean.js'
import { seedArray } from './seed-array.js'
import { seedObject } from './seed-object.js'
import { merge } from './utils/merge.js'
import { isObject } from './utils/is-object.js'

export function seedSchema(schema: JSONSchema7) {
  if (schema.allOf) {
    const { allOf, ...rest } = schema
    return seedSchema(merge([rest, ...allOf]))
  }

  if (schema.oneOf) {
    const first = schema.oneOf.at(0)

    if (isObject(first)) {
      const { oneOf, ...rest } = schema
      return seedSchema(merge([rest, first]))
    }
  }

  if (schema.anyOf) {
    const first = schema.anyOf.at(0)

    if (isObject(first)) {
      const { anyOf, ...rest } = schema
      return seedSchema(merge([rest, first]))
    }
  }

  if (schema.enum != null) {
    const enumValue = schema.enum[0]

    if (Array.isArray(enumValue)) {
      return seedArray({
        type: 'array',
        ...enumValue,
      })
    }

    if (isObject(enumValue)) {
      return seedSchema({
        type: 'object',
        ...enumValue,
      })
    }

    return enumValue
  }

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
