import type { JSONSchema7 } from "json-schema"

declare module 'json-schema' {
  interface JSONSchema7 {
    /**
     * A free-form property to include an example of an instance for this schema.
     * To represent examples that cannot be naturally represented in JSON or YAML,
     * a string value can be used to contain the example with escaping where necessary.
     * @see https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schema-object
     */
    example?: JSONSchema7Type | undefined
  }
}

/**
 * JSON Schema v7 with OpenAPI v3 extensions
 * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01
 * @see https://spec.openapis.org/oas/v3.0.3
 */
export type JSONSchema = JSONSchema7
