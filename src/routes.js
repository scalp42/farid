import React from 'react'
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Layout } from './components/Layout'
import Home from './components/pages/Home'
import SignUp from './components/pages/SignUp'
import Dashboard from './components/pages/Dashboard'

const Routes = (props = {}) => {
  let history = hashHistory

  if (props.store) {
    history = syncHistoryWithStore(browserHistory, props.store)
  }

  return (
   <Router history={history}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Home} />
        <Route path="signup" component={SignUp} />
        <Route path="dashboard" component={Dashboard} />
      </Route>
    </Router>
  )
}

export default Routes
