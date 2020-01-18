import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers';
import { BrowserRouter } from 'react-router-dom';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, /* preloaded state, */ composeEnhancers(
    applyMiddleware(thunk)
))

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter forceRefresh={false}>
            <App/>
        </BrowserRouter>
    </Provider>
    , 
    document.getElementById('root'));