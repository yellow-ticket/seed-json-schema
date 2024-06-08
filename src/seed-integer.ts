import { JSONSchema7 } from 'json-schema'
import { datatype } from 'faker'

export function seedInteger(schema: JSONSchema7): number {
  switch (schema.format) {
    case 'int16':
    case 'int32':
    case 'int64': {
      return datatype.number({
        min: schema.minimum,
        max: schema.maximum,
      })
    }

    default: {
      return datatype.float({
        min: schema.minimum,
        max: schema.maximum,
      })
    }
  }
}
