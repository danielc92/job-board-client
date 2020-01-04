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
import { jobDetailReducer } from './job_detail';
import { locationListReducer } from './location';
import { applicationReducer } from './application';
import { userDetailsReducer } from './user_details';
import { applicationListReducer } from './application_list';

export const rootReducer = combineReducers({
    auth: authReducer,
    user_details: userDetailsReducer,
    application: applicationReducer,
    application_list: applicationListReducer,
    theme: themeReducer,
    register: registerReducer,
    menu: menuReducer,
    skill: skillReducer,
    category: categoryReducer,
    benefit: benefitReducer,
    job: jobReducer,
    jobList: jobListReducer,
    locationList: locationListReducer,
    jobDetails: jobDetailReducer,
})

