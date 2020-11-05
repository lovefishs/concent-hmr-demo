import React from 'react'
import ReactDOM from 'react-dom'
import { run, clearContextIfHot } from 'concent'

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
    // 当传入 true 时控制台会打印：attention: make sure [[clearContextIfHot]] been called before app rendered!
    // 当模块文件替换后，会报错：Error: no reducerMap found for module:[user]
    clearContextIfHot()
  })
  module.hot.accept(['views/App'], () => {
    render(App)
  })
}
