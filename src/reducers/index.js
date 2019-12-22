import { authReducer } from './auth';
import { combineReducers } from 'redux';
import { themeReducer } from './theme';
import { registerReducer } from './register';
import { menuReducer } from './menu';
import { skillReducer } from './skills';
import { benefitReducer } from './benefits';
import { categoryReducer } from './categories';
import { jobReducer } from './job';
import { jobListReducer } from './joblist';
import { locationListReducer } from './location';

export const rootReducer = combineReducers({
    auth: authReducer,
    theme: themeReducer,
    register: registerReducer,
    menu: menuReducer,
    skill: skillReducer,
    category: categoryReducer,
    benefit: benefitReducer,
    job: jobReducer,
    jobList: jobListReducer,
    locationList: locationListReducer
})

