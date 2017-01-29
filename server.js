import express from 'express';
import React from 'react';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './src/reducers';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import path from 'path';

const routes = require('./src/routes').default;
const logger = createLogger();

const app = express();

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.js');
  const compiler = webpack(webpackConfig);

  app.use(require("webpack-dev-middleware")(compiler, {
      noInfo: true, publicPath: webpackConfig.output.publicPath
  }));
  app.use(require("webpack-hot-middleware")(compiler));
}

app.use('/build', express.static(path.join(__dirname, 'build')));
// }

// app.get('/build/bundle.js', function(req, res) {
//   res.send("hello")
// })

// server routes
app.get('/hello', (req, res) => res.send({ hello: 'world' }));


// react-render
app.use(handleRender);

function handleRender(req, res) {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      ////// Redux
      // Compile an initial state
      const initialState = {};

      // Create a new Redux store instance
      const store = createStore(
        reducers,
        initialState,
        applyMiddleware(thunk, logger)
      );

      const promises = renderProps.components.map((component, index) => {
        if (component) { // because we have top-route Route without component
          if (typeof component.load !== 'function') {
            return false;
          }

          return component.load(store.dispatch);
        };
      }).filter((elem) => elem instanceof Promise);

      Promise.all(promises)
        .then(() => res.status(200).send(renderFullPage(renderProps, store)))
        .catch(error => console.log(error));
    } else {
      res.status(404).send('Not found')
    }
  })
}

function renderFullPage(renderProps, store) {
  const initialState = store.getState();

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  );


  return `
    <!doctype html>
    <html>
      <head>
        <title>Farid</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script type="text/javascript" src="./build/manifest.js"></script>
        <script type="text/javascript" src="./build/vendor.js"></script>
        <script type="text/javascript" src="./build/bundle.js"></script>
      </body>
    </html>
  `
}



// app.get('*', (req, res, next) => {
//   match({ routes: routes, location: req.url }, (err, redirectLocation, renderProps) => {
//     if (err) return next(err);
//
//     if (redirectLocation) {
//       return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
//     }
//     console.log(req.url, routes, renderProps, 'hey')
//     if (!renderProps) {
//       return next(new Error('Missing render props'));
//     }
//
//     const components = renderProps.components;
//
//     if (components.some(comp => comp && comp.displayName === 'error-404')) {
//       res.status(404);
//     }
//
//     const pageComp = components[components.length - 1].WrappedComponent;
//     const fetchData = (pageComp && pageComp.fetchData) || (() => {
//       return Promise.resolve();
//     });
//
//     const initialState = {};
//     const store = createStore(reducers, initialState, applyMiddleware(thunk));
//     const { location, params, history } = renderProps;
//
//     fetchData({ store, location, params, history })
//       .then(() => {
//         const body = renderToString(
//           <Provider store={store}>
//             <RouterContext {...renderProps} />
//           </Provider>
//         );
//
//         const state = store.getState();
//
//         res.send(`<!DocType html>
//           <html>
//             <head>
//               <link rel="stylesheet" href="/bundle.css">
//             </head>
//             <body>
//               <div id="root">${body}</div>
//               <script>window.__REDUX_STATE__ = ${JSON.stringify(state)}</script>
//               <script src="/bundle.js"></script>
//             </body>
//           </html>`);
//         })
//         .catch(err => next(err));
//     })
// });



app.listen(PORT, () => { console.log(`listening on port ${PORT}`)})
