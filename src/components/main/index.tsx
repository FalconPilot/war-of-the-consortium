import * as React from 'react'

import { checkSession } from 'api/auth'
import { useLoadingState } from 'hooks'

import { Auth } from 'components/auth'
import { Loading } from 'components/loading'

import { MainView } from './view'

export const Main: React.FunctionComponent = () => {
  const [state, setState] = useLoadingState<number>()

  React.useEffect(() => {
    checkSession()
      .then(console.log)
      .catch(err => { setState({ isLoading: false, result: err }) })
  }, [setState])

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
