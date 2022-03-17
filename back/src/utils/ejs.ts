import * as path from 'path'
import * as ejs from 'ejs'
import { Request, Response } from 'express'

import { isLocale } from 'wotc-common/dist/types'

import { log } from './cli'

export const renderPage = (
  page: string,
  data: Record<string, any> = {},
) => (req: Request, res: Response): void => {
  ejs.renderFile(
    path.resolve(__dirname, '..', 'templates', 'template.ejs'),
    { data: {
      ...data,
      page,
      locale: isLocale(req.cookies?.locale) ? req.cookies.locale : 'en',
    } },
    (err, html) => {
      if (err) {
        log.error(err.message)
        return res.status(500).send(err.message)
      }
      res.type('text/html').send(html)
    }
  )
}
