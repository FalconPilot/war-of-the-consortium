import { Router } from 'express'

import { infantryRoutes } from './infantry'
import { BackEnv } from '../../../types'

export const unitsRouter = (env: BackEnv): Router => {
  const router = Router()

  infantryRoutes(router)

  return router
}
