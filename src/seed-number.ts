import { JSONSchema7 } from 'json-schema'
import { faker } from '@faker-js/faker'

/**
 * @see https://json-schema.org/understanding-json-schema/reference/numeric#number
 */
export function seedNumber(schema: JSONSchema7): number {
  if (schema.const) {
    return schema.const as number
  }

  if (schema.examples) {
    return schema.examples as number
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
