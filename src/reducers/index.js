import { authReducer } from './auth';
import { combineReducers } from 'redux';
import { themeReducer } from './theme';

export const rootReducer = combineReducers({
    auth: authReducer,
    theme: themeReducer,
    dummy: 'test'
})

