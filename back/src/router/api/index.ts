import { Router } from 'express'

import { unitsRouter } from './units'
import { BackEnv } from '../../types'

export const apiRouter = (env: BackEnv): Router => {
  const router = Router()

  router.use('/units', unitsRouter(env))

  return router
}
