import { Router } from 'express'

import { DBClient } from 'wotc-database/types'

import { infantryRoutes } from './infantry'
import { BackEnv } from '../../../types'

export const unitsRouter = (dbClient: DBClient, env: BackEnv): Router => {
  const router = Router()

  infantryRoutes(router, dbClient, env)

  return router
}
