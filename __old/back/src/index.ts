import * as express from 'express'
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import * as bodyParser from 'body-parser'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'

import { cultures } from 'wotc-common'
import { DBClient } from 'wotc-database'

import { log } from 'utils/cli'
import { renderPage } from 'utils/ejs'

import { validateEnv } from './env'
import { mainRouter } from './router'

const dbClient = new DBClient()

console.log(cultures)

// Initialization
const env = validateEnv(process.env)
const app = express()

// Global settings
if (env.NODE_ENV === 'production') {
  app.set('trust proxy', 1)
}

// Middlewares and routers
app.use(bodyParser.json())
app.use(cookieParser(env.COOKIE_SECRET))
app.use(session({
  cookie: {
    secure: env.NODE_ENV === 'production'
  },
  resave: true,
  saveUninitialized: false,
  secret: env.COOKIE_SECRET,
  store: new PrismaSessionStore(dbClient, {
    checkPeriod: 2 * 60 * 1000, // 2min
    dbRecordIdIsSessionId: true
  })
}))
app.use('/', mainRouter(dbClient, env))

// 404 fallback
app.use((req, res) => {
  res.status(404)
  renderPage('404')(req, res)
})

// Startup function
const startup = (): Promise<void> =>
  new Promise((resolve, reject) => {
    try {
      app.listen(env.PORT, () => {
        resolve()
      })
    } catch (err) {
      reject(err)
    }
  })

// Start server
startup()
  .then(() => {
    log.msg(`WOTC server running on port ${env.PORT}`)
  })
  .finally(async () => { await dbClient.$disconnect() })
