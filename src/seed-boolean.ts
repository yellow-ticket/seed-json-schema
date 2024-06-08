import { faker } from '@faker-js/faker'

export function seedBoolean(): boolean {
  return faker.datatype.boolean()
}
