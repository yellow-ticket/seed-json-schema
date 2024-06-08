import { faker } from '@faker-js/faker'

beforeAll(() => {
  faker.setDefaultRefDate(new Date('2024-06-08 01:02:03:000'))
})

beforeEach(() => {
  faker.seed(1)
})
