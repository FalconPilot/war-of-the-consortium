import * as React from 'react'

import { LoadingState } from 'types'

export const useLoadingState = <T>(initialState: Partial<LoadingState<T>> = {}) => {
  return React.useState<LoadingState<T>>({
    isLoading: false,
    result: null,
    ...initialState
  })
}
