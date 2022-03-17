import * as envalid from 'envalid'

import { BackEnv } from './types'

const validateArrayOf = <P>(
  subValidator: envalid.ValidatorSpec<P>
) => envalid.makeValidator((input: string): P[] => {
  const arr = JSON.parse(input)
  if (!Array.isArray(arr)) {
    throw new Error('Expected an Array')
  }
  return arr.map(subValidator._parse)
})

export const validateEnv = (rawEnv: unknown): BackEnv =>
  envalid.cleanEnv(rawEnv, {
    COOKIE_SECRET: envalid.str(),
    DATABASE_URL: envalid.str(),
    MAILJET_SECRETS: validateArrayOf<string>(envalid.str())(),
    NODE_ENV: envalid.str(),
    PORT: envalid.num()
  })
