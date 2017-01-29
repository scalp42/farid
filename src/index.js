import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import reducers from './reducers/index'
import Layout from './components/Layout'
import Routes from './routes';
import '../style/style.css'

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
)
