import * as t from 'io-ts'

export const SerializedAPIErrorCodec = t.intersection([
  t.type({
    httpStatus: t.number,
    message: t.string,
  }),
  t.partial({
    details: t.partial({
      validationErrors: t.array(t.string)
    })
  })
])

export type SerializedAPIError = t.TypeOf<typeof SerializedAPIErrorCodec>

export type APIErrorDetails = SerializedAPIError['details']

export class APIError extends Error {
  httpStatus: number
  details: APIErrorDetails

  constructor (status: number, message: string, details: APIErrorDetails = undefined) {
    super(message)
    this.httpStatus = status

    if (details) {
      this.details = details
    }
  }

  serialize (): SerializedAPIError {
    const details = this.details ?? {}

    return {
      httpStatus: this.httpStatus,
      message: this.message,
      ...details
    }
  }
}
