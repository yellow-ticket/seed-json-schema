import { JSONSchema7, JSONSchema7Definition } from 'json-schema'
import { isObject } from './is-object.js'

function mergeObjects<T>(target: T, source: T): T {
  if (!isObject(target) || !isObject(source)) {
    return source
  }

  const result: T = { ...target }

  for (const _key of Object.keys(source)) {
    const key = _key as keyof T
    const targetVal = result[key]
    const sourceVal = source[key]

    if (Array.isArray(targetVal) && Array.isArray(sourceVal)) {
      result[key] = [...new Set([...targetVal, ...sourceVal])] as T[keyof T]
    } else if (isObject(targetVal) && isObject(sourceVal)) {
      result[key] = mergeObjects(targetVal, sourceVal)
    } else {
      result[key] = sourceVal
    }
  }

  return result
}

function flatten(objects: JSONSchema7Definition[]): JSONSchema7Definition[] {
  return objects.flatMap((obj) => {
    if (typeof obj === 'boolean') {
      return [obj]
    }

    if (obj.allOf) {
      return flatten(obj.allOf)
    }

    return [obj]
  })
}

export function merge(objects: JSONSchema7Definition[]): JSONSchema7 {
  return flatten(objects).reduce<JSONSchema7>((acc, value) => {
    return typeof value === 'boolean' ? acc : mergeObjects(acc, value)
  }, {})
}
