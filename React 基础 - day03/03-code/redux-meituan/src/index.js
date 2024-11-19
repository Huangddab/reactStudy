import React from 'react'
import { createRoot } from 'react-dom/client'
// 导入store
import store from './store'
// 导入store提供的provider
import { Provider } from 'react-redux'

import App from './App'


const root = createRoot(document.getElementById('root'))
root.render(
  // 提供store数据
  <Provider store={store}>
    <App />
  </Provider>
)
