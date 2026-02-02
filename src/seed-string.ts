import type { JSONSchema7 } from 'json-schema'
import { faker } from '@faker-js/faker'
import randexpDefaultExport from 'randexp'

const { randexp } = randexpDefaultExport

export function seedString(schema: JSONSchema7): string {
  if (schema.const) {
    return schema.const as string
  }

  if (schema.examples) {
    return schema.examples as string
  }

  // Use a random value from the specified enums list.
  if (schema.enum) {
    const enumIndex = faker.number.int({
      min: 0,
      max: schema.enum.length - 1,
    })

    return schema.enum[enumIndex] as string
  }

  if (schema.pattern) {
    return randexp(schema.pattern)
  }

  const min = schema.minLength ?? 5
  const max = schema.maxLength ?? min

  switch (schema.format?.toLowerCase()) {
    case 'byte': {
      return btoa(
        faker.string.sample({
          min,
          max,
        }),
      )
    }

    case 'binary': {
      return faker.string.binary({
        length: {
          min,
          max,
        },
      })
    }

    case 'uuid': {
      return faker.string.uuid()
    }

    case 'firstname': {
      return faker.person.firstName()
    }

    case 'lastname': {
      return faker.person.lastName()
    }

    case 'email': {
      return faker.internet.email()
    }

    case 'password': {
      return faker.internet.password()
    }

    case 'date': {
      const min = schema.minimum || Date.now()
      return faker.date
        .between({
          from: min,
          to: schema.maximum || faker.date.future({ refDate: min }),
        })
        .toISOString()
        .replace(/T.+$/g, '')
    }

    case 'date-time': {
      const min = schema.minimum || Date.now()
      return faker.date
        .between({
          from: schema.minimum || Date.now(),
          to: schema.maximum || faker.date.future({ refDate: min }),
        })
        .toISOString()
    }

    case 'uri': {
      return faker.internet.url()
    }

    case 'hostname': {
      return faker.internet.domainName()
    }

    case 'ipv4': {
      return faker.internet.ip()
    }

    case 'ipv6': {
      return faker.internet.ipv6()
    }

    case 'creditcard': {
      return faker.finance.creditCardNumber()
    }

    case 'hexcolor': {
      return faker.internet.color()
    }

    case 'mac': {
      return faker.internet.mac()
    }
  }

  return faker.word.sample({
    length: {
      min,
      max,
    },
    strategy: 'longest',
  })
}
