import { APIError } from 'wotc-common'

export interface LoadingState<T> {
  isLoading: boolean
  result: T | APIError | Error | null
}
