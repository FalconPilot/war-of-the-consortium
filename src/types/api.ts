import { AxiosRequestConfig } from 'axios'

export type ValidQSParam = boolean | string | string[] | number | number[]

export interface QSParams {
  [k: string]: ValidQSParam,
}

export interface ApiHandlerParams<T> {
  debug?: boolean,
  fallback?: {
    value: T,
    onDecoding: boolean,
    onCatch: boolean,
  },
  throwOnHttpCodes?: number[],
}

export interface ApiHandler<RequestResponse> {
  withOptions: (options: AxiosRequestConfig) => ApiHandler<RequestResponse>,
  withBody: <BodyType>(body: BodyType) => ApiHandler<RequestResponse>,
  withHeaders: (headers: Record<string, string>) => ApiHandler<RequestResponse>,
  withQS: (qs: QSParams) => ApiHandler<RequestResponse>,
  execute: (
    params?: ApiHandlerParams<RequestResponse>
  ) => Promise<RequestResponse>,
}
