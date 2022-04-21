import { Router } from 'express'

import { APIError } from 'wotc-common'
import { DBClient, extractUser, UserPayloadCodec } from 'wotc-database'
import { encrypt } from 'wotc-database'

import { BackEnv } from 'types'
import { handleError } from 'utils/error'

import {
  checkAuthenticated,
  checkEqual,
  checkNull,
  checkParam,
  checkPayload,
  parse,
  renderJSON
} from 'utils/api'

const scope = 'User'

export const usersRouter = (dbClient: DBClient, env: BackEnv): Router => {
  const router = Router()

  router.get('/session', (req, res) => {
    try {
      if (!req.session.userId) {
        throw new APIError(401, 'User is not logged in')
      }

      res.status(200).json(req.session.userId)
    } catch (err) {
      handleError(req, res)(err)
    }
  })

  router.get('/:id', (req, res) => {
    checkAuthenticated(req, res)
      .then(() => checkParam(req)('id', parse.id))
      .then(id => dbClient.user.findUnique({ where: { id } }))
      .then(checkNull(scope))
      .then(extractUser)
      .then(renderJSON(200)(req, res))
      .catch(handleError(req, res))
  })

  router.post('/:email/login', (req, res) => {
    checkParam(req)('email', parse.email)
      .then(email => dbClient.user.findUnique({ where: { email } }))
      .then(checkNull(scope))
      .then(extractUser)
      .then(renderJSON(200)(req, res))
      .catch(handleError(req, res))
  })

  router.post('/', (req, res) => {
    checkPayload(UserPayloadCodec)(req)
      .then(checkEqual('password', 'passwordCheck'))
      .then(payload => encrypt(payload.password).then(password => (
        dbClient.user.create({
          data: {
            name: payload.name,
            email: payload.email,
            password: password
          }
        })
      )))
      .then(renderJSON(201)(req, res))
      .catch(handleError(req, res))
  })

  return router
}
