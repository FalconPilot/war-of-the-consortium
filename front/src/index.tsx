import * as React from 'react'
import { render } from 'react-dom'

import { App } from './app'

const rootNodeID = 'root'

const rootNode = document.getElementById(rootNodeID)

if (!rootNodeID) {
  throw new Error(`Cannot find root node "${rootNodeID}"`)
}

render(<App />, rootNode)
