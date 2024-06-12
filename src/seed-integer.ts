import { JSONSchema7 } from 'json-schema'
import { faker } from '@faker-js/faker'

export function seedInteger(schema: JSONSchema7): number {
  if (schema.const) {
    return schema.const as number
  }

  if (schema.examples) {
    return schema.examples as number
  }

  const minimum = schema.minimum ?? 0
  const maximum = schema.maximum ?? minimum + 100

  switch (schema.format) {
    case 'int16':
    case 'int32':
    case 'int64': {
      return faker.number.float({
        min: minimum,
        max: maximum,
      })
    }

    default: {
      return faker.number.float({
        min: minimum,
        max: maximum,
        fractionDigits: 2,
      })
    }
  }
}
