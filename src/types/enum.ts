import * as t from 'io-ts'

import { ValueOf } from 'utils/types'

export const isEnumValue = <T extends { [k: string]: string | number }>(
  enumObject: T
) => (value: unknown): value is ValueOf<T> =>
    (typeof value === 'string' || typeof value === 'number')
  && Object.values(enumObject).includes(value)

export const enumCodec = <T extends string, TEnumValue extends string | number>(
  enumName: string,
  enumType: { [k in T]: TEnumValue }
): t.Type<TEnumValue> => {
  const isEnumValueFromParam = isEnumValue(enumType)

  return new t.Type<TEnumValue>(
    enumName,
    isEnumValueFromParam,
    (input, context) =>
      isEnumValueFromParam(input)
        ? t.success(input)
        : t.failure(input, context),
    t.identity
  )
}
