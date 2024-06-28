import { faker } from '@faker-js/faker'

beforeEach(() => {
  faker.seed(1)
  faker.setDefaultRefDate('2024-06-08T01:02:03.000Z')
})
