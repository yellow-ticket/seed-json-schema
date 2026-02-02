import type { JSONSchema7 } from 'json-schema'
import { invariant } from 'outvariant'
import { faker } from '@faker-js/faker'
import { repeat } from './utils/repeat.js'
import { seedSchema } from './seed-schema.js'

export function seedObject(schema: JSONSchema7) {
  // Always use the explicit "default" value.
  if (schema.default) {
    return schema.default
  }

  // Always us an explicit example, if provided.
  if (schema.examples) {
    return schema.examples
  }

  const json: Record<string, unknown> = {}

  // Support explicit "properties".
  if (schema.properties) {
    for (const [key, propertyDefinition] of Object.entries(schema.properties)) {
      if (typeof propertyDefinition === 'boolean') {
        continue
      }

      invariant(
        !('$ref' in propertyDefinition),
        'Failed to generate mock from the schema property definition (%j): found unresolved reference.',
        propertyDefinition,
      )

      const value = seedSchema(propertyDefinition)
      if (typeof value !== 'undefined') {
        json[key] = value
      }
    }
  }

  // Support "additionalProperties".
  if (schema.additionalProperties) {
    const additionalPropertiesSchema = schema.additionalProperties

    if (additionalPropertiesSchema === true) {
      repeat(0, 4, () => {
        const propertyName = faker.word.sample().toLowerCase()
        json[propertyName] = faker.string.sample()
      })

      return json
    }

    invariant(
      !('$ref' in additionalPropertiesSchema),
      'Failed to generate mock from the "additionalProperties" schema: found unresolved reference.',
    )

    repeat(0, 4, () => {
      const propertyName = faker.word.sample().toLowerCase()
      json[propertyName] = seedSchema(additionalPropertiesSchema)
    })
  }

  return json
}
