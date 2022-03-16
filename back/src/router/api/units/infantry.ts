import { Router } from 'express'

import { trooper } from '../../../gamedata/units'

export const infantryRoutes = (router: Router): void => {
  router.get('/trooper', (req, res) => {
    res.json(trooper)
  })
}
