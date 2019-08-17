import React from 'react';
import ReactDOM from 'react-dom';
// import "./App.css"
import logger from 'redux-logger';

import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

import { createStore, applyMiddleware } from 'redux';

// import { HashRouter as Router,Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import rootReducer from './redux/reducers/index';

import { renderRoutes } from 'react-router-config';


import routes from '../src/routes/routers'

import { Provider } from 'react-redux';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // 、workboxServiceWorker.js需要根据实际情况变化,
    navigator.serviceWorker.register('/workboxServiceWorker.js').then(registration => {
      console.log('SW registered: ', registration)
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError)
    })
  })
}

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk, logger)
  )
);

// REDUX 2.x 中，HMR检测不到reducer的变化，所以在创建store的文件中加入下面代码

if (module.hot) {
  module.hot.accept("./redux/reducers", () => {
    const nextRootReducer = require("./redux/reducers/index").default;
    store.replaceReducer(nextRootReducer);
  });
}


const root = document.getElementById('root')

const render = () => {

  ReactDOM.render(
    <Provider store={store}>
      <Router>
        {renderRoutes(routes)}
      </Router>
    </Provider>
    ,
    root
  );
}

render()

if (module.hot) {
  module.hot.accept();
}