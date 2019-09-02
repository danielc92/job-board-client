import { authReducer } from './auth';
import { combineReducers } from 'redux';
import { themeReducer } from './theme';
import { registerReducer } from './register';
import { menuReducer } from './menu';
import { skillReducer } from './skills';


export const rootReducer = combineReducers({
    auth: authReducer,
    theme: themeReducer,
    register: registerReducer,
    menu: menuReducer,
    skill: skillReducer
})

