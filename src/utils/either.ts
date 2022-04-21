import { Either, fold } from 'fp-ts/Either'

export const extractOrThrow = <ET, T>(either: Either<ET, T>): T =>
  fold<ET, T, T>(
    errors => {
      throw errors
    },
    data => data
  )(either)
