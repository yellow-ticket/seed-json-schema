import { JSONSchema7Definition } from 'json-schema'
import { invariant } from 'outvariant'
import { faker } from '@faker-js/faker'
import { seedSchema } from './seed-schema.js'

export function seedArray(schema: JSONSchema7Definition): Array<unknown> {
  if (typeof schema === 'boolean') {
    return []
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

  invariant(
    !('$ref' in arraySchema),
    'Failed to generate mock from schema array (%j): found unresolved reference.',
    arraySchema
  )

  const minLength = schema.minLength || 2
  const arrayLength = faker.number.int({
    min: minLength,
    max: schema.maxLength || minLength + 4,
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
