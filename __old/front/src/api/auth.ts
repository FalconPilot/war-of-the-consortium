import * as t from 'io-ts'

import { API } from 'wotc-common'

export const checkSession = () =>
  API.get('/api/users/session', t.number)
    .execute()
