import * as bcrypt from 'bcrypt'

export const encrypt = (password: string) =>
  bcrypt.hash(password, 10)

export const compare = (password: string) => (target: string) =>
  bcrypt.compare(password, target)
