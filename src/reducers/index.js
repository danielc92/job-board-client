import { authReducer } from './auth';
import { combineReducers } from 'redux';
import { themeReducer } from './theme';
import { registerReducer } from './register';

export const rootReducer = combineReducers({
    auth: authReducer,
    theme: themeReducer,
    register: registerReducer
})

