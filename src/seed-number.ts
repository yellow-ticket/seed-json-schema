import { JSONSchema7 } from 'json-schema'
import { datatype } from 'faker'

export function seedNumber(schema: JSONSchema7): number {
  return datatype.number({
    min: schema.minimum,
    max: schema.maximum,
  })
}
