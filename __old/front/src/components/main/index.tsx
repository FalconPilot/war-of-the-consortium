import * as React from 'react'

import { checkSession } from '../../api/auth'
import { useLoadingState } from '../../hooks/state'

import { Auth } from '../auth'
import { Loading } from '../loading'

import { MainView } from './view'

export const Main: React.FunctionComponent = () => {
  const [state, setState] = useLoadingState<number>()

  React.useEffect(() => {
    checkSession()
      .then(console.log)
      .catch(err => { setState({ isLoading: false, result: err }) })
  }, [])

  const canDisplay = React.useMemo(() => (
    typeof state.result === 'number'
  ), [state.result])

  return (
    <Loading isLoading={state.isLoading}>
      {canDisplay
        ? <MainView />
        : <Auth />
      }
    </Loading>
  )
}
