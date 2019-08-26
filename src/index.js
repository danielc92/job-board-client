import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


const temporaryReducer = () => {
    return {state: "hello world"}
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(temporaryReducer, /* preloaded state, */ composeEnhancers(
    applyMiddleware(thunk)
))

ReactDOM.render(
    <App store={store}/>, 
    document.getElementById('root'));