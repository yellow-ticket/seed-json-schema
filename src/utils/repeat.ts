import { faker } from '@faker-js/faker'

export function repeat(min: number, max: number, callback: () => void): void {
  for (let i = 0; i < faker.number.int({ min, max }); i++) {
    callback()
  }
}
