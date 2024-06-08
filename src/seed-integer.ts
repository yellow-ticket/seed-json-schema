import { JSONSchema7 } from 'json-schema'
import { faker } from '@faker-js/faker'

export function seedInteger(schema: JSONSchema7): number {
  switch (schema.format) {
    case 'int16':
    case 'int32':
    case 'int64': {
      return faker.number.int({
        min: schema.minimum,
        max: schema.maximum,
      })
    }

    default: {
      return faker.number.float({
        min: schema.minimum,
        max: schema.maximum,
      })
    }
  }
}
