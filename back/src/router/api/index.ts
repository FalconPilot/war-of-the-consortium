import { Router } from 'express'

import { DBClient } from 'wotc-database/types'

import { BackEnv } from '../../types'

import { unitsRouter } from './units'
import { usersRouter } from './users'

export const apiRouter = (dbClient: DBClient, env: BackEnv): Router => {
  const router = Router()

  router.use('/units', unitsRouter(dbClient, env))
  router.use('/users', usersRouter(dbClient, env))

  return router
}
