import { Router } from 'express'

import { DBClient } from 'wotc-database'

import { trooper } from 'gamedata/units'
import { BackEnv } from 'types'

export const infantryRoutes = (
  router: Router,
  dbClient: DBClient,
  env: BackEnv
): void => {
  router.get('/trooper', (req, res) => {
    res.json(trooper)
  })
}
