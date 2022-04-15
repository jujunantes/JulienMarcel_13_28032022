import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './utils/store'
import MyRouter from './utils/Router'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <MyRouter/>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)