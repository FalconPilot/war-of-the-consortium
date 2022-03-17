import { APIError } from 'wotc-common/types'

export interface LoadingState<T> {
  isLoading: boolean
  result: T | APIError | Error | null
}
