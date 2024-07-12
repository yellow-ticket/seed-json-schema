import { faker } from '@faker-js/faker'
import type { JSONSchema } from './types.js'

/**
 * @see https://json-schema.org/understanding-json-schema/reference/numeric#number
 */
export function seedNumber(schema: JSONSchema): number {
  if (schema.const) {
    return schema.const as number
  }

  if (schema.examples) {
    return schema.examples as number
  }

  if (schema.example) {
    return typeof schema.example === 'number' ? schema.example : Number(schema.example)
  }

  const minimum =
    schema.exclusiveMinimum != null
      ? schema.exclusiveMinimum + 1
      : schema.minimum ?? 0
  const maximum =
    schema.exclusiveMaximum != null
      ? schema.exclusiveMaximum - 1
      : schema.maximum ?? minimum + 100

  return faker.number.float({
    min: minimum,
    max: maximum,
    fractionDigits: schema.multipleOf != null ? undefined : 2,
    multipleOf: schema.multipleOf,
  })
}
