import * as t from 'io-ts'

import { locales } from 'gamedata/locales'

export type Locale = keyof typeof locales

export const TranslationCodec: t.TypeC<{
  [k in Locale]: t.StringC
}> = t.type({
  fr: t.string,
  en: t.string,
})

export type Translation = t.TypeOf<typeof TranslationCodec>

export const isLocale = (x: unknown): x is Locale =>
  typeof x === 'string' && Object.keys(locales).includes(x)
