import * as t from 'io-ts'
import * as td from 'io-ts-types'
import { User as PrismaUser } from '@prisma/client'

export type DBUser = PrismaUser

export const UserCodec = t.type({
  id: t.number,
  createdAt: td.date,
  name: t.string,
  email: t.string,
}, 'User')

export type User = t.TypeOf<typeof UserCodec>

export const UserPayloadCodec = t.type({
  name: t.string,
  email: t.string,
  password: t.string,
  passwordCheck: t.string,
})

export const extractUser = (src: DBUser): User => ({
  id: src.id,
  createdAt: src.createdAt,
  name: src.name,
  email: src.email,
})
