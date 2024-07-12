import { invariant } from 'outvariant'
import { faker } from '@faker-js/faker'
import { seedSchema } from './seed-schema.js'
import type { JSONSchema } from './types.js'

export function seedArray(schema: JSONSchema | boolean): Array<unknown> {
  if (typeof schema === 'boolean') {
    return []
  }

  if (schema.example) {

    if (Array.isArray(schema.example)) {
      return schema.example
    }
    return typeof schema.example === 'string' ? JSON.parse(schema.example) : schema.example
  }

  const { items: arraySchema } = schema

  if (arraySchema == null) {
    return []
  }

  if (Array.isArray(arraySchema)) {
    return arraySchema.map(seedArray)
  }

  if (typeof arraySchema === 'boolean') {
    return []
  }

  if (arraySchema.example) {
    return typeof arraySchema.example === 'string' ? [JSON.parse(arraySchema.example)] : [arraySchema.example]
  }

  invariant(
    !('$ref' in arraySchema),
    'Failed to generate mock from schema array (%j): found unresolved reference.',
    arraySchema
  )

  const minItems = schema.minItems ?? 2
  const arrayLength = faker.number.int({
    min: minItems,
    max: schema.maxItems ?? minItems + 4,
  })

  const value: Array<unknown> = new Array(arrayLength)
    .fill(null)
    .reduce<Array<unknown>>((array) => {
      const value = seedSchema(arraySchema)

      if (value) {
        // Push instead of concating to support
        // nested arrays.
        array.push(value)
      }

      return array
    }, [])

  return value
}
