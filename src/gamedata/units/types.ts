import * as t from 'io-ts'

import {
  enumCodec,
  TranslationCodec,
} from 'types'

export enum ArmorTypes {
  None = 0,
  Light = 1,
  Medium = 5,
  Heavy = 10,
}

export enum UnitSizes {
  Tiny = -1,
  Small = 0,
  Medium = 2,
  Large = 4,
  Huge = 6,
}

export const UnitCodec = t.type({
  name: TranslationCodec,
  stats: t.type({
    hp: t.number,
    size: enumCodec('UnitSizes', UnitSizes)
  })
})

export type Unit = t.TypeOf<typeof UnitCodec>
