import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { rootReducer } from './reducers'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
// require('dotenv').config()

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  rootReducer,
  /* preloaded state, */ composeEnhancers(applyMiddleware(thunk))
)



ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
