import React from 'react'
import ReactDOM from 'react-dom'
import { run } from 'concent'

import * as models from '@/models'
import App from '@/views/App'

const render = (Component: React.ComponentType): void => {
  const elem = document.getElementById('root')

  ReactDOM.render(
    <React.Suspense fallback={null}>
      <Component />
    </React.Suspense>,
    elem
  )
}

run(models)
render(App)

if (Boolean(module.hot)) {
  module.hot.accept(['models'], () => {
    run(models)
  })
  module.hot.accept(['views/App'], () => {
    render(App)
  })
}
