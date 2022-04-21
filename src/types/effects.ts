import { APIError } from './error'

export interface LoadingState<T> {
  isLoading: boolean
  result: T | APIError | Error | null
}
