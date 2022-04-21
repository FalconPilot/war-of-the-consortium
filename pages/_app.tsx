import * as React from 'react'

import { AppProps } from 'next/app'

const App: React.FunctionComponent<AppProps> = ({
  Component,
  pageProps
}) => {
  return <Component {...pageProps} />
}

export default App
