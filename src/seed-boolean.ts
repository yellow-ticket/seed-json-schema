import type { JSONSchema7 } from 'json-schema'
import { faker } from '@faker-js/faker'

export function seedBoolean(schema: JSONSchema7): boolean {
  if (schema.const) {
    return schema.const as boolean
  }

  if (schema.examples) {
    return schema.examples as boolean
  }

  return faker.datatype.boolean()
}
