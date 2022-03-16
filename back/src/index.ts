import * as express from 'express'
import * as cookieParser from 'cookie-parser'

import { log } from './utils/cli'

import { validateEnv } from './env'
import { mainRouter } from './router'
import { renderPage } from './utils/ejs'

// Initialization
const env = validateEnv(process.env)
const app = express()

// Middlewares and routers
app.use(cookieParser())
app.use('/', mainRouter(env))

// 404 fallback
app.use((req, res) => {
  res.status(404)
  renderPage('404')(req, res)
})

// Start server
app.listen(env.PORT, () => {
  log.msg(`WOTC server running on port ${env.PORT}`)
})
