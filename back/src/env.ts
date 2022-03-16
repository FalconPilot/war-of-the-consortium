import * as envalid from 'envalid'

import { BackEnv } from './types'

export const validateEnv = (rawEnv: unknown): BackEnv =>
  envalid.cleanEnv(rawEnv, {
    PORT: envalid.num()
  })
