import { faker } from '@faker-js/faker'
import type { JSONSchema } from './types.js'

export function seedBoolean(schema: JSONSchema): boolean {
  if (schema.const) {
    return schema.const as boolean
  }

  if (schema.examples) {
    return schema.examples as boolean
  }

  if (schema.example) {
    return typeof schema.example === 'boolean' ? schema.example : Boolean(schema.example)
  }

  return faker.datatype.boolean()
}
