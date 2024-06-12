import { JSONSchema7 } from 'json-schema'
import { faker } from '@faker-js/faker'

export function seedNumber(schema: JSONSchema7): number {
  if (schema.const) {
    return schema.const as number
  }

  if (schema.examples) {
    return schema.examples as number
  }

  const minimum = schema.minimum ?? 0
  const maximum = schema.maximum ?? minimum + 100

  return faker.number.int({
    min: minimum,
    max: maximum,
  })
}
