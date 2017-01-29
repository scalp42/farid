import React from 'react'
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Layout from './components/Layout'
import Home from './components/pages/Home'
import SignUp from './components/pages/SignUp'
import Dashboard from './components/pages/Dashboard'

const componentRoutes = {
  component: Layout,
  path: '/',
  indexRoute: { component: Home },
  childRoutes: [
      {
        path: 'signup',
        getComponent(location, cb) {
          System.import('./components/pages/SignUp')
            .then(module => cb(null, module.default))
        }
      },
      {
        path: 'dashboard',
        getComponent(location, cb) {
          System.import('./components/pages/Dashboard')
            .then(module => cb(null, module.default))
        }
      },
      {
        path: '*',
        getComponent(location, cb) {
          System.import('./components/pages/Error404')
            .then(module => cb(null, module.default))
        }
      }
  ]
}
//
// export default function (props = {}) {
//   let history = hashHistory
//
//   if (props.store) {
//     history = syncHistoryWithStore(browserHistory, props.store)
//   }
//
//   return (
//     // <Router history={history} routes={componentRoutes} />
//     <Router history={history}>
//       <Route path="/" component={Layout}>
//         <IndexRoute component={Home} />
//         <Route path="signup" component={SignUp} />
//         <Route path="dashboard" component={Dashboard} />
//       </Route>
//     </Router>
//   )
// }

export default (
  // <Router history={history} routes={componentRoutes} />
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home} />
      <Route path="signup" component={SignUp} />
      <Route path="dashboard" component={Dashboard} />
    </Route>
  </Router>
)
