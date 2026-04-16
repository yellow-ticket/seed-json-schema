import { JSONSchema7, JSONSchema7Definition } from 'json-schema'

function isObj(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function mergeObjs<T>(target: T, source: T): T {
  if (!isObj(target) || !isObj(source)) {
    return source
  }

  const result: T = { ...target }

  for (const _key of Object.keys(source)) {
    const key = _key as keyof T
    const targetVal = result[key]
    const sourceVal = source[key]

    if (Array.isArray(targetVal) && Array.isArray(sourceVal)) {
      result[key] = [...new Set([...targetVal, ...sourceVal])] as T[keyof T]
    } else if (isObj(targetVal) && isObj(sourceVal)) {
      result[key] = mergeObjs(targetVal, sourceVal)
    } else {
      result[key] = sourceVal
    }
  }

  return result
}

function flatten(objects: JSONSchema7Definition[]): JSONSchema7Definition[] {
  return objects.flatMap((obj) => {
    if (typeof obj === 'boolean') return [obj]
    if (obj.allOf) return flatten(obj.allOf)
    return [obj]
  })
}

export function merge(objects: JSONSchema7Definition[]): JSONSchema7 {
  return flatten(objects).reduce<JSONSchema7>(
    (acc, obj) => (typeof obj === 'boolean' ? acc : mergeObjs(acc, obj)),
    {},
  )
}
