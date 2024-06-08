import { JSONSchema7 } from 'json-schema'
import { faker } from '@faker-js/faker'

export function seedNumber(schema: JSONSchema7): number {
  return faker.number.int({
    min: schema.minimum,
    max: schema.maximum,
  })
}
