import { faker } from '@faker-js/faker'

beforeAll(() => {
  faker.setDefaultRefDate('2024-06-08T01:02:03.000Z')
})

beforeEach(() => {
  faker.seed(1)
})
