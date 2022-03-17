import { PrismaClient } from '@prisma/client'

export type DBClient = PrismaClient
export const DBClient = PrismaClient

export interface QueryOptions {
  strict?: boolean
}
