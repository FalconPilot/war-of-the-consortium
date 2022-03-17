import * as React from 'react'

import { LoadingView } from './view'

export const Loading: React.FunctionComponent<{
  isLoading: boolean,
  children: React.ReactChild,
}> = ({ isLoading, children }) => {
  return isLoading
    ? <LoadingView />
    : <>{children}</>
}
