import * as path from 'path'
import { Router } from 'express'

import { apiRouter } from './api'
import { BackEnv } from '../types'
import { renderPage } from '../utils/ejs'

export const mainRouter = (env: BackEnv): Router => {
  const router = Router()

  // app.js bundle
  router.get('/app.js', (req, res) => {
    const jsPath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'front',
      'dist',
      'app.js'
    )

    res.sendFile(jsPath)
  })

  // Index
  router.get('/', renderPage('index'))

  // Routing scopes
  router.use('/api', apiRouter(env))

  return router
}
