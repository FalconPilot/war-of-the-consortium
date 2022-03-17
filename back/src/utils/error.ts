import { Request, Response } from 'express'

import { APIError } from 'wotc-common/types'

import { log } from './cli'

export const handleError = (req: Request, res: Response) => (err: unknown): void => {
  if (err instanceof Error) {
    log.error(err.message)
  }

  if (err instanceof APIError) {
    res.status(err.httpStatus).json(err.serialize())
    return
  }

  res.status(500).json(new APIError(500, 'An unknown error occured').serialize())
}
