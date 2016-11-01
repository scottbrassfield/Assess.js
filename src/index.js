import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/app'
import store from './store'
import { AppContainer } from 'react-hot-loader'

ReactDOM.render(
  <Provider store={ store }>
    <AppContainer>
      <App />
    </AppContainer>
  </Provider>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./components/app', () => {
    ReactDOM.render(
      <Provider store={ store }>
        <AppContainer component = {require('./components/app').default} />
      </Provider>,
      document.getElementById('root')
    )
  })
}
