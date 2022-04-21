import { Router } from 'express'

import { DBClient } from 'wotc-database'

import { BackEnv } from 'types'

import { infantryRoutes } from './infantry'

export const unitsRouter = (dbClient: DBClient, env: BackEnv): Router => {
  const router = Router()

  infantryRoutes(router, dbClient, env)

  return router
}
