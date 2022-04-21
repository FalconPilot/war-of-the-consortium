import * as t from 'io-ts'
import * as Either from 'fp-ts/Either'
import { Request, Response } from 'express'
import { pipe } from 'fp-ts/lib/function'

import { APIError } from 'wotc-common'

import { log } from './cli'

export const parse = {
  number: (scope: string) => (v: string): number => {
    const num = parseInt(v, 10)

    if (isNaN(num)) {
      throw new APIError(400, `Param "${scope}" is not a valid number`)
    }

    return num
  },
  id: (scope: string) => (v: string): number => {
    const num = parse.number(scope)(v)

    if (num <= 0) {
      throw new APIError(400, `Param "${scope}" is not a valid ID`)
    }

    return num
  },
  email: (scope: string) => (v: string): string => {
    if (!v.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      throw new APIError(400, `Param "${scope}" is not a valid email`)
    }

    return v
  }
}

// Parse param
export const checkParam = <
  T extends Record<string, string>
>(req: Request<T>) => async <D>(
  key: keyof Request<T>['params'],
  parser: (scope: string) => (v: string) => D
): Promise<D> =>
  await parser(`${key}`)(req.params[key])

// Parse request body
export const checkPayload = <P extends t.Props>(
  codec: t.TypeC<P>,
  validators: { [k in keyof P]?: <T>(x: T) => boolean } = {}
) => async (
  req: Request
): Promise<t.TypeOf<typeof codec>> => {
  const payload = pipe(
    req.body,
    codec.asDecoder().decode,
    Either.fold(
      err => {
        log.error(`Decoding error on codec ${codec.name}`)
        log.error(JSON.stringify(err))
        throw new APIError(400, `Error decoding ${codec.name}`)
      },
      v => v
    )
  )

  const errors = Object.entries(validators).reduce<string[]>((acc, [key, validator]) => {
    if (!validator) {
      return acc
    }

    const err = validator(payload[key])
    return err ? acc.concat([`Error validating "${key}"`]) : acc
  }, [])

  if (errors.length > 0) {
    throw new APIError(400, 'Body validation error', {
      validationErrors: errors
    })
  }

  return payload
}

// Return 404 if value is null
export const checkNull = (scope: string) => <T>(value: T | null): T => {
  if (!value) {
    throw new APIError(404, `${scope} does not exist`)
  }

  return value
}

// Return 400 if payload values are not equal
export const checkEqual = <P extends Record<string, unknown>>(
  key1: keyof P,
  key2: keyof P
) => (payload: P): P => {
  if (payload[key1] !== payload[key2]) {
    throw new APIError(400, `${key1} and ${key2} must be equal`)
  }

  return payload
}

// Render result as JSON
export const renderJSON = (status: number) => (req: Request, res: Response) => <T>(value: T): void => {
  res.status(status).json(value)
}

// Return 401 if user is not authenticated
export const checkAuthenticated = async (req: Request, res: Response): Promise<void> => {
  if (!req.session.userId) {
    throw new APIError(401, 'User must be logged in')
  }
}
